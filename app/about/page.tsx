import Image from 'next/image';
import GlassCard from '@/components/primitives/GlassCard';
import Cta from '@/components/sections/Cta';
import HomeServiceFocus from '@/components/sections/HomeServiceFocus';
import Philosophy from '@/components/sections/Philosophy';
import SmallTeam from '@/components/sections/SmallTeam';
import Team from '@/components/sections/Team';

const AboutPage = () => (
  <>
    <section className="relative flex-1">
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center gap-10 px-6 py-16 lg:min-h-[640px] lg:px-20">
        <div className="relative z-10 flex max-w-xl flex-col gap-6 md:max-w-xs lg:max-w-md xl:max-w-xl">
          <h1 className="heading-2-desktop xl:heading-display-desktop uppercase">
            People-first websites. No shortcuts.
          </h1>
          <p className="paragraph-lg max-w-md md:max-w-xs lg:max-w-sm xl:max-w-md">
            We do this work because we care about getting it right. We’re
            motivated by customizing thoughtful, human-made designs built for
            real results – focusing on quality, honest advice & helping good
            businesses succeed.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[min(70%,534px)] md:w-[50%] lg:w-[45%] xl:w-[min(70%,534px)] -translate-y-1/2 opacity-40 md:opacity-100">
        <Image
          src="/about-hero.png"
          alt=""
          width={534}
          height={536}
          aria-hidden
          priority
          className="h-auto w-full"
        />
        <div className="absolute -top-[13%] left-[18%] aspect-square w-[68%]">
          <GlassCard
            aria-hidden
            className="size-full rounded-full p-0"
            depth={5}
            blur={1.5}
            dispersion={0.6}
          />
        </div>
      </div>
    </section>
    <Team />
    <SmallTeam />
    <Philosophy />
    <HomeServiceFocus />
    <Cta
      title="Ready for a website that actually works?"
      description="Let’s talk about how your site can bring in more customers & better reflect the quality of your work."
      buttonLabel="Book a discovery call"
      buttonHref="https://calendar.app.google/unvqgnjTRrZkptZz7"
      note=""
    />
  </>
);

export default AboutPage;
