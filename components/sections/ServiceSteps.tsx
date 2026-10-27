'use client';

import { useGSAP } from '@gsap/react';
import {
  ArrowUpRightIcon,
  BracketsCurlyIcon,
  PaintBrushIcon,
  RocketLaunchIcon,
  SwatchesIcon,
} from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { type ReactNode, useRef } from 'react';
import { quickScale } from '@/lib/gsap';
import type { HowItWorksStep } from '@/lib/services';
import Button from '../primitives/Button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const icons: Record<string, ReactNode> = {
  Branding: <SwatchesIcon />,
  Design: <PaintBrushIcon />,
  Development: <BracketsCurlyIcon />,
  Launch: <RocketLaunchIcon />,
};

// Scroll distance, in px, for the whole timeline
const SCROLL_DISTANCE = 1400;
// The steps follow a gentler curve inside the arc. Gap between neighbouring
// steps and the curve's radius are shares of the stage height; the left edge
// of the middle steps is a share of its width
const STEP_GAP = 0.182;
const STEP_RADIUS = 0.66;
const STEP_APEX_X = 0.11;
// How far below its resting place each step starts, in step gaps
const TRAVEL = 4;
// Mobile: how small and faint the steps on either side of the center get
const MIN_SCALE = 0.7;
const MIN_OPACITY = 0.25;

const stepNumber = (i: number) => `Step ${i + 1}`;

const Icon = ({ children }: { children: ReactNode }) => (
  <span className="flex size-20 shrink-0 items-center justify-center rounded-full border border-border-strong bg-linear-to-b from-surface to-bg-subtle text-fg shadow-[0_8px_24px_rgba(46,34,28,0.1)] [&>svg]:size-8">
    {children}
  </span>
);

/**
 * A numbered service block: the pitch on an orange panel beside "How it
 * works". On desktop the stage pins and the steps ride up a curve beside a
 * thin arc, fading in one after another until all four are in place. On
 * mobile the steps are a swipeable row; the one in the center is full size and
 * the rest shrink and fade, over an arc with a tick at its apex.
 */
const ServiceSteps = ({
  id,
  number,
  title,
  body,
  steps,
}: {
  id: string;
  number: string;
  title: string;
  body: string;
  steps: HowItWorksStep[];
}) => {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const sectionEl = section.current;
      const stageEl = stage.current;
      const list = scroller.current;
      if (!sectionEl || !stageEl || !list) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-step]', stageEl);
        const state = { progress: 0 };
        const ease = gsap.parseEase('power2.out');
        const setItems = items.map((item) => ({
          x: gsap.quickSetter(item, 'x', 'px'),
          y: gsap.quickSetter(item, 'y', 'px'),
          opacity: gsap.quickSetter(item, 'opacity'),
        }));
        let width = 0;
        let height = 0;

        const render = () => {
          if (!width) return;
          const gap = STEP_GAP * height;
          const radius = STEP_RADIUS * height;
          const n = items.length;
          items.forEach((item, i) => {
            // each step starts its climb a little after the one before it
            const own = gsap.utils.clamp(
              0,
              1,
              state.progress * (1 + 0.25 * (n - 1)) - i * 0.25,
            );
            const eased = ease(own);
            const slot = i - (n - 1) / 2 + (1 - eased) * TRAVEL;
            const dy = slot * gap;
            const bend = radius - Math.sqrt(Math.max(0, radius ** 2 - dy ** 2));
            const set = setItems[i];
            set.x(STEP_APEX_X * width + bend);
            set.y(height / 2 + dy - item.offsetHeight / 2);
            set.opacity(own);
          });
        };

        const measure = () => {
          width = stageEl.clientWidth;
          height = stageEl.clientHeight;
          render();
        };
        measure();

        gsap.to(state, {
          progress: 1,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: `+=${SCROLL_DISTANCE}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        const observer = new ResizeObserver(measure);
        observer.observe(stageEl);
        return () => {
          observer.disconnect();
          gsap.set(items, { clearProps: 'all' });
        };
      });

      mm.add('(max-width: 1023px)', () => {
        const cards = Array.from(list.children) as HTMLElement[];
        // Each step shrinks and fades by how far it is from the center
        const setCards = cards.map((card) => ({
          scale: quickScale(card),
          opacity: gsap.quickSetter(card, 'opacity'),
        }));
        const update = () => {
          const center = list.scrollLeft + list.clientWidth / 2;
          cards.forEach((card, i) => {
            const dx = card.offsetLeft + card.offsetWidth / 2 - center;
            const k = Math.min(1, Math.abs(dx) / card.offsetWidth);
            setCards[i].scale(1 - (1 - MIN_SCALE) * k);
            setCards[i].opacity(1 - (1 - MIN_OPACITY) * k);
          });
        };
        // Scroll events can outpace the display: apply once per frame
        let frame = 0;
        const onScroll = () => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            update();
          });
        };
        update();
        list.addEventListener('scroll', onScroll, { passive: true });
        const observer = new ResizeObserver(update);
        observer.observe(list);
        return () => {
          list.removeEventListener('scroll', onScroll);
          cancelAnimationFrame(frame);
          observer.disconnect();
          gsap.set(cards, { clearProps: 'all' });
        };
      });
    },
    { scope: section, dependencies: [steps] },
  );

  return (
    // The pinned section sits in a plain div: pinning a direct child of the
    // page's flex column loses its scroll spacing
    <div id={id}>
      <section
        ref={section}
        className="grid lg:h-svh lg:min-h-160 lg:grid-cols-2"
      >
        <div className="flex flex-col bg-pri-500 pb-16 text-fg-inverse lg:justify-between lg:pb-20">
          <div>
            <div className="relative pt-16 pl-[22%] lg:pt-[18%]">
              <span className="display-lg text-sec-300 block text-[4rem] leading-[0.75]">
                {number}
              </span>
              <div className="absolute bottom-0 left-0 h-px w-[calc(22%+4rem)] bg-sec-300/70" />
            </div>
            <div className="px-10 pt-10 lg:px-20 lg:pt-16">
              <h2 className="heading-1-mobile lg:heading-2-desktop">{title}</h2>
              <p className="paragraph-lg mt-8 max-w-md lg:paragraph-body lg:max-w-lg">
                {body}
              </p>
            </div>
          </div>
          <div className="px-10 pt-10 lg:px-20">
            <Button
              href="/contact"
              variant="secondary"
              size="sm"
              iconR={<ArrowUpRightIcon />}
            >
              Book a discovery call
            </Button>
          </div>
        </div>

        <div
          ref={stage}
          className="relative overflow-hidden bg-bg-default py-16 lg:py-0"
        >
          <h3 className="heading-3-mobile text-center uppercase lg:absolute lg:inset-x-0 lg:top-[10%]">
            How it works:
          </h3>

          {/* Desktop: the arc, and the steps climbing beside it */}
          <Image
            src="/d-services-arc.png"
            alt=""
            width={146}
            height={908}
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-0 hidden max-w-none -translate-y-1/2 lg:block"
          />

          <ol className="hidden lg:block">
            {steps.map(({ title: name, body: text }, i) => (
              <li
                key={name}
                data-step
                className="absolute top-0 left-0 flex w-[min(25rem,58%)] items-center gap-8 opacity-0"
              >
                <Icon>{icons[name]}</Icon>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="label-md uppercase tracking-[0.3em] text-fg lg:text-base">
                      {name}
                    </h4>
                    <span className="paragraph-xs-semibold uppercase tracking-[0.1em] text-fg-muted lg:paragraph-sm-semibold">
                      {stepNumber(i)}
                    </span>
                  </div>
                  <p className="paragraph-xs mt-2 text-fg-muted lg:paragraph-sm">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Mobile: a swipeable row over an arc */}
          <div className="relative mt-10 lg:hidden">
            <ul
              ref={scroller}
              className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {steps.map(({ title: name, body: text }, i) => (
                <li
                  key={name}
                  className="flex w-full shrink-0 snap-center flex-col items-center px-10 text-center"
                >
                  <Icon>{icons[name]}</Icon>
                  <p className="paragraph-xs-semibold mt-6 uppercase tracking-[0.1em] text-fg-muted">
                    {stepNumber(i)}
                  </p>
                  <h4 className="label-md mt-1 uppercase tracking-[0.3em] text-fg">
                    {name}
                  </h4>
                  <p className="paragraph-xs mt-3 max-w-xs text-fg-muted">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
            <div className="relative mt-12">
              <Image
                src="/m-services-arc.png"
                alt=""
                width={390}
                height={136}
                aria-hidden
                className="pointer-events-none block h-auto w-full"
              />
              <div
                aria-hidden
                className="absolute -top-2.5 left-1/2 h-5 w-0.5 -translate-x-1/2 bg-sec-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceSteps;
