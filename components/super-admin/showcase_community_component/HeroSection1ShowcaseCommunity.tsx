"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Eye } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state'; // Import the EmptyState component

interface MemberData {
  id: string;
  id_user: string;
  nama: string;
  nim: string;
  jabatan: string;
  status: string;
  kerjasama: number;
  kedisiplinan: number;
  komunikasi: number;
  tanggung_jawab: number;
  nilai_rata_rata: number;
  grade: string | null;
}

interface EventData {
  id: string;
  judul: string;
  tanggal: string;
  jumlah_panitia: number;
  skor: number;
  status: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  created_by: {
    id: string;
    nim: string;
    name: string;
    role: string;
  };
  anggota: MemberData[];
}

interface CommunityData {
  id_user: string;
  nama: string;
  activity: string;
  year: string;
  performance: 'A' | 'B' | 'C' | 'D' | 'E';
}

const getPerformanceColor = (performance: string): string => {
  switch (performance) {
    case 'A': return 'bg-green-500/70';
    case 'B': return 'bg-lime-400/70';
    case 'C': return 'bg-yellow-400/70';
    case 'D': return 'bg-orange-400/70';
    case 'E': return 'bg-red-500/70';
    default: return 'bg-gray-500/70';
  }
};

const HeroSection1ShowcaseCommunity: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedPerformance, setSelectedPerformance] = useState("all");
  const [communityData, setCommunityData] = useState<CommunityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const acaraResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!acaraResponse.ok) {
          const errorText = await acaraResponse.text();
          throw new Error(`Failed to fetch data: ${acaraResponse.status} - ${errorText}`);
        }

        const data: EventData[] = await acaraResponse.json();
        const memberMap = new Map<string, CommunityData>();
        data.forEach(event => {
          event.anggota
            .filter(member => member.grade !== null && member.grade !== undefined)
            .forEach(member => {
              const key = `${member.id_user}-${event.tanggal.split('-')[0]}`;
              const performance = member.grade!.charAt(0) as 'A' | 'B' | 'C' | 'D' | 'E';
              if (!memberMap.has(key) || event.tanggal.split('-')[0] > memberMap.get(key)!.year) {
                memberMap.set(key, {
                  id_user: member.id_user,
                  nama: member.nama,
                  activity: event.judul,
                  year: event.tanggal.split('-')[0],
                  performance: performance,
                });
              }
            });
        });
        setCommunityData(Array.from(memberMap.values()));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = communityData.filter(community => {
    const yearMatch = selectedYear === "all" || community.year === selectedYear;
    const performanceMatch = selectedPerformance === "all" || community.performance === selectedPerformance;
    const searchMatch = community.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatch && performanceMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const yearOptions = Array.from(new Set(communityData.map(item => item.year)));

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-7 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Community Showcase</h1>
          <p className="text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Community Showcase</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-7 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Community Showcase</h1>
        <p className="text-gray-300">
          Kelola dan pantau showcase project dari komunitas. Anda dapat melihat, menambah, mengedit, dan menghapus showcase sesuai kebutuhan.
        </p>
      </div>
      
      <h2 className="mt-5 text-3xl font-semibold">Results</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search Name..."
            className="w-210 pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white">Semua Tahun</SelectItem>
              {yearOptions.map(year => (
                <SelectItem key={year} value={year} className="text-white">{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPerformance} onValueChange={setSelectedPerformance}>
            <SelectTrigger className="w-[140px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Performance" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white">Semua</SelectItem>
              <SelectItem value="A" className="text-white">A</SelectItem>
              <SelectItem value="B" className="text-white">B</SelectItem>
              <SelectItem value="C" className="text-white">C</SelectItem>
              <SelectItem value="D" className="text-white">D</SelectItem>
              <SelectItem value="E" className="text-white">E</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden w-full max-w-6xl px-10 py-10 min-h-[350px] mb-20">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-10">No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-55">Nama</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Kegiatan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-20">Tahun</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-32">Performance</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-16">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8">
                  <EmptyState 
                    title="Tidak Ada Data Komunitas"
                    description="Tidak ada data komunitas yang tersedia saat ini. Silakan periksa kembali nanti atau hubungi admin jika ada masalah."
                    actionLabel="Menuju Dashboard"
                    actionHref="/dashboard-super-admin"
                    showAction={false}
                  />
                </td>
              </tr>
            )}
            {currentItems.map((community, index) => (
              <tr key={`${community.id_user}-${community.nama}-${community.year}`} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-4 py-3 text-gray-300 w-10">{startIndex + index + 1}.</td>
                <td className="px-4 py-3 text-white w-55 truncate">{community.nama}</td>
                <td className="px-4 py-3 text-gray-300">{community.activity}</td>
                <td className="px-4 py-3 text-gray-300 w-20">{community.year}</td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/detail-super-admin/community/view/${community.id_user}?activity=${encodeURIComponent(community.activity)}&year=${community.year}`}>
                    <span
                      className={`w-full h-8 rounded-full flex items-center justify-center font-bold text-white mx-auto ${getPerformanceColor(community.performance)}`}
                    >
                      {community.performance}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 w-16 text-center">
                  <Link href={`/detail-super-admin/community/view/${community.id_user}?activity=${encodeURIComponent(community.activity)}&year=${community.year}`}>
                    <button className="text-gray-400 hover:text-white">
                      <Eye className="h-5 w-5" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4 pr-4">
          <button
            className="px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="text-lg font-thin mx-3 mt-2.5">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            className="px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1ShowcaseCommunity;