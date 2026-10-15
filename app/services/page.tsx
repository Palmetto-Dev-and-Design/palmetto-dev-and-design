import AddOns from '@/components/sections/AddOns';
import Cta from '@/components/sections/Cta';
import Faq from '@/components/sections/Faq';
import ServiceSteps from '@/components/sections/ServiceSteps';
import ServicesHero from '@/components/sections/ServicesHero';
import WebsiteCare from '@/components/sections/WebsiteCare';
import { faqs } from '@/lib/faqs';
import {
  addOnGroups,
  webDesignSteps,
  websiteCareFeatures,
} from '@/lib/services';

const ServicesPage = () => (
  <>
    <ServicesHero />
    <ServiceSteps
      id="web-design"
      number="01"
      title="Web design & development"
      body="We design & build websites that make your business look established, answer customer questions up front & help you win more of the jobs you want. Every site is custom, mobile-friendly & built to earn trust."
      steps={webDesignSteps}
    />
    <WebsiteCare
      id="website-care"
      number="02"
      title="Website care"
      body="We keep your website running smoothly with updates, security checks & ongoing support. If something breaks or you need a change, we handle it—so you can focus on your business, not your website."
      features={websiteCareFeatures}
    />
    <AddOns
      id="add-ons"
      intro="Add-ons are extra features you can choose if you want to take your site further—like booking systems, photo galleries, or new service pages."
      groups={addOnGroups}
    />
    <Faq id="faq" faqs={faqs} />
    <Cta
      title="Want more customers? Let’s get started."
      description="Get a site that brings in real customers while you focus on the work you do best."
      buttonLabel={
        <>
          <span className="md:hidden">Start a project</span>
          <span className="max-md:hidden">Book a discovery call</span>
        </>
      }
      buttonHref="https://calendar.app.google/unvqgnjTRrZkptZz7"
      note={null}
    />
  </>
);

export default ServicesPage;
