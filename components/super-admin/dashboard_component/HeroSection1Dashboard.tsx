"use client";

import { useState } from "react";
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
import { portfolioItems } from '@/data/portfolioItems';

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

// Function to get status color
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

const ITEMS_PER_PAGE = 10;

const HeroSection1Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Get unique categories from portfolioItems
  const uniqueCategories = Array.from(new Set(portfolioItems.map(item => item.category)));

  // Filtered data based on search, category, and status
  const filteredPortfolios = portfolioItems.filter((portfolio) => {
    const matchesSearch =
      portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? portfolio.category === selectedCategory
      : true;
    const matchesStatus = selectedStatus
      ? portfolio.status === selectedStatus
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
            placeholder="Search"
            className="w-220 pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-4">
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Category Portfolio" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                All Categories
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
              <SelectValue placeholder="Status Portfolio" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                All Statuses
              </SelectItem>
              <SelectItem value="Verified" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Verified
              </SelectItem>
              <SelectItem value="Need Revision" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Need Revision
              </SelectItem>
              <SelectItem value="Unverified" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                Unverified
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Project Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((portfolio) => (
              <tr key={portfolio.id} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-6 py-4 text-gray-300 text-left">{portfolio.id}</td>
                <td className="px-6 py-4 text-gray-300 text-left">{portfolio.name}</td>
                <td className="px-6 py-4 text-gray-300 text-left">{portfolio.title}</td>
                <td className="px-6 py-4 text-gray-300 text-left">{portfolio.category}</td>
                <td className="px-6 py-4 text-gray-300 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-left text-base font-semibold text-black ${getStatusColor(portfolio.status)}`}
                  >
                    {portfolio.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href={`/detail-super-admin/portfolio/view/${portfolio.id}-${portfolio.title.toLowerCase().replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')}`}>
                      <IoEyeSharp
                        size={35}
                        className="cursor-pointer hover:text-blue-300 transition hover:scale-120 transition"
                      />
                    </Link>
                    <Link href={`/detail-super-admin/portfolio/edit`}>
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
          <span className="text-white">Page {currentPage} of {totalPages}</span>
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