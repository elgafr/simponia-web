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
import Footer from "@/components/landing-page/Footer";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TeamMember {
  id: number;
  name: string;
  nim: string;
  role: string;
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

export default function PortfolioPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('projectName');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Elga Putri", nim: "202210370311449", role: "" }
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

  const sections = {
    projectName: useRef<HTMLDivElement>(null!),
    category: useRef<HTMLDivElement>(null!),
    profile: useRef<HTMLDivElement>(null!),
    teamProject: useRef<HTMLDivElement>(null!),
    detailProject: useRef<HTMLDivElement>(null!),
  };

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
      role: ""
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

  const handlePreview = () => {
    router.push('/preview');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 120px offset for navbar and some padding

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
  }, []);

  const getButtonClass = (sectionName: string) => {
    return `w-full text-left px-4 py-2 rounded-lg transition-colors ${
      activeSection === sectionName
        ? 'text-white bg-blue-500'
        : 'text-gray-300 hover:bg-white/5'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Side Menu */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sticky top-24">
                <h2 className="text-white font-semibold mb-4">Side Menu</h2>
                <nav className="space-y-2">
                  <button 
                    onClick={() => scrollToSection(sections.projectName, 'projectName')}
                    className={getButtonClass('projectName')}
                  >
                    Nama Project
                  </button>
                  <button 
                    onClick={() => scrollToSection(sections.category, 'category')}
                    className={getButtonClass('category')}
                  >
                    Kategori
                  </button>
                  <button 
                    onClick={() => scrollToSection(sections.profile, 'profile')}
                    className={getButtonClass('profile')}
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => scrollToSection(sections.teamProject, 'teamProject')}
                    className={getButtonClass('teamProject')}
                  >
                    Team Project
                  </button>
                  <button 
                    onClick={() => scrollToSection(sections.detailProject, 'detailProject')}
                    className={getButtonClass('detailProject')}
                  >
                    Detail Project
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Nama Project Section */}
              <div ref={sections.projectName} className="mb-8 scroll-mt-24">
                <h2 className="text-xl font-semibold text-white mb-4">Nama Project</h2>
                <RequiredLabel>Judul Project</RequiredLabel>
                <Input
                  placeholder="Judul"
                  className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Kategori Section */}
              <div ref={sections.category} className="mb-8 scroll-mt-24">
                <h2 className="text-xl font-semibold text-white mb-4">Kategori</h2>
                <RequiredLabel>Kategori Bidang Minat</RequiredLabel>
                <Select>
                  <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
                    <SelectValue placeholder="Pilih Kategori Bidang Minat" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#001233] border-[#001B45]">
                    <SelectItem value="rpl" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Rekayasa Perangkat Lunak</SelectItem>
                    <SelectItem value="game" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Game Intelligence</SelectItem>
                    <SelectItem value="data" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Data Science</SelectItem>
                    <SelectItem value="network" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Network and Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Profile Section */}
              <div ref={sections.profile} className="mb-8 scroll-mt-24">
                <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-2">Nama Lengkap</p>
                    <Input
                      value="Elga Putri"
                      disabled
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">NIM</p>
                    <Input
                      value="202210370311449"
                      disabled
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">Email</p>
                    <Input
                      value="elga@email.com"
                      disabled
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">Angkatan</p>
                    <Input
                      value="22"
                      disabled
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Team Project Section */}
              <div ref={sections.teamProject} className="mb-8 scroll-mt-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Team Project</h2>
                  <Button 
                    onClick={handleAddMember}
                    variant="outline" 
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Member
                  </Button>
                </div>
                <div className="space-y-6">
                  {teamMembers.map((member, index) => (
                    <div key={member.id} className="flex gap-6">
                      <div className="flex-1">
                        <RequiredLabel>Nama Lengkap</RequiredLabel>
                        <Input
                          value={member.name}
                          disabled={index === 0}
                          onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                          className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                          placeholder={index === 0 ? "" : "Masukkan Nama Lengkap"}
                        />
                      </div>
                      <div className="flex-1">
                        <RequiredLabel>NIM</RequiredLabel>
                        <Input
                          value={member.nim}
                          disabled={index === 0}
                          onChange={(e) => handleMemberChange(member.id, 'nim', e.target.value)}
                          className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                          placeholder={index === 0 ? "" : "Masukkan NIM"}
                        />
                      </div>
                      <div className="flex-1">
                        <RequiredLabel>Role</RequiredLabel>
                        <Input
                          value={member.role}
                          onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                          className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                          placeholder="Masukkan Role"
                        />
                      </div>
                      {index > 0 && (
                        <div className="flex items-end">
                          <Button
                            onClick={() => handleDeleteMember(member.id)}
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-10 w-10 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {index === 0 && <div className="w-10" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Project Section */}
              <div ref={sections.detailProject} className="mb-8 scroll-mt-24">
                <h2 className="text-xl font-semibold text-white mb-4">Detail Project</h2>
                <div className="space-y-6">
                  <div>
                    <RequiredLabel>Tahun Project Dibuat</RequiredLabel>
                    <Input
                      placeholder="Masukkan Tahun Project Dibuat"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-6">
                    {projectLinks.map((link) => (
                      <div key={link.id} className="flex gap-6">
                        <div className="flex-1">
                          <RequiredLabel>Judul Link</RequiredLabel>
                          <Input
                            value={link.title}
                            onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                            placeholder="Masukkan Judul Link"
                          />
                        </div>
                        <div className="flex-1">
                          <RequiredLabel>Link Project</RequiredLabel>
                          <Input
                            value={link.url}
                            onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                            placeholder="Masukkan Link Project"
                          />
                        </div>
                        {projectLinks.length > 1 && (
                          <div className="flex items-end">
                            <Button
                              onClick={() => handleDeleteLink(link.id)}
                              variant="ghost"
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-10 w-10 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        {projectLinks.length === 1 && <div className="w-10" />}
                      </div>
                    ))}
                    <Button 
                      onClick={handleAddLink}
                      variant="outline" 
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Link
                    </Button>
                  </div>

                  <div>
                    <RequiredLabel>Tag</RequiredLabel>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <div
                            key={tag.id}
                            className="flex items-center gap-1 bg-blue-500/20 text-white px-2 py-1 rounded-lg"
                          >
                            <span>{tag.text}</span>
                            <button
                              onClick={() => handleTagDelete(tag.id)}
                              className="text-white/80 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Ketik tag dan tekan enter"
                        className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <RequiredLabel>Description</RequiredLabel>
                    <Textarea
                      placeholder="Description"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400 min-h-[150px]"
                    />
                  </div>

                  <div>
                    <RequiredLabel>Image</RequiredLabel>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      onClick={handleImageClick}
                      className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {projectImage.preview ? (
                        <div className="relative aspect-video w-full">
                          <img
                            src={projectImage.preview}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="h-16 w-16 mb-4" />
                          <p>Click to upload image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button 
                      variant="outline" 
                      className="bg-blue-500 text-white hover:bg-blue-600 border-0"
                      onClick={handlePreview}
                    >
                      Preview Portfolio
                    </Button>
                    <Button className="bg-green-500 text-white hover:bg-green-600">
                      Submit Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
