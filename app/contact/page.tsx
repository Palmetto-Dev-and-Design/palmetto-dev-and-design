import {
  ArrowUpRightIcon,
  AtIcon,
  MapPinIcon,
} from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Button from '@/components/primitives/Button';
import ContactForm from '@/components/sections/ContactForm';

const details = [
  {
    icon: AtIcon,
    label: 'hello@palmettodd.com',
    href: 'mailto:hello@palmettodd.com',
  },
  { icon: MapPinIcon, label: 'Charleston, SC / Portland, OR' },
];

const ContactPage = () => (
  <section className="relative flex-1 overflow-hidden bg-pri-500 text-fg-inverse">
    {/* The artwork bleeds off its own left and bottom edges, so it sits flush
        in the corner, behind the form's glass */}
    <Image
      src="/contact-circles.png"
      alt=""
      width={654}
      height={572}
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 h-auto w-[min(85%,654px)]"
    />

    <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,501px)_1fr] lg:gap-32 lg:py-24">
      <div className="mx-auto flex w-full max-w-[501px] flex-col gap-6 lg:order-2 lg:mx-0 lg:max-w-none">
        <h1 className="heading-2-desktop uppercase">Get in touch</h1>
        <p className="paragraph-lg max-w-sm">
          Have a project in mind, or just know your current site needs work?
          Tell us a little about your business &amp; what you&rsquo;re looking
          for. We&rsquo;ll help you figure out the next step.
        </p>
        <ul className="flex flex-col gap-3">
          {details.map(({ icon: Icon, label, href }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.08em]"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-fg-inverse text-pri-500">
                <Icon weight="bold" size={14} />
              </span>
              {href ? <a href={href}>{label}</a> : label}
            </li>
          ))}
        </ul>
        <Button
          href="https://calendar.app.google/unvqgnjTRrZkptZz7"
          variant="secondary"
          size="sm"
          iconR={<ArrowUpRightIcon />}
          className="self-start lg:mt-6"
        >
          Schedule a discovery call
        </Button>
      </div>
      <div className="mx-auto w-full max-w-[501px] lg:order-1 lg:mx-0">
        <ContactForm />
      </div>
    </div>
  </section>
);

export default ContactPage;
