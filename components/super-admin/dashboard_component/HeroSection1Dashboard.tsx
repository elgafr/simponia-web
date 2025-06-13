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
import { EmptyState } from "@/components/ui/empty-state";

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

interface ProfileAdmin {
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
  createdAt: string;
  updatedAt: string;
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

const HeroSection1Dashboard = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalVerifiedCount, setTotalVerifiedCount] = useState<number>(0);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/portofolio`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch portfolios: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        setPortfolios(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching portfolios."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();

    const fetchTotalVerifiedCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const adminResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!adminResponse.ok) {
          const errorText = await adminResponse.text();
          throw new Error(`Failed to fetch profile admin: ${adminResponse.status} - ${errorText}`);
        }

        const profileAdmin: ProfileAdmin = await adminResponse.json();
        const userId = profileAdmin.user.id;

        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(`Failed to fetch profile user: ${userResponse.status} - ${errorText}`);
        }

        const profileUser: ProfileUser = await userResponse.json();
        setTotalVerifiedCount(profileUser.verifiedPortfolioCount || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching profile data.");
      }
    };

    fetchTotalVerifiedCount();
  }, []);

  const uniqueCategories = Array.from(
    new Set(portfolios.map((item) => item.kategori))
  );

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

  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPortfolios.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus, itemsPerPage]);

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
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value === "all" ? "" : value);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
  };

  const renderTableContent = () => {
    if (filteredPortfolios.length === 0) {
      return (
        <div className="w-full py-8">
          <EmptyState
            title="Belum ada Data Portofolio"
            description="Tidak ada portofolio yang ditemukan !"
            actionLabel="Buat Portofolio"
            actionHref="/portfolio"
            showAction={false}
          />
        </div>
      );
    }

    return (
      <>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                No.
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Nama
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Nama Projek
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((portfolio, index) => (
              <tr
                key={portfolio.id}
                className="border-b border-gray-700/50 hover:bg-white/5"
              >
                <td className="px-6 py-4 text-gray-300 text-left">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  {portfolio.creator ? portfolio.creator.name : "Unknown"}
                </td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  {portfolio.nama_projek}
                </td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  {portfolio.kategori}
                </td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-left text-base font-semibold text-black ${getStatusColor(
                      portfolio.status
                    )}`}
                  >
                    {mapStatusToIndonesian(portfolio.status)}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col md:flex-row items-center justify-start gap-4">
                    <Link
                      href={`/detail-super-admin/portfolio/view/${
                        portfolio.id
                      }-${portfolio.nama_projek
                        .toLowerCase()
                        .replace(/[^\w\s]/g, "-")
                        .replace(/\s+/g, "-")}`}
                    >
                      <IoEyeSharp
                        size={35}
                        className="cursor-pointer hover:text-blue-300 transition hover:scale-120 transition"
                      />
                    </Link>
                    <Link
                      href={`/detail-super-admin/portfolio/edit/${
                        portfolio.id
                      }-${portfolio.nama_projek
                        .toLowerCase()
                        .replace(/[^\w\s]/g, "-")
                        .replace(/\s+/g, "-")}`}
                    >
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
          <span className="text-white">
            Halaman {currentPage} dari {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white text-2xl"
          >
            {">"}
          </button>
        </div>
      </>
    );
  };

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full text-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] overflow-hidden">
      <div className="max-w-7xl text-left mx-auto px-5 sm:px-6 lg:px-2 mt-10 w-full">
        <DashboardHeader
          title="Dashboard"
          description="Dashboad Super Admin untuk melihat Portfolio dari Mahasiswa Informatika Universitas Muhammadiyah Malang. Lakukanlah Penilaian untuk Portfolio dengan Teliti agar tidak terjadi kesalahan."
        />
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari Projek"
              className="w-170 pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-4">
            <Select
              onValueChange={handleCategoryChange}
              value={selectedCategory}
            >
              <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
                <SelectValue placeholder="Kategori Portofolio" />
              </SelectTrigger>
              <SelectContent className="bg-[#001233] border-[#001B45]">
                <SelectItem
                  value="all"
                  className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                >
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
                <SelectItem
                  value="all"
                  className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                >
                  Semua Status
                </SelectItem>
                <SelectItem
                  value="Terverifikasi"
                  className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                >
                  Terverifikasi
                </SelectItem>
                <SelectItem
                  value="Perlu Perubahan"
                  className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                >
                  Perlu Perubahan
                </SelectItem>
                <SelectItem
                  value="Belum di Verifikasi"
                  className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                >
                  Belum di Verifikasi
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
                <SelectValue placeholder="Items per Page" />
              </SelectTrigger>
              <SelectContent className="bg-[#001233] border-[#001B45]">
                <SelectItem value="5" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">5</SelectItem>
                <SelectItem value="10" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">10</SelectItem>
                <SelectItem value="20" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden mb-10 w-full px-8 py-4 max-h-[500px] overflow-y-auto">
          {renderTableContent()}
        </div>
        <div className="flex justify-start bg-white/5 rounded-3xl px-9 py-4 mb-10 max-w-[200]">
          <h2 className="font-semibold text-white">Total Review : {totalVerifiedCount}</h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1Dashboard;