'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/user/landing-page/Footer";
import { SideMenu } from "@/components/user/portfolio/SideMenu";
import { ProjectNameSectionEdit } from "@/components/user/portfolio/edit/ProjectNameSectionEdit";
import { CategorySectionEdit } from "@/components/user/portfolio/edit/CategorySectionEdit";
import { ProfileSectionEdit } from "@/components/user/portfolio/edit/ProfileSectionEdit";
import { TeamProjectSectionEdit } from "@/components/user/portfolio/edit/TeamProjectSectionEdit";
import { DetailProjectSectionEdit } from "@/components/user/portfolio/edit/DetailProjectSectionEdit";
import { Maximize2, Minimize2, AlertCircle } from "lucide-react";
import { useEditPortfolioStore } from '@/store/editPortfolioStore';
import { Select, SelectItem } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Dummy data for testing notes
const dummyNotes = [
  "Judulnya kurang tepat, diperbaiki lagi. Pastikan judul mencerminkan isi dari portfolio dengan lebih baik.",
  "Deskripsi project perlu ditambahkan lebih detail, terutama pada bagian metodologi dan hasil yang dicapai.",
  "Tambahkan screenshot atau gambar yang lebih relevan untuk mendukung penjelasan project.",
  "Link project tidak dapat diakses, mohon periksa kembali URL yang diberikan.",
  "Perbaiki format penulisan pada bagian team members, pastikan konsisten."
];

interface VerificationStatus {
  id: string;
  nama_projek: string;
  kategori: string;
  tahun: number;
  status: string;
  gambar: string;
  deskripsi: string;
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
  created_at: string;
  updated_at: string;
  anggota: Array<{
    id: string;
    role: string;
    nim: string;
    angkatan: string;
    id_user: string;
    name: string;
  }>;
  detail_project: Array<{
    id: string;
    judul_link: string;
    link_project: string;
    created_at: string;
    updated_at: string;
  }>;
  tags: Array<{
    id: string;
    nama: string;
    created_at: string;
    updated_at: string;
  }>;
}

const menuItems = [
  { id: 'projectName', label: 'Nama Project' },
  { id: 'category', label: 'Kategori' },
  { id: 'profile', label: 'Profile' },
  { id: 'teamProject', label: 'Team Project' },
  { id: 'detailProject', label: 'Detail Project' },
];

interface PortfolioData {
  id: string;
  nama_projek: string;
  kategori: string;
  tahun: number;
  status: string;
  gambar: string | null;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  anggota: Array<{
    id: string;
    role: string;
    nim: string;
    angkatan: string;
    id_user: string;
    name: string;
  }>;
  detail_project: Array<{
    id: string;
    judul_link: string;
    link_project: string;
    created_at: string;
    updated_at: string;
  }>;
  tags: Array<{
    id: string;
    nama: string;
    created_at: string;
    updated_at: string;
  }>;
  creator: {
    user_id: string;
    nim: string;
    name: string;
    role: string;
  };
}

interface User {
  id: string;
  nim: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface TeamMember {
  id: number;
  name: string;
  nim: string;
  role: string;
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

interface PortfolioEditClientProps {
  slug: string;
}

export default function PortfolioEditClient({ slug }: PortfolioEditClientProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('projectName');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "", nim: "", role: "", angkatan: "", userId: "" }
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
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [warning, setWarning] = useState<string | null>(null);
  const [showReviewerNotes, setShowReviewerNotes] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reviewerNotes, setReviewerNotes] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState<string>('');

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

  // Get data from store
  const title = useEditPortfolioStore((state) => state.title);
  const category = useEditPortfolioStore((state) => state.category);
  const year = useEditPortfolioStore((state) => state.year);
  const description = useEditPortfolioStore((state) => state.description);
  const storedTags = useEditPortfolioStore((state) => state.tags);
  const storedProjectLinks = useEditPortfolioStore((state) => state.projectLinks);
  const contact = useEditPortfolioStore((state) => state.contact);
  const storedTeamMembers = useEditPortfolioStore((state) => state.teamMembers);
  const storedProjectImage = useEditPortfolioStore((state) => state.projectImage);

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

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        // Check if we have data in store
        const storeData = useEditPortfolioStore.getState();
        const hasStoreData = storeData.teamMembers && storeData.teamMembers.length > 0;

        // If we have store data, use it to populate local state
        if (hasStoreData) {
          console.log('Using data from store');
          setTeamMembers(storeData.teamMembers.map((member, index) => ({
            id: index + 1,
            ...member
          })));
          setProjectLinks(storeData.projectLinks.map((link, index) => ({
            id: index + 1,
            ...link
          })));
          setTags(storeData.tags.map((tag, index) => ({
            id: index + 1,
            text: tag
          })));
          setProjectImage({
            file: null,
            preview: storeData.projectImage
          });
          setLoading(false);
          return;
        }
        
        // If no store data, fetch from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${slug}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data: PortfolioData = await response.json();
          console.log('Fetched portfolio data:', data);
          
          // Map the team members data correctly
          const mappedTeamMembers = data.anggota.map((member, index) => ({
            id: index + 1,
            name: member.name,
            role: member.role,
            nim: member.nim,
            angkatan: member.angkatan,
            userId: member.id_user
          }));

          // Set local state
          setTeamMembers(mappedTeamMembers);
          setProjectLinks(data.detail_project.map((link, index) => ({
            id: index + 1,
            title: link.judul_link,
            url: link.link_project
          })));
          setTags(data.tags.map((tag, index) => ({
            id: index + 1,
            text: tag.nama
          })));
          setProjectImage({
            file: null,
            preview: data.gambar ? `${process.env.NEXT_PUBLIC_API_URL}${data.gambar}` : '/portfolio-1.png'
          });

          // Update store with the fetched data
          useEditPortfolioStore.getState().setPortfolioData({
            title: data.nama_projek,
            category: data.kategori,
            year: data.tahun.toString(),
            description: data.deskripsi,
            projectImage: data.gambar ? `${process.env.NEXT_PUBLIC_API_URL}${data.gambar}` : '/portfolio-1.png',
            teamMembers: mappedTeamMembers.map(member => ({
              name: member.name,
              role: member.role,
              nim: member.nim,
              angkatan: member.angkatan,
              userId: member.userId
            })),
            projectLinks: data.detail_project.map(link => ({
              title: link.judul_link,
              url: link.link_project
            })),
            tags: data.tags.map(tag => tag.nama)
          });
        }
      } catch (err) {
        console.error('Failed to fetch portfolio data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [slug]);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No authentication token found');
          // Use dummy notes when no token is found
          setReviewerNotes(dummyNotes);
          return;
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${slug}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data: VerificationStatus = await response.json();
          console.log('Verification Status Data:', data);
          
          if (data) {
            console.log('Found portfolio data:', data);
            console.log('Portfolio Status:', data.status);
            setVerificationStatus(data);
            // For now, we'll use dummy notes since the actual notes are not in the response
            setReviewerNotes(dummyNotes);
          } else {
            console.log('No portfolio data found');
            setVerificationStatus(null);
            setReviewerNotes(dummyNotes);
          }
        } else if (response.status === 401) {
          console.log('Unauthorized: Please login again');
          setReviewerNotes(dummyNotes);
          router.push('/auth/login');
        } else {
          console.log('Failed to fetch verification status:', response.status);
          setReviewerNotes(dummyNotes);
        }
      } catch (err) {
        console.error('Failed to fetch verification status', err);
        setReviewerNotes(dummyNotes);
      }
    };

    fetchVerificationStatus();
  }, [slug, router]);

  // Add debug log for reviewerNotes state
  useEffect(() => {
    console.log('Current reviewerNotes:', reviewerNotes);
  }, [reviewerNotes]);

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

  // Handler untuk memilih user dari dropdown NIM
  const handleUserSelect = (id: number, selectedNim: string) => {
    const selectedUser = users.find(user => user.nim === selectedNim);
    if (!selectedUser) return;

    // Create updated member data
    const updatedMember = {
      id,
      userId: selectedUser.id,
      nim: selectedUser.nim,
      name: selectedUser.name,
      angkatan: selectedUser.nim.slice(0, 4),
      role: teamMembers.find(m => m.id === id)?.role || '' // Preserve existing role
    };

    // Update local state
    const updatedTeamMembers = teamMembers.map(member =>
      member.id === id ? updatedMember : member
    );
    setTeamMembers(updatedTeamMembers);

    // Update store
    useEditPortfolioStore.getState().setPortfolioData({
      teamMembers: updatedTeamMembers.map(member => ({
        name: member.name,
        role: member.role,
        nim: member.nim,
        angkatan: member.angkatan,
        userId: member.userId
      }))
    });

    // Log updates
    console.log('Selected user:', selectedUser);
    console.log('Updated member:', updatedMember);
    console.log('Updated team members in store:', useEditPortfolioStore.getState().teamMembers);
  };

  const handleMemberChange = (id: number, field: keyof TeamMember, value: string) => {
    let updatedMembers = teamMembers.map(member => {
      if (member.id === id) {
        // If changing NIM, automatically set angkatan from first 4 digits
        if (field === 'nim' && value.length >= 4) {
          return {
            ...member,
            [field]: value,
            angkatan: value.slice(0, 4)
          };
        }
        return { ...member, [field]: value };
      }
      return member;
    });

    setTeamMembers(updatedMembers);
    
    // Update store
    useEditPortfolioStore.getState().setPortfolioData({
      teamMembers: updatedMembers.map(member => ({
        name: member.name,
        role: member.role,
        nim: member.nim,
        angkatan: member.angkatan,
        userId: member.userId
      }))
    });
  };

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: "",
      nim: "",
      role: "",
      angkatan: "",
      userId: ""
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleDeleteMember = (id: number) => {
    if (id === 1) return; // Prevent deleting the first member
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    
    // Update store with new team members
    useEditPortfolioStore.getState().setPortfolioData({
      teamMembers: updatedMembers.map(member => ({
        name: member.name,
        role: member.role,
        nim: member.nim,
        angkatan: member.angkatan,
        userId: member.userId
      }))
    });
  };

  const handleLinkChange = (id: number, field: keyof typeof projectLinks[0], value: string) => {
    const updatedLinks = projectLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    setProjectLinks(updatedLinks);
    
    // Update store with new project links
    useEditPortfolioStore.getState().setPortfolioData({
      projectLinks: updatedLinks.map(link => ({
        title: link.title,
        url: link.url
      }))
    });
  };

  const handleAddLink = () => {
    const newLink = {
      id: projectLinks.length + 1,
      title: "",
      url: ""
    };
    const updatedLinks = [...projectLinks, newLink];
    setProjectLinks(updatedLinks);
    
    // Update store with new project links
    useEditPortfolioStore.getState().setPortfolioData({
      projectLinks: updatedLinks.map(link => ({
        title: link.title,
        url: link.url
      }))
    });
  };

  const handleDeleteLink = (id: number) => {
    if (projectLinks.length === 1) return;
    const updatedLinks = projectLinks.filter(link => link.id !== id);
    setProjectLinks(updatedLinks);
    
    // Update store with new project links
    useEditPortfolioStore.getState().setPortfolioData({
      projectLinks: updatedLinks.map(link => ({
        title: link.title,
        url: link.url
      }))
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = {
        id: tags.length + 1,
        text: tagInput.trim()
      };
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setTagInput('');
      
      // Update store with new tags
      useEditPortfolioStore.getState().setPortfolioData({
        tags: updatedTags.map(tag => tag.text)
      });
    }
  };

  const handleTagDelete = (id: number) => {
    const updatedTags = tags.filter(tag => tag.id !== id);
    setTags(updatedTags);
    
    // Update store with new tags
    useEditPortfolioStore.getState().setPortfolioData({
      tags: updatedTags.map(tag => tag.text)
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Create FormData for the image upload
      const formData = new FormData();
      formData.append('gambar', file);
      formData.append('nama_projek', title);
      formData.append('kategori', category);
      formData.append('tahun', year);
      formData.append('deskripsi', description);
      formData.append('status', "Belum di Verifikasi");

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${slug}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Update local state with the new image
      setProjectImage({
        file: file,
        preview: data.gambar ? `${process.env.NEXT_PUBLIC_API_URL}${data.gambar}` : '/portfolio-1.png'
      });

      // Update store with the new image
      useEditPortfolioStore.getState().setPortfolioData({
        projectImage: data.gambar ? `${process.env.NEXT_PUBLIC_API_URL}${data.gambar}` : '/portfolio-1.png'
      });

      clearError('projectImage');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Validasi field wajib
  const validateAndScroll = () => {
    const newErrors: { [key: string]: string } = {};
    let hasError = false;

    // Validate title
    if (!title) {
      newErrors.title = "Nama project harus diisi";
      hasError = true;
    }

    // Validate category
    if (!category) {
      newErrors.category = "Kategori harus diisi";
      hasError = true;
    }

    // Validate year
    if (!year) {
      newErrors.year = "Tahun project harus diisi";
      hasError = true;
    }

    // Validate description
    if (!description) {
      newErrors.description = "Deskripsi project harus diisi";
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
        newErrors[`projectLink_${link.id}_url`] = "Link project harus diisi";
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
        newErrors[`teamMember_${member.id}_role`] = "Role harus diisi";
        hasError = true;
      }
    });

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
        else if (firstErrorKey === 'year' || firstErrorKey === 'description' || firstErrorKey === 'tags' || firstErrorKey.startsWith('projectLink_')) targetSection = 'detailProject';

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

  // Update handlePreview
  const handlePreview = () => {
    if (validateAndScroll()) {
      // Store the current portfolio ID in the store
      useEditPortfolioStore.getState().setCurrentPortfolioId(slug);
      console.log('Stored portfolio ID for preview:', slug);
      router.push(`/preview/edit/${slug}`);
    }
  };

  // Update handleUpdate
  const handleUpdate = async () => {
    // Validasi
    if (!validateAndScroll()) return;

    // Get data from store
    const storeData = useEditPortfolioStore.getState();
    
    // Format data according to the required request structure
    const payload = {
      nama_projek: storeData.title,
      kategori: storeData.category,
      tahun: Number(storeData.year),
      deskripsi: storeData.description,
      anggota: storeData.teamMembers.map(member => ({
        id_user: member.userId,
        role: member.role,
        angkatan: member.angkatan
      })),
      detail_project: storeData.projectLinks.map(link => ({
        judul_link: link.title,
        link_project: link.url
      })),
      tags: storeData.tags.map(tag => ({
        nama: tag
      })),
      status: "Belum di Verifikasi"
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      setShowSuccessDialog(true);

      // Clear the store after successful update
      useEditPortfolioStore.getState().resetStore();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan saat update portfolio');
    }
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!verificationStatus?.updated_at) return '';

      const updatedDate = new Date(verificationStatus.updated_at);
      const deadline = new Date(updatedDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from updated_at
      const now = new Date();

      if (now >= deadline) {
        // If deadline has passed, update status to "Dihapus"
        const updateStatus = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${slug}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ...verificationStatus,
                status: "Dihapus"
              })
            });

            if (response.ok) {
              router.refresh();
            }
          } catch (error) {
            console.error('Error updating status:', error);
          }
        };
        updateStatus();
        return 'Waktu habis';
      }

      const diff = deadline.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${days} hari ${hours} jam ${minutes} menit`;
    };

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      if (remaining !== undefined) {
        setTimeRemaining(remaining);
      }
    }, 60000); // Update every minute

    // Initial calculation
    const initialRemaining = calculateTimeRemaining();
    if (initialRemaining !== undefined) {
      setTimeRemaining(initialRemaining);
    }

    return () => clearInterval(timer);
  }, [verificationStatus, slug, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-8 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Banner: Perlu Perubahan */}
          {verificationStatus?.status === "Perlu Perubahan" && (
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-6 mb-6 border border-yellow-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <AlertCircle className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-white bg-yellow-500">
                      Perlu Perubahan
                    </span>
                    <span className="text-sm text-yellow-200">
                      {verificationStatus?.updated_at ? new Date(verificationStatus.updated_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }) : ''}
                    </span>
                  </div>
                  <p className="text-white text-lg mb-2">
                    Portfolio Anda memerlukan beberapa perbaikan berdasarkan catatan reviewer. Silakan periksa catatan reviewer di sebelah kiri untuk detail perbaikan yang diperlukan.
                  </p>
                  <p className="text-yellow-200 text-sm">
                    Sisa waktu untuk melakukan perubahan: <span className="font-semibold">{timeRemaining}</span>
                  </p>
                  <p className="text-yellow-200 text-sm mt-1">
                    Jika tidak diupdate dalam 3 hari, portfolio akan otomatis dihapus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviewer Notes Popup */}
          {showReviewerNotes && reviewerNotes.length > 0 && (
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
                  {reviewerNotes.map((note, index) => (
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
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs text-white bg-red-500">
                  Wajib diisi
                </span>
                <span className="text-white">
                  {Object.values(errors)[0]}
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
                {!showReviewerNotes && reviewerNotes.length > 0 && (
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
                        {reviewerNotes.map((note, index) => (
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
                <div>
                  <ProjectNameSectionEdit 
                    sectionRef={sections.projectName} 
                    errors={errors}
                    onTitleChange={(value) => {
                      useEditPortfolioStore.getState().setPortfolioData({ title: value });
                      clearError('title');
                    }}
                  />
                </div>
                <div>
                  <CategorySectionEdit 
                    sectionRef={sections.category}
                    errors={errors}
                    onCategoryChange={(value) => {
                      useEditPortfolioStore.getState().setPortfolioData({ category: value });
                      clearError('category');
                    }}
                  />
                </div>
                <div>
                  <ProfileSectionEdit 
                    sectionRef={sections.profile}
                    errors={errors}
                  />
                </div>
                <div>
                  <TeamProjectSectionEdit 
                    sectionRef={sections.teamProject}
                    teamMembers={Array.isArray(teamMembers) ? teamMembers : []}
                    onAddMember={handleAddMember}
                    onDeleteMember={handleDeleteMember}
                    onMemberChange={handleMemberChange}
                    users={users}
                    onUserSelect={handleUserSelect}
                    errors={errors}
                  />
                </div>
                <div>
                  <DetailProjectSectionEdit 
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
                    errors={errors}
                    onYearChange={(value) => {
                      useEditPortfolioStore.getState().setPortfolioData({ year: value });
                      clearError('year');
                    }}
                    onDescriptionChange={(value) => {
                      useEditPortfolioStore.getState().setPortfolioData({ description: value });
                      clearError('description');
                    }}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <Button 
                    variant="outline" 
                    className="bg-blue-500 text-white hover:bg-blue-600 border-0 hover:text-white"
                    onClick={handlePreview}
                  >
                    Preview Portfolio
                  </Button>
                  <Button className="bg-green-500 text-white hover:bg-green-600" onClick={handleUpdate}>
                    Update Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-[#001233] border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Berhasil!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Portfolio Anda berhasil diupdate dan sedang menunggu verifikasi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => router.push(`/showcase/${slug}`)}
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