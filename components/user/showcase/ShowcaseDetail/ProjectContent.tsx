import { MessageSquare } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import type { PortfolioItem } from '../types';

interface ProjectContentProps {
  project: PortfolioItem;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="lg:col-span-2">
      <div className="space-y-6 mb-12">
        {Array.isArray(project.description) ? (
          project.description.map((paragraph, index) => (
            <p key={index} className="text-gray-300">{paragraph}</p>
          ))
        ) : (
          <p className="text-gray-300">{project.description}</p>
        )}
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Get in Touch
        </h2>
        {project.contact && (
          <p className="text-gray-300 mb-4">
            {project.contact.name}/{project.contact.id}
          </p>
        )}
        <SocialLinks />
      </div>
    </div>
  );
} 