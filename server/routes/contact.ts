import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { getResend } from '@/lib/email';
import { contactSchema } from '@/lib/schema/contact';

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
    } catch (err) {
      console.error('Contact email failed', err);
      return c.json({ ok: false, message: 'Something went wrong.' }, 500);
    }

    return c.json({ ok: true });
  },
);
