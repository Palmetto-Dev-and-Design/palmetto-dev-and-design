import Cta from '@/components/sections/Cta';
import ProjectCard from '@/components/sections/ProjectCard';
import { projects } from '@/lib/projects';

const WorkPage = () => (
  <>
    <section className="flex-1 bg-bg-inverse-muted px-6 pt-8 pb-20 text-fg-inverse lg:px-20 lg:pt-12 lg:pb-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:gap-50 lg:pt-40">
        <div className="flex flex-col gap-6">
          <h1 className="heading-2-desktop lg:heading-display-desktop max-w-xl uppercase lg:max-w-3xl">
            Work that works for home services
          </h1>
          <p className="paragraph-lg max-w-2xl">
            Browse our portfolio to see how we help home service companies stand
            out online. From sleek designs to smooth user experiences, our
            websites drive real results for businesses like yours.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.title}
              className="h-[377px] md:h-[480px] lg:h-[520px]"
            >
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
    <Cta
      title="Want more customers? Let’s get started."
      description="Get a site that brings in real customers while you focus on the work you do best."
      buttonLabel="Book a discovery call"
      buttonHref="https://calendar.app.google/unvqgnjTRrZkptZz7"
      note=""
    />
  </>
);

export default WorkPage;
