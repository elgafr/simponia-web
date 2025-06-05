"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MessageSquare, LinkIcon, Users, MessageCircle, Github, Instagram, Linkedin, Mail } from 'lucide-react';

interface PortfolioItem {
  id: string;
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
    nim?: string;
  }[];
  creator: {
    user_id: string;
    nim: string;
    name: string;
    role: string;
    noHandphone: string;
    linkedin: string;
    instagram: string;
    email: string;
    github: string;
  };
}

interface BackendPortfolioItem {
  id: string;
  nama_projek: string;
  kategori: string;
  tahun: number;
  status: string;
  gambar: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  anggota: {
    id: string;
    role: string;
    angkatan: string;
    id_user: string;
    name: string;
  }[];
  detail_project: {
    id: string;
    judul_link: string;
    link_project: string;
    created_at: string;
    updated_at: string;
  }[];
  tags: {
    id: string;
    nama: string;
    created_at: string;
    updated_at: string;
  }[];
  creator: {
    user_id: string;
    nim: string;
    name: string;
    role: string;
    noHandphone: string;
    linkedin: string;
    instagram: string;
    email: string;
    github: string;
  };
}

interface ProfileItem {
  id: string;
  user: {
    id: string;
    nim: string;
    password: string;
    role: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
  };
  nama: string;
  noHandphone: string;
  gender: string;
  tanggalLahir: string;
  kota: string;
  keterangan: string;
  linkedin: string;
  instagram: string;
  email: string;
  github: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
}

const SocialLinks: React.FC<{ socialLinks?: { [key: string]: string } }> = ({ socialLinks = {} }) => {
  const socialIcons: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; name: string; url: string }[] = [
    { icon: MessageCircle, name: 'whatsapp', url: socialLinks.whatsapp || '#' },
    { icon: Github, name: 'github', url: socialLinks.github || '#' },
    { icon: Instagram, name: 'instagram', url: socialLinks.instagram || '#' },
    { icon: Linkedin, name: 'linkedin', url: socialLinks.linkedin || '#' },
    { icon: Mail, name: 'email', url: socialLinks.email ? `mailto:${socialLinks.email}` : '#' },
  ];

  return (
    <div className="flex gap-3 mt-4">
      {socialIcons.map((social, index) => {
        const Icon = social.icon;
        // Only render the icon if a valid URL exists (not '#')
        if (social.url === '#') return null;
        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
};

const ProjectHeader: React.FC<{ project: PortfolioItem }> = ({ project }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const imageUrl = `${baseUrl}${project.image.startsWith('/') ? '' : '/'}${project.image}`;

  console.log('Attempting to load image from:', imageUrl); // Debug log

  return (
    <>
      <div className="rounded-xl overflow-hidden mb-12">
        <Image
          src={imageUrl}
          alt={project.title}
          width={1200}
          height={600}
          className="w-full object-cover h-130"
          onError={(e) => {
            console.error('Image load failed, falling back to default. URL:', imageUrl);
            e.currentTarget.src = '/default-image.png'; // Fallback image
          }}
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

const ProjectContent: React.FC<{ project: PortfolioItem }> = ({ project }) => {
  const contact = project.creator; // Use creator data for "Get in Touch"
  const socialLinks = contact
    ? Object.fromEntries(
        Object.entries({
          whatsapp: contact.noHandphone ? `https://wa.me/${contact.noHandphone.replace(/[^0-9]/g, '')}` : '',
          linkedin: contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`,
          instagram: contact.instagram.startsWith('http') ? contact.instagram : `https://${contact.instagram}`,
          email: contact.email || '',
          github: contact.github.startsWith('http') ? contact.github : `https://${contact.github}`,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).filter(([_, value]) => value !== '')
      )
    : {};

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
        {contact && (
          <div className="text-gray-300">
            <p>{contact.name} / {contact.nim}</p>
            <SocialLinks socialLinks={socialLinks} />
          </div>
        )}
      </div>
    </div>
  );
};

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
                <p className="text-white">{member.name} / {member.nim}</p>
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
  const idParam = params.id;

  const portfolioId = idParam
    ? typeof idParam === 'string'
      ? idParam.substring(0, 36) // Extract only the first 36 characters (UUID length)
      : null
    : null;

  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!portfolioId) {
      setError("No portfolio ID found in the URL.");
      setLoading(false);
      return;
    }

    const fetchPortfolioDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Step 1: Fetch portfolio details
        const portfolioUrl = `${process.env.NEXT_PUBLIC_API_URL}/portofolio/${portfolioId}`;
        console.log(`Fetching portfolio from: ${portfolioUrl}`);
        const response = await fetch(portfolioUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch portfolio details: ${response.status} - ${errorText}`);
        }

        const data: BackendPortfolioItem = await response.json();

        // Step 2: Fetch user profiles to map id_user to nim
        const userIdToNimMap = new Map<string, string>();

        // Fetch profiles for role 3 (Users)
        const profileUserResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!profileUserResponse.ok) {
          const errorText = await profileUserResponse.text();
          throw new Error(`Failed to fetch user profiles: ${profileUserResponse.status} - ${errorText}`);
        }

        const profileUserData: ProfileItem[] = await profileUserResponse.json();
        profileUserData.forEach(profile => {
          userIdToNimMap.set(profile.user.id, profile.user.nim);
        });

        // Fetch profiles for role 2 (Admin Community)
        const profileAdminCommunityResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin-community`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileAdminCommunityResponse.ok) {
          const profileAdminCommunityData: ProfileItem[] = await profileAdminCommunityResponse.json();
          profileAdminCommunityData.forEach(profile => {
            userIdToNimMap.set(profile.user.id, profile.user.nim);
          });
        }

        // Fetch profile for role 1 (Admin)
        const profileAdminResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileAdminResponse.ok) {
          const profileAdminData: ProfileItem = await profileAdminResponse.json();
          userIdToNimMap.set(profileAdminData.user.id, profileAdminData.user.nim);
        }

        // Step 3: Map team members with their NIMs
        const teamMembersWithNames = data.anggota.map(member => ({
          name: member.name,
          role: member.role,
          nim: userIdToNimMap.get(member.id_user) || "N/A",
        }));

        // Step 4: Map the portfolio item
        const mappedItem: PortfolioItem = {
          id: data.id,
          title: data.nama_projek,
          image: data.gambar,
          category: data.kategori,
          tags: data.tags.map(tag => tag.nama),
          date: data.created_at,
          subtitle: data.kategori,
          description: data.deskripsi,
          links: data.detail_project.map(detail => ({
            title: detail.judul_link,
            url: detail.link_project,
          })),
          teamMembers: teamMembersWithNames,
          creator: data.creator,
        };

        setPortfolioItem(mappedItem);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching portfolio details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioDetails();
  }, [portfolioId]);

  if (loading) {
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
          <p>Loading portfolio details...</p>
        </div>
      </section>
    );
  }

  if (error || !portfolioItem) {
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
          <p>{error || "Portfolio item not found."}</p>
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