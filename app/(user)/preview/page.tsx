'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Link as LinkIcon, 
  Users, 
  MessageSquare,
  MessageCircle,
  Github,
  Instagram,
  Linkedin,
  Mail
} from "lucide-react";
import Footer from "@/components/landing-page/Footer";
import Image from "next/image";

// Sample data for preview
const previewData = {
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
    { name: 'Elga Putri', role: 'UI/UX Designer' }
  ],
  contact: {
    name: 'Elga Putri',
    id: '202210370311449'
  }
};

export default function PreviewPage() {
  const router = useRouter();
  
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
          {/* Back and Submit Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button className="bg-green-500 text-white hover:bg-green-600">
              Submit Portfolio
            </Button>
          </div>

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-12">
            <Image
              src={previewData.image}
              alt={previewData.title}
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">{previewData.title}</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              {previewData.tags.map((tag, index) => (
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
                {previewData.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Get in Touch */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </h2>
                <p className="text-gray-300 mb-4">
                  {previewData.contact.name}/{previewData.contact.id}
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
                {previewData.links.map((link, index) => (
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

              {/* Team Members */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Project
                </h2>
                <div className="space-y-4">
                  {previewData.teamMembers.map((member, index) => (
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