'use client';

import { useGSAP } from '@gsap/react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { processSteps } from '@/lib/process';
import Button from '../primitives/Button';
import GlassCard from '../primitives/GlassCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Scroll distance, in px, for the cards to advance by one step
const SCROLL_PER_STEP = 450;
// Distance between neighbouring cards, as a share of the stage height
const STEP_GAP = 0.36;
// How far a card sits from the center before its text has fully faded, in steps
const FADE_RANGE = 1.1;
// How far before the card is clear of the stage and can be hidden, in steps
const HIDE_RANGE = 1.7;
// How much a card shrinks and tilts per step away from the center
const SCALE_PER_STEP = 0.14;
const TILT_PER_STEP = 28;

const stepNumber = (i: number) => String(i + 1).padStart(2, '0');

/**
 * The steps ride a wheel: each one comes up from the bottom, is clearest at the
 * center, then carries on out toward the top, shrinking, tilting and fading as
 * it leaves. The stage pins while the wheel turns, and the last step stays at
 * the center when it lets go. A dark frame over the stage's bottom keeps the
 * button readable over the cards passing beneath it.
 */
const ProcessCards = () => {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stageEl = stage.current;
      if (!stageEl) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-step]', stageEl);

      // position is how many steps the wheel has turned. Card i is at the
      // center when position equals i, and one step below it at i - 1.
      const render = (position: number) => {
        const gap = STEP_GAP * stageEl.clientHeight;
        cards.forEach((card, i) => {
          const offset = i - position;
          const away = Math.abs(offset);
          const alpha = Math.max(0, 1 - away / FADE_RANGE);
          gsap.set(card, {
            y: offset * gap,
            yPercent: -50,
            scale: Math.max(0, 1 - SCALE_PER_STEP * away),
            rotationX: -offset * TILT_PER_STEP,
            // The glass is never faded: opacity on the card would stop its
            // liquid glass seeing the artwork behind. Only the text fades.
            visibility: away < HIDE_RANGE ? 'visible' : 'hidden',
            transformPerspective: 900,
          });
          gsap.set(card.querySelector('[data-text]'), { opacity: alpha });
        });
      };

      const wheel = { position: 0 };
      render(wheel.position);
      gsap.to(wheel, {
        position: cards.length - 1,
        ease: 'none',
        onUpdate: () => render(wheel.position),
        scrollTrigger: {
          trigger: stageEl,
          start: 'top top',
          end: () => `+=${(cards.length - 1) * SCROLL_PER_STEP}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: stage },
  );

  return (
    <div
      ref={stage}
      className="relative h-svh overflow-hidden bg-mono-950 text-fg-inverse"
    >
      {/* Behind the card at the center */}
      <Image
        src="/steps.png"
        alt=""
        width={706}
        height={471}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[115%] max-w-xl -translate-x-1/2 -translate-y-1/2 lg:w-[50%] lg:max-w-3xl"
      />
      <ol className="absolute inset-y-0 left-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 lg:max-w-[764px]">
        {processSteps.map(({ title, body }, i) => (
          <li
            key={title}
            data-step
            className="invisible absolute inset-x-0 top-1/2"
          >
            <GlassCard
              className="w-full p-5"
              depth={5}
              blur={1.5}
              dispersion={1.2}
            >
              <div data-text>
                <div className="lg:flex lg:items-start lg:gap-8">
                  <div className="flex items-start gap-6 lg:w-56 lg:shrink-0">
                    <span className="display-lg text-sec-100">
                      {stepNumber(i)}
                    </span>
                    {/* mt lowers the title's cap height to the number's: the number's taller line box puts its caps 3.7px lower */}
                    <h3 className="heading-4-mobile uppercase text-sec-100 mt-[3.7px]">
                      {title}
                    </h3>
                  </div>
                  <p className="paragraph-body lg:paragraph-lg mt-6 text-fg-inverse lg:mt-0 lg:max-w-[516px]">
                    {body}
                  </p>
                </div>
              </div>
            </GlassCard>
          </li>
        ))}
      </ol>
      {/* The frame over the cards: darkens toward the bottom behind the button */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-56 items-end justify-center bg-linear-to-t from-mono-950 from-40% via-mono-950/80 to-transparent pb-10 lg:justify-end lg:px-[8%]">
        <Button
          href="#services"
          variant="outline"
          onDark
          size="sm"
          iconR={<ArrowUpRightIcon />}
          className="pointer-events-auto"
        >
          Our services
        </Button>
      </div>
    </div>
  );
};

export default ProcessCards;
