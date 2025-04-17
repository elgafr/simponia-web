
"use client";

import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi";


// Fungsi untuk mendapatkan warna status secara otomatis
const getStatusColor = (status: string) => {
  switch (status) {
    case "Verified":
      return "bg-green-200 text-green-800";
    case "Need Revision":
      return "bg-red-200 text-red-800";
    case "Unverified":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const portfolios = [
  { id: 1, name: "Krisna Bimantoro", project: "Analisis Database Tokopedia", category: "Data Science", status: "Verified" },
  { id: 2, name: "M. Heykal", project: "Analisis Database Tokopedia", category: "Data Science", status: "Need Revision" },
  { id: 3, name: "Nadhira", project: "Analisis Database Tokopedia", category: "Game Intelligence", status: "Unverified" },
  { id: 4, name: "Dimas", project: "Analisis Database Tokopedia", category: "Network and Security", status: "Unverified" },
  { id: 5, name: "Aira", project: "Analisis Database Tokopedia", category: "Data Science", status: "Unverified" },
  { id: 6, name: "Farriel", project: "Analisis Database Tokopedia", category: "Data Science", status: "Unverified" },
  { id: 7, name: "Sophian", project: "Analisis Database Tokopedia", category: "Software Engineering", status: "Unverified" },
  { id: 8, name: "Fera", project: "Analisis Database Tokopedia", category: "Game Intelligence", status: "Unverified" },
  { id: 9, name: "Putri", project: "Analisis Database Tokopedia", category: "Software Engineering", status: "Unverified" },
  { id: 10, name: "Sasongko", project: "Analisis Database Tokopedia", category: "Network and Security", status: "Need Revision" },
];

const ITEMS_PER_PAGE = 5;

const HeroSection1Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Filtered data based on search, category, and status
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch = portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? portfolio.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? portfolio.status === selectedStatus : true;
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
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page after filtering
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1); // Reset to first page after filtering
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full text-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] overflow-hidden">
      <div className="p-2 rounded-lg pb-8 max-w-5xl text-center">
        <h1 className="text-6xl font-bold text-white mb-10 mt-35">Dashboard</h1>
        <p className="text-xl mt-2 text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
        </p>
      </div>

      <div className="my-6 border-b border-gray-300 w-3/5"></div>

      <div className="flex justify-between items-center gap-4 w-full max-w-6xl p-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-2/3 p-2 rounded-xl bg-gray-200 text-black placeholder-gray-700 focus:outline-none hover:scale-102 transition"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-1/4 p-3 rounded-xl bg-gray-200 text-gray-700"
        >
          <option value="">Category Portfolio</option>
          <option value="Data Science">Data Science</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Network and Security">Network and Security</option>
          <option value="Game Intelligence">Game Intelligence</option>
        </select>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-1/4 p-3 rounded-xl bg-gray-200 text-gray-700"
        >
          <option value="">Status Portfolio</option>
          <option value="Verified">Verified</option>
          <option value="Need Revision">Need Revision</option>
          <option value="Unverified">Unverified</option>
        </select>
      </div>

      <div className="my-4 border-b border-gray-300"></div>

      <div className="bg-gradient-to-b from-grey-900 to-grey-900 w-full max-w-7xl px-8 py-6 rounded-lg shadow-2xl mb-20 min-h-[400px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-b text-white text-2xl">
              <th className="p-3 text-center w-10">No.</th>
              <th className="p-3 text-center w-40">Name</th>
              <th className="p-3 text-center w-60">Project Name</th>
              <th className="p-3 text-center w-40">Category</th>
              <th className="p-3 text-center w-40">Status</th>
              <th className="p-3 text-center w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((portfolio, index) => (
              <tr key={portfolio.id} className="text-white text-xl hover:bg-blue-900 hover:text-white transition">
                <td className="p-3  text-center">{indexOfFirstItem + index + 1}</td>
                <td className="p-3 ">{portfolio.name}</td>
                <td className="p-3 ">{portfolio.project}</td>
                <td className="p-3 ">{portfolio.category}</td>
                <td className="p-3 ">
                  <span className={`px-3 py-1 rounded-full text-md font-medium ${getStatusColor(portfolio.status)}`}>
                    {portfolio.status}
                  </span>
                </td>
                <td className="p-3">
                  
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <Link href={`/detail-super-admin/portfolio/view`}>
                    <IoEyeSharp size={35} className="cursor-pointer hover:text-blue-300 transition hover:scale-120 transition" />
                  </Link>

                  <Link href={`/detail-super-admin/portfolio/edit`}>
                    <HiOutlinePencil size={35} className="cursor-pointer hover:text-red-400 transition hover:scale-120 transition" />
                  </Link>
                  </div>
                  
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center gap-2 mt-4 pr-6">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 text-white text-2xl">&lt;</button>
          <span className="text-white text-">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 text-white text-2xl">&gt;</button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection1Dashboard;
