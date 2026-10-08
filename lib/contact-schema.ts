import { z } from 'zod';

const isUrl = (value: string) => {
  try {
    new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return value.includes('.');
  } catch {
    return false;
  }
};

/** Shared by the form and, later, whatever receives the submission. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === '' || /^[+()\d\s.-]{7,}$/.test(v), {
      message: 'Please enter a valid phone number.',
    }),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .pipe(z.email('Please enter a valid email address.')),
  company: z.string().trim().max(100),
  website: z
    .string()
    .trim()
    .max(200)
    .refine((v) => v === '' || isUrl(v), {
      message: 'Please enter a valid website address.',
    }),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a bit more (at least 10 characters).')
    .max(2000, 'Please keep your message under 2000 characters.'),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
