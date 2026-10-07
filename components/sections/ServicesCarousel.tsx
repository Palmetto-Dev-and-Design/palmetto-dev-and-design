'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import type { Service } from '@/lib/services';
import GlassCard from '../primitives/GlassCard';

// Radius of the circle drawn in public/m-service-ellipse.svg, and the x of its apex
const ARC_RADIUS = 396.5;
const ARC_APEX_X = 182;
const GAP = 24;
const MIN_SCALE = 0.7;

const ServicesCarousel = ({ services }: { services: Service[] }) => {
  const scroller = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const list = scroller.current;
      if (!list) return;
      const cards = Array.from(list.children) as HTMLElement[];

      // Each card is placed by how far its center is from the scroller's
      // center: it shrinks as it leaves, and drops along the arc's circle.
      const update = () => {
        // overflow-y is hidden, but a stale vertical offset would clip the cards' tops
        if (list.scrollTop) list.scrollTop = 0;
        const radius = ARC_RADIUS;
        const center = list.scrollLeft + list.clientWidth / 2;
        for (const card of cards) {
          const dx = card.offsetLeft + card.offsetWidth / 2 - center;
          const k = Math.min(1, Math.abs(dx) / (card.offsetWidth + GAP));
          const x = Math.min(Math.abs(dx), radius * 0.95);
          gsap.set(card, {
            y: radius - Math.sqrt(radius * radius - x * x),
            scale: 1 - (1 - MIN_SCALE) * k,
          });
        }
      };

      update();
      list.addEventListener('scroll', update, { passive: true });
      const observer = new ResizeObserver(update);
      observer.observe(list);
      return () => {
        list.removeEventListener('scroll', update);
        observer.disconnect();
      };
    },
    { scope: scroller },
  );

  return (
    <div className="relative mt-10 overflow-x-clip md:hidden">
      {/* The arc the cards ride. Its apex is lined up with the carousel's center */}
      <Image
        src="/m-service-ellipse.svg"
        alt=""
        width={390}
        height={315}
        aria-hidden
        style={{ marginLeft: -ARC_APEX_X }}
        className="pointer-events-none absolute left-1/2 top-24 max-w-none"
      />
      <ul
        ref={scroller}
        className="relative flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-hidden pt-10 px-[calc((100%-var(--card-w))/2)] pb-48 [--card-w:min(calc(100vw-5rem),22rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map(({ title, body }) => (
          <li key={title} className="flex w-(--card-w) shrink-0 snap-center">
            <GlassCard className="w-full">
              <h3 className="heading-2-mobile md:heading-2-desktop text-pri-600">
                {title}
              </h3>
              <p className="paragraph-body mt-6">{body}</p>
            </GlassCard>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesCarousel;
