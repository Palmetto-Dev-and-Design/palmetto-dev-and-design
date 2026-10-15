import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Palmetto Dev and Design',
  description: 'Privacy Policy for palmettodd.com',
};

const CONTACT_EMAIL = 'hello@palmettodd.com';

const link = 'underline underline-offset-2 hover:text-fg-brand';

const PrivacyPolicyPage = () => (
  <article className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-16 lg:py-24 [&_h2]:mt-6 [&_h2]:heading-3-mobile [&_p]:paragraph-body [&_p]:text-fg [&_strong]:paragraph-body-semibold">
    <h1 className="heading-2-desktop uppercase">Privacy Policy</h1>
    <p className="text-fg-muted">Last updated: October 15, 2026</p>

    <h2>Overview</h2>
    <p>
      Palmetto Dev and Design (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
      &ldquo;our&rdquo;) operates palmettodd.com (the &ldquo;Site&rdquo;). We
      collect very little personal information. We do not sell your data or use
      tracking or advertising cookies.
    </p>
    <p>
      This policy explains what limited information we receive when you use the
      Site, mainly through our contact form, and how we handle it. By using the
      Site, you agree to this policy.
    </p>

    <h2>Information we collect</h2>
    <p>
      <strong>Information you give us.</strong> When you submit our contact
      form, we receive the details you enter, such as your name, phone number,
      email address, company, and message. Please don&apos;t include sensitive
      information (like financial or health details) in the form.
    </p>
    <p>
      <strong>Information collected automatically.</strong> We do not use
      analytics, tracking pixels, or advertising cookies. Like most websites,
      our hosting provider may automatically record basic technical data, such
      as your IP address, browser type, and the pages you request, in server
      logs used for security and site operation.
    </p>

    <h2>How we use and share your information</h2>
    <p>
      We use contact form submissions only to read and respond to your inquiry.
      We do not sell, rent, or trade your personal information, and we do not
      use it for marketing unless you ask us to.
    </p>
    <p>
      <strong>Service providers.</strong> Our contact form is delivered by{' '}
      <a
        href="https://resend.com"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        Resend
      </a>
      , an email delivery service. When you submit the form, Resend processes
      your submission to send it to our inbox, and may keep delivery logs for a
      limited time under{' '}
      <a
        href="https://resend.com/legal/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        its own privacy policy
      </a>
      . Our website is hosted by Vercel, which may also process server log data
      as described above.
    </p>
    <p>
      <strong>Legal reasons.</strong> We may disclose information if required by
      law, or to protect our rights, our users, or the public.
    </p>

    <h2>Data retention</h2>
    <p>
      Submissions arrive as emails in our inbox, and we keep them only as long
      as needed to respond and for ordinary business records. You can ask us to
      delete your messages at any time.
    </p>

    <h2>Cookies</h2>
    <p>
      We do not use tracking, analytics, or advertising cookies. If the Site
      uses any cookies, they are strictly necessary for it to function.
    </p>

    <h2>Security</h2>
    <p>
      We use reasonable measures, including encrypted (HTTPS) connections, to
      protect information sent through the Site. No method of transmission over
      the internet is completely secure, so we cannot guarantee absolute
      security.
    </p>

    <h2>Your rights</h2>
    <p>
      Depending on where you live, you may have the right to access, correct, or
      delete the personal information we hold about you, or to object to how we
      use it. To make a request, email us at{' '}
      <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
        {CONTACT_EMAIL}
      </a>
      . We will respond within a reasonable time and as required by applicable
      law.
    </p>

    <h2>Children&apos;s privacy</h2>
    <p>
      The Site is not directed to children under 13, and we do not knowingly
      collect personal information from them. If you believe a child has sent us
      information, contact us and we will delete it.
    </p>

    <h2>Changes to this policy</h2>
    <p>
      We may update this policy from time to time. Changes take effect when
      posted on this page, and the &ldquo;Last updated&rdquo; date above will
      change.
    </p>

    <h2>Contact us</h2>
    <p>Questions about this policy can be sent to:</p>
    <address className="paragraph-body not-italic">
      Palmetto Dev and Design
      <br />
      <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
        {CONTACT_EMAIL}
      </a>
    </address>
  </article>
);

export default PrivacyPolicyPage;
