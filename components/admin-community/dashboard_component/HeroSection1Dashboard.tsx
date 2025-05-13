"use client";

import { useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import CreateEventModal from "../dashboard_component/CreateEventModal";
import ConfirmDeleteModal from "../dashboard_component/ConfirmDeleteModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Link from "next/link";


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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500 text-white";
    case "Ongoing":
      return "bg-yellow-500 text-white";
    case "Finished":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const events = [
  { id: 1, title: "IT Character Building", leader: "Fatahillah Al-Fatih", date: "23 September 2024", committee: 16, status: "Active" },
  { id: 2, title: "Workshop Python", leader: "Krisna Bimantoro", date: "10 September 2024", committee: 19, status: "Ongoing" },
  { id: 3, title: "Backend Tutorial Using Golang", leader: "Nadhira Ulya Nisa", date: "01 Januari 2024", committee: 20, status: "Finished" },
  { id: 4, title: "Workshop ITCB", leader: "Fatahillah Al-Fatih", date: "07 Agustus 2023", committee: 17, status: "Finished" },
  { id: 5, title: "Mastering Clean Code", leader: "Krisna Bimantoro", date: "14 Juni 2023", committee: 30, status: "Finished" },
  { id: 6, title: "Frontend React Workshop", leader: "John Doe", date: "20 Juli 2023", committee: 22, status: "Ongoing" },
  { id: 7, title: "Mobile Development Seminar", leader: "Jane Smith", date: "11 Mei 2024", committee: 18, status: "Active" },
  { id: 8, title: "Frontend React Workshop", leader: "John Doe", date: "20 Juli 2023", committee: 22, status: "Ongoing" },
  { id: 9, title: "Mobile Development Seminar", leader: "Jane Smith", date: "11 Mei 2024", committee: 18, status: "Active" },
  { id: 10, title: "Frontend React Workshop", leader: "John Doe", date: "20 Juli 2023", committee: 22, status: "Ongoing" },
  { id: 11, title: "Mobile Development Seminar", leader: "Jane Smith", date: "11 Mei 2024", committee: 18, status: "Active" },
  { id: 12, title: "Frontend React Workshop", leader: "John Doe", date: "20 Juli 2023", committee: 22, status: "Ongoing" },
  { id: 13, title: "Mobile Development Seminar", leader: "Jane Smith", date: "11 Mei 2024", committee: 18, status: "Active" },

];

const ITEMS_PER_PAGE = 10;

const HeroSection1Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? event.date.includes(selectedYear) : true;
    const matchesStatus = selectedStatus ? event.status === selectedStatus : true;
    return matchesSearch && matchesYear && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Menonaktifkan scroll saat modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Matikan scroll
    } else {
      document.body.style.overflow = "auto"; // Aktifkan kembali saat modal tertutup
    }

    return () => {
      document.body.style.overflow = "auto"; // Pastikan saat komponen unmount, scroll kembali normal
    };
  }, [isModalOpen]);

  const handleDeleteClick = (id: number) => {
    setEventToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete !== null) {
      console.log(`Event dengan ID ${eventToDelete} dihapus.`);
      // Tambahkan fungsi untuk menghapus event dari state/database di sini
    }
    setIsDeleteModalOpen(false);
  };



  return (
    <section className="flex flex-col items-center min-h-screen w-full text-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] overflow-hidden">
      
      <div className="max-w-7xl text-left mx-auto px-5 sm:px-6 lg:px-2 mt-10">
        <DashboardHeader 
          title="Dashboard"
          description="Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor."
        />
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="w-220 pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Years</SelectItem>
              <SelectItem value="2022" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">2022</SelectItem>
              <SelectItem value="2023" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">2023</SelectItem>
              <SelectItem value="2024" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">2024</SelectItem>
              <SelectItem value="2025" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Status</SelectItem>
              <SelectItem value="Active" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Active</SelectItem>
              <SelectItem value="Ongoing" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Ongoing</SelectItem>
              <SelectItem value="Finished" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden mb-20 w-full max-w-7xl px-8 py-4">
        <div className="">
          <table className="w-full">
          <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Judul Acara</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ketua Pelaksana</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Jumlah Panitia</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.map((event, index) => (
                <tr key={event.id} className="border-b border-gray-700/50 hover:bg-white/5">
                  <td className="px-6 py-4 text-gray-300 text-left">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="px-6 py-4 text-gray-300 text-left">{event.title}</td>
                  <td className="px-6 py-4 text-gray-300 text-left">{event.leader}</td>
                  <td className="px-6 py-4 text-gray-300 text-left">{event.date}</td>
                  <td className="px-6 py-4 text-gray-300 text-left">{event.committee}</td>
                  <td className="px-6 py-4 text-gray-300 text-left">
                    <Link href={"/detail-admin-community/community/view"}>
                    <span className={`px-3 py-1 rounded-full text-left text-xs text-white ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteClick(event.id)}
                    className="hover:text-red-500 transition"
                  >
                    <IoTrashBinOutline size={24} />
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-end mt-9 pr-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition ${currentPage === 1 ? "cursor-not-allowed" : ""} text-white transition`}
          >
            &lt;
          </button>
          <span className="text-lg font-thin mx-3 mt-2.5">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition ${currentPage === totalPages ? " cursor-not-allowed" : ""} text-white transition`}
          >
            &gt;
          </button>
        </div>
      </div>

        {/* Tombol Create New Event */}
      <div className="mb-10 w-full max-w-7xl flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-3 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition"
        >
          Create New Event
        </button>
      </div>

      {/* Modal Backdrop (Agar Page Tidak Bisa Di-interact) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

    </section>
  );
};

export default HeroSection1Dashboard;
