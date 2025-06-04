'use client';

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
import { useState, useEffect } from "react";
import { EmptyState } from '@/components/ui/empty-state';

interface Anggota {
  id: string;
  id_user: string;
  nama: string;
  nim: string;
  jabatan: string;
  status: string;
  kerjasama: number | null;
  kedisiplinan: number | null;
  komunikasi: number | null;
  tanggung_jawab: number | null;
  nilai_rata_rata: number | null;
  grade: string | null;
}

interface User {
  id: string;
  nim: string;
  name: string | null;
  role: string;
}

interface Event {
  id: string;
  judul: string;
  tanggal: string;
  jumlah_panitia: number;
  skor: number;
  status: string;
  gambar: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  created_by: User;
  ketua_pelaksana: User;
  anggota: Anggota[];
}

interface DashboardTableProps {
  eventData?: Event[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500';
    case 'ongoing':
      return 'bg-blue-500';
    case 'finished':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const ITEMS_PER_PAGE = 5;

export function DashboardTable({ eventData: initialEventData }: DashboardTableProps) {
  console.log('DashboardTable rendered with initialEventData:', initialEventData);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          toast.error('Authentication token not found');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log('Current user data:', userData);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  // Fetch events
  useEffect(() => {
    console.log('useEffect triggered');
    console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    
    const fetchEvents = async () => {
      console.log('fetchEvents started');
      try {
        const token = localStorage.getItem('token');
        console.log('Token exists:', !!token);
        
        if (!token) {
          console.error('No token found in localStorage');
          toast.error('Authentication token not found');
          return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/acara`;
        console.log('Fetching events from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched events:', data);
        
        if (!Array.isArray(data)) {
          console.error('Expected array of events but got:', data);
          throw new Error('Invalid response format');
        }

        // Filter events based on current user
        if (currentUser) {
          const filteredEvents = data.filter(event => 
            event.created_by.id === currentUser.id
          );
          console.log('Filtered events:', filteredEvents);
          setEvents(filteredEvents);
        } else {
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch events');
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialEventData) {
      console.log('No initialEventData, fetching from API');
      fetchEvents();
    } else {
      console.log('Using initialEventData:', initialEventData);
      setEvents(initialEventData);
      setIsLoading(false);
    }
  }, [initialEventData, currentUser]); // Add currentUser as dependency

  // Filter data based on selected filters and search query
  const filteredEvents = events.filter(event => {
    const yearMatch = selectedYear === 'all' || new Date(event.tanggal).getFullYear().toString() === selectedYear;
    const statusMatch = selectedStatus === 'all' || (event.status?.toLowerCase() || '') === selectedStatus.toLowerCase();
    const searchMatch = (event.judul?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                       ((event.ketua_pelaksana?.name?.toLowerCase() || event.ketua_pelaksana?.nim?.toLowerCase() || '')).includes(searchQuery.toLowerCase());
    
    return yearMatch && statusMatch && searchMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredEvents.slice(startIndex, endIndex);

  const handleView = (id: string) => {
    // Add your view logic here
    console.log('Viewing event:', id);
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(events.filter(event => event.id !== id));
      toast.success('Event berhasil dihapus');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Gagal menghapus event');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If no events, show empty state
  if (!events || events.length === 0) {
    return (
      <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden mb-10">
        <EmptyState 
          title="Belum ada acara"
          description="Anda belum memiliki acara. Mulai buat acara Anda sekarang!"
          actionLabel="Buat Acara"
          actionHref="#"
        />
      </div>
    );
  }

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
              <SelectItem value="active" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Active</SelectItem>
              <SelectItem value="ongoing" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Ongoing</SelectItem>
              <SelectItem value="finished" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden mb-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-12">No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-64">Judul Acara</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Ketua Pelaksana</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Tanggal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-32">Jumlah Panitia</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((event, index) => (
              <tr key={event.id} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-6 py-4 text-gray-300 w-12">{startIndex + index + 1}</td>
                <td className="px-6 py-4 text-white w-64 truncate">{event.judul || '-'}</td>
                <td className="px-6 py-4 text-gray-300 w-40 truncate">
                  {event.ketua_pelaksana?.name || event.ketua_pelaksana?.nim || '-'}
                </td>
                <td className="px-6 py-4 text-gray-300 w-40">
                  {event.tanggal ? new Date(event.tanggal).toLocaleDateString('id-ID') : '-'}
                </td>
                <td className="px-6 py-4 text-gray-300 w-32">{event.jumlah_panitia || 0}</td>
                <td className="px-6 py-4 w-40">
                  <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(event.status || '')}`}>
                    {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : '-'}
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
                          <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700 hover:text-white">Batal</AlertDialogCancel>
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