'use client';

import { useGSAP } from '@gsap/react';
import type { Icon } from '@phosphor-icons/react';
import {
  CodeIcon,
  DevicesIcon,
  MapPinIcon,
  XIcon,
} from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Button from '../primitives/Button';

gsap.registerPlugin(useGSAP);

type Member = {
  name: string;
  role: string;
  location: string;
  image: string | null;
  /** Paragraphs shown when the photo is clicked. No bio, no click. */
  bio?: string[];
  RoleIcon: Icon;
  /** Light members tint the whole section when open */
  light?: boolean;
};

const team: Member[] = [
  {
    name: 'Cameron Esposito',
    role: 'Fullstack Developer',
    location: 'Charleston, SC',
    image: '/cameron.png',
    RoleIcon: CodeIcon,
    bio: [
      'Cameron spent years in the medical field caring for patients before turning to web development about four years ago. The job changed, but the motivation didn’t. Helping the community was still the goal.',
      'Today, as co-founder and lead developer, Cameron works with the small businesses that keep local communities running. Since a website is often the first place customers find you, Cameron focuses on building sites that show off the business you’ve worked so hard to build.',
    ],
  },
  {
    name: 'Linn Johansen',
    role: 'UI/UX Designer',
    location: 'Portland, OR',
    image: null,
    RoleIcon: DevicesIcon,
    light: true,
    bio: [
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    ],
  },
];

const photoClass =
  'relative block size-[145px] overflow-hidden rounded-2xl md:size-[200px] lg:size-[310px]';

const Team = () => {
  const [openName, setOpenName] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP({ scope: listRef });

  // Nothing mounts or unmounts: the other members collapse and the bio opens
  // in a single timeline, so everything (including the photo, which is
  // re-centered as the row's width changes) moves continuously. Closing just
  // plays the timeline backwards.
  const open = contextSafe((name: string, light?: boolean) => {
    const list = listRef.current;
    if (!list) return;
    const others = [...list.querySelectorAll('[data-member]')].filter(
      (el) => el.getAttribute('data-member') !== name,
    );
    const panel = list.querySelector(`[data-panel="${name}"]`);
    const wide = window.matchMedia('(min-width: 1024px)').matches;

    timeline.current?.revert();
    timeline.current = gsap
      .timeline({ defaults: { duration: 0.8, ease: 'power2.inOut' } })
      .to(
        others,
        {
          ...(wide ? { width: 0 } : { height: 0 }),
          padding: 0,
          opacity: 0,
        },
        0,
      )
      .to(
        panel,
        { ...(wide ? { width: 560 } : { height: 'auto' }), opacity: 1 },
        0,
      );
    if (light && sectionRef.current) {
      const styles = getComputedStyle(sectionRef.current);
      timeline.current.to(
        sectionRef.current,
        {
          backgroundColor: styles.getPropertyValue('--color-bg-muted').trim(),
          color: styles.getPropertyValue('--color-fg').trim(),
        },
        0,
      );
      // Light members' icons only turn brown as the transition plays
      timeline.current.to(
        list.querySelectorAll(`[data-member="${name}"] [data-icon]`),
        { color: styles.getPropertyValue('--color-pri-600').trim() },
        0,
      );
    }
    setOpenName(name);
  });

  const close = contextSafe(() => {
    setOpenName(null);
    timeline.current?.eventCallback('onReverseComplete', () => {
      timeline.current?.revert();
      timeline.current = null;
    });
    timeline.current?.reverse();
  });

  return (
    <section
      ref={sectionRef}
      className="bg-bg-inverse-muted px-6 py-16 text-fg-inverse lg:px-20 lg:py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        <h2 className="heading-3-mobile uppercase md:heading-2-desktop">
          Meet the team
        </h2>
        <ul
          ref={listRef}
          className="flex flex-col items-center lg:flex-row lg:justify-center"
        >
          {team.map(({ name, role, location, image, bio, RoleIcon, light }) => {
            const isOpen = openName === name;
            const photo = image && (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 310px, 200px"
                className="object-cover"
              />
            );
            return (
              <li
                key={name}
                data-member={name}
                className="flex flex-col items-center overflow-hidden px-4 py-5 lg:flex-row lg:items-start lg:px-8 lg:py-0"
              >
                <div className="flex shrink-0 flex-col items-center gap-3">
                  {bio && !openName ? (
                    <button
                      type="button"
                      onClick={() => open(name, light)}
                      aria-label={`Read about ${name}`}
                      className={cn(photoClass, 'cursor-pointer')}
                    >
                      {photo}
                    </button>
                  ) : (
                    <div className={cn(photoClass, !image && 'bg-bg-inverse')}>
                      {photo}
                    </div>
                  )}
                  <h3 className="label-xl mt-2">{name}</h3>
                  <ul className="label-md flex flex-col gap-1.5">
                    <li className="flex items-center gap-2">
                      <RoleIcon
                        size={22}
                        aria-hidden
                        data-icon
                        className="text-pri-100"
                      />
                      {role}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPinIcon
                        size={22}
                        aria-hidden
                        data-icon
                        className="text-pri-100"
                      />
                      {location}
                    </li>
                  </ul>
                </div>
                {bio && (
                  <div
                    data-panel={name}
                    inert={!isOpen}
                    className="w-full overflow-hidden opacity-0 max-lg:h-0 lg:w-0"
                  >
                    <div className="flex w-full items-start gap-4 pt-8 lg:w-[560px] lg:pt-0 lg:pl-8">
                      <div
                        className={cn(
                          'flex flex-1 flex-col gap-4 rounded-2xl p-6 paragraph-lg shadow-[1.5px_1.5px_2.2px_0_var(--color-bg-inverse)_inset] lg:min-h-[310px]',
                          light && 'bg-bg-subtle',
                        )}
                      >
                        {bio.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onDark={!light}
                        size="xs"
                        iconOnly
                        aria-label="Close bio"
                        onClick={close}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Team;
