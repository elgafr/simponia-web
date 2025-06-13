'use client';

import { Search, Eye } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export interface Showcase {
  id: string;
  name: string;
  activity: string;
  year: string;
  performance: 'A' | 'B' | 'C' | 'D' | 'E';
}

interface ShowcaseTableProps {
  showcaseData: Showcase[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedPerformance: string;
  setSelectedPerformance: (performance: string) => void;
}

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case 'A': return 'bg-green-500/70';
    case 'B': return 'bg-lime-400/70';
    case 'C': return 'bg-yellow-400/70';
    case 'D': return 'bg-orange-400/70';
    case 'E': return 'bg-red-500/70';
    default: return 'bg-gray-500/70';
  }
};

export function ShowcaseTable({
  showcaseData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedPerformance,
  setSelectedPerformance,
}: ShowcaseTableProps) {
  // Filter data
  const filteredShowcases = showcaseData.filter(showcase => {
    const yearMatch = selectedYear === 'all' || showcase.year === selectedYear;
    const performanceMatch = selectedPerformance === 'all' || showcase.performance === selectedPerformance;
    const searchMatch = showcase.name.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatch && performanceMatch && searchMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShowcases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredShowcases.slice(startIndex, endIndex);

  // Get unique years for select
  const yearOptions = Array.from(new Set(showcaseData.map(item => item.year)));

  // Reset currentPage when filters or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedPerformance, itemsPerPage, setCurrentPage]);

  return (
    <div className="w-full max-w-6xl">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari Nama ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
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
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
            <SelectTrigger className="w-[140px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Items per Page" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="5" className="text-white">5</SelectItem>
              <SelectItem value="10" className="text-white">10</SelectItem>
              <SelectItem value="20" className="text-white">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden px-10 py-10 min-h-[350px] mb-20">
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
                <td colSpan={6} className="text-center text-gray-400 py-8">No data found.</td>
              </tr>
            )}
            {currentItems.map((showcase, index) => (
              <tr key={`${showcase.id}-${showcase.year}`} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-4 py-3 text-gray-300 w-10">{startIndex + index + 1}.</td>
                <td className="px-4 py-3 text-white w-55 truncate">{showcase.name}</td>
                <td className="px-4 py-3 text-gray-300">{showcase.activity}</td>
                <td className="px-4 py-3 text-gray-300 w-20">{showcase.year}</td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/detail-admin-community/community/view/${showcase.id}?activity=${encodeURIComponent(showcase.activity)}&year=${showcase.year}`}>
                    <span
                      className={`w-full h-8 rounded-full flex items-center justify-center font-bold text-white mx-auto ${getPerformanceColor(showcase.performance)}`}
                    >
                      {showcase.performance}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 w-16 text-center">
                  <Link href={`/detail-admin-community/community/view/${showcase.id}?activity=${encodeURIComponent(showcase.activity)}&year=${showcase.year}`}>
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
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="text-lg font-thin mx-3 mt-2.5">
            Halaman {currentPage} dari {totalPages || 1}
          </span>
          <button
            className="px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition"
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}