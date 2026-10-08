import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  company: text('company').notNull(),
  currentWebsite: text('current_website'),
  message: text('message').notNull(),
  emailSent: boolean('email_sent').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
