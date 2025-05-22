'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, Plus, Trash2, X } from "lucide-react";
import Footer from "@/components/user/landing-page/Footer";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SideMenu } from "@/components/user/portfolio/SideMenu";
import { ProjectNameSection } from "@/components/user/portfolio/ProjectNameSection";
import { CategorySection } from "@/components/user/portfolio/CategorySection";
import { ProfileSection } from "@/components/user/portfolio/ProfileSection";
import { TeamProjectSection } from "@/components/user/portfolio/TeamProjectSection";
import { DetailProjectSection } from "@/components/user/portfolio/DetailProjectSection";
import { usePortfolioStore } from "@/store/portfolioStore";

interface TeamMember {
  id: number;
  name: string;
  nim: string;
  role: string;
  id_user: string;
  angkatan?: string;
}

interface ProjectLink {
  id: number;
  title: string;
  url: string;
}

interface Tag {
  id: number;
  text: string;
}

interface ProjectImage {
  file: File | null;
  preview: string;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-1 text-gray-300 mb-2">
    {children}
    <span className="text-red-500">*</span>
  </div>
);

const menuItems = [
  { id: 'projectName', label: 'Nama Project' },
  { id: 'category', label: 'Kategori' },
  { id: 'profile', label: 'Profile' },
  { id: 'teamProject', label: 'Team Project' },
  { id: 'detailProject', label: 'Detail Project' },
];

export default function PortfolioClient() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('projectName');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "", nim: "", role: "", id_user: "" }
  ]);
  const [projectLinks, setProjectLinks] = useState<ProjectLink[]>([
    { id: 1, title: "", url: "" }
  ]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [projectImage, setProjectImage] = useState<ProjectImage>({
    file: null,
    preview: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const sections = {
    projectName: useRef<HTMLDivElement>(null!),
    category: useRef<HTMLDivElement>(null!),
    profile: useRef<HTMLDivElement>(null!),
    teamProject: useRef<HTMLDivElement>(null!),
    detailProject: useRef<HTMLDivElement>(null!),
  };

  const topRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, sectionName: string) => {
    if (ref.current) {
      const navbarHeight = 96;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionName);
    }
  };

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: "",
      nim: "",
      role: "",
      id_user: "",
      angkatan: "",
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleDeleteMember = (id: number) => {
    if (id === 1) return; // Prevent deleting the first member
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleMemberChange = (id: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleAddLink = () => {
    const newLink: ProjectLink = {
      id: projectLinks.length + 1,
      title: "",
      url: ""
    };
    setProjectLinks([...projectLinks, newLink]);
  };

  const handleDeleteLink = (id: number) => {
    if (projectLinks.length === 1) return; // Prevent deleting the last link
    setProjectLinks(projectLinks.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: number, field: keyof ProjectLink, value: string) => {
    setProjectLinks(projectLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = {
        id: tags.length + 1,
        text: tagInput.trim()
      };
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleTagDelete = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage({
          file,
          preview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const nameRef = useRef<HTMLDivElement>(null!);
  const categoryRef = useRef<HTMLDivElement>(null!);
  const profileRef = useRef<HTMLDivElement>(null!);
  const teamRef = useRef<HTMLDivElement>(null!);
  const detailRef = useRef<HTMLDivElement>(null!);

  const title = usePortfolioStore((state) => state.title);
  const category = usePortfolioStore((state) => state.category);
  const year = usePortfolioStore((state) => state.year);
  const description = usePortfolioStore((state) => state.description);
  const storedTags = usePortfolioStore((state) => state.tags);
  const storedProjectLinks = usePortfolioStore((state) => state.projectLinks);
  const contact = usePortfolioStore((state) => state.contact);
  const storedTeamMembers = usePortfolioStore((state) => state.teamMembers);
  const storedProjectImage = usePortfolioStore((state) => state.projectImage);

  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);

  // Load data from store when component mounts
  useEffect(() => {
    if (storedTags.length > 0) {
      setTags(storedTags.map((text, index) => ({ id: index + 1, text })));
    }
    if (storedProjectLinks.length > 0) {
      setProjectLinks(storedProjectLinks.map((link, index) => ({ id: index + 1, ...link })));
    }
    if (storedTeamMembers.length > 0) {
      setTeamMembers(
        storedTeamMembers.map((member, index) => ({
          id: index + 1,
          name: member.name,
          role: member.role,
          nim: member.nim,
          id_user: member.name ?? "",
          
        }))
      );
    }
    if (storedProjectImage) {
      setProjectImage({ file: null, preview: storedProjectImage });
    }
  }, []);

  // Sync local state with store
  useEffect(() => {
    setPortfolioData({
      tags: tags.map(tag => tag.text),
      projectLinks: projectLinks.map(link => ({ title: link.title, url: link.url })),
      projectImage: projectImage.preview || '',
      teamMembers: teamMembers.map(member => ({ name: member.name, role: member.role, nim: member.nim }))
    });
  }, [tags, projectLinks, projectImage, teamMembers]);

  useEffect(() => {
    // Fetch profile user
    const fetchProfile = async () => {
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
          // Set baris pertama teamMembers dengan data user
          setTeamMembers((prev) => [
            {
              ...prev[0],
              name: data.nama || "",
              nim: data.user?.nim || "",
              role: prev[0].role || "", // biarkan role bisa diisi user
              id_user: data.user?.id || "",
              angkatan: data.user?.angkatan || ""
            },
            ...prev.slice(1)
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch profile user', err);
      }
    };
    fetchProfile();
  }, []);

  const validateAndScroll = () => {
    const navbarHeight = 96; // Height of the navbar

    if (!title) {
      setWarning("Nama project harus diisi.");
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight); // Add offset for navbar
      return false;
    }
    if (!category) {
      setWarning("Kategori harus diisi.");
      categoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight);
      return false;
    }
    if (!contact?.name || !contact?.id) {
      setWarning("Profil (nama/NIM) harus diisi.");
      profileRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight);
      return false;
    }
    if (!year) {
      setWarning("Tahun project harus diisi.");
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight);
      return false;
    }
    if (!description) {
      setWarning("Deskripsi project harus diisi.");
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight);
      return false;
    }
    if (!storedTags || storedTags.length === 0) {
      setWarning("Minimal satu tag harus diisi.");
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight);
      return false;
    }
    if (!storedProjectLinks || storedProjectLinks.length === 0 || !storedProjectLinks[0].title || !storedProjectLinks[0].url) {
      setWarning("Minimal satu link project harus diisi.");
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -navbarHeight);
      return false;
    }
    setWarning(null);
    return true;
  };

  const handlePreview = () => {
    if (validateAndScroll()) {
      router.push('/preview');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset navbar

      Object.entries(sections).forEach(([sectionName, ref]) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionName);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleSubmit = async () => {
    if (!validateAndScroll()) {
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // slight delay to ensure banner is rendered
      return;
    }
    // Ambil data dari state/store
    const payload = {
      nama_projek: title,
      kategori: category,
      tahun: Number(year),
      gambar: projectImage.preview, // atau nama file jika upload ke server
      deskripsi: description,
      anggota: teamMembers.map(member => ({
        id_user: member.id_user, // pastikan field ini ada di state
        role: member.role,
       
      })),
      detail_project: projectLinks.map(link => ({
        judul_link: link.title,
        link_project: link.url
      })),
      tags: tags.map(tag => ({ nama: tag.text }))
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Gagal submit portfolio');
      }
      alert('Portfolio berhasil dikirim!');
      // Redirect atau reset form jika perlu
    } catch (err) {
      alert('Terjadi kesalahan saat submit portfolio');
      console.error(err);
    }
  };

  const getButtonClass = (sectionName: string) => {
    return `w-full text-left px-4 py-2 rounded-lg 
     transition-colors duration-300 ease-in-out
     ${
       activeSection === sectionName
         ? 'text-white bg-blue-500'
         : 'text-gray-300 hover:bg-white/5'
     }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={topRef}></div>

          {/* Status Banner: Wajib diisi */}
          {warning && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs text-white bg-red-500">
                  Wajib diisi
                </span>
                <span className="text-white">
                  {warning}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-8">
            <SideMenu 
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              sections={sections}
              menuItems={menuItems}
              getButtonClass={getButtonClass}
            />

            <div className="flex-grow">
              <ProjectNameSection sectionRef={sections.projectName} />
              <CategorySection sectionRef={sections.category} />
              <ProfileSection sectionRef={sections.profile} />
              <TeamProjectSection 
                sectionRef={sections.teamProject}
                teamMembers={teamMembers}
                onAddMember={handleAddMember}
                onDeleteMember={handleDeleteMember}
                onMemberChange={handleMemberChange}
              />
              <DetailProjectSection 
                sectionRef={sections.detailProject}
                projectLinks={projectLinks}
                tags={tags}
                tagInput={tagInput}
                projectImage={projectImage}
                fileInputRef={fileInputRef}
                onAddLink={handleAddLink}
                onDeleteLink={handleDeleteLink}
                onLinkChange={handleLinkChange}
                onTagInputChange={setTagInput}
                onTagKeyDown={handleTagKeyDown}
                onTagDelete={handleTagDelete}
                onImageClick={handleImageClick}
                onImageChange={handleImageChange}
                onPreview={handlePreview}
              />
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8">
                <Button 
                  variant="outline" 
                  className="bg-blue-500 text-white hover:bg-blue-600 border-0 hover:text-white"
                  onClick={handlePreview}
                >
                  Preview Portfolio
                </Button>
                <Button className="bg-green-500 text-white hover:bg-green-600" onClick={handleSubmit}>
                  Submit Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 