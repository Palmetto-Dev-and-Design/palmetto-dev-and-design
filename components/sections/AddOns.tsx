'use client';

import { useGSAP } from '@gsap/react';
import {
  ArrowRightIcon,
  ArrowsLeftRightIcon,
  ArrowUpRightIcon,
  ChartPieSliceIcon,
  FlowerIcon,
  HeadsetIcon,
  ShapesIcon,
  XIcon,
} from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import { type ReactNode, useRef, useState } from 'react';
import type { AddOnGroup } from '@/lib/services';
import Button from '../primitives/Button';

gsap.registerPlugin(useGSAP);

const icons: Record<string, ReactNode> = {
  'Delivery & process': <ArrowsLeftRightIcon weight="bold" />,
  Functionality: <FlowerIcon weight="fill" />,
  'Content & media': <ShapesIcon weight="fill" />,
  'Growth & technical': <ChartPieSliceIcon weight="fill" />,
  'Support & training': <HeadsetIcon weight="bold" />,
};

const Icon = ({ name }: { name: string }) => (
  <span className="flex shrink-0 text-pri-600 [&>svg]:size-6">
    {icons[name]}
  </span>
);

/**
 * The add-ons: an intro and a "not sure?" card beside a list of categories.
 * Picking a category swaps the list for that category's items, with buttons to
 * step to the next category (hidden on the last one) or close it.
 */
const AddOns = ({
  id,
  intro,
  groups,
}: {
  id: string;
  intro: string;
  groups: AddOnGroup[];
}) => {
  const [open, setOpen] = useState<number | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const group = open === null ? null : groups[open];

  // Whatever is showing eases in when the panel swaps between list and detail
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(
        '[data-fade]',
        panel.current,
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' },
      );
    },
    { scope: panel, dependencies: [open] },
  );

  // The "not sure?" card grows while a category is open
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { wide: '(min-width: 1024px)', narrow: '(max-width: 1023px)' },
        (context) => {
          const { wide } = context.conditions as { wide: boolean };
          gsap.to(card.current, {
            scale: open === null ? 1 : wide ? 1.08 : 1.03,
            duration: 0.5,
            ease: 'power3.out',
          });
        },
      );
    },
    { dependencies: [open] },
  );

  return (
    <section
      id={id}
      className="grid scroll-mt-4 overflow-x-clip lg:grid-cols-2"
    >
      <div className="bg-bg-subtle pt-16 pb-12 lg:pt-28 lg:pb-8">
        <div className="relative ml-[22%] w-fit lg:ml-20">
          <h2 className="display-lg block leading-[0.75] text-pri-600 lg:text-fg">
            Add-ons
          </h2>
          <div className="absolute right-0 bottom-0 h-px w-screen bg-pri-600 lg:bg-fg" />
        </div>
        <p className="paragraph-body mt-10 max-w-md px-6 lg:mt-16 lg:max-w-lg lg:px-0 lg:pl-20">
          {intro}
        </p>
      </div>

      <div
        ref={panel}
        className="bg-bg-default px-6 py-16 lg:row-span-2 lg:px-24 lg:py-32"
      >
        {group === null || open === null ? (
          <div>
            <p
              data-fade
              className="paragraph-xs uppercase tracking-[0.08em] text-fg-muted lg:paragraph-sm"
            >
              Click to learn more
            </p>
            <ul className="mt-4 flex flex-col gap-2 lg:mt-6 lg:gap-4">
              {groups.map(({ title }, i) => (
                <li key={title} data-fade>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="-mx-5 flex w-[calc(100%+1.25rem)] cursor-pointer items-center gap-5 rounded-2xl border border-transparent px-5 py-4 text-left transition-[background-color,box-shadow,border-color] duration-200 hover:border-mono-alpha-15 hover:bg-bg-subtle hover:shadow-[1px_1px_1.5px_0px_#2D2D2D73_inset] focus-visible:border-mono-alpha-15 focus-visible:bg-bg-subtle focus-visible:shadow-[1px_1px_1.5px_0px_#2D2D2D73_inset] focus-visible:outline-none motion-reduce:transition-none"
                  >
                    <Icon name={title} />
                    <span className="heading-3-mobile">{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <div className="flex justify-end gap-3">
              {open < groups.length - 1 && (
                <Button
                  variant="outline"
                  size="xs"
                  iconOnly
                  aria-label="Next add-on category"
                  className="size-8 min-h-0"
                  onClick={() => setOpen(open + 1)}
                >
                  <ArrowRightIcon />
                </Button>
              )}
              <Button
                variant="outline"
                size="xs"
                iconOnly
                aria-label="Close"
                className="size-8 min-h-0"
                onClick={() => setOpen(null)}
              >
                <XIcon />
              </Button>
            </div>
            <div data-fade className="mt-8 flex items-center gap-5">
              <Icon name={group.title} />
              <h3 className="heading-2-mobile">{group.title}</h3>
            </div>
            <ul className="paragraph-body mt-10 list-disc space-y-1 pl-12 text-fg-muted marker:text-fg-muted">
              {group.items.map((item) => (
                <li key={item} data-fade>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-bg-subtle px-6 pt-4 pb-20 lg:pt-0 lg:pr-16 lg:pb-28 lg:pl-20">
        <div
          ref={card}
          className="max-w-xl origin-left rounded-2xl lg:max-w-none border border-border-strong bg-bg-default p-6 shadow-[0_8px_30px_rgba(46,34,28,0.06)]"
        >
          <h3 className="heading-3-mobile uppercase text-sec-700">
            Not sure what you need?{' '}
            <span className="block lg:inline">We&rsquo;ll help.</span>
          </h3>
          <p className="paragraph-sm mt-6 text-fg lg:paragraph-body">
            You don&rsquo;t have to decide on add-ons now. We&rsquo;ll walk you
            through what makes sense for your business &amp; only recommend what
            will actually help.
          </p>
          <Button
            href="/contact"
            size="xs"
            iconR={<ArrowUpRightIcon />}
            className="mt-6 min-h-10"
          >
            Let&rsquo;s chat
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddOns;
