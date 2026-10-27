'use client';

import { useSyncExternalStore } from 'react';
import { Vaso, type VasoProps } from 'vaso';
import { cn } from '@/lib/utils';

type GlassCardProps = VasoProps;

// Vaso refracts with an SVG filter in backdrop-filter, which only Chromium
// renders. Everywhere else it clones the DOM behind each card and re-aligns it
// every frame, which crashes mobile Safari. Those browsers (and touch devices)
// get a plain blurred card instead.
const subscribe = () => () => {};
const canRefract = () => {
  const ua = navigator.userAgent;
  const isChromium =
    /Chrome\/|Chromium\/|Edg\//.test(ua) &&
    !/Firefox\/|FxiOS|CriOS|EdgiOS/.test(ua);
  return (
    isChromium &&
    CSS.supports('backdrop-filter', 'url(#a)') &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
};

/**
 * Refracting glass container built on Vaso. Whatever sits behind the card (a
 * line, an image) is bent at its edges, with no tint. Radius follows the
 * `rounded-*` class, padding is p-6 by default; override both via className.
 * See https://github.com/huozhi/vaso for depth/blur/dispersion/specular.
 */
const GlassCard = ({
  className,
  children,
  depth = 2.5,
  blur = 1,
  dispersion = 0.8,
  specular = 0.9,
  ...props
}: GlassCardProps) => {
  // The server and first client render use the fallback, so hydration matches
  const refract = useSyncExternalStore(subscribe, canRefract, () => false);
  const classes = cn(
    'relative rounded-3xl p-6',
    'shadow-[0_8px_30px_rgba(46,34,28,0.08)]',
    className,
  );

  if (!refract) {
    return (
      <div
        className={cn(
          classes,
          'border border-white/25 bg-white/10 backdrop-blur-md',
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <Vaso
      className={classes}
      depth={depth}
      blur={blur}
      dispersion={dispersion}
      specular={specular}
      {...props}
    >
      {/* Vaso's glass layer is absolute, so it paints over in-flow content and
        refracts it. Positioning the content puts it above the glass. */}
      <div className="relative">{children}</div>
    </Vaso>
  );
};

export default GlassCard;
