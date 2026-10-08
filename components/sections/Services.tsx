import { design, development, localSeo, servicesIntro } from '@/lib/services';
import ServicesArc from './ServicesArc';
import ServicesCarousel from './ServicesCarousel';

// Mobile lists Development first. On tablet/desktop the cards climb the arc,
// so the order here is the order they reach the center. The last one stays
// centered when the pin releases.
const mobileOrder = [development, design, localSeo];
const desktopOrder = [design, development, localSeo];

const Services = () => (
  <section id="services">
    <div className="py-20 md:hidden">
      <div className="px-[63px] text-center">
        <h2 className="display-lg md:heading-2-desktop-uppercase">Services</h2>
        <p className="paragraph-sm md:paragraph-body text-center">
          {servicesIntro}
        </p>
      </div>
      <ServicesCarousel services={mobileOrder} />
    </div>
    <ServicesArc services={desktopOrder} className="hidden md:block" />
  </section>
);

export default Services;
