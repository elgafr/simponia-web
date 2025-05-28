"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    nim?: string;
  }[];
  contact?: {
    name: string;
    nim: string;
    socialLinks?: {
      whatsapp?: string;
      github?: string;
      instagram?: string;
      linkedin?: string;
      email?: string;
    };
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
    user: {
      id: string;
      nim: string;
      password: string;
      role: string;
      remember_token: string | null;
      created_at: string;
      updated_at: string;
    };
    role: string;
    angkatan: string;
    createdAt: string;
    updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

interface UserItem {
  id: string;
  nim: string;
  role: string;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}

interface SocialIcon {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  url?: string;
}

const ProjectHeader: React.FC<{ project: PortfolioItem }> = ({ project }) => {
  return (
    <>
      <div className="rounded-xl overflow-hidden mb-12">
        <Image
          src={`/${project.image}`}
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

const SocialLinks: React.FC<{ socialLinks?: { [key: string]: string } }> = ({ socialLinks = {} }) => {
  const socialIcons: SocialIcon[] = [
    { icon: MessageCircle, name: 'whatsapp', url: socialLinks.whatsapp || '#' },
    { icon: Github, name: 'github', url: socialLinks.github || '#' },
    { icon: Instagram, name: 'instagram', url: socialLinks.instagram || '#' },
    { icon: Linkedin, name: 'linkedin', url: socialLinks.linkedin || '#' },
    { icon: Mail, name: 'email', url: socialLinks.email ? `mailto:${socialLinks.email}` : '#' },
  ];

  return (
    <div className="flex gap-3">
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

const ProjectContent: React.FC<{ project: PortfolioItem }> = ({ project }) => {
  const contact = project.contact || (project.teamMembers && project.teamMembers.length > 0 ? project.teamMembers[0] : null);
  const socialLinks = project.contact && 'socialLinks' in project.contact ? project.contact.socialLinks : undefined;

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
          <p className="text-gray-300 mb-4">
            {contact.name} / {contact.nim}
          </p>
        )}
        <SocialLinks socialLinks={socialLinks} />
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
  const idParam = params.id;

  const portfolioId = idParam
    ? typeof idParam === 'string'
      ? idParam.split('-').slice(0, 5).join('-')
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
        // Step 1: Fetch all users from /portofolio/user
        const usersUrl = `${process.env.NEXT_PUBLIC_API_URL}/portofolio/user`;
        const usersResponse = await fetch(usersUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!usersResponse.ok) {
          const errorText = await usersResponse.text();
          throw new Error(`Failed to fetch users: ${usersResponse.status} - ${errorText}`);
        }

        const usersData: UserItem[] = await usersResponse.json();

        // Step 2: Fetch profiles based on role and create maps for user.id to name and social links
        const userIdToNameMap = new Map<string, string>();
        const userIdToSocialLinksMap = new Map<string, { whatsapp?: string; github?: string; instagram?: string; linkedin?: string; email?: string }>();

        // Fetch profiles for role 3 (Users)
        const role3Users = usersData.filter(user => user.role === "3");
        if (role3Users.length > 0) {
          const profileUserResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (profileUserResponse.ok) {
            const profileUserData: ProfileItem[] = await profileUserResponse.json();
            profileUserData.forEach(profile => {
              userIdToNameMap.set(profile.user.id, profile.nama);
              userIdToSocialLinksMap.set(profile.user.id, {
                whatsapp: profile.noHandphone ? `https://wa.me/${profile.noHandphone}` : undefined,
                github: profile.github && !profile.github.startsWith('http') ? `https://github.com/${profile.github}` : profile.github || undefined,
                instagram: profile.instagram && !profile.instagram.startsWith('http') ? `https://instagram.com/${profile.instagram}` : profile.instagram || undefined,
                linkedin: profile.linkedin && !profile.linkedin.startsWith('http') ? `https://linkedin.com/in/${profile.linkedin}` : profile.linkedin || undefined,
                email: profile.email || undefined,
              });
            });
          }
        }

        // Fetch profiles for role 2 (Admin Community)
        const role2Users = usersData.filter(user => user.role === "2");
        if (role2Users.length > 0) {
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
              userIdToNameMap.set(profile.user.id, profile.nama);
              userIdToSocialLinksMap.set(profile.user.id, {
                whatsapp: profile.noHandphone ? `https://wa.me/${profile.noHandphone}` : undefined,
                github: profile.github && !profile.github.startsWith('http') ? `https://github.com/${profile.github}` : profile.github || undefined,
                instagram: profile.instagram && !profile.instagram.startsWith('http') ? `https://instagram.com/${profile.instagram}` : profile.instagram || undefined,
                linkedin: profile.linkedin && !profile.linkedin.startsWith('http') ? `https://linkedin.com/in/${profile.linkedin}` : profile.linkedin || undefined,
                email: profile.email || undefined,
              });
            });
          }
        }

        // Fetch profile for role 1 (Admin)
        const role1Users = usersData.filter(user => user.role === "1");
        if (role1Users.length > 0) {
          const profileAdminResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (profileAdminResponse.ok) {
            const profileAdminData: ProfileItem = await profileAdminResponse.json();
            userIdToNameMap.set(profileAdminData.user.id, profileAdminData.nama);
            userIdToSocialLinksMap.set(profileAdminData.user.id, {
              whatsapp: profileAdminData.noHandphone ? `https://wa.me/${profileAdminData.noHandphone}` : undefined,
              github: profileAdminData.github && !profileAdminData.github.startsWith('http') ? `https://github.com/${profileAdminData.github}` : profileAdminData.github || undefined,
              instagram: profileAdminData.instagram && !profileAdminData.instagram.startsWith('http') ? `https://instagram.com/${profileAdminData.instagram}` : profileAdminData.instagram || undefined,
              linkedin: profileAdminData.linkedin && !profileAdminData.linkedin.startsWith('http') ? `https://linkedin.com/in/${profileAdminData.linkedin}` : profileAdminData.linkedin || undefined,
              email: profileAdminData.email || undefined,
            });
          }
        }

        // Step 3: Fetch portfolio details
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

        // Step 4: Map team members using the userIdToNameMap
        const teamMembersWithNames = data.anggota.map(member => {
          const userNim = member.user.nim;
          const name = userIdToNameMap.get(member.user.id) || "Unknown Member";
          return {
            name,
            role: member.role,
            nim: userNim,
          };
        });

        // Step 5: Set contact to the first anggota member using user.id
        const firstMember = data.anggota[0];
        const contact = firstMember ? {
          name: userIdToNameMap.get(firstMember.user.id) || "Unknown Member",
          nim: firstMember.user.nim,
          socialLinks: userIdToSocialLinksMap.get(firstMember.user.id),
        } : undefined;

        // Step 6: Map the portfolio item
        const mappedItem: PortfolioItem = {
          id: parseInt(data.id.split('-')[0], 16) || 0,
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
          contact: contact,
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