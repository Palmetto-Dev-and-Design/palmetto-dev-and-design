'use client';

import { useGSAP } from '@gsap/react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import Button from '../primitives/Button';
import SlideRings from './SlideRings';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Scroll distance, in px, for each second of the timeline
const SCROLL_PER_SECOND = 600;
// The circle's resting top edge and diameter, as shares of the stage height
const CIRCLE_TOP = 0.06;
const CIRCLE_SIZE = 0.88;
// The circle's text grows from START, to SETTLED once the circle is in place,
// to full size once the circle has filled the stage
const CIRCLE_TEXT_START = { mobile: 0.4, desktop: 0.2 };
const CIRCLE_TEXT_SETTLED = { mobile: 0.7, desktop: 0.85 };
// On desktop the circle enters from the right at START scale and grows to
// SETTLED as it reaches the center
const CIRCLE_SCALE_START = 0.85;
const CIRCLE_SCALE_SETTLED = 1.8;
// Where the last panel's mobile circles start, in px from its left edge
const CIRCLES_START_LEFT = 40;
// How small the last panel's text starts before growing to full size
const LAST_TEXT_SCALE = 0.8;

/**
 * The stage pins on the "Why work with us?" title. Scrolling drops a light
 * panel down over it and fades in the panel's text, then an orange circle
 * comes in (up from the bottom on mobile, in from the right on desktop) over
 * the panel and swells to fill the stage while its own text grows in. Next, a
 * dark panel slides up over the orange while its rings slide in one by one
 * from the right. Finally a light panel slides in from the right. On mobile
 * its circles slide to the center as it comes in; once it's in, its text grows
 * in and its button rises from the bottom of the stage while the circles carry
 * on to the right. On desktop the circles ride in on the panel's left edge.
 */
const WhyWorkWithUs = () => {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stageEl = stage.current;
      if (!stageEl) return;

      const circles = stageEl.querySelector<HTMLElement>('[data-last-circles]');
      const cta = stageEl.querySelector<HTMLElement>('[data-last-cta]');
      // Horizontal room left beside the last panel's mobile circles
      const circlesSpare = () =>
        stageEl.clientWidth - (circles?.offsetWidth ?? 0);

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: '(min-width: 1024px)', mobile: '(max-width: 1023.98px)' },
        (ctx) => {
          const desktop = Boolean(ctx.conditions?.desktop);
          const size = desktop ? 'desktop' : 'mobile';

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stageEl,
              start: 'top top',
              end: () => `+=${tl.duration() * SCROLL_PER_SECOND}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            '[data-panel]',
            { yPercent: -100, autoAlpha: 1 },
            { yPercent: 0, ease: 'power2.inOut', duration: 1 },
          ).fromTo(
            '[data-panel-text] > *',
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              ease: 'power1.out',
              duration: 0.6,
              stagger: 0.2,
            },
          );

          if (desktop) {
            // Starts just off the stage's right edge
            tl.fromTo(
              '[data-circle]',
              {
                x: () =>
                  (stageEl.clientWidth + CIRCLE_SIZE * stageEl.clientHeight) /
                  2,
                scale: CIRCLE_SCALE_START,
                autoAlpha: 1,
              },
              { x: 0, ease: 'power2.out', duration: 1.4 },
              '+=0.4',
            ).to(
              '[data-circle]',
              { scale: CIRCLE_SCALE_SETTLED, ease: 'power1.in', duration: 1.4 },
              '<',
            );
          } else {
            // Starts with its top edge at the stage's bottom
            tl.fromTo(
              '[data-circle]',
              {
                yPercent: ((1 - CIRCLE_TOP) / CIRCLE_SIZE) * 100,
                autoAlpha: 1,
              },
              { yPercent: 0, ease: 'power2.out', duration: 1.4 },
              '+=0.4',
            );
          }

          tl.fromTo(
            '[data-circle-text]',
            { autoAlpha: 0, scale: CIRCLE_TEXT_START[size] },
            {
              autoAlpha: 1,
              scale: CIRCLE_TEXT_SETTLED[size],
              ease: 'power1.out',
              duration: 1,
            },
            '<0.4',
          )
            // Grows until it covers the stage's corners
            .to('[data-circle]', {
              scale: () => {
                const { clientWidth: w, clientHeight: h } = stageEl;
                const cover = Math.hypot(w, h) / (CIRCLE_SIZE * h);
                // Never shrinks from the size it settled at on desktop
                return desktop ? Math.max(cover, CIRCLE_SCALE_SETTLED) : cover;
              },
              ease: 'power2.in',
              duration: 1,
            })
            .to(
              '[data-circle-text]',
              { scale: 1, ease: 'power1.inOut', duration: 1 },
              '<',
            )
            .fromTo(
              '[data-dark-panel]',
              { yPercent: 100, autoAlpha: 1 },
              { yPercent: 0, ease: 'power2.inOut', duration: 1.2 },
              '+=0.4',
            )
            .fromTo(
              '[data-ring]',
              // Shifted a full viewBox width, so each ring starts off its
              // drawing's right edge
              {
                x: (_: number, ring: SVGPathElement) =>
                  ring.ownerSVGElement?.viewBox.baseVal.width ?? 0,
              },
              // Staggered so the last ring lands as the panel does
              {
                x: 0,
                ease: 'power2.out',
                duration: 0.8,
                stagger: { amount: 0.4 },
              },
              '<',
            )
            .fromTo(
              '[data-last-panel]',
              { xPercent: 100, autoAlpha: 1 },
              { xPercent: 0, ease: 'power2.inOut', duration: 1.2 },
              '+=0.4',
            );

          if (!desktop) {
            // The circles rest flush right, so x is their offset from there
            tl.fromTo(
              '[data-last-circles]',
              { x: () => CIRCLES_START_LEFT - circlesSpare() },
              {
                x: () => -circlesSpare() / 2,
                ease: 'power1.inOut',
                duration: 1.2,
              },
              '<',
            );
          }

          tl.addLabel('lastIn')
            .fromTo(
              '[data-last-text]',
              { autoAlpha: 0, scale: LAST_TEXT_SCALE },
              { autoAlpha: 1, scale: 1, ease: 'power1.out', duration: 1 },
              'lastIn',
            )
            .fromTo(
              '[data-last-cta]',
              // Starts with its top edge at the stage's bottom
              { y: () => stageEl.clientHeight - (cta?.offsetTop ?? 0) },
              { y: 0, ease: 'power2.out', duration: 1 },
              'lastIn+=0.3',
            );

          if (!desktop) {
            tl.to(
              '[data-last-circles]',
              { x: 0, ease: 'power1.inOut', duration: 1.3 },
              'lastIn',
            );
          }
        },
      );
    },
    { scope: stage },
  );

  return (
    <section>
      <div
        ref={stage}
        className="relative flex h-svh items-center justify-center overflow-hidden bg-pri-500 text-center"
      >
        <h2 className="display-lg text-fg-inverse">
          Why Work
          <br />
          With Us?
        </h2>

        <div
          data-panel
          className="invisible absolute inset-0 flex items-center justify-center bg-bg-default px-6 lg:justify-start lg:px-20"
        >
          <div className="absolute left-0 top-[26%] hidden h-px w-[28%] bg-border lg:block" />
          <div data-panel-text className="max-w-[22rem] text-left lg:max-w-md">
            <h3 className="display-lg text-fg">We&rsquo;re honest</h3>
            <p className="paragraph-xl mt-8 text-fg-muted">
              We&rsquo;ll always recommend what we think your business actually
              needs &mdash; not extra features or services just for the sake of
              selling you more.
            </p>
          </div>
        </div>

        <div
          data-circle
          style={{
            top: `${CIRCLE_TOP * 100}%`,
            height: `${CIRCLE_SIZE * 100}%`,
          }}
          className="invisible absolute left-1/2 aspect-square -translate-x-1/2 rounded-full bg-pri-500"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <div
            data-circle-text
            className="invisible max-w-[22rem] text-left text-fg-inverse lg:max-w-[53rem]"
          >
            <h3 className="display-lg">
              We&rsquo;re
              <br className="lg:hidden" /> invested in
              <br className="lg:hidden" /> your
              <br className="lg:hidden" /> success
            </h3>
            <p className="paragraph-xl mt-8">
              We want you to be proud of what we create together &mdash; &amp;
              we want it to help your business succeed. We tailor our approach
              to your goals, customers &amp; what makes sense for your business.
            </p>
          </div>
        </div>

        <div
          data-dark-panel
          className="invisible absolute inset-0 flex items-center justify-center overflow-hidden bg-bg-inverse px-6 lg:justify-start lg:pl-[15%] lg:pr-20"
        >
          <SlideRings className="pointer-events-none absolute inset-x-0 top-[5%] h-[90%] w-full lg:hidden" />
          {/* The whole ring drawing, uncropped and kept in proportion */}
          <SlideRings
            viewBox="-150 -12 776 774"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute left-[4%] top-[2%] hidden aspect-square w-[88%] lg:block"
          />
          <div className="relative max-w-[22rem] text-left text-fg-inverse lg:max-w-[44rem]">
            <h3 className="display-lg">
              We do things
              <br className="lg:hidden" /> properly
            </h3>
            <p className="paragraph-xl mt-8">
              We thoroughly test every site, making sure it&rsquo;s responsive
              across screen sizes &amp; designed with accessibility in mind
              before it goes live.
            </p>
          </div>
        </div>

        <div
          data-last-panel
          className="invisible absolute inset-0 flex flex-col overflow-hidden bg-bg-default"
        >
          <Image
            data-last-circles
            src="/m-slide-5-circles.png"
            alt=""
            width={206}
            height={343}
            aria-hidden
            className="pointer-events-none h-[min(38%,calc(100%-26rem))] w-auto max-w-none shrink-0 self-end lg:hidden"
          />
          <Image
            src="/d-slide-5-circles.png"
            alt=""
            width={772}
            height={1182}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 hidden h-[80%] w-auto max-w-none lg:block"
          />
          {/* Not positioned, so the button's offsetTop is measured from the panel */}
          <div className="flex flex-1 items-center justify-center px-6 pb-10 lg:justify-start lg:pb-0 lg:pl-[38%] lg:pr-20">
            <div className="max-w-[22rem] text-left text-fg lg:max-w-[44rem]">
              <div data-last-text>
                <h3 className="display-lg">
                  We stick
                  <br className="lg:hidden" /> around
                </h3>
                <p className="paragraph-xl mt-8">
                  Launching your website isn&rsquo;t the end. We&rsquo;ll check
                  in, answer questions &amp; be here when your business or
                  website needs something new.
                </p>
              </div>
              <Button
                data-last-cta
                variant="charcoal"
                size="sm"
                iconR={<ArrowUpRightIcon />}
                className="mt-8"
              >
                Get a free quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
