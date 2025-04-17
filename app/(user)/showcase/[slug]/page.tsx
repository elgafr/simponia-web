'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Link as LinkIcon, 
  Users, 
  MessageSquare,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle
} from 'lucide-react';
import Footer from '@/components/landing-page/Footer';
import { notFound } from 'next/navigation';
import { use } from 'react';

// Temporary data - in real app, fetch this based on slug
const portfolioItems = [
  {
    id: 1,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'Rekayasa Perangkat Lunak - 2022',
    tags: ['Mobile Application', 'UI/UX Designer', 'Design System'],
    description: [
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
      'Porttitor molestie tincidunt neque turpis feugiat mattis. Diam arcu sed mi fusce vestibulum eu neque sed. Dis hendrerit ultrices ac sodales. Justo mauris elementum scelerisque convallis.',
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam. Porttitor molestie'
    ],
    links: [
      {
        title: 'Figma Mobile App',
        url: 'http://www'
      },
      {
        title: 'Medium Study Case',
        url: 'http://www'
      }
    ],
    teamMembers: [
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' }
    ],
    contact: {
      name: 'Krisna Bimantoro',
      id: '202210370311254'
    }
  },
  {
    id: 2,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'Rekayasa Perangkat Lunak - 2022',
    tags: ['Mobile Application', 'UI/UX Designer', 'Design System'],
    description: [
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
      'Porttitor molestie tincidunt neque turpis feugiat mattis. Diam arcu sed mi fusce vestibulum eu neque sed. Dis hendrerit ultrices ac sodales. Justo mauris elementum scelerisque convallis.',
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam. Porttitor molestie'
    ],
    links: [
      {
        title: 'Figma Mobile App',
        url: 'http://www'
      },
      {
        title: 'Medium Study Case',
        url: 'http://www'
      }
    ],
    teamMembers: [
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' }
    ],
    contact: {
      name: 'Krisna Bimantoro',
      id: '202210370311254'
    }
  },
  {
    id: 3,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'Rekayasa Perangkat Lunak - 2022',
    tags: ['Mobile Application', 'UI/UX Designer', 'Design System'],
    description: [
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
      'Porttitor molestie tincidunt neque turpis feugiat mattis. Diam arcu sed mi fusce vestibulum eu neque sed. Dis hendrerit ultrices ac sodales. Justo mauris elementum scelerisque convallis.',
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam. Porttitor molestie'
    ],
    links: [
      {
        title: 'Figma Mobile App',
        url: 'http://www'
      },
      {
        title: 'Medium Study Case',
        url: 'http://www'
      }
    ],
    teamMembers: [
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' }
    ],
    contact: {
      name: 'Krisna Bimantoro',
      id: '202210370311254'
    }
  },
  {
    id: 4,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'Rekayasa Perangkat Lunak - 2022',
    tags: ['Mobile Application', 'UI/UX Designer', 'Design System'],
    description: [
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
      'Porttitor molestie tincidunt neque turpis feugiat mattis. Diam arcu sed mi fusce vestibulum eu neque sed. Dis hendrerit ultrices ac sodales. Justo mauris elementum scelerisque convallis.',
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam. Porttitor molestie'
    ],
    links: [
      {
        title: 'Figma Mobile App',
        url: 'http://www'
      },
      {
        title: 'Medium Study Case',
        url: 'http://www'
      }
    ],
    teamMembers: [
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' }
    ],
    contact: {
      name: 'Krisna Bimantoro',
      id: '202210370311254'
    }
  },
  {
    id: 5,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'Rekayasa Perangkat Lunak - 2022',
    tags: ['Mobile Application', 'UI/UX Designer', 'Design System'],
    description: [
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
      'Porttitor molestie tincidunt neque turpis feugiat mattis. Diam arcu sed mi fusce vestibulum eu neque sed. Dis hendrerit ultrices ac sodales. Justo mauris elementum scelerisque convallis.',
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam. Porttitor molestie'
    ],
    links: [
      {
        title: 'Figma Mobile App',
        url: 'http://www'
      },
      {
        title: 'Medium Study Case',
        url: 'http://www'
      }
    ],
    teamMembers: [
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' }
    ],
    contact: {
      name: 'Krisna Bimantoro',
      id: '202210370311254'
    }
  },
  {
    id: 6,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'Rekayasa Perangkat Lunak - 2022',
    tags: ['Mobile Application', 'UI/UX Designer', 'Design System'],
    description: [
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
      'Porttitor molestie tincidunt neque turpis feugiat mattis. Diam arcu sed mi fusce vestibulum eu neque sed. Dis hendrerit ultrices ac sodales. Justo mauris elementum scelerisque convallis.',
      'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac pretium ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam. Porttitor molestie'
    ],
    links: [
      {
        title: 'Figma Mobile App',
        url: 'http://www'
      },
      {
        title: 'Medium Study Case',
        url: 'http://www'
      }
    ],
    teamMembers: [
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' },
      { name: 'Krisna Bimantoro', role: 'UI/UX Designer' }
    ],
    contact: {
      name: 'Krisna Bimantoro',
      id: '202210370311254'
    }
  }
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ShowcaseDetailPage({ params }: PageProps) {
  // Use React.use() to handle params
  const { slug } = use(params);
  
  // Extract the ID from the slug (format: "1-ui-ux-healthy-application")
  const id = parseInt(slug.split('-')[0]);
  
  // Find the project with matching ID
  const projectData = portfolioItems.find(item => item.id === id);
  
  // If project not found, show 404
  if (!projectData) {
    notFound();
  }

  const socialIcons = [
    { icon: MessageCircle, name: 'whatsapp' },
    { icon: Github, name: 'github' },
    { icon: Instagram, name: 'instagram' },
    { icon: Linkedin, name: 'linkedin' },
    { icon: Mail, name: 'email' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          {/* <Link 
            href="/showcase"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link> */}

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-12">
            <Image
              src={projectData.image}
              alt={projectData.title}
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">{projectData.title}</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              {projectData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6 mb-12">
                {projectData.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Get in Touch - Moved here */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </h2>
                <p className="text-gray-300 mb-4">
                  {projectData.contact.name}/{projectData.contact.id}
                </p>
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Links */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Figma Mobile App
                </h2>
                <div className="flex items-center gap-2 bg-[#011B45] rounded-lg p-4 mb-6">
                  <LinkIcon className="h-6 w-6 text-blue-500" />
                  <a href="http://www" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                    http://www
                  </a>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Medium Study Case
                </h2>
                <div className="flex items-center gap-2 bg-[#011B45] rounded-lg p-4">
                  <LinkIcon className="h-6 w-6 text-blue-500" />
                  <a href="http://www" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                    http://www
                  </a>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Project
                </h2>
                <div className="space-y-4">
                  {projectData.teamMembers.map((member, index) => (
                    <div key={index} className="text-gray-300">
                      <p className="text-white">{member.name}</p>
                      <p className="text-sm">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 