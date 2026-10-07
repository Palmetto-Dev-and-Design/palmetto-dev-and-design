'use client';

import { CaretDownIcon, XIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { serviceLinks, socials } from '@/lib/nav';
import Button from '../primitives/Button';
import SocialLinks from '../primitives/SocialLinks';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const itemClass =
  'block w-full py-3 text-center nav-item-lg uppercase border-b border-border';

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && onClose();
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg-default px-6 py-6 lg:hidden"
    >
      <div className="flex items-center justify-between">
        <Link href={'/'} onClick={onClose}>
          <p className="heading-1-mobile">Palmetto</p>
          <p className="font-sans font-light text-16 leading-[1.583] tracking-[0.2em] uppercase text-fg-muted">
            Dev & Design
          </p>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Close menu"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>

      <nav className="my-auto py-10">
        <ul className="border-t border-border">
          <li>
            <Link href="/" onClick={onClose} className={itemClass}>
              Home
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((o) => !o)}
              className={`${itemClass} flex items-center justify-center gap-2 cursor-pointer`}
            >
              Services
              <CaretDownIcon
                weight="fill"
                size={14}
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {servicesOpen && (
              <ul className="flex flex-col items-center gap-3 py-4 text-fg-muted border-b border-border">
                {serviceLinks.map(({ title, link }) => (
                  <li key={link}>
                    <Link
                      href={link}
                      onClick={onClose}
                      className="nav-item-lg uppercase"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {[
            { title: 'Work', link: '/work' },
            { title: 'About', link: '/about' },
            { title: 'Contact', link: '/contact' },
          ].map(({ title, link }) => (
            <li key={title}>
              <Link href={link} onClick={onClose} className={itemClass}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col items-center">
        <SocialLinks links={socials} />
        <Button variant="charcoal" size="md" className="mt-5">
          Get a free quote
        </Button>
        <div className="pt-6 text-center text-[.75rem] text-fg-muted">
          <p>&copy; Palmetto Dev & Design, 2026</p>
          <p>
            <strong>Privacy Policy</strong> | <strong>Cookie settings</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
