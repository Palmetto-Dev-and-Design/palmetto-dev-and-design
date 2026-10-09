import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Button from '../primitives/Button';

/**
 * The closing call to action. The circle artwork carries the button: it sits
 * over the middle of the circle, so it's placed by the image's own proportions.
 */
const ResponseNote = ({ className }: { className: string }) => (
  <p className={className}>
    We do our best to respond within 1 business day.
  </p>
);

const Cta = () => (
  <section className="overflow-hidden bg-bg-subtle md:py-[50px] md:flex md:items-center md:justify-between md:gap-10 md:pl-10 lg:pl-20">
    <div className="px-6 pt-16 md:flex-1 md:px-0 md:py-16">
      <h2 className="heading-display-desktop max-md:text-[min(4rem,12.5vw)]! md:heading-2-desktop-uppercase md:max-w-sm">
        Ready to turn searches into jobs? Let’s build your site.
      </h2>
      <p className="paragraph-lg-semibold mt-8 text-fg-muted md:max-w-md">
        Let’s make your business the first choice in your area. We custom make
        websites that bring in more local leads & help you land more jobs – no
        tech headaches, just results.
      </p>
    </div>

    <div className="relative mt-8 md:mt-0 md:w-[45%] md:max-w-[622px] md:shrink-0">
      <Image
        src="/m-cta-circle.png"
        alt=""
        width={390}
        height={436}
        aria-hidden
        className="w-full md:hidden"
      />
      <Image
        src="/d-cta-home.png"
        alt=""
        width={622}
        height={600}
        aria-hidden
        className="hidden w-full md:block"
      />
      <div className="absolute left-[45%] top-[60%] flex w-[72%] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-5 md:left-[42%] md:top-[56%] md:w-[70%] md:gap-4">
        <Button
          href="/contact"
          variant="charcoal"
          iconR={<ArrowUpRightIcon />}
        >
          Let’s chat
        </Button>
        <ResponseNote className="hidden text-fg-inverse md:block md:text-base" />
      </div>
      <ResponseNote className="px-6 pt-6 pb-10 text-fg-muted md:hidden" />
    </div>
  </section>
);

export default Cta;
