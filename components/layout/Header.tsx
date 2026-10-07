'use client';

import { ListIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Button from '@/components/primitives/Button';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
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
    <header className="relative px-6 py-6 lg:px-20 lg:py-16 flex justify-between items-center lg:items-start">
      <Link href={'/'}>
        <div className="flex flex-col items-baseline">
          <p className="text-center heading-1-mobile lg:font-display lg:text-[3rem] lg:font-semibold lg:leading-[0.788] lg:tracking-[-0.995px]">
            Palmetto
          </p>
          <p className="text-center font-sans font-light text-16 leading-[1.583] tracking-[0.2em] lg:text-[1.493rem] lg:leading-[1.583] lg:tracking-[0.198em] uppercase text-fg-muted">
            Dev & Design
          </p>
        </div>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        iconOnly
        className="lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <ListIcon />
      </Button>
      <MobileMenu open={open} onClose={close} />
      <nav className="hidden lg:block">
        <ul className="flex flex-col gap-2 lg:flex-row lg:gap-5">
          {navLinks.map(({ title, link }) => (
            <li key={title}>
              <Link
                href={link}
                className="block label-lg px-4 py-3 hover:border-b-2 hover:border-bg-brand"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
