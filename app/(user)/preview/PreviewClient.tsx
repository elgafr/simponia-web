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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TeamMember {
  name: string;
  role: string;
  nim: string;
  angkatan: string;
  userId: string;
}

interface ProjectLink {
  title: string;
  url: string;
}

export default function PreviewClient() {
  const [mounted, setMounted] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedPortfolioId, setSubmittedPortfolioId] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Get all data from store
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
    // Check if we have data in store
    const storeData = usePortfolioStore.getState();
    const hasStoreData = storeData.teamMembers && storeData.teamMembers.length > 0;

    console.log('Store data available:', hasStoreData);
    console.log('Current store data:', storeData);

    if (hasStoreData) {
      console.log('Using data from store');
      setLoading(false);
    } else {
      console.log('No data in store');
      setLoading(false);
    }
  }, []);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async () => {
    // Log the team members data before creating payload
    console.log('Team members from store:', teamMembers);
    console.log('Team members type:', typeof teamMembers);
    console.log('Is team members array?', Array.isArray(teamMembers));

    // Validate team members data
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
      alert('Data tim tidak valid');
      return;
    }

    // Validate each team member has required data
    const invalidMember = teamMembers.find(member => !member.userId);
    if (invalidMember) {
      console.error('Invalid team member data:', invalidMember);
      alert('Data tim tidak lengkap. Pastikan semua anggota tim memiliki data yang valid.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Create FormData for the entire portfolio submission
      const formData = new FormData();
      formData.append('nama_projek', title);
      formData.append('kategori', category);
      formData.append('tahun', year);
      
      // Handle image upload
      if (projectImage) {
        try {
          // Convert base64 to blob if it's a base64 string
          if (projectImage.startsWith('data:image')) {
            const response = await fetch(projectImage);
            const blob = await response.blob();
            // Create a new File object with proper name and type
            const file = new File([blob], 'project-image.png', { type: 'image/png' });
            formData.append('gambar', file);
          } else {
            // If it's already a file path, fetch it and create a proper File object
            const response = await fetch(projectImage);
            const blob = await response.blob();
            const file = new File([blob], 'project-image.png', { type: 'image/png' });
            formData.append('gambar', file);
          }
        } catch (error) {
          console.error('Error processing image:', error);
          throw new Error('Gagal memproses gambar. Pastikan format gambar valid (jpg, jpeg, png, gif)');
        }
      } else {
        throw new Error('Gambar project diperlukan');
      }

      formData.append('deskripsi', description);

      // Add team members
      teamMembers.forEach((member, index) => {
        formData.append(`anggota[${index}][id_user]`, member.userId);
        formData.append(`anggota[${index}][role]`, member.role);
        formData.append(`anggota[${index}][angkatan]`, member.angkatan);
      });

      // Add project links
      projectLinks.forEach((link, index) => {
        formData.append(`detail_project[${index}][judul_link]`, link.title);
        formData.append(`detail_project[${index}][link_project]`, link.url);
      });

      // Add tags
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}][nama]`, tag);
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error('Submit failed:', errorData);
        throw new Error(errorData?.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log('Submit successful:', data);
      setSubmittedPortfolioId(data.id);
      setShowSuccessDialog(true);
    } catch (err) {
      console.error('Error submitting portfolio:', err);
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan saat submit portfolio');
    }
  };

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
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={handleSubmit}
            >
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
                  <div className="relative max-h-[80vh] overflow-y-auto">
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
              <div className="lg:col-span-3 break-all max-w-full">
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
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 w-fit mt-6 break-all max-w-full">
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
                  {projectLinks.map((link: ProjectLink, index: number) => (
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
                    {teamMembers.map((member: TeamMember, index: number) => (
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
      <Footer />

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-[#001233] border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Berhasil!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Portfolio Anda berhasil dikirim dan sedang menunggu verifikasi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => router.push(`/showcase/${submittedPortfolioId}`)}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Lihat Portfolio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 