"use client";

import { useState, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

// Function to map status to Indonesian terms
const mapStatusToIndonesian = (status: string) => {
  switch (status) {
    case "Verified":
    case "Terverifikasi":
      return "Terverifikasi";
    case "Need Revision":
    case "Perlu Perubahan":
      return "Perlu Perubahan";
    case "Unverified":
    case "Belum di Verifikasi":
      return "Belum di Verifikasi";
    default:
      return status;
  }
};

// Function to get status color
const getStatusColor = (status: string) => {
  const normalizedStatus = mapStatusToIndonesian(status);
  switch (normalizedStatus) {
    case "Terverifikasi":
      return "bg-green-200 text-green-800";
    case "Perlu Perubahan":
      return "bg-red-200 text-red-800";
    case "Belum di Verifikasi":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const ITEMS_PER_PAGE = 10;

interface PortfolioItem {
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
  };
}

interface Profile {
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

const HeroSection1Dashboard = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
  const [adminCommunityProfiles, setAdminCommunityProfiles] = useState<Profile[]>([]);
  const [superAdminProfiles, setSuperAdminProfiles] = useState<Profile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profiles from backend
  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user profiles (role 3)
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(`Failed to fetch user profiles: ${userResponse.status} - ${errorText}`);
        }

        const userData = await userResponse.json();
        setUserProfiles(Array.isArray(userData) ? userData : [userData]);

        // Fetch admin community profiles (role 2)
        const adminCommunityResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin-community`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!adminCommunityResponse.ok) {
          const errorText = await adminCommunityResponse.text();
          throw new Error(`Failed to fetch admin community profiles: ${adminCommunityResponse.status} - ${errorText}`);
        }

        const adminCommunityData = await adminCommunityResponse.json();
        setAdminCommunityProfiles(Array.isArray(adminCommunityData) ? adminCommunityData : [adminCommunityData]);

        // Fetch super admin profiles (role 1)
        const superAdminResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!superAdminResponse.ok) {
          const errorText = await superAdminResponse.text();
          throw new Error(`Failed to fetch super admin profiles: ${superAdminResponse.status} - ${errorText}`);
        }

        const superAdminData = await superAdminResponse.json();
        setSuperAdminProfiles(Array.isArray(superAdminData) ? superAdminData : [superAdminData]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching profiles.");
      }
    };

    fetchProfiles();
  }, []);

  // Fetch portfolios from backend
  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch portfolios: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setPortfolios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching portfolios.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Create a mapping of user.id to nama (though not used for creator name directly)
  const userIdToNameMap = new Map<string, string>();
  [...userProfiles, ...adminCommunityProfiles, ...superAdminProfiles].forEach((profile) => {
    userIdToNameMap.set(profile.user.id, profile.nama);
  });

  // Get unique categories from portfolios
  const uniqueCategories = Array.from(new Set(portfolios.map((item) => item.kategori)));

  // Filtered data based on search, category, and status
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch = portfolio.nama_projek
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? portfolio.kategori === selectedCategory
      : true;
    const matchesStatus = selectedStatus
      ? mapStatusToIndonesian(portfolio.status) === selectedStatus
      : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPortfolios.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredPortfolios.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value); // Reset if "all" is selected
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value === "all" ? "" : value); // Reset if "all" is selected
    setCurrentPage(1); // Reset to first page after filtering
  };

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full text-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] overflow-hidden">
      <div className="max-w-7xl text-left mx-auto px-5 sm:px-6 lg:px-2 mt-10">
        <DashboardHeader
          title="Dashboard"
          description="Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor."
        />
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari"
            className="w-220 pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-4">
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Kategori Portofolio" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Semua Kategori
              </SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleStatusChange} value={selectedStatus}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Status Portofolio" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Semua Status
              </SelectItem>
              <SelectItem value="Terverifikasi" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Terverifikasi
              </SelectItem>
              <SelectItem value="Perlu Perubahan" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Perlu Perubahan
              </SelectItem>
              <SelectItem value="Belum di Verifikasi" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Belum di Verifikasi
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden mb-20 w-full max-w-7xl px-8 py-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama Projek</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Kategori</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((portfolio, index) => (
              <tr key={portfolio.id} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-6 py-4 text-gray-300 text-left">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  {portfolio.creator ? portfolio.creator.name : "Unknown"}
                </td>
                <td className="px-6 py-4 text-gray-300 text-left">{portfolio.nama_projek}</td>
                <td className="px-6 py-4 text-gray-300 text-left">{portfolio.kategori}</td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-left text-base font-semibold text-black ${getStatusColor(portfolio.status)}`}
                  >
                    {mapStatusToIndonesian(portfolio.status)}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href={`/detail-super-admin/portfolio/view/${portfolio.id}-${portfolio.nama_projek.toLowerCase().replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')}`}>
                      <IoEyeSharp
                        size={35}
                        className="cursor-pointer hover:text-blue-300 transition hover:scale-120 transition"
                      />
                    </Link>
                    <Link href={`/detail-super-admin/portfolio/edit/${portfolio.id}-${portfolio.nama_projek.toLowerCase().replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')}`}>
                      <HiOutlinePencil
                        size={35}
                        className="cursor-pointer hover:text-red-400 transition hover:scale-120 transition"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center gap-2 mt-4 pr-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white text-2xl"
          >
            {"<"}
          </button>
          <span className="text-white">Halaman {currentPage} dari {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white text-2xl"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1Dashboard;