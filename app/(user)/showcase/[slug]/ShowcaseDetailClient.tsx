'use client';

import { useState } from 'react';
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

interface ShowcaseDetailClientProps {
  data: PortfolioItem | null;
}

export default function ShowcaseDetailClient({ data }: ShowcaseDetailClientProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (!data) {
    return (
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">Project not found</div>
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
                    src={data.image}
                    alt={data.title}
                    width={1200}
                    height={300}
                    className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-[#001233] border-white/10">
                <DialogTitle className="sr-only">Preview Image</DialogTitle>
                <div className="relative">
                  <Image
                    src={data.image}
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
            <div className="lg:col-span-3">
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
                    className="px-4 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white"
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
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-fit mt-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </h2>
                <p className="text-gray-300 mb-4">
                  {data.contact?.name && data.contact?.id 
                    ? `${data.contact.name}/${data.contact.id}`
                    : 'nama/nim'}
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
                {data?.links && data.links.map((link: { title: string; url: string }, index: number) => (
                  <div key={index}>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {link.title}
                    </h2>
                    <div className="flex items-center gap-2 bg-[#011B45] rounded-lg p-4 mb-4">
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
                  {data?.teamMembers && data.teamMembers.map((member: { name: string; role: string }, index: number) => (
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
      </div>
    </main>
  );
} 