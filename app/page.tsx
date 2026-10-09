import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Button from '@/components/primitives/Button';
import SocialLinks, {
  type SocialLink,
} from '@/components/primitives/SocialLinks';
import Cta from '@/components/sections/Cta';
import Process from '@/components/sections/Process';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import WhyWorkWithUs from '@/components/sections/WhyWorkWithUs';
import { projects } from '@/lib/projects';

const socials: SocialLink[] = [
  { type: 'email', href: 'hello@example.com' },
  { type: 'linkedin', href: '#' },
];

export default function Home() {
  return (
    <>
      <section className="w-full mx-auto">
        <Image
          src={'/mobile-hero.png'}
          alt=""
          width={690}
          height={460}
          className="md:hidden py-5"
        />
        <Image
          src={'/hero.png'}
          alt=""
          width={1280}
          height={512}
          className="hidden md:block mx-auto"
        />
        <div className="flex flex-col md:flex-row items-center lg:mx-auto lg:max-w-[1280px] lg:justify-between py-10 px-6 lg:py-24">
          <h1 className="heading-2-mobile text-left max-w-[22rem] md:max-w-[660px]">
            Websites that turn calls into customers for home-service pros.
          </h1>
          <div className="flex items-center justify-start w-full max-w-[22rem] md:w-auto md:max-w-none gap-14 md:gap-4 mt-8 md:mt-0">
            <Button
              variant="charcoal"
              size="sm"
              className="md:text-lg md:px-5 md:min-h-13"
            >
              Get started now
            </Button>
            <SocialLinks links={socials} />
          </div>
        </div>
      </section>
      <section className="bg-pri-500 text-fg-inverse pt-[81px] pb-[122px] lg:pt-[101px] lg:pb-[182px]">
        <div className="h-px w-[55%] lg:w-[30%] bg-fg-inverse/40" />
        <div className="px-10 pt-10 lg:pt-20 lg:px-20">
          <h2 className="heading-1-mobile lg:heading-2-desktop lg:max-w-[850px]">
            Websites that turn calls into customers for home-service pros.
          </h2>
          <div className="mt-8 flex flex-col gap-4 paragraph-lg lg:max-w-[850px]">
            <p>
              Homeowners want fast answers when they search for help. If your site’s confusing or slow, they’ll move on – often before you ever get a call.
            </p>
            <p>
              We build websites that earn trust & give people what they need up front, so they pick you over the competition. More booked jobs, less wasted time.
            </p>
          </div>
        </div>
      </section>
      <Services />
      <section className="flex flex-col items-center gap-16 bg-mono-900 py-20 text-fg-inverse md:items-stretch md:gap-10 md:px-6 lg:px-20">
        <div className="flex flex-col items-center gap-16 md:w-full md:flex-row md:items-center md:justify-between md:gap-0">
          <h2 className="display-lg">Our work</h2>
          <Button
            variant="primary"
            size="sm"
            iconR={<ArrowUpRightIcon />}
            className="hidden md:inline-flex"
          >
            See all projects
          </Button>
        </div>
        <Projects projects={projects} />
        <Button
          variant="primary"
          size="sm"
          iconR={<ArrowUpRightIcon />}
          className="md:hidden"
        >
          See all projects
        </Button>
      </section>
      <WhyWorkWithUs />
      <Process />
      <Cta />
    </>
  );
}
