import Image from 'next/image';
import type { PortfolioItem } from '../types';

interface ProjectHeaderProps {
  project: PortfolioItem;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <>
      <div className="rounded-xl overflow-hidden mb-12">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={600}
          className="w-full object-cover"
        />
      </div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
} 