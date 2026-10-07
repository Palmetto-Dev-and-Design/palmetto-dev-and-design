'use client';

import { useGSAP } from '@gsap/react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import type { Service } from '@/lib/services';
import { servicesIntro } from '@/lib/services';
import Button from '../primitives/Button';
import GlassCard from '../primitives/GlassCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// public/service-ellipse.svg: circle radius and its center inside the 840x811 svg
const ARC_RADIUS = 593;
const ARC_CENTER = { x: 246.5, y: 425.5 };
// Where the arc's rightmost point sits, as a share of the stage width
const APEX_X = 0.583;
// Distance in px from the center card to the cards above and below it
const SIDE_OFFSET = 280;
// Scale of the cards one step away from the center; the center card is 1
const SIDE_SCALE = 0.83;
const MIN_SCALE = 0.5;
// Scroll distance, in px, for the cards to travel one step along the arc
const SCROLL_PER_STEP = 500;

/**
 * Desktop/tablet services. The stage pins while scrolling, and the cards ride
 * the arc counterclockwise: each grows as it nears the center and shrinks as
 * it leaves. Once the last card is centered the pin releases and the page
 * scrolls on with that card left in the middle.
 */
const ServicesArc = ({
  services,
  className,
}: {
  services: Service[];
  className?: string;
}) => {
  const stage = useRef<HTMLDivElement>(null);
  const arc = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const stageEl = stage.current;
      const arcEl = arc.current;
      if (!stageEl || !arcEl) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const items = gsap.utils.toArray<HTMLElement>(
          '[data-arc-item]',
          stageEl,
        );
        gsap.set(items, { transformOrigin: '0 0' });

        // progress: card i is centered when progress === i. It starts at -1 so
        // the first card begins low on the arc and climbs in.
        const state = { progress: -1 };
        let width = 0;
        let height = 0;
        let sizes: { w: number; h: number }[] = [];

        const render = () => {
          // GSAP can fire onUpdate before the first measure() has run
          if (sizes.length !== items.length) return;
          const cx = width * APEX_X - ARC_RADIUS;
          const cy = height / 2;
          const step = Math.asin(
            Math.min(SIDE_OFFSET, height * 0.345) / ARC_RADIUS,
          );
          gsap.set(arcEl, { x: cx - ARC_CENTER.x, y: cy - ARC_CENTER.y });

          items.forEach((item, i) => {
            // angle above (+) or below (-) the arc's middle
            const theta = step * (state.progress - i);
            const scale = Math.max(
              MIN_SCALE,
              1 - (1 - SIDE_SCALE) * (Math.abs(theta) / step),
            );
            // the arc crosses small cards further along their width
            const anchor = Math.min(0.6, 0.3 + (1 - scale) * 0.9);
            const { w, h } = sizes[i];
            gsap.set(item, {
              x: cx + ARC_RADIUS * Math.cos(theta) - scale * anchor * w,
              y: cy - ARC_RADIUS * Math.sin(theta) - (scale * h) / 2,
              scale,
            });
          });
        };

        const measure = () => {
          width = stageEl.clientWidth;
          height = stageEl.clientHeight;
          sizes = items.map((item) => {
            const card = item.firstElementChild as HTMLElement;
            return { w: card.offsetWidth, h: card.offsetHeight };
          });
          render();
        };

        measure();

        gsap.to(state, {
          progress: services.length - 1,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: `+=${services.length * SCROLL_PER_STEP}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        const observer = new ResizeObserver(measure);
        observer.observe(stageEl);
        return () => observer.disconnect();
      });
    },
    { scope: stage, dependencies: [services] },
  );

  return (
    <div className={className}>
      <div ref={stage} className="relative h-screen min-h-160 overflow-hidden">
        <Image
          ref={arc}
          src="/service-ellipse.svg"
          alt=""
          width={840}
          height={811}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 max-w-none"
        />

        {/* Narrow on tablet so the cards climbing the arc never cross it */}
        <div className="absolute left-[clamp(1.5rem,7vw,6.25rem)] top-1/2 max-w-[11.5rem] -translate-y-1/2 lg:max-w-[22rem]">
          <h2 className="display-lg lg:text-64 lg:leading-none">Services</h2>
          <p className="paragraph-sm mt-4 lg:paragraph-body lg:mt-6">
            {servicesIntro}
          </p>
        </div>

        {services.map(({ title, body, link }) => (
          <div key={title} data-arc-item className="absolute left-0 top-0">
            <GlassCard className="flex w-[clamp(21rem,44vw,39.75rem)] flex-col gap-3 lg:flex-row lg:gap-8">
              <h3 className="heading-2-mobile text-pri-600 lg:w-40 lg:shrink-0">
                {title}
              </h3>
              <p className="paragraph-sm">{body}</p>
            </GlassCard>
            <Button
              href={link}
              iconOnly
              aria-label={`${title} services`}
              className="absolute left-full top-0 ml-5 size-8"
            >
              <ArrowUpRightIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesArc;
