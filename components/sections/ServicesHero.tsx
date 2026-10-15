import Image from 'next/image';
import Button from '../primitives/Button';

const anchors = [
  { label: 'Web design', href: '#web-design' },
  { label: 'Website care', href: '#website-care' },
  { label: 'Add-ons', href: '#add-ons' },
  { label: 'FAQ', href: '#faq' },
];

/** Services page hero: heading, intro, and jump links to each section. */
const ServicesHero = () => (
  <section className="relative overflow-hidden bg-bg-default">
    <div className="relative z-10 mx-auto flex max-w-7xl flex-col text-center lg:text-left gap-8 px-6 pt-16 pb-0 lg:gap-6 lg:px-20 lg:pt-[136px] lg:pb-[200px]">
      <h1 className="display-md lg:display-lg mx-auto max-w-xl lg:mx-0">
        Websites for home service businesses
      </h1>
      <p className="paragraph-lg mx-auto max-w-md lg:paragraph-body lg:mx-0 lg:max-w-[520px]">
        We design &amp; build websites that help HVAC, plumbing, roofing,
        landscaping &amp; other home service companies look professional, earn
        trust &amp; turn more visitors into booked jobs.
      </p>
      <nav
        aria-label="Services sections"
        className="grid grid-cols-2 gap-3 lg:mt-2 lg:flex lg:flex-wrap"
      >
        {anchors.map(({ label, href }, i) => (
          <Button
            key={href}
            href={href}
            size="sm"
            className="lg:min-h-9 lg:text-sm"
            variant={i === 0 ? 'charcoal' : 'outline'}
          >
            {label}
          </Button>
        ))}
      </nav>
    </div>

    {/* Decorative artwork */}
    <Image
      src="/m-services-circles.png"
      alt=""
      width={390}
      height={408}
      aria-hidden
      className="pointer-events-none relative -mt-[24%] block h-auto w-full lg:hidden"
    />
    <Image
      src="/d-sercices-circles.png"
      alt=""
      width={655}
      height={738}
      aria-hidden
      className="pointer-events-none absolute top-[calc(50%-32px)] right-0 hidden h-auto w-[min(50%,655px)] -translate-y-1/2 lg:block"
    />
  </section>
);

export default ServicesHero;
