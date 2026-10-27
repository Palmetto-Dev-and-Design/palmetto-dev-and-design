export type Project = {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

export const projects: Project[] = [
  {
    image: '/stanley-garage-door.png',
    category: 'Webdesign',
    title: 'Stanley Garage Door Specialist',
    description:
      'A clean, mobile-friendly website for a local garage door repair and installation company, built to turn searches into service calls.',
    href: 'https://stanleygaragedoorspecialist.com/',
  },
];
