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

interface ShowcaseDetailClientProps {
  data: PortfolioItem | null;
}

interface ProfileData {
  nama: string;
  user: {
    nim: string;
  };
  noHandphone: string;
  linkedin: string;
  instagram: string;
  email: string;
  github: string;
}

export default function ShowcaseDetailClient({ data }: ShowcaseDetailClientProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

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
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-fit mt-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </h2>
                <p className="text-gray-300 mb-4">
                  {profileData ? `${profileData.nama}/${profileData.user.nim}` : 'Loading...'}
                </p>
                <div className="flex gap-3">
                  {socialIcons.map((social, index) => {
                    const Icon = social.icon;
                    const socialLink = {
                      whatsapp: `https://wa.me/${profileData?.noHandphone}`,
                      github: profileData?.github ? `https://github.com/${profileData.github}` : '#',
                      instagram: profileData?.instagram ? `https://instagram.com/${profileData.instagram}` : '#',
                      linkedin: profileData?.linkedin ? `https://linkedin.com/in/${profileData.linkedin}` : '#',
                      email: profileData?.email ? profileData.email : '#'
                    }[social.name];

                    return (
                      <a
                        key={index}
                        href={socialLink || '#'}
                        target={social.name === 'email' ? undefined : '_blank'}
                        rel={social.name === 'email' ? undefined : 'noopener noreferrer'}
                        onClick={social.name === 'email' && profileData?.email ? 
                          (e) => handleEmailClick(e, profileData.email) : undefined}
                        className="text-gray-400 hover:text-white transition-colors relative"
                      >
                        <Icon className="h-5 w-5" />
                        {social.name === 'email' && copied && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#011B45]   px-2 py-1 rounded text-sm text-white">
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