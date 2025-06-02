'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft, Link as LinkIcon, Users, MessageSquare,
  MessageCircle, Github, Instagram, Linkedin, Mail
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioItem } from '@/components/user/showcase/types';
import { useRouter } from 'next/navigation';

interface ShowcaseDetailClientProps {
  data: PortfolioItem | null;
}



export default function ShowcaseDetailClient({ data }: ShowcaseDetailClientProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Log the received data
    console.log('Received data:', data);
    console.log('Creator data:', data?.creator);
    console.log('Team members:', data?.teamMembers);

    // Handle redirect if needed
    if (!data || data.status === 'Perlu Perubahan' || data.status === 'Dihapus') {
      router.push('/showcase');
      return;
    }
  }, [data, router]);

  // Show loading state if no data
  if (!data) {
    return (
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">Loading...</div>
        </div>
      </main>
    );
  }

  const socialIcons = [
    { icon: MessageCircle, name: 'whatsapp' },
    { icon: Github, name: 'github' },
    { icon: Instagram, name: 'instagram' },
    { icon: Linkedin, name: 'linkedin' },
    { icon: Mail, name: 'email' }
  ];

  const categoryLabel = (value: string) => {
    switch (value) {
      case "rpl":
        return "Rekayasa Perangkat Lunak";
      case "game":
        return "Game Cerdas";
      case "data":
        return "Data Sains";
      case "network":
        return "Keamanan Jaringan";
      default:
        return value;
    }
  };

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-12">
          {data?.image && (
            <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${data.image}`}
                    alt={data.title}
                    width={1200}
                    height={300}
                    className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-[#001233] border-white/10">
                <DialogTitle className="sr-only">Preview Image</DialogTitle>
                <div className="relative max-h-[80vh] overflow-y-auto">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${data.image}`}
                    alt={data.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Project Info */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 break-all max-w-full">
              <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
              {(data?.category || data?.tahun) && (
                <div className="text-lg text-gray-300 mb-4">
                  {categoryLabel(data.category)}
                  {data.category && data.tahun ? ' - ' : ''}
                  {data?.tahun}
                </div>
              )}
              <div className="flex flex-wrap gap-3 mb-4">
                {data?.tags && data.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {Array.isArray(data?.description)
                ? data.description.map((desc: string, idx: number) => (
                    <p className="text-gray-300 mb-2" key={idx}>{desc}</p>
                  ))
                : <p className="text-gray-300">{data?.description}</p>
              }
              {/* Get in Touch */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-fit mt-6 break-all max-w-full">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </h2>
                <p className="text-gray-300 mb-4">
                  {data.creator ? `${data.creator.name}/${data.creator.nim}` : 'No creator information available'}
                </p>
                <div className="flex gap-3">
                  {socialIcons.map((social, index) => {
                    const Icon = social.icon;
                    const socialLink = {
                      whatsapp: data.creator?.noHandphone ? `https://wa.me/${data.creator.noHandphone}` : '#',
                      github: data.creator?.github ? `https://github.com/${data.creator.github}` : '#',
                      instagram: data.creator?.instagram ? `https://instagram.com/${data.creator.instagram}` : '#',
                      linkedin: data.creator?.linkedin ? `https://linkedin.com/in/${data.creator.linkedin}` : '#',
                      email: data.creator?.email || '#'
                    }[social.name];

                    return (
                      <a
                        key={index}
                        href={socialLink}
                        target={social.name === 'email' ? undefined : '_blank'}
                        rel={social.name === 'email' ? undefined : 'noopener noreferrer'}
                        onClick={social.name === 'email' && data.creator?.email ? 
                          (e) => handleEmailClick(e, data.creator!.email) : undefined}
                        className="text-gray-400 hover:text-white transition-colors relative"
                      >
                        <Icon className="h-5 w-5" />
                        {social.name === 'email' && copied && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#011B45] px-2 py-1 rounded text-sm text-white">
                            Email copied!
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Links */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                {data?.links && data.links.map((link: { title: string; url: string }, index: number) => (
                  <div key={index}>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {link.title}
                    </h2>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-2 bg-[#011B45] rounded-lg p-4 mb-4">
                      <LinkIcon className="w-5 h-5 text-blue-500" />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors break-all"
                      >
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
                  {data?.teamMembers && data.teamMembers.map((member: { name: string; role: string; nim: string }, index: number) => (
                    <div key={index} className="text-gray-300">
                      <p className="text-white break-all max-w-full">{member.name}/{member.nim}</p>
                      <p className="text-sm break-all max-w-full">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 