export type ProcessStep = {
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: 'Discovery',
    body: 'We learn about your business, customers, goals & what isn’t working with your current website.',
  },
  {
    title: 'Plan',
    body: 'We define the scope, sitemap, timeline & what we’ll need from you before design begins.',
  },
  {
    title: 'Design',
    body: 'We create the structure and visual direction, then design the full site for your review.',
  },
  {
    title: 'Build & Test',
    body: 'We develop the approved designs, make everything responsive & thoroughly test the site before launch.',
  },
  {
    title: 'Launch & Support',
    body: 'We launch your new website, make sure everything is running smoothly & stay available after the project is finished.',
  },
];
