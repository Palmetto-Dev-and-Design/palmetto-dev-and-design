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

export type HowItWorksStep = {
  title: string;
  body: string;
};

export const webDesignSteps: HowItWorksStep[] = [
  {
    title: 'Branding',
    body: 'We help you lock in your visual identity: colors, typography & the overall style that sets you apart.',
  },
  {
    title: 'Design',
    body: 'We design every page around how homeowners decide, so the right things stand out & the next step is obvious.',
  },
  {
    title: 'Development',
    body: 'We build your site from the ground up—clean code, fast load times & a smooth experience on any device.',
  },
  {
    title: 'Launch',
    body: 'We thoroughly test your site, handle hosting, domain setup & site migration—making sure everything runs right when you go live.',
  },
];

export type CareFeature = {
  title: string;
  body: string;
};

export const websiteCareFeatures: CareFeature[] = [
  {
    title: 'Updates & maintenance',
    body: 'Regular updates & maintenance keep your site compatible & running smoothly—no surprises.',
  },
  {
    title: 'Security & backups',
    body: 'Security checks & backups protect your site, so you’re covered if anything happens.',
  },
  {
    title: 'Monitoring & troubleshooting',
    body: 'We keep an eye on your site & quickly fix issues before they become real problems.',
  },
  {
    title: 'Content updates & support',
    body: 'Need to update info or images? We handle content changes & are here when you need help.',
  },
];

export type AddOnGroup = {
  title: string;
  items: string[];
};

export const addOnGroups: AddOnGroup[] = [
  {
    title: 'Delivery & process',
    items: [
      'Rush delivery',
      'Extra revisions',
      'Additional call',
      'Extra page',
      'Source design files',
      'Detailed documentation',
    ],
  },
  {
    title: 'Functionality',
    items: [
      'Online booking',
      'Quote request form',
      'Online payments',
      'Live chat',
      'Service area map',
    ],
  },
  {
    title: 'Content & media',
    items: [
      'Photo gallery',
      'Video embeds',
      'Copywriting',
      'Professional photography',
      'Blog setup',
    ],
  },
  {
    title: 'Growth & technical',
    items: [
      'Google Business Profile setup',
      'Analytics & call tracking',
      'Speed optimization',
      'Business email setup',
    ],
  },
  {
    title: 'Support & training',
    items: [
      'Training session',
      'Video walkthrough',
      'Priority support',
      'Block of update hours',
    ],
  },
];
