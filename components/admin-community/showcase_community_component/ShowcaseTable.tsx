'use client';

import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface Showcase {
  id: number;
  name: string;
  activity: string;
  year: string;
  performance: 'A' | 'B' | 'C' | 'D' | 'E';
}

interface ShowcaseTableProps {
  showcaseData: Showcase[];
}

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case 'A':
      return 'bg-green-500/70';
    case 'B':
      return 'bg-lime-400/70';
    case 'C':
      return 'bg-yellow-400/70';
    case 'D':
      return 'bg-orange-400/70';
    case 'E':
      return 'bg-red-500/70';
    default:
      return 'bg-gray-500/70';
  }
};

const ITEMS_PER_PAGE = 5;

export function ShowcaseTable({ showcaseData }: ShowcaseTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedPerformance, setSelectedPerformance] = useState('all');

  // Filter data
  const filteredShowcases = showcaseData.filter(showcase => {
    const yearMatch = selectedYear === 'all' || showcase.year === selectedYear;
    const performanceMatch = selectedPerformance === 'all' || showcase.performance === selectedPerformance;
    const searchMatch = showcase.name.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatch && performanceMatch && searchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShowcases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredShowcases.slice(startIndex, endIndex);

  // Get unique years for select
  const yearOptions = Array.from(new Set(showcaseData.map(item => item.year)));

  const handleViewDetail = (id: number) => {
    router.push(`/showcase-detail-admin-community/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari Nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Tahun</SelectItem>
              {yearOptions.map(year => (
                <SelectItem key={year} value={year} className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPerformance} onValueChange={setSelectedPerformance}>
            <SelectTrigger className="w-[140px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Prestasi" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua</SelectItem>
              <SelectItem value="A" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">A</SelectItem>
              <SelectItem value="B" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">B</SelectItem>
              <SelectItem value="C" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">C</SelectItem>
              <SelectItem value="D" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">D</SelectItem>
              <SelectItem value="E" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">E</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden mb-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-10">No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-55">Nama</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Kegiatan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-20">Tahun</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-32">Nilai</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-white w-16">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-8">Tidak ada data ditemukan.</td>
              </tr>
            )}
            {currentItems.map((showcase, index) => (
              <tr key={showcase.id} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-4 py-3 text-gray-300 w-10">{startIndex + index + 1}.</td>
                <td className="px-4 py-3 text-white w-55 truncate">{showcase.name}</td>
                <td className="px-4 py-3 text-gray-300">{showcase.activity}</td>
                <td className="px-4 py-3 text-gray-300 w-20">{showcase.year}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`w-full h-8 rounded-full flex items-center justify-center font-bold text-white mx-auto ${getPerformanceColor(showcase.performance)}`}
                  >
                    {showcase.performance}
                  </span>
                </td>
                <td className="px-4 py-3 w-16 text-center">
                  <button 
                    onClick={() => handleViewDetail(showcase.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700/50">
            <div className="text-sm text-gray-400">
              Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredShowcases.length)} dari {filteredShowcases.length} data
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}