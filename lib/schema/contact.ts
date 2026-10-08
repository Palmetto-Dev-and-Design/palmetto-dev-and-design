import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { contactSubmissions } from '@/db/schema';

export const contactSchema = createInsertSchema(contactSubmissions, {
  name: (s) => s.trim().min(1, 'Please enter your name').max(100),
  email: () => z.email('Please enter a valid email'),
  phone: (s) =>
    s.trim().regex(/^[\d\s()+.-]{7,20}$/, 'Please enter a valid phone number'),
  company: (s) => s.trim().min(1, 'Please enter your company name').max(100),
  currentWebsite: () =>
    z.url('Please enter a valid URL').max(500).optional().or(z.literal('')),
  message: (s) => s.trim().min(10, 'Message is too short').max(5000),
})
  .pick({
    name: true,
    email: true,
    phone: true,
    company: true,
    currentWebsite: true,
    message: true,
  })
  .extend({
    hp_field: z.string().max(0).optional(),
    turnstileToken: z.string().min(1, 'Please complete the verification'),
  });
