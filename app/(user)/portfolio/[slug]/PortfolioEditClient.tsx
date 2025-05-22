'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/user/landing-page/Footer";
import { SideMenu } from "@/components/user/portfolio/SideMenu";
import { ProjectNameSection } from "@/components/user/portfolio/ProjectNameSection";
import { CategorySection } from "@/components/user/portfolio/CategorySection";
import { ProfileSection } from "@/components/user/portfolio/ProfileSection";
import { TeamProjectSection } from "@/components/user/portfolio/TeamProjectSection";
import { DetailProjectSection } from "@/components/user/portfolio/DetailProjectSection";
import { Maximize2, Minimize2 } from "lucide-react";

// Data dummy untuk contoh
const dummyData = {
  id: 1,
  title: "UI/UX Healthy Application",
  category: "UI/UX Design",
  profile: {
    name: "Elga Putri",
    nim: "202210370311449",
    email: "elga@email.com",
    angkatan: "22"
  },
  teamMembers: [
    { id: 1, name: "Elga Putri", nim: "202210370311449", role: "UI/UX Designer" }
  ],
  reviewerNotes: [
    "Judulnya kurang tepat, diperbaiki lagi. lorem ipsum lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    "Judulnya kurang tepat, diperbaiki lagi. lorem ipsum lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  ]
};

const menuItems = [
  { id: 'projectName', label: 'Nama Project' },
  { id: 'category', label: 'Kategori' },
  { id: 'profile', label: 'Profile' },
  { id: 'teamProject', label: 'Team Project' },
  { id: 'detailProject', label: 'Detail Project' },
];

interface PortfolioEditClientProps {
  slug: string;
}

export default function PortfolioEditClient({ slug }: PortfolioEditClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('projectName');
  const [teamMembers, setTeamMembers] = useState(
    Array.isArray(dummyData.teamMembers) && dummyData.teamMembers.length > 0
      ? dummyData.teamMembers
      : [{ id: 1, name: "", nim: "", role: "" }]
  );
  const [projectLinks, setProjectLinks] = useState([{ id: 1, title: "", url: "" }]);
  const [tags, setTags] = useState<{ id: number; text: string; }[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [projectImage, setProjectImage] = useState<{ file: File | null; preview: string; }>({
    file: null,
    preview: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [showReviewerNotes, setShowReviewerNotes] = useState(true);

  // Tambahkan ref untuk validasi scroll
  const nameRef = useRef<HTMLDivElement>(null!);
  const categoryRef = useRef<HTMLDivElement>(null!);
  const profileRef = useRef<HTMLDivElement>(null!);
  const teamRef = useRef<HTMLDivElement>(null!);
  const detailRef = useRef<HTMLDivElement>(null!);

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
    const newMember = {
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

  const handleMemberChange = (id: number, field: keyof typeof teamMembers[0], value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleAddLink = () => {
    const newLink = {
      id: projectLinks.length + 1,
      title: "",
      url: ""
    };
    setProjectLinks([...projectLinks, newLink]);
  };

  const handleDeleteLink = (id: number) => {
    if (projectLinks.length === 1) return;
    setProjectLinks(projectLinks.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: number, field: keyof typeof projectLinks[0], value: string) => {
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

  // Validasi field wajib
  const validateAndScroll = () => {
    if (!dummyData.title && !projectLinks[0].title) {
      setWarning("Nama project harus diisi.");
      nameRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!dummyData.category) {
      setWarning("Kategori harus diisi.");
      categoryRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!dummyData.profile?.name || !dummyData.profile?.nim) {
      setWarning("Profil (nama/NIM) harus diisi.");
      profileRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!tags || tags.length === 0) {
      setWarning("Minimal satu tag harus diisi.");
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    if (!projectLinks || projectLinks.length === 0 || !projectLinks[0].title || !projectLinks[0].url) {
      setWarning("Minimal satu link project harus diisi.");
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    setWarning(null);
    return true;
  };

  // Update handlePreview
  const handlePreview = () => {
    if (validateAndScroll()) {
      router.push('/preview');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-8 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Banner: Perlu Perubahan */}
          <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs text-white bg-yellow-500">
                Perlu Perubahan
              </span>
              <span className="text-white">
                Portfolio Anda memerlukan beberapa perbaikan
              </span>
            </div>
          </div>

          {/* Reviewer Notes Popup */}
          {showReviewerNotes && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-yellow-500/20 rounded-xl p-6 max-w-2xl w-full mx-4 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-2xl font-semibold">Catatan Reviewer</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowReviewerNotes(false)}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <Minimize2 size={24} />
                    </button>
                  </div>
                </div>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {dummyData.reviewerNotes.map((note, index) => (
                    <div key={index} className="flex gap-3 text-white text-xl">
                      <span className="flex-shrink-0">•</span>
                      <div className="flex-grow">{note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <SideMenu 
                  activeSection={activeSection}
                  scrollToSection={scrollToSection}
                  sections={sections}
                  menuItems={menuItems}
                />
                
                {/* Reviewer Notes in sidebar with maximize button */}
                {!showReviewerNotes && (
                  <div className="relative">
                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-white text-lg font-semibold">Catatan Reviewer</h3>
                        <button 
                          onClick={() => setShowReviewerNotes(true)}
                          className="text-white hover:text-gray-300 transition-colors"
                        >
                          <Maximize2 size={20} />
                        </button>
                      </div>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {dummyData.reviewerNotes.map((note, index) => (
                          <div
                            key={index}
                            className="flex gap-3 text-white p-3 rounded-lg text-md"
                          >
                            <span className="flex-shrink-0">•</span>
                            <div className="flex-grow">{note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow min-h-screen">
              <div className="space-y-8">
                <div ref={nameRef}>
                  <ProjectNameSection sectionRef={sections.projectName} />
                </div>
                <div ref={categoryRef}>
                  <CategorySection sectionRef={sections.category} />
                </div>
                <div ref={profileRef}>
                  <ProfileSection sectionRef={sections.profile} />
                </div>
                <div ref={teamRef}>
                  <TeamProjectSection 
                    sectionRef={sections.teamProject}
                    teamMembers={Array.isArray(teamMembers) ? teamMembers : []}
                    onAddMember={handleAddMember}
                    onDeleteMember={handleDeleteMember}
                    onMemberChange={handleMemberChange}
                  />
                </div>
                <div ref={detailRef}>
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
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={handlePreview}
                  >
                    Preview Portfolio
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => {
                      // TODO: Ganti dengan handleSubmit jika sudah ada
                      alert('Submit Portfolio (implementasi handleSubmit di sini)');
                    }}
                  >
                    Submit Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 