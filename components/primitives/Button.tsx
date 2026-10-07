import Link from 'next/link';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'charcoal' | 'outline' | 'ghost';
type Size = 'xs' | 'sm' | 'md' | 'cta';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Outline variant on a dark background */
  onDark?: boolean;
  /** Square, icon-only button. Pass the icon as children. */
  iconOnly?: boolean;
  iconL?: ReactNode;
  iconR?: ReactNode;
  children?: ReactNode;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
    /** Internal paths use next/link; http(s), mailto: and tel: open as external links */
    href: string;
    disabled?: boolean;
  };

type ButtonProps = AsButton | AsLink;

const isExternal = (href: string) =>
  /^(https?:)?\/\/|^(mailto|tel):/.test(href);

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-sora font-semibold uppercase whitespace-nowrap cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-70 aria-disabled:pointer-events-none aria-disabled:opacity-70';

const sizes: Record<Size, { text: string; box: string; icon: string }> = {
  xs: { text: 'text-sm px-4 min-h-11', box: 'size-11', icon: '[&>svg]:size-4' },
  sm: {
    text: 'text-base px-4 min-h-11',
    box: 'size-11',
    icon: '[&>svg]:size-5',
  },
  md: { text: 'text-lg px-5 min-h-13', box: 'size-13', icon: '[&>svg]:size-5' },
  cta: {
    text: 'text-xl px-5 min-h-[62px]',
    box: 'size-[62px]',
    icon: '[&>svg]:size-6',
  },
};

const variants: Record<Variant, string> = {
  primary:
    'bg-action-pri text-action-fg hover:shadow-[inset_1px_1px_2px_0_rgba(45,45,45,0.46)] active:bg-pri-700 active:shadow-[inset_1px_1px_2px_0_rgba(45,45,45,0.46)]',
  secondary:
    'bg-secondary text-fg hover:shadow-[inset_1px_1px_1.5px_0_rgba(45,45,45,0.45)] active:shadow-[inset_1px_1px_1.5px_0_rgba(45,45,45,0.45)]',
  charcoal:
    'bg-bg-inverse text-action-fg hover:bg-mono-900 hover:shadow-[inset_1.5px_1.5px_2.2px_0_var(--color-bg-inverse)] active:shadow-none',
  outline:
    'border border-mono-900 text-fg hover:bg-mono-alpha-15 hover:shadow-[inset_1.5px_1.5px_2.2px_0_var(--color-bg-inverse)] active:bg-mono-alpha-25 active:shadow-[inset_1.5px_1.5px_2.2px_0_var(--color-bg-inverse)]',
  ghost: 'text-fg hover:bg-bg-subtle active:bg-bg-muted',
};

const outlineOnDark =
  'border border-fg-inverse text-fg-inverse hover:bg-fg-inverse/10 active:bg-fg-inverse/20';

const Button = ({
  variant = 'primary',
  size = 'md',
  onDark = false,
  iconOnly = false,
  iconL,
  iconR,
  className,
  children,
  ...props
}: ButtonProps) => {
  const s = sizes[size];
  const look =
    variant === 'outline' && onDark ? outlineOnDark : variants[variant];
  const layout = iconOnly ? `${s.box} ${s.icon}` : s.text;

  const classes = cn(base, look, layout, className);
  const content = (
    <>
      {!iconOnly && iconL}
      {children}
      {!iconOnly && iconR}
    </>
  );

  if (props.href === undefined) {
    return (
      <button type="button" className={classes} {...props}>
        {content}
      </button>
    );
  }

  const { href, disabled, ...anchorProps } = props;
  const linkProps = {
    className: classes,
    'aria-disabled': disabled || undefined,
    tabIndex: disabled ? -1 : undefined,
    ...anchorProps,
  };

  if (isExternal(href)) {
    const newTab = href.startsWith('http') || href.startsWith('//');
    return (
      <a
        href={href}
        {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}
        {...linkProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} {...linkProps}>
      {content}
    </Link>
  );
};

export default Button;
