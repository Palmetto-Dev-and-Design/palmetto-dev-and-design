import Image from "next/image";
import Button from "@/components/primitives/Button";
import SocialLinks, { type SocialLink } from "@/components/primitives/SocialLinks";

const socials: SocialLink[] = [
  { type: 'email', href: 'hello@example.com' },
  { type: 'linkedin', href: '#' },
];

export default function Home() {
  return (
    <>
    <section className="w-full mx-auto">
      <Image src={'/mobile-hero.png'} alt="" width={690} height={460} className="md:hidden py-5" />
      <Image src={'/hero.png'} alt="" width={1280} height={512} className="hidden md:block mx-auto"/>
      <div className="flex flex-col md:flex-row items-center lg:mx-auto lg:max-w-[1280px] lg:justify-between py-10 px-6 lg:pt-24">
        <h1 className="heading-2-mobile text-left max-w-[22rem] md:max-w-[660px]">Websites for home-service companies that turn local searches into booked jobs.</h1>
        <div className="flex items-center justify-start w-full max-w-[22rem] md:w-auto md:max-w-none gap-14 md:gap-4 mt-8 md:mt-0">
          <Button
            variant="charcoal"
            size="sm"
            className="md:text-lg md:px-5 md:min-h-13"
          >
            Get a free quote
          </Button>
          <SocialLinks links={socials} />
        </div>
      </div>
    </section>
    <section className="px-10 lg:px-20">
      
    </section>
    </>
  );
}
