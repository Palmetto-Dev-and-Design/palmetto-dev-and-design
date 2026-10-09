export type Project = {
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
};

export const projects: Project[] = [
  {
    image: '/project-placeholder.jpg',
    category: 'Webdesign',
    title: 'Technician LLC',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque.',
    href: '/',
  },
  {
    image: '/project-placeholder.jpg',
    category: 'Webdesign',
    title: 'Stanley Garage Door Specialist',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque.',
    href: '/',
  },
];
