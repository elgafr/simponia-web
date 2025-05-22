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
  Mail,
  X
} from "lucide-react";
import Footer from "@/components/user/landing-page/Footer";
import Image from "next/image";
import { usePortfolioStore } from "@/store/portfolioStore";
import type { PortfolioStore } from "@/store/portfolioStore";
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PreviewClient() {
  const [mounted, setMounted] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const router = useRouter();
  
  const title = usePortfolioStore((state: PortfolioStore) => state.title);
  const projectImage = usePortfolioStore((state: PortfolioStore) => state.projectImage);
  const tags = usePortfolioStore((state: PortfolioStore) => state.tags);
  const description = usePortfolioStore((state: PortfolioStore) => state.description);
  const contact = usePortfolioStore((state: PortfolioStore) => state.contact);
  const projectLinks = usePortfolioStore((state: PortfolioStore) => state.projectLinks);
  const teamMembers = usePortfolioStore((state: PortfolioStore) => state.teamMembers);
  const category = usePortfolioStore((state: PortfolioStore) => state.category);
  const year = usePortfolioStore((state: PortfolioStore) => state.year);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const socialIcons = [
    { icon: MessageCircle, name: 'whatsapp' },
    { icon: Github, name: 'github' },
    { icon: Instagram, name: 'instagram' },
    { icon: Linkedin, name: 'linkedin' },
    { icon: Mail, name: 'email' }
  ];

  const handleBack = () => {
    router.back();
  };

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back and Submit Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
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
            {projectImage && (
              <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <Image
                      src={projectImage}
                      alt={title}
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
                      src={projectImage}
                      alt={title}
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
                <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
                {(category || year) && (
                  <div className="text-lg text-gray-300 mb-4">
                    {categoryLabel(category)}
                    {category && year ? ' - ' : ''}
                    {year}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mb-4">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-1 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300">{description}</p>
                {/* Get in Touch */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-fit mt-6">
                  <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Get in Touch
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {contact.name && contact.id 
                      ? `${contact.name}/${contact.id}`
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
                  {projectLinks.map((link: { title: string; url: string }, index: number) => (
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
                    {teamMembers.map((member: { name: string; role: string }, index: number) => (
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
    </div>
  );
} 