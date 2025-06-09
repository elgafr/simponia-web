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
import { ImageIcon, Plus, Trash2, X, Trash } from "lucide-react";
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
import { redirect } from 'next/navigation';
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
  id: number;
  name: string;
  nim: string;
  role: string;
  id_user: string;
  angkatan: string;
  userId: string;
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

interface User {
  id: string;
  nim: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
  selected?: boolean;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-1 text-gray-300 mb-2">
    {children}
    <span className="text-red-500">*</span>
  </div>
);

const menuItems = [
  { id: 'projectName', label: 'Nama Proyek' },
  { id: 'category', label: 'Kategori' },
  { id: 'profile', label: 'Profil' },
  { id: 'teamProject', label: 'Tim Proyek' },
  { id: 'detailProject', label: 'Detail Proyek' },
];

export default function PortfolioClient() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('projectName');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "", nim: "", role: "", id_user: "", angkatan: "", userId: "" }
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
  const [users, setUsers] = useState<User[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedPortfolioId, setSubmittedPortfolioId] = useState<string | null>(null);

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
      id: Date.now(),
      name: "",
      nim: "",
      role: "",
      id_user: "",
      angkatan: "",
      userId: ""
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
    clearError(`teamMember_${id}_${field}`);
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
    clearError(`projectLink_${id}_${field}`);
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
        clearError('projectImage');
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

  const validateAndScroll = () => {
    const newErrors: { [key: string]: string } = {};
    let hasError = false;

    // Validate title
    if (!title) {
      newErrors.title = "Nama proyek harus diisi";
      hasError = true;
    }

    // Validate category
    if (!category) {
      newErrors.category = "Kategori harus diisi";
      hasError = true;
    }

    // Validate contact
    if (!contact?.name || !contact?.id) {
      newErrors.contact = "Profil (nama/NIM) harus diisi";
      hasError = true;
    }

    // Validate year
    if (!year) {
      newErrors.year = "Tahun proyek harus diisi";
      hasError = true;
    }

    // Validate description
    if (!description) {
      newErrors.description = "Deskripsi proyek harus diisi";
      hasError = true;
    }

    // Validate tags
    if (!tags || tags.length === 0) {
      newErrors.tags = "Minimal satu tag harus diisi";
      hasError = true;
    }

    // Validate project links
    projectLinks.forEach((link, index) => {
      if (!link.title.trim()) {
        newErrors[`projectLink_${link.id}_title`] = "Judul link harus diisi";
        hasError = true;
      }
      if (!link.url.trim()) {
        newErrors[`projectLink_${link.id}_url`] = "Link proyek harus diisi";
        hasError = true;
      }
    });

    // Validate team members
    teamMembers.forEach((member, index) => {
      if (!member.nim) {
        newErrors[`teamMember_${member.id}_nim`] = "Nama/NIM harus diisi";
        hasError = true;
      }
      if (!member.role) {
        newErrors[`teamMember_${member.id}_role`] = "Peran harus diisi";
        hasError = true;
      }
    });

    // Validate project image
    if (!projectImage.file) {
      newErrors.projectImage = "Gambar proyek harus diisi";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      // Urutan prioritas untuk field yang harus divalidasi
      const errorPriority = [
        'title',
        'category',
        'teamMember_1_role',
        'teamMember_1_nim',
        'year',
        'description',
        'tags',
        'projectImage',
        'projectLink_'
      ];

      // Cari error pertama berdasarkan prioritas
      let firstErrorKey = '';
      for (const key of errorPriority) {
        if (newErrors[key]) {
          firstErrorKey = key;
          break;
        }
      }

      // Jika tidak ada error dengan prioritas, cari error team member lainnya
      if (!firstErrorKey) {
        const teamMemberError = Object.keys(newErrors).find(key => key.startsWith('teamMember_'));
        if (teamMemberError) {
          firstErrorKey = teamMemberError;
        } else {
          firstErrorKey = Object.keys(newErrors)[0];
        }
      }

      if (firstErrorKey) {
        // Scroll ke section yang sesuai
        let targetSection = '';
        if (firstErrorKey === 'title') targetSection = 'projectName';
        else if (firstErrorKey === 'category') targetSection = 'category';
        else if (firstErrorKey.startsWith('teamMember_')) targetSection = 'teamProject';
        else if (firstErrorKey === 'year' || firstErrorKey === 'description' || firstErrorKey === 'tags' || firstErrorKey === 'projectImage' || firstErrorKey.startsWith('projectLink_')) targetSection = 'detailProject';

        if (targetSection && sections[targetSection as keyof typeof sections]) {
          const navbarHeight = 96;
          const elementPosition = sections[targetSection as keyof typeof sections].current?.getBoundingClientRect().top || 0;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update active section
          setActiveSection(targetSection);
        }
      }
      return false;
    }

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

  useEffect(() => {
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
          // Only set the first team member if there's no existing data
          if (!storedTeamMembers || storedTeamMembers.length === 0) {
            setTeamMembers((prev) => [
              {
                ...prev[0],
                name: data.nama || "",
                nim: data.user?.nim || "",
                role: prev[0].role || "",
                id_user: data.user?.id || "",
                angkatan: data.user?.nim?.slice(0, 4) || "",
                userId: data.user?.id || "",
              },
              ...prev.slice(1)
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile user', err);
        redirect('/auth/login');
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (storedTeamMembers && storedTeamMembers.length > 0) {
      setTeamMembers(storedTeamMembers.map((member, index) => ({
        id: index + 1,
        name: member.name,
        nim: member.nim,
        role: member.role,
        id_user: member.userId,
        angkatan: member.angkatan,
        userId: member.userId
      })));
    }

    if (storedProjectLinks && storedProjectLinks.length > 0) {
      setProjectLinks(storedProjectLinks.map((link, index) => ({
        id: index + 1,
        title: link.title,
        url: link.url
      })));
    }

    if (storedTags && storedTags.length > 0) {
      setTags(storedTags.map((tag, index) => ({
        id: index + 1,
        text: tag
      })));
    }

    if (storedProjectImage) {
      // Convert stored image URL to File object
      fetch(storedProjectImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'project-image.png', { type: 'image/png' });
          setProjectImage({
            file: file,
            preview: storedProjectImage
          });
        })
        .catch(err => {
          console.error('Error loading stored image:', err);
          setProjectImage({
            file: null,
            preview: storedProjectImage
          });
        });
    }
  }, []);

  // Add handler for user selection
  const handleUserSelect = (id: number, selectedNim: string) => {
    const selectedUser = users.find(user => user.nim === selectedNim);
    if (!selectedUser) return;

    const updatedTeamMembers = teamMembers.map(member =>
      member.id === id
        ? {
            ...member,
            name: selectedUser.name,
            nim: selectedUser.nim,
            id_user: selectedUser.id,
            userId: selectedUser.id,
            angkatan: selectedUser.nim.slice(0, 4) // Otomatis isi angkatan
          }
        : member
    );
    setTeamMembers(updatedTeamMembers);
  };

  // Add useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!validateAndScroll()) {
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      if (!projectImage.file) {
        throw new Error('Project image is required');
      }

      // Create FormData for the entire portfolio submission
      const formData = new FormData();
      formData.append('nama_projek', title);
      formData.append('kategori', category);
      formData.append('tahun', year);
      formData.append('gambar', projectImage.file);
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
        formData.append(`tags[${index}][nama]`, tag.text);
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
        console.error('Error Response Body:', errorData);
        throw new Error(errorData?.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log('Success Response Body:', data);
      setSubmittedPortfolioId(data.id);
      setShowSuccessDialog(true);

      // Clear the store after successful submission
      setPortfolioData({
        title: '',
        category: '',
        year: '',
        description: '',
        projectImage: '',
        teamMembers: [],
        projectLinks: [],
        tags: [],
        contact: undefined
      });

    } catch (err) {
      console.error('=== ERROR DETAILS ===');
      console.error('Error:', err);
      console.error('Error Stack:', err instanceof Error ? err.stack : 'No stack trace');
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan saat submit portfolio');
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

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleTitleChange = (value: string) => {
    setPortfolioData({ title: value });
    clearError('title');
  };

  const handleCategoryChange = (value: string) => {
    setPortfolioData({ category: value });
    clearError('category');
  };

  const handleYearChange = (value: string) => {
    setPortfolioData({ year: value });
    clearError('year');
  };

  const handleDescriptionChange = (value: string) => {
    setPortfolioData({ description: value });
    clearError('description');
  };

  const handleTagInputChange = (value: string) => {
    setTagInput(value);
    if (tags.length > 0) {
      clearError('tags');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={topRef}></div>

          <div className="flex justify-end mb-6">
            <Button 
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                // Clear all form data
                setTeamMembers([{ id: 1, name: "", nim: "", role: "", id_user: "", angkatan: "", userId: "" }]);
                setProjectLinks([{ id: 1, title: "", url: "" }]);
                setTags([]);
                setTagInput('');
                setProjectImage({ file: null, preview: "" });
                setErrors({});
                
                // Clear store data
                setPortfolioData({
                  title: '',
                  category: '',
                  year: '',
                  description: '',
                  projectImage: '',
                  teamMembers: [],
                  projectLinks: [],
                  tags: [],
                  contact: undefined
                });
              }}
            >
              <Trash className="h-4 w-4 mr-0" />
              Reset Portofolio
            </Button>
          </div>

          <div className="flex gap-8">
            <SideMenu 
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              sections={sections}
              menuItems={menuItems}
              getButtonClass={getButtonClass}
            />

            <div className="flex-grow">
              <ProjectNameSection 
                sectionRef={sections.projectName} 
                errors={errors} 
                onTitleChange={handleTitleChange}
              />
              <CategorySection 
                sectionRef={sections.category} 
                errors={errors}
                onCategoryChange={handleCategoryChange}
              />
              <ProfileSection 
                sectionRef={sections.profile} 
                errors={errors} 
              />
              <TeamProjectSection 
                sectionRef={sections.teamProject}
                teamMembers={teamMembers}
                onAddMember={handleAddMember}
                onDeleteMember={handleDeleteMember}
                onMemberChange={handleMemberChange}
                users={users}
                onUserSelect={handleUserSelect}
                errors={errors}
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
                onTagInputChange={handleTagInputChange}
                onTagKeyDown={handleTagKeyDown}
                onTagDelete={handleTagDelete}
                onImageClick={handleImageClick}
                onImageChange={handleImageChange}
                onPreview={handlePreview}
                errors={errors}
                onYearChange={handleYearChange}
                onDescriptionChange={handleDescriptionChange}
              />
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8">
                <Button 
                  variant="outline" 
                  className="bg-blue-500 text-white hover:bg-blue-600 border-0 hover:text-white"
                  onClick={handlePreview}
                >
                  Pratinjau Portofolio
                </Button>
                <Button className="bg-green-500 text-white hover:bg-green-600" onClick={handleSubmit}>
                  Kirim Portofolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-[#001233] border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Berhasil!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Portofolio Anda berhasil dikirim dan sedang menunggu verifikasi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => router.push(`/showcase/${submittedPortfolioId}`)}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Lihat Portofolio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 