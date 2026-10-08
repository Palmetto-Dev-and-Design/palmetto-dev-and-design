import { Resend } from 'resend';

let client: Resend | undefined;

/** Created on first use so a missing key can't break the build. */
export const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is missing');
  client ??= new Resend(key);
  return client;
};
