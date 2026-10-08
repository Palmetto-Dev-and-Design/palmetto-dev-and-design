'use client';

import { ListIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import Button from '@/components/primitives/Button';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname();
  // The contact page sits on the brand color, so the header does too
  const onBrand = pathname === '/contact';
  const navLinks = [
    {
      title: 'Services',
      link: '/services',
    },
    {
      title: 'Work',
      link: '/work',
    },
    {
      title: 'About',
      link: '/about',
    },
    {
      title: 'Contact',
      link: '/contact',
    },
  ];

  return (
    <header
      className={cn(
        'relative px-6 py-6 lg:px-20 lg:py-16 flex justify-between items-center lg:items-start',
        onBrand && 'bg-pri-500 text-fg-inverse',
      )}
    >
      <Link href={'/'}>
        <div className="flex flex-col items-baseline">
          <p className="text-center heading-1-mobile lg:font-display lg:text-[3rem] lg:font-semibold lg:leading-[0.788] lg:tracking-[-0.995px]">
            Palmetto
          </p>
          <p
            className={cn(
              'text-center font-sans font-light text-16 leading-[1.583] tracking-[0.2em] lg:text-[1.493rem] lg:leading-[1.583] lg:tracking-[0.198em] uppercase',
              onBrand ? 'text-fg-inverse/70' : 'text-fg-muted',
            )}
          >
            Dev & Design
          </p>
        </div>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        iconOnly
        className={cn('lg:hidden', onBrand && 'text-fg-inverse')}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <ListIcon />
      </Button>
      <MobileMenu open={open} onClose={close} />
      <nav className="hidden lg:block">
        <ul className="flex flex-col gap-2 lg:flex-row lg:gap-5">
          {navLinks.map(({ title, link }) => {
            const active = pathname === link;
            return (
              <li key={title}>
                <Link
                  href={link}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'label-lg flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border-b-2 border-transparent px-4 py-3 transition-[background-color,box-shadow] hover:bg-bg-subtle hover:shadow-[inset_1px_1px_1.5px_0px_var(--color-mono-alpha-45)]',
                    onBrand && 'hover:bg-pri-600',
                    active &&
                      'rounded-none border-bg-brand hover:bg-transparent hover:shadow-none',
                    active && onBrand && 'border-fg-inverse',
                  )}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
