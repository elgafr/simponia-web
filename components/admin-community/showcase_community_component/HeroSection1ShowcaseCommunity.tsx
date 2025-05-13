"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface CommunityData {
  no: number;
  name: string;
  activity: string;
  year: number;
  performance: string;
}

const communityData: CommunityData[] = [
  { no: 1, name: "Fatahillah Al-Fatih", activity: "Upgrading Event Caslab Tim 1", year: 2024, performance: "A" },
  { no: 2, name: "Krisna Bimantoro", activity: "Upgrading Event Caslab Tim 2", year: 2024, performance: "C" },
  { no: 3, name: "Nadira Ulya Nisa", activity: "IT Character Building", year: 2024, performance: "D" },
  { no: 4, name: "Fitra Romeo Winky", activity: "Workshop Python", year: 2024, performance: "B" },
  { no: 5, name: "John Doe", activity: "Workshop 3D Game Design", year: 2024, performance: "C" },
  { no: 6, name: "Jane Smith", activity: "Hackathon Winner", year: 2024, performance: "E" },
  { no: 7, name: "Michael Johnson", activity: "AI & ML Seminar", year: 2024, performance: "A" },
  { no: 8, name: "Emily Davis", activity: "Cyber Security Workshop", year: 2024, performance: "B" },
  { no: 9, name: "David Wilson", activity: "Data Science Bootcamp", year: 2024, performance: "D" },
  { no: 10, name: "Sarah Brown", activity: "UI/UX Masterclass", year: 2024, performance: "C" },
  { no: 11, name: "Sarah Brown", activity: "UI/UX Masterclass", year: 2024, performance: "C" },
  { no: 12, name: "Sarah Brown", activity: "UI/UX Masterclass", year: 2024, performance: "C" },
  { no: 13, name: "Sarah Brown", activity: "UI/UX Masterclass", year: 2024, performance: "C" },
];

// Fungsi untuk menentukan warna berdasarkan kategori performance
const getPerformanceColor = (performance: string): string => {
  const colorMapping: Record<string, string> = {
    A: "bg-green-500", // Hijau
    B: "bg-green-300", // Hijau Muda
    C: "bg-yellow-400", // Kuning
    D: "bg-orange-400", // Oranye
    E: "bg-red-500", // Merah
  };
  return colorMapping[performance] || "bg-gray-400"; // Default warna abu-abu jika tidak cocok
};

const HeroSection1ShowcaseCommunity: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerformance, setSelectedPerformance] = useState("");
  // Hitung total halaman
  const totalPages = Math.ceil(communityData.length / itemsPerPage);

  // Ambil data sesuai halaman
  const currentData = communityData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="flex flex-col items-center justify-center px-4 py-12 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <h1 className="text-5xl font-bold mt-10">Community Showcase</h1>
      <p className="text-lg text-center text-gray-300 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar.
        Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor.
      </p>

      <div className="my-6 border-b border-gray-300 w-3/6"></div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="w-170 pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedPerformance} onValueChange={setSelectedPerformance}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Performance" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Performance</SelectItem>
              <SelectItem value="A" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">A</SelectItem>
              <SelectItem value="B" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">B</SelectItem>
              <SelectItem value="C" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">C</SelectItem>
              <SelectItem value="D" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">D</SelectItem>
              <SelectItem value="E" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">E</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <h2 className="mt-5 text-3xl font-semibold">Results</h2>

      {/* Table Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden mb-20 w-full max-w-6xl px-10 py-8 min-h-[350px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Kegiatan</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tahun</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Performance</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.no} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-6 py-4 text-gray-300 text-left">{item.no}.</td>
                <td className="px-6 py-4 text-gray-300 text-left">{item.name}</td>
                <td className="px-6 py-4 text-gray-300 text-left">{item.activity}</td>
                <td className="px-6 py-4 text-gray-300 text-left">{item.year}</td>
                <td className="px-6 py-4 text-gray-300 text-left">

                <Link href={`/detail-admin-community/community/view`}>
                  <span className={`px-8 py-2 rounded-2xl font-bold text-black text-left text-base cursor-pointer ${getPerformanceColor(item.performance)}`}>
                    {item.performance}
                  </span>
                </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls - Dipindah ke kanan bawah */}
        <div className="flex justify-end mt-9 pr-4">
          <button
            className="px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <span className="text-lg font-thin mx-3 mt-2.5">
            Page {currentPage} of {totalPages}
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
