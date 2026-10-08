import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Button from '../primitives/Button';

/**
 * The closing call to action. The circle artwork carries the button: it sits
 * over the middle of the circle, so it's placed by the image's own proportions.
 */
const Cta = () => (
  <section className="overflow-hidden bg-bg-subtle md:py-[50px] md:flex md:items-center md:justify-between md:gap-10 md:pl-10 lg:pl-20">
    <div className="px-6 pt-16 md:flex-1 md:px-0 md:py-16">
      <h2 className="heading-display-desktop max-md:text-[min(4rem,12.5vw)]! md:heading-2-desktop-uppercase md:max-w-sm">
        Ready for more bookings?
      </h2>
      <p className="paragraph-lg-semibold mt-8 text-fg-muted md:max-w-md">
        Get a site that brings in real customers while you focus on the work you
        do best.
      </p>
    </div>

    <div className="relative mt-8 md:mt-0 md:w-[45%] md:max-w-[622px] md:shrink-0">
      <Image
        src="/m-cta-home.png"
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
      <Button
        href="/contact"
        variant="charcoal"
        size="cta"
        iconR={<ArrowUpRightIcon />}
        className="absolute left-[48.7%] top-[60%] -translate-x-1/2 -translate-y-1/2 md:left-[42%] md:top-[56%] md:min-h-11 md:px-4 md:text-base md:[&>svg]:size-5"
      >
        Start a project
      </Button>
    </div>
  </section>
);

export default Cta;
