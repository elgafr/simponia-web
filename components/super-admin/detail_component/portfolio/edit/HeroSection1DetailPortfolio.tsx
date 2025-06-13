"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LinkIcon, Users, MessageSquare, MessageCircle, Github, Instagram, Linkedin, Mail } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
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

interface ProfileUser {
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
  profilePicture: string;
  namaKomunitas: string;
  joinKomunitas: string;
  divisi: string;
  posisi: string;
  verifiedPortfolioCount: number;
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
            e.currentTarget.src = '/default-image.png';
          }}
        />
      </div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          {project.tags.map((tag: string, index: number) => (
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
  const contact = project.creator;
  const socialLinks = contact
    ? Object.fromEntries(
        Object.entries({
          whatsapp: contact.noHandphone ? `https://wa.me/${contact.noHandphone.replace(/[^0-9]/g, '')}` : '',
          linkedin: contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`,
          instagram: contact.instagram.startsWith('http') ? contact.instagram : `https://${contact.instagram}`,
          email: contact.email || '',
          github: contact.github.startsWith('http') ? contact.github : `https://${contact.github}`,
        }).filter(([, value]) => value !== '')
      )
    : {};

  return (
    <div className="lg:col-span-2">
      <div className="space-y-6 mb-12">
        {Array.isArray(project.description) ? (
          project.description.map((paragraph: string, index: number) => (
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
          {project.links.map((link: { title: string; url: string }, index: number) => (
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
            {project.teamMembers.map((member: { name: string; role: string; nim?: string }, index: number) => (
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

const VerificationStatus: React.FC<{ status: string; note: string }> = ({ status, note }) => {
  return (
    <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        Verification Status
      </h2>
      <div className="text-gray-300">
        <p><strong>Status:</strong> {status}</p>
        {note && <p className="mt-2"><strong>Note:</strong> {note}</p>}
      </div>
    </div>
  );
};

const HeroSection1DetailPortfolio: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const idParam = params.id;

  const portfolioId = idParam
    ? typeof idParam === 'string'
      ? idParam.substring(0, 36)
      : null
    : null;

  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Belum di Verifikasi");
  const [note, setNote] = useState<string>("");
  const [verificationId, setVerificationId] = useState<number | null>(null);
  const [profileUserId, setProfileUserId] = useState<string | null>(null); // Menyimpan profile_user dari API

  useEffect(() => {
    if (!portfolioId) {
      setError("No portfolio ID found in the URL.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        // Ambil user_id dari token
        let userId = null;
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.user_id || payload.sub;
          console.log("Decoded user_id from token:", userId);
        } catch (decodeError) {
          console.error("Failed to decode token:", decodeError);
        }
        if (!userId) {
          throw new Error("User ID not found in token. Please log in again.");
        }

        // Ambil profile_user dari endpoint /profile-user dengan user_id sebagai parameter
        const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user?user_id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!profileResponse.ok) {
          throw new Error(`Failed to fetch profile: ${profileResponse.status} - ${await profileResponse.text()}`);
        }
        const profileData: ProfileUser = await profileResponse.json();
        setProfileUserId(profileData.id); // Simpan profile_user ID

        const portfolioUrl = `${process.env.NEXT_PUBLIC_API_URL}/portofolio/${portfolioId}`;
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

        const data = await response.json();

        const mappedItem: PortfolioItem = {
          id: data.id,
          title: data.nama_projek,
          image: data.gambar,
          category: data.kategori,
          tags: data.tags.map((tag: { nama: string }) => tag.nama),
          date: data.created_at,
          description: data.deskripsi,
          tahun: data.tahun,
          links: data.detail_project.map((detail: { judul_link: string; link_project: string }) => ({
            title: detail.judul_link,
            url: detail.link_project,
          })),
          teamMembers: data.anggota.map((member: { name: string; role: string; nim: string }) => ({
            name: member.name,
            role: member.role,
            nim: member.nim,
          })),
          creator: data.creator,
        };

        setPortfolioItem(mappedItem);
        setStatus(data.status || "Belum di Verifikasi");

        // Cek apakah ada status verifikasi yang sudah ada
        const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status-verifikasi/${portfolioId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (verificationResponse.ok) {
          const verificationData = await verificationResponse.json();
          setVerificationId(verificationData.UniqueID);
          setStatus(verificationData.status || "Belum di Verifikasi");
          setNote(verificationData.note || "");
        }

        // Jika status bukan "Proses Verifikasi", atur menjadi "Proses Verifikasi" saat dibuka oleh admin
        if (status !== "Proses Verifikasi") {
          await updateStatusToInProgress(token, portfolioId, userId, profileUserId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    const updateStatusToInProgress = async (token: string, portfolioId: string, userId: string, profileUserId: string | null) => {
      try {
        const payloadData = {
          id_portofolio: portfolioId,
          status: "Proses Verifikasi",
          updated_by: userId,
          profile_user: profileUserId,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status-verifikasi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payloadData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to update status to Proses Verifikasi:", errorText);
          throw new Error(`Failed to update status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setVerificationId(data.UniqueID);
        setStatus("Proses Verifikasi");
      } catch (err) {
        console.error("Error updating status to Proses Verifikasi:", err);
      }
    };

    fetchData();
  }, [portfolioId]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token || !portfolioId || !profileUserId) {
      alert("No token, portfolio ID, or profile user ID found. Please log in and try again.");
      return;
    }

    try {
      let updatedBy = null;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        updatedBy = payload.user_id || payload.sub;
        console.log("Decoded user_id from token:", updatedBy);
      } catch (decodeError) {
        console.error("Failed to decode token:", decodeError);
      }
      if (!updatedBy) {
        throw new Error("User ID not found in token. Please log in again.");
      }

      const payloadData = {
        id_portofolio: portfolioId,
        status: status,
        note: note || undefined,
        updated_by: updatedBy,
        profile_user: profileUserId,
      };

      let response;
      if (!verificationId) {
        const statusVerifikasiUrl = `${process.env.NEXT_PUBLIC_API_URL}/status-verifikasi`;
        console.log("Sending POST request with payload:", payloadData);
        response = await fetch(statusVerifikasiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payloadData),
        });
      } else {
        const statusVerifikasiUrl = `${process.env.NEXT_PUBLIC_API_URL}/status-verifikasi/${verificationId}`;
        console.log("Sending PUT request with payload:", payloadData);
        response = await fetch(statusVerifikasiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: status,
            updated_by: updatedBy,
            profile_user: profileUserId,
            note: note || undefined,
          }),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to update status verifikasi: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      if (!verificationId) {
        setVerificationId(data.UniqueID);
      }

      alert("Portfolio status updated successfully!");
      router.push("/dashboard-super-admin");
    } catch (err) {
      console.error("Error updating status:", err);
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
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Belum di Verifikasi">Belum di Verifikasi</option>
                <option value="Terverifikasi">Terverifikasi</option>
                <option value="Perlu Perubahan">Perlu Perubahan</option>
              </select>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 hover:scale-110 transition"
                onClick={handleSave}
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

          <VerificationStatus status={status} note={note} />

          <div className="mt-12">
            <label className="text-white text-2xl font-semibold block mb-4">Note</label>
            <textarea
              className="text-lg w-full h-32 bg-transparent border border-gray-200 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Write down the notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
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