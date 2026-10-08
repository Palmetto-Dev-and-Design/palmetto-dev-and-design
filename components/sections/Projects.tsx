import type { Project } from '@/lib/projects';
import ProjectCard from './ProjectCard';

const Projects = ({ projects }: { projects: Project[] }) => (
  <ul className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 [--card-w:22.875rem] [scrollbar-width:none] md:px-0 md:[--card-w:calc(50%-0.75rem)] lg:gap-8 lg:[--card-w:calc(50%-1rem)] [&::-webkit-scrollbar]:hidden">
    {projects.map((project) => (
      <li
        key={project.title}
        className="h-[377px] w-(--card-w) shrink-0 snap-center md:h-[480px] lg:h-[520px]"
      >
        <ProjectCard {...project} />
      </li>
    ))}
  </ul>
);

export default Projects;
