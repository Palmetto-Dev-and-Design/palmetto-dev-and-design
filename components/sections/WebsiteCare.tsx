import {
  EyeIcon,
  ImagesIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from '@phosphor-icons/react/ssr';
import type { ReactNode } from 'react';
import type { CareFeature } from '@/lib/services';

const icons: Record<string, ReactNode> = {
  'Updates & maintenance': <WrenchIcon weight="fill" />,
  'Security & backups': <ShieldCheckIcon weight="fill" />,
  'Monitoring & troubleshooting': <EyeIcon weight="fill" />,
  'Content updates & support': <ImagesIcon weight="fill" />,
};

/** A numbered service block on a dark panel: the pitch, then what's covered. */
const WebsiteCare = ({
  id,
  number,
  title,
  body,
  features,
}: {
  id: string;
  number: string;
  title: string;
  body: string;
  features: CareFeature[];
}) => (
  <section
    id={id}
    className="scroll-mt-4 bg-mono-900 pb-20 text-fg-inverse lg:pb-24"
  >
    <div className="relative pt-16 pl-[22%] lg:pt-20 lg:pl-20">
      <span className="display-lg text-sec-300 block text-[4rem] leading-[0.75]">
        {number}
      </span>
      <div className="absolute bottom-0 left-0 h-px w-[calc(22%+4rem)] bg-sec-300/70 lg:w-[calc(5rem+4.5rem)]" />
    </div>

    <div className="px-10 pt-10 lg:px-20 lg:pt-16">
      <h2 className="heading-1-mobile lg:heading-2-desktop">{title}</h2>
      <p className="paragraph-body mt-6 max-w-md lg:max-w-xl">{body}</p>
    </div>

    <ul className="mt-16 grid gap-12 px-10 lg:mt-20 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 lg:px-20">
      {features.map(({ title: name, body: text }) => (
        <li
          key={name}
          className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:gap-6 lg:text-left"
        >
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full border border-mono-800 bg-linear-to-b from-mono-900 to-mono-950 text-sec-300 shadow-[0_8px_24px_rgba(0,0,0,0.25)] lg:size-14 [&>svg]:size-8 lg:[&>svg]:size-6">
            {icons[name]}
          </span>
          <div>
            <h3 className="label-md uppercase tracking-[0.3em] lg:text-base">
              {name}
            </h3>
            <p className="paragraph-xs mt-2 max-w-xs lg:paragraph-body lg:max-w-md">
              {text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default WebsiteCare;
