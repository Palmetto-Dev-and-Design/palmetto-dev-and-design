import { Hono } from 'hono';
import { contact } from './routes/contact';

export const app = new Hono().basePath('/api').route('/contact', contact);

export type AppType = typeof app;
