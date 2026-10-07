import type { Icon } from '@phosphor-icons/react';
import {
  EnvelopeSimpleIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const icons = {
  instagram: { Icon: InstagramLogoIcon, label: 'Instagram' },
  linkedin: { Icon: LinkedinLogoIcon, label: 'LinkedIn' },
  facebook: { Icon: FacebookLogoIcon, label: 'Facebook' },
  email: { Icon: EnvelopeSimpleIcon, label: 'Email' },
} satisfies Record<string, { Icon: Icon; label: string }>;

export type SocialType = keyof typeof icons;

export type SocialLink = {
  type: SocialType;
  /** Profile URL, or an email address when type is "email" */
  href: string;
  /** Accessible name; defaults to the platform name */
  label?: string;
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

const SocialLinks = ({ links, className }: SocialLinksProps) => (
  <ul className={cn('flex gap-3', className)}>
    {links.map(({ type, href, label }) => {
      const { Icon: SocialIcon, label: defaultLabel } = icons[type];
      const isEmail = type === 'email';
      return (
        <li key={`${type}-${href}`}>
          <Link
            href={
              isEmail && !href.startsWith('mailto:') ? `mailto:${href}` : href
            }
            aria-label={label ?? defaultLabel}
            {...(!isEmail &&
              href.startsWith('http') && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            className="block border border-fg rounded-md p-1 lg:p-2"
          >
            <SocialIcon size={32} weight="fill" className="text-fg" />
          </Link>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;
