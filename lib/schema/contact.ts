import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(100),
  email: z.email('Please enter a valid email'),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()+.-]{7,20}$/, 'Please enter a valid phone number'),
  company: z.string().trim().min(1, 'Please enter your company name').max(100),
  currentWebsite: z
    .url('Please enter a valid URL')
    .max(500)
    .optional()
    .or(z.literal('')),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  consent: z.literal(true, 'Please agree to the Privacy Policy to continue'),
  hp_field: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, 'Please complete the verification'),
});
