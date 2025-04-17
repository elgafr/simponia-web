"use client";

import React, { useState } from "react";
import Link from "next/link";

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
  const itemsPerPage = 5;

  // Hitung total halaman
  const totalPages = Math.ceil(communityData.length / itemsPerPage);

  // Ambil data sesuai halaman
  const currentData = communityData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="flex flex-col items-center justify-center px-4 py-12 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <h1 className="text-5xl font-bold mt-30">Community Showcase</h1>
      <p className="text-lg text-center text-gray-300 max-w-2xl">
        Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar.
        Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor.
      </p>

      <div className="my-6 border-b border-gray-300 w-3/5"></div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <input
          type="text"
          placeholder="Search Name"
          className="w-170 px-4 py-2 text-gray-700 bg-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-40 px-5 py-2.5 text-gray-400 bg-white rounded-xl shadow-md">
          <option className="text-black">Sort</option>
          <option className="text-black">Name</option>
          <option className="text-black">Year</option>
          <option className="text-black">Performance</option>
        </select>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Results</h2>

      <div className="w-full max-w-7xl px-8 py-6 rounded-3xl shadow-2xl mb-20 min-h-[400px]">
        <table className="w-full text-left rounded-lg">
          <thead>
            <tr className="border-t border-b text-white text-center text-2xl">
              <th className="p-3">No.</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Kegiatan</th>
              <th className="p-3">Tahun</th>
              <th className="p-3">Performance</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.no} className="hover:bg-blue-200 hover:text-black text-center text-xl">
                <td className="p-4">{item.no}.</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.activity}</td>
                <td className="p-4">{item.year}</td>
                <td className="p-1 text-center">

                <Link href={`/detail-super-admin/community/view`}>
                  <span className={`px-8 py-1 text-lg font-semibold rounded-md text-black text-xl cursor-pointer ${getPerformanceColor(item.performance)}`}>
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
