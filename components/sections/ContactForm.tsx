'use client';

import { AtIcon, BriefcaseIcon, PhoneIcon } from '@phosphor-icons/react/ssr';
import type { ReactNode } from 'react';
import Button from '../primitives/Button';
import GlassCard from '../primitives/GlassCard';

const field =
  'w-full rounded-lg bg-bg-default px-3 py-2.5 paragraph-body text-fg caret-fg shadow-[1px_1px_1.5px_0px_#2D2D2D73_inset] placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg';

type FieldProps = {
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  icon?: ReactNode;
  required?: boolean;
};

const Field = ({ icon, placeholder, ...props }: FieldProps) => (
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
      {...props}
    />
  </label>
);

/**
 * The contact form, on a glass card that darkens and swells slightly while
 * the form is being filled in. It isn't wired to a backend yet, so
 * submitting only stops the page from reloading.
 */
const ContactForm = () => (
  <GlassCard
    dispersion={0}
    className="group w-full max-w-[501px] p-6 transition-[transform,background-color] duration-300 ease-out focus-within:scale-[1.03] focus-within:bg-[#2e140a]/55 motion-reduce:transition-none motion-reduce:focus-within:scale-100"
  >
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex max-w-[453px] flex-col gap-3"
    >
      <Field name="name" placeholder="Name" autoComplete="name" required />
      <Field
        name="phone"
        type="tel"
        placeholder="Phone"
        autoComplete="tel"
        icon={<PhoneIcon weight="fill" />}
      />
      <Field
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        icon={<AtIcon weight="fill" />}
        required
      />
      <Field
        name="company"
        placeholder="Company"
        autoComplete="organization"
        icon={<BriefcaseIcon weight="fill" />}
      />
      <Field
        name="website"
        type="url"
        placeholder="Current website (optional)"
        autoComplete="url"
      />
      <label className="block">
        <span className="sr-only">How can we help?</span>
        <textarea
          name="message"
          placeholder="How can we help?"
          rows={5}
          className={`${field} resize-none`}
          required
        />
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

export default ContactForm;
