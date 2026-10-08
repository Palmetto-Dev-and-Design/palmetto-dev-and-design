import { zValidator } from '@hono/zod-validator';
import { and, count, eq, gte } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';
import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { getResend } from '@/lib/email';
import { contactSchema } from '@/lib/schema/contact';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_EMAIL = 3;
const MAX_TOTAL = 30;

export const contact = new Hono().post(
  '/',
  zValidator('json', contactSchema, (result, c) => {
    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors;
      if (errors.hp_field) return c.json({ ok: true });
      return c.json({ ok: false, errors }, 400);
    }
  }),
  async (c) => {
    const {
      name,
      phone,
      email,
      company,
      currentWebsite,
      message,
      turnstileToken,
    } = c.req.valid('json');

    const verify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY ?? '',
          response: turnstileToken,
          remoteip: c.req.header('x-forwarded-for')?.split(',')[0] ?? '',
        }),
      },
    )
      .then((r) => r.json() as Promise<{ success: boolean }>)
      .catch(() => ({ success: false }));
    if (!verify.success) {
      return c.json(
        {
          ok: false,
          errors: { turnstileToken: ['Verification failed, please retry'] },
        },
        400,
      );
    }

    // Rate limit using the saved submissions: per email, plus a global cap
    // as a backstop against someone rotating addresses.
    try {
      const since = new Date(Date.now() - WINDOW_MS);
      const [[mine], [all]] = await Promise.all([
        db
          .select({ n: count() })
          .from(contactSubmissions)
          .where(
            and(
              eq(contactSubmissions.email, email),
              gte(contactSubmissions.createdAt, since),
            ),
          ),
        db
          .select({ n: count() })
          .from(contactSubmissions)
          .where(gte(contactSubmissions.createdAt, since)),
      ]);
      if (mine.n >= MAX_PER_EMAIL || all.n >= MAX_TOTAL) {
        return c.json({ ok: false, message: 'Too many submissions.' }, 429);
      }
    } catch (err) {
      console.error('Contact rate limit check failed', err);
    }

    let id: number;
    try {
      const [submission] = await db
        .insert(contactSubmissions)
        .values({
          name,
          phone,
          email,
          company,
          currentWebsite: currentWebsite || null,
          message,
        })
        .returning({ id: contactSubmissions.id });
      id = submission.id;
    } catch (err) {
      console.error('Contact insert failed', err);
      return c.json({ ok: false, message: 'Something went wrong.' }, 500);
    }

    // The lead is saved; a failed email shouldn't fail the request.
    let emailSent = false;
    try {
      const from = process.env.CONTACT_FROM_EMAIL;
      const to = process.env.CONTACT_TO_EMAIL;
      if (!from || !to) throw new Error('CONTACT_FROM_EMAIL/TO_EMAIL not set');
      const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');
      const { error } = await getResend().emails.send({
        from: `Palmetto Dev & Design <${from}>`,
        to,
        replyTo: email,
        subject: `New inquiry from ${oneLine(name)} (${oneLine(company)})`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Website: ${currentWebsite || '-'}`,
          '',
          message,
        ].join('\n'),
      });
      if (error) throw new Error(error.message);
      emailSent = true;
    } catch (err) {
      console.error('Contact email failed', err);
    }

    if (emailSent) {
      await db
        .update(contactSubmissions)
        .set({ emailSent })
        .where(eq(contactSubmissions.id, id))
        .catch((err) => console.error('Contact update failed', err));
    }

    return c.json({ ok: true });
  },
);
