'use client';

import { useGSAP } from '@gsap/react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import Button from '../primitives/Button';

gsap.registerPlugin(useGSAP);

type ProjectCardProps = {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

const ProjectCard = ({
  image,
  category,
  title,
  description,
  href,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const isOpen = useRef(false);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(detailsRef.current, { height: 0, opacity: 0, marginTop: 0 });
    },
    { scope: cardRef },
  );

  const reveal = contextSafe((open: boolean) => {
    isOpen.current = open;
    gsap.to(detailsRef.current, {
      height: open ? 'auto' : 0,
      opacity: open ? 1 : 0,
      marginTop: open ? 16 : 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    });
  });

  return (
    <div
      ref={cardRef}
      className="relative h-full w-full overflow-hidden rounded-2xl"
      onPointerEnter={(e) => e.pointerType === 'mouse' && reveal(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && reveal(false)}
      onClick={(e) => {
        // Touch has no hover, so a tap on the card toggles the details.
        if (
          window.matchMedia('(hover: none)').matches &&
          !(e.target as HTMLElement).closest('a')
        ) {
          reveal(!isOpen.current);
        }
      }}
      onFocus={() => reveal(true)}
      onBlur={() => reveal(false)}
    >
      <Image src={image} alt="" fill className="object-cover" />
      <Button
        href={href}
        variant="outline"
        size="xs"
        iconOnly
        aria-label={`View ${title} project`}
        className="absolute top-6 right-6"
      >
        <ArrowUpRightIcon />
      </Button>
      <div className="absolute right-6 bottom-6 left-6">
        <div className="rounded-2xl bg-bg-inverse-muted p-6 text-fg-inverse shadow-[1.5px_1.5px_2.2px_0_var(--color-bg-inverse)_inset]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            <h3 className="heading-3-mobile md:order-1">{title}</h3>
            <p className="label-sm text-pri-200 md:order-2">{category}</p>
          </div>
          <div ref={detailsRef} className="overflow-hidden">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
