export type Service = {
  title: string;
  body: string;
  link: string;
};

export const development: Service = {
  title: 'Development',
  body: 'A slow or broken site costs you calls. We build your site with care so it loads fast, shows up in local searches & does justice to the crew behind it.',
  link: '/services/development',
};

export const design: Service = {
  title: 'Design',
  body: 'Homeowners make up their mind in a few seconds. We design every page to be easy to take in, so they see what sets you apart & how to reach you.',
  link: '/services/design',
};

export const localSeo: Service = {
  title: 'Local SEO',
  body: 'The company that shows up first on Google usually gets the call. We build the pages & profile that put you there, for every service & town you cover.',
  link: '/services/seo',
};

export const servicesIntro =
  'Every site is custom made for you, designed & built around your services, crew & customers.';
