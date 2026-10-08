'use client';

import { AtIcon, BriefcaseIcon, PhoneIcon } from '@phosphor-icons/react/ssr';
import { type ReactNode, type SubmitEvent, useState } from 'react';
import { z } from 'zod';
import {
  type ContactErrors,
  type ContactValues,
  contactSchema,
} from '@/lib/contact-schema';
import Button from '../primitives/Button';
import GlassCard from '../primitives/GlassCard';

const field =
  'w-full rounded-lg bg-bg-default px-3 py-2.5 paragraph-body text-fg caret-fg shadow-[1px_1px_1.5px_0px_#2D2D2D73_inset] placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg';

type FieldProps = {
  name: keyof ContactValues;
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
 * the form is being filled in. It isn't wired to a backend yet, so
 * submitting only stops the page from reloading.
 */
const ContactForm = () => {
  const [errors, setErrors] = useState<ContactErrors>({});

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]),
        ),
      );
      e.currentTarget
        .querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
      return;
    }
    setErrors({});
    // result.data is validated and trimmed; send it to the backend here.
  };

  return (
    <GlassCard
      dispersion={0}
      className="group w-full max-w-[501px] p-6 transition-[transform,background-color] duration-300 ease-out focus-within:scale-[1.03] focus-within:bg-[#2e140a]/55 motion-reduce:transition-none motion-reduce:focus-within:scale-100"
    >
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
        <Field
          name="website"
          type="text"
          placeholder="Current website (optional)"
          autoComplete="url"
          error={errors.website}
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
        <div className="mt-2 flex flex-col items-start gap-3">
          <Button type="submit" variant="charcoal" size="sm">
            Send message
          </Button>
          <p className="text-xs text-fg transition-colors duration-300 group-focus-within:text-fg-inverse motion-reduce:transition-none">
            We do our best to respond within 1&ndash;2 business days.
          </p>
        </div>
      </form>
    </GlassCard>
  );
};

export default ContactForm;
