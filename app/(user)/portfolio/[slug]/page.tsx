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
import { ReviewerNotes } from "@/components/user/portfolio/ReviewerNotes";

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
    "Judulnya kurang tepat, diperbaiki lagi",
    
  ]
};

const menuItems = [
  { id: 'projectName', label: 'Nama Project' },
  { id: 'category', label: 'Kategori' },
  { id: 'profile', label: 'Profile' },
  { id: 'teamProject', label: 'Team Project' },
  { id: 'detailProject', label: 'Detail Project' },
];

export default function EditPortfolioPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('projectName');
  const [teamMembers, setTeamMembers] = useState(dummyData.teamMembers);
  const [projectLinks, setProjectLinks] = useState([{ id: 1, title: "", url: "" }]);
  const [tags, setTags] = useState<{ id: number; text: string; }[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [projectImage, setProjectImage] = useState<{ file: File | null; preview: string; }>({
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

  const handlePreview = () => {
    router.push('/preview');
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
  }, [sections]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Banner */}
          <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs text-white bg-yellow-500">
                Perlu Perubahan
              </span>
              <span className="text-white">
                Portfolio Anda memerlukan beberapa perbaikan
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="w-64 flex-shrink-0 space-y-6">
              <SideMenu 
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                sections={sections}
                menuItems={menuItems}
              />
              
              {/* Reviewer Notes */}
              <ReviewerNotes notes={dummyData.reviewerNotes} />
            </div>

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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 