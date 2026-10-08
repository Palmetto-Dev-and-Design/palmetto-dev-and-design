import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Button from '../primitives/Button';
import GlassCard from '../primitives/GlassCard';

type ProjectCardProps = {
  image: string;
  category: string;
  title: string;
  href: string;
};

const ProjectCard = ({ image, category, title, href }: ProjectCardProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <Image src={image} alt="" fill className="object-cover" />
      <Button
        href={href}
        variant="outline"
        onDark
        size="xs"
        iconOnly
        aria-label={`View ${title} project`}
        className="absolute top-6 right-6"
      >
        <ArrowUpRightIcon />
      </Button>
      <div className="absolute right-6 bottom-6 left-6">
        <GlassCard className="border border-fg-inverse/30 text-fg-inverse">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            <h3 className="heading-3-mobile md:order-1">{title}</h3>
            <p className="label-sm md:order-2">{category}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ProjectCard;
