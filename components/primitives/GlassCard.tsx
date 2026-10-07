'use client';

import { Vaso, type VasoProps } from 'vaso';
import { cn } from '@/lib/utils';

type GlassCardProps = VasoProps;

/**
 * Refracting glass container built on Vaso. Whatever sits behind the card (a
 * line, an image) is bent at its edges, with no tint. Radius follows the
 * `rounded-*` class, padding is p-6 by default; override both via className.
 * See https://github.com/huozhi/vaso for depth/blur/dispersion/specular.
 */
const GlassCard = ({
  className,
  children,
  depth = 1.5,
  blur = 0.1,
  dispersion = false,
  specular = 0.8,
  ...props
}: GlassCardProps) => (
  <Vaso
    className={cn(
      'relative rounded-3xl p-6',
      'shadow-[0_8px_30px_rgba(46,34,28,0.08)]',
      className,
    )}
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

export default GlassCard;
