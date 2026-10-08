'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import {
  AtIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  PhoneIcon,
} from '@phosphor-icons/react/ssr';
import { type ReactNode, type SubmitEvent, useRef, useState } from 'react';
import { z } from 'zod';
import { api } from '@/lib/api';
import { contactSchema } from '@/lib/schema/contact';
import Button from '../primitives/Button';
import GlassCard from '../primitives/GlassCard';

const field =
  'w-full rounded-lg bg-bg-default px-3 py-2.5 paragraph-body text-fg caret-fg shadow-[1px_1px_1.5px_0px_#2D2D2D73_inset] placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg';

type ContactErrors = Record<string, string | undefined>;

type FieldProps = {
  name: string;
  error?: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  icon?: ReactNode;
  required?: boolean;
};

const ErrorText = ({ id, children }: { id: string; children?: string }) =>
  children ? (
    <p id={id} role="alert" className="mt-1 text-xs text-fg">
      {children}
    </p>
  ) : null;

const Field = ({ icon, placeholder, error, ...props }: FieldProps) => (
  <label className="relative block">
    <span className="sr-only">{placeholder}</span>
    {icon && (
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted [&>svg]:size-6">
        {icon}
      </span>
    )}
    <input
      placeholder={placeholder}
      className={icon ? `${field} h-11 pl-11` : `${field} h-11`}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${props.name}-error` : undefined}
      {...props}
    />
    <ErrorText id={`${props.name}-error`}>{error}</ErrorText>
  </label>
);

/**
 * The contact form, on a glass card that darkens and swells slightly while
 * the form is being filled in. Validates with the shared schema, then posts
 * to /api/contact.
 */
const ContactForm = () => {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [token, setToken] = useState('');
  const turnstile = useRef<TurnstileInstance>(null);

  // Tokens are single-use, so get a fresh one after every attempt.
  const resetToken = () => {
    setToken('');
    turnstile.current?.reset();
  };
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error' | 'limited'
  >('idle');

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(
      [...new FormData(form)].map(([k, v]) => [k, String(v).trim()]),
    );
    // Allow "example.com" by adding the protocol the schema expects.
    if (raw.currentWebsite && !/^https?:\/\//i.test(raw.currentWebsite)) {
      raw.currentWebsite = `https://${raw.currentWebsite}`;
    }

    const result = contactSchema.safeParse({ ...raw, turnstileToken: token });
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]),
        ),
      );
      setStatus('idle');
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }

    setErrors({});
    setStatus('sending');
    try {
      const res = await api.api.contact.$post({ json: result.data });
      if (!res.ok) {
        if (res.status === 400) {
          const body = (await res.json()) as {
            errors?: Record<string, string[] | undefined>;
          };
          setErrors(
            Object.fromEntries(
              Object.entries(body.errors ?? {}).map(([k, v]) => [k, v?.[0]]),
            ),
          );
        }
        setStatus(res.status === 429 ? 'limited' : 'error');
        resetToken();
        return;
      }
      form.reset();
      resetToken();
      setStatus('sent');
    } catch {
      setStatus('error');
      resetToken();
    }
  };

  return (
    <GlassCard
      dispersion={0}
      className="group w-full max-w-[501px] p-6 transition-[transform,background-color] duration-300 ease-out focus-within:scale-[1.03] focus-within:bg-[#2e140a]/55 motion-reduce:transition-none motion-reduce:focus-within:scale-100"
    >
      {status === 'sent' ? (
        <output className="mx-auto flex max-w-[453px] flex-col items-center gap-4 py-16 text-center">
          <CheckCircleIcon weight="fill" className="size-16 text-fg" />
          <p className="paragraph-lg-semibold text-fg">Message sent!</p>
          <p className="paragraph-body text-fg">
            Thanks for reaching out. We&apos;ve received your message and will
            reply within 1&ndash;2 business days.
          </p>
          <Button
            type="button"
            variant="charcoal"
            size="sm"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </Button>
        </output>
      ) : (
        <form
          noValidate
          onSubmit={onSubmit}
          className="mx-auto flex max-w-[453px] flex-col gap-3"
        >
          <Field
            name="name"
            placeholder="Name"
            autoComplete="name"
            error={errors.name}
          />
          <Field
            name="phone"
            type="tel"
            placeholder="Phone"
            autoComplete="tel"
            icon={<PhoneIcon weight="fill" />}
            error={errors.phone}
          />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            icon={<AtIcon weight="fill" />}
            error={errors.email}
          />
          <Field
            name="company"
            placeholder="Company"
            autoComplete="organization"
            icon={<BriefcaseIcon weight="fill" />}
            error={errors.company}
          />
          {/* Honeypot: hidden from people, filled in by bots */}
          <input
            name="hp_field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <Field
            name="currentWebsite"
            type="text"
            placeholder="Current website (optional)"
            autoComplete="url"
            error={errors.currentWebsite}
          />
          <label className="block">
            <span className="sr-only">How can we help?</span>
            <textarea
              name="message"
              placeholder="How can we help?"
              rows={5}
              className={`${field} resize-none`}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            <ErrorText id="message-error">{errors.message}</ErrorText>
          </label>
          <div>
            <Turnstile
              ref={turnstile}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''}
              onSuccess={setToken}
              onExpire={() => setToken('')}
              options={{ size: 'flexible' }}
            />
            <ErrorText id="turnstileToken-error">
              {errors.turnstileToken}
            </ErrorText>
          </div>
          <div className="mt-2 flex flex-col items-start gap-3">
            <Button
              type="submit"
              variant="charcoal"
              size="sm"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </Button>
            <output className="text-sm text-fg">
              {status === 'limited' &&
                "You've sent a few messages recently. Please try again later or email hello@palmettodd.com."}
              {status === 'error' &&
                'Something went wrong. Please try again in a moment.'}
            </output>
            <p className="text-xs text-fg transition-colors duration-300 group-focus-within:text-fg-inverse motion-reduce:transition-none">
              We do our best to respond within 1&ndash;2 business days.
            </p>
          </div>
        </form>
      )}
    </GlassCard>
  );
};

export default ContactForm;
