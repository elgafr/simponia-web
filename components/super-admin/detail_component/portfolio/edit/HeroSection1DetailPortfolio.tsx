"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  tahun: number;
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
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
}

interface CurrentUser {
  id: string;
  nim: string;
  role: string;
}

interface StatusVerifikasiItem {
  UniqueID: number;
  id_portofolio: string;
  portofolio: {
    id: string;
    nama_projek: string;
    kategori: string;
    tahun: number;
    status: string;
    gambar: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
  };
  note: string;
  updated_by: string;
  updatedBy: {
    id: string;
    nim: string;
    password: string;
    role: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
  };
  updated_at: string;
}

interface SocialLinksProps {
  socialLinks?: { [key: string]: string | undefined };
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks = {} }) => {
  console.log('Social Links in SocialLinks component:', socialLinks); // Debug log

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
  const contact = project.contact || null;

  // Process social links, handling email separately to avoid adding 'https://'
  const socialLinks = contact?.socialLinks
    ? {
        whatsapp: contact.socialLinks.whatsapp?.startsWith('http') ? contact.socialLinks.whatsapp : `https://${contact.socialLinks.whatsapp}`,
        github: contact.socialLinks.github?.startsWith('http') ? contact.socialLinks.github : `https://${contact.socialLinks.github}`,
        instagram: contact.socialLinks.instagram?.startsWith('http') ? contact.socialLinks.instagram : `https://${contact.socialLinks.instagram}`,
        linkedin: contact.socialLinks.linkedin?.startsWith('http') ? contact.socialLinks.linkedin : `https://${contact.socialLinks.linkedin}`,
        email: contact.socialLinks.email, // Do not prepend 'https://' to email
      }
    : {};

  // Filter out undefined or empty values
  const filteredSocialLinks = Object.fromEntries(
    Object.entries(socialLinks).filter(([, value]) => value && value !== '')
  );

  console.log('Processed Social Links in ProjectContent:', filteredSocialLinks); // Debug log

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
            <SocialLinks socialLinks={filteredSocialLinks} />
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

const HeroSection1DetailPortfolio: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const idParam = params.id;

  const portfolioId = idParam
    ? typeof idParam === 'string'
      ? idParam.substring(0, 36) // Extract only the first 36 characters (UUID length)
      : null
    : null;

  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Belum di Verifikasi");
  const [note, setNote] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

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
        // Step 1: Fetch current user to get updated_by ID
        let userData: CurrentUser | null = null;
        const roleEndpoints = {
          "1": "/profile-admin",
          "2": "/profile-admin-community",
          "3": "/profile-user",
        };
        let fetched = false;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, endpoint] of Object.entries(roleEndpoints)) {
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.ok) {
            const profileData: ProfileItem = await userResponse.json();
            userData = {
              id: profileData.user.id,
              nim: profileData.user.nim,
              role: profileData.user.role,
            };
            fetched = true;
            break;
          }
        }

        if (!fetched) {
          const payload = token.split('.')[1];
          const decoded = JSON.parse(atob(payload));
          if (decoded && decoded.id) {
            userData = { id: decoded.id, nim: decoded.nim || "", role: decoded.role || "1" };
          } else {
            throw new Error("Unable to determine current user from token or profile endpoints.");
          }
        }
        setCurrentUser(userData);

        // Step 2: Fetch portfolio details
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

        // Step 3: Fetch user profiles to map id_user to nim
        const userIdToNimMap = new Map<string, string>();

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

        // Step 4: Fetch status verifikasi to get status and note
        const statusVerifikasiUrl = `${process.env.NEXT_PUBLIC_API_URL}/status-verifikasi`;
        const statusVerifikasiResponse = await fetch(statusVerifikasiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (statusVerifikasiResponse.ok) {
          const statusVerifikasiData: StatusVerifikasiItem[] = await statusVerifikasiResponse.json();
          const matchingStatus = statusVerifikasiData.find(item => item.id_portofolio === portfolioId);
          if (matchingStatus) {
            setStatus(matchingStatus.portofolio.status);
            setNote(matchingStatus.note || "");
          }
        }

        // Step 5: Map team members with their NIMs
        const teamMembersWithNames = data.anggota.map(member => ({
          name: member.name,
          role: member.role,
          nim: userIdToNimMap.get(member.id_user) || "N/A",
        }));

        // Step 6: Map the portfolio item
        const mappedItem: PortfolioItem = {
          id: data.id,
          title: data.nama_projek,
          image: data.gambar,
          category: data.kategori,
          tags: data.tags.map(tag => tag.nama),
          date: data.created_at,
          subtitle: data.kategori,
          description: data.deskripsi,
          tahun: data.tahun,
          links: data.detail_project.map(detail => ({
            title: detail.judul_link,
            url: detail.link_project,
          })),
          teamMembers: teamMembersWithNames,
          contact: {
            name: data.creator.name,
            nim: data.creator.nim,
            socialLinks: {
              whatsapp: data.creator.noHandphone ? `https://wa.me/${data.creator.noHandphone.replace(/[^0-9]/g, '')}` : undefined,
              linkedin: data.creator.linkedin ? (data.creator.linkedin.startsWith('http') ? data.creator.linkedin : `https://${data.creator.linkedin}`) : undefined,
              instagram: data.creator.instagram ? (data.creator.instagram.startsWith('http') ? data.creator.instagram : `https://${data.creator.instagram}`) : undefined,
              email: data.creator.email || undefined,
              github: data.creator.github ? (data.creator.github.startsWith('http') ? data.creator.github : `https://${data.creator.github}`) : undefined,
            },
          },
        };

        console.log('Mapped Portfolio Item:', mappedItem); // Debug log
        setPortfolioItem(mappedItem);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching portfolio details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioDetails();
  }, [portfolioId]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token || !portfolioId || !currentUser) {
      alert("No token, portfolio ID, or user found. Please log in and try again.");
      return;
    }

    if (currentUser.role !== "1") {
      alert("Only SuperAdmins can update the portfolio status and notes.");
      return;
    }

    try {
      const statusVerifikasiUrl = `${process.env.NEXT_PUBLIC_API_URL}/status-verifikasi`;
      const payload = {
        id_portofolio: portfolioId,
        status: status,
        note: note || undefined,
        updated_by: currentUser.id,
      };
      console.log("Sending payload to /status-verifikasi:", payload);

      const response = await fetch(statusVerifikasiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status verifikasi: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Status verifikasi updated:", responseData);

      alert("Portfolio status updated successfully!");
      router.push("/dashboard-super-admin");
    } catch (err) {
      console.error("Error during status update:", err);
      alert(err instanceof Error ? err.message : "An error occurred while updating the portfolio status.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;

    const token = localStorage.getItem("token");
    if (!token || !portfolioId) {
      alert("No token or portfolio ID found. Please log in and try again.");
      return;
    }

    try {
      const deleteUrl = `${process.env.NEXT_PUBLIC_API_URL}/portofolio/${portfolioId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete portfolio: ${response.status} - ${errorText}`);
      }

      alert("Portfolio deleted successfully!");
      router.push("/dashboard-super-admin");
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred while deleting the portfolio.");
    }
  };

  const isSuperAdmin = currentUser?.role === "1";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <Link href={"/dashboard-super-admin"}>
                <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-110 transition">
                  <FaArrowLeft className="mr-2" /> Back
                </button>
              </Link>
            </div>
            <div className="text-white text-center py-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Edit Portfolio</h1>
              <p>Loading portfolio details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !portfolioItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <Link href={"/dashboard-super-admin"}>
                <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-110 transition">
                  <FaArrowLeft className="mr-2" /> Back
                </button>
              </Link>
            </div>
            <div className="text-white text-center py-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Edit Portfolio</h1>
              <p>{error || "Portfolio item not found."}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-15 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <Link href={"/dashboard-super-admin"}>
              <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-110 transition">
                <FaArrowLeft className="mr-2" /> Back
              </button>
            </Link>
            <div className="flex space-x-4">
              <select
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                value={status}
                onChange={(e) => isSuperAdmin ? setStatus(e.target.value) : null}
                disabled={!isSuperAdmin}
              >
                <option value="Belum di Verifikasi">Belum di Verifikasi</option>
                <option value="Terverifikasi">Terverifikasi</option>
                <option value="Perlu Perubahan">Perlu Perubahan</option>
              </select>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 hover:scale-110 transition"
                onClick={handleSave}
                disabled={!isSuperAdmin}
              >
                Save
              </button>
            </div>
          </div>

          <ProjectHeader project={portfolioItem} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProjectContent project={portfolioItem} />
            <ProjectSidebar project={portfolioItem} />
          </div>

          <div className="mt-12">
            <label className="text-white text-2xl font-semibold block mb-4">Note</label>
            <textarea
              className="text-lg w-full h-32 bg-transparent border border-gray-200 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Write down the notes..."
              value={note}
              onChange={(e) => isSuperAdmin ? setNote(e.target.value) : null}
              disabled={!isSuperAdmin}
            ></textarea>
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:scale-110 transition"
              onClick={handleDelete}
            >
              Delete Portfolio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection1DetailPortfolio;