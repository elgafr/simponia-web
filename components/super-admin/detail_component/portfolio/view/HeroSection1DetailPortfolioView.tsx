"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { portfolioItems } from '@/data/portfolioItems';
import { MessageSquare, LinkIcon, Users, MessageCircle, Github, Instagram, Linkedin, Mail } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  subtitle: string;
  description: string | string[];
  links?: {
    title: string;
    url: string;
  }[];
  teamMembers?: {
    name: string;
    role: string;
  }[];
  contact?: {
    name: string;
    id: string;
  };
}

interface SocialIcon {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

// ProjectHeader Component
const ProjectHeader: React.FC<{ project: PortfolioItem }> = ({ project }) => {
  return (
    <>
      <div className="rounded-xl overflow-hidden mb-12">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={600}
          className="w-full object-cover h-130"
        />
      </div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

// SocialLinks Component
const SocialLinks: React.FC = () => {
  const socialIcons: SocialIcon[] = [
    { icon: MessageCircle, name: 'whatsapp' },
    { icon: Github, name: 'github' },
    { icon: Instagram, name: 'instagram' },
    { icon: Linkedin, name: 'linkedin' },
    { icon: Mail, name: 'email' }
  ];

  return (
    <div className="flex gap-3">
      {socialIcons.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
};

// ProjectContent Component
const ProjectContent: React.FC<{ project: PortfolioItem }> = ({ project }) => {
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
};

// ProjectSidebar Component
const ProjectSidebar: React.FC<{ project: PortfolioItem }> = ({ project }) => {
  return (
    <div className="space-y-8">
      {project.links && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          {project.links.map((link, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-white mb-2">
                {link.title}
              </h2>
              <div className="flex items-center gap-2 bg-[#011B45] rounded-lg p-4 mb-6">
                <LinkIcon className="h-6 w-6 text-blue-500" />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                  {link.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {project.teamMembers && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Project
          </h2>
          <div className="space-y-4">
            {project.teamMembers.map((member, index) => (
              <div key={index} className="text-gray-300">
                <p className="text-white">{member.name}</p>
                <p className="text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HeroSection1DetailPortfolioView: React.FC = () => {
  const params = useParams();
  const idParam = params.id; // Extract the id from the URL (e.g., "1-ui-ux-healthy-application")

  // Extract the numeric id from the URL parameter
  const id = idParam
    ? typeof idParam === 'string'
      ? parseInt(idParam.split('-')[0])
      : 1
    : null; // Set to null if idParam is undefined

  // Find the portfolio item matching the id
  const portfolioItem: PortfolioItem | undefined = id
    ? portfolioItems.find((item) => item.id === id) || portfolioItems[0]
    : undefined;

  // Handle case where no id is provided
  if (!id || !portfolioItem) {
    return (
      <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] lg:px-60 py-30">
        <div className="flex justify-between items-center mb-6">
          <Link href={'/showcase-portfolio-super-admin'}>
            <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-110 transition">
              <FaArrowLeft className="mr-2" /> Back
            </button>
          </Link>
        </div>
        <div className="text-white text-center py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Portfolio Details</h1>
          <p>Please select a portfolio item to view its details.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectHeader project={portfolioItem} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProjectContent project={portfolioItem} />
            <ProjectSidebar project={portfolioItem} />
          </div>
        </div>
      </main>

    </div>
  );
};

export default HeroSection1DetailPortfolioView;