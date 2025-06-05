"use client";

import { useEffect, useState } from "react";
import { Eye, PenLine, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Event {
  id: number;
  title: string;
  leader: string;
  date: string;
  committee: number;
  status: string;
}

const events: Event[] = [
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-500';
    case 'Ongoing':
      return 'bg-blue-500';
    case 'Finished':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const ITEMS_PER_PAGE = 5;

export default function HeroSection1Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter data based on selected filters and search query
  const filteredEvents = events.filter(event => {
    const yearMatch = selectedYear === 'all' || event.date.includes(selectedYear);
    const statusMatch = selectedStatus === 'all' || event.status === selectedStatus;
    const searchMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       event.leader.toLowerCase().includes(searchQuery.toLowerCase());
    
    return yearMatch && statusMatch && searchMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredEvents.slice(startIndex, endIndex);

  const handleView = (id: number) => {
    // Add your view logic here
    console.log('Viewing event:', id);
  };

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      // Add your delete API call here
      toast.success('Event berhasil dihapus');
      // Refresh the page to update the table
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Gagal menghapus event');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Tahun</SelectItem>
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
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Status</SelectItem>
              <SelectItem value="Active" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Active</SelectItem>
              <SelectItem value="Ongoing" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Ongoing</SelectItem>
              <SelectItem value="Finished" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-16">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-12">No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-64">Judul Acara</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Ketua Pelaksana</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Tanggal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-32">Jumlah Panitia</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((event, index) => (
              <tr key={event.id} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-6 py-4 text-gray-300 w-12">{startIndex + index + 1}</td>
                <td className="px-6 py-4 text-white w-64 truncate">{event.title}</td>
                <td className="px-6 py-4 text-gray-300 w-40 truncate">{event.leader}</td>
                <td className="px-6 py-4 text-gray-300 w-40">{event.date}</td>
                <td className="px-6 py-4 text-gray-300 w-32">{event.committee}</td>
                <td className="px-6 py-4 w-40">
                  <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 w-32">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleView(event.id)}
                      className="p-1 text-gray-400 hover:text-white hover:bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button 
                          className="p-1 text-gray-400 hover:text-white hover:bg-transparent"
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#001233] border border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Konfirmasi Hapus</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700">Batal</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(event.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Menghapus...' : 'Hapus'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700/50">
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} entries
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
