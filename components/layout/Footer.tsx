'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { serviceLinks, socials } from '@/lib/nav';
import Button from '../primitives/Button';
import SocialLinks from '../primitives/SocialLinks';

const navLinks = [
  {
    title: 'Services',
    subLinks: serviceLinks,
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

const services = navLinks[0].subLinks ?? [];

const Footer = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(servicesOpen);
  openRef.current = servicesOpen;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (!openRef.current) setCollapsedHeight(el.offsetHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="text-fg">
      <div style={{ height: collapsedHeight }} className="lg:hidden">
        <div ref={contentRef} className="flex flex-col items-center py-8">
          <Image
            src={'/footer-logo.png'}
            alt=""
            width={260}
            height={208}
            className="w-[143px] h-auto lg:w-[260px]"
          />
          <nav className="py-8">
            <ul className="flex flex-col items-center gap-4 uppercase font-semibold tracking-[0.08em]">
              {navLinks.map((item) => (
                <li key={item.title} className="flex flex-col items-center">
                  {item.subLinks ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setServicesOpen(!servicesOpen)}
                        aria-expanded={servicesOpen}
                        className="flex items-center gap-2 uppercase font-semibold cursor-pointer"
                      >
                        {item.title}
                        <span
                          className={`text-xs transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                        >
                          <CaretDownIcon
                            weight="fill"
                            size={12}
                            className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                          />
                        </span>
                      </button>
                      {servicesOpen && (
                        <ul className="flex flex-col items-center gap-2 mt-3 text-fg-muted">
                          {item.subLinks.map((sub) => (
                            <li key={sub.link}>
                              <Link href={sub.link}>{sub.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.link}>{item.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks links={socials} />
          <Button variant="charcoal" size="sm" className="mt-5">
            Get a free quote
          </Button>
          <div className="text-[.75rem] pt-6 text-fg-muted">
            <p>&copy; Palmetto Dev & Design, 2026</p>
            <p>
              <strong>Privacy Policy</strong> | <strong>Cookie settings</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-between gap-18 px-20 py-12 max-w-[1440px] mx-auto">
        <Image
          src={'/footer-logo.png'}
          alt="Palmetto Dev & Design"
          width={260}
          height={208}
          className="w-[200px] h-auto shrink-0"
        />
        <nav className="flex gap-18 label-lg">
          <ul className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <li key={item.title}>
                <Link href={item.link ?? services[0].link}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-6">
            {services.map((sub) => (
              <li key={sub.link}>
                <Link href={sub.link}>{sub.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <Button variant="charcoal">Get a free quote</Button>
            <SocialLinks links={socials} />
          </div>
          <p className="paragraph-xs text-fg-muted">
            &copy; Palmetto Dev & Design, 2026 &nbsp;|&nbsp;{' '}
            <strong>Privacy Policy</strong> <strong>Cookie settings</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
