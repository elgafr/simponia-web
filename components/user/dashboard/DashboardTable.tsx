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
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { EmptyState } from '@/components/ui/empty-state';
import { PortfolioItem } from '@/types/portfolio';
import { useEditPortfolioStore } from '@/store/editPortfolioStore';

interface DashboardTableProps {
  portfolioData: PortfolioItem[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terverifikasi':
      return 'bg-green-500';
    case 'Proses Verifikasi':
      return 'bg-gray-500';
    case 'Dihapus':
      return 'bg-red-500';
    case 'Perlu Perubahan':
      return 'bg-yellow-500';
    case 'Belum di Verifikasi':
      return 'bg-blue-400';
    default:
      return 'bg-gray-500';
  }
};

const ITEMS_PER_PAGE = 5;

export function DashboardTable({ portfolioData }: DashboardTableProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPortfolios, setUserPortfolios] = useState<PortfolioItem[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log('Fetched user data:', userData);

        if (userData && userData.id) {
          // Filter portfolios where the user is either the creator or a member
          const filteredPortfolios = portfolioData.filter((item: PortfolioItem) => {
            const isCreator = item.creator?.user_id === userData.id;
            const isMember = item.anggota?.some((member: { id_user: string }) => member.id_user === userData.id);
            return isCreator || isMember;
          });
          console.log('Filtered portfolios:', filteredPortfolios);
          setUserPortfolios(filteredPortfolios);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [portfolioData]);

  // Add useEffect for countdown timer
  useEffect(() => {
    const calculateTimeRemaining = (updatedAt: string) => {
      const updatedDate = new Date(updatedAt);
      const deadline = new Date(updatedDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days from updated_at
      const now = new Date();

      if (now >= deadline) {
        return 'Waktu habis';
      }

      const diff = deadline.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${days} hari ${hours} jam ${minutes} menit`;
    };

    const updateTimeRemaining = () => {
      const newTimeRemaining: { [key: string]: string } = {};
      let needsUpdate = false;

      userPortfolios.forEach(portfolio => {
        if (portfolio.status === 'Perlu Perubahan' && portfolio.updated_at) {
          const remaining = calculateTimeRemaining(portfolio.updated_at);
          newTimeRemaining[portfolio.id] = remaining;

          // Check if deadline has passed
          const updatedDate = new Date(portfolio.updated_at);
          const deadline = new Date(updatedDate.getTime() + (3 * 24 * 60 * 60 * 1000));
          if (new Date() >= deadline) {
            needsUpdate = true;
          }
        }
      });

      setTimeRemaining(newTimeRemaining);

      // If any portfolio has passed its deadline, update its status
      if (needsUpdate) {
        const updateStatus = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const updatePromises = userPortfolios
              .filter(portfolio => {
                if (portfolio.status !== 'Perlu Perubahan' || !portfolio.updated_at) return false;
                const updatedDate = new Date(portfolio.updated_at);
                const deadline = new Date(updatedDate.getTime() + (3 * 24 * 60 * 60 * 1000));
                return new Date() >= deadline;
              })
              .map(portfolio =>
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${portfolio.id}`, {
                  method: 'PUT',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    ...portfolio,
                    status: "Dihapus"
                  })
                })
              );

            await Promise.all(updatePromises);
            router.refresh(); // Refresh the page to update the table
          } catch (error) {
            console.error('Error updating portfolio statuses:', error);
          }
        };

        updateStatus();
      }
    };

    const timer = setInterval(updateTimeRemaining, 60000); // Update every minute
    updateTimeRemaining(); // Initial update

    return () => clearInterval(timer);
  }, [userPortfolios, router]);

  // If no data, show empty state
  if (!userPortfolios || userPortfolios.length === 0) {
    return (
      <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 mt-8 mb-8">
        <EmptyState 
          title="Belum ada portofolio"
          description="Anda belum memiliki portofolio. Mulai buat portofolio Anda sekarang!"
          actionLabel="Buat Portofolio"
          actionHref="/portfolio"
        />
      </div>
    );
  }

  // Filter data based on selected filters and search query
  const filteredData = userPortfolios.filter(item => {
    const statusMatch = statusFilter === 'all' || 
      (statusFilter === 'verified' && item.status === 'Terverifikasi') ||
      (statusFilter === 'process' && item.status === 'Proses Verifikasi') ||
      (statusFilter === 'rejected' && item.status === 'Dihapus') ||
      (statusFilter === 'waiting' && item.status === 'Perlu Perubahan') ||
      (statusFilter === 'unverified' && item.status === 'Belum di Verifikasi');
    
    const categoryMatch = categoryFilter === 'all' || 
      (categoryFilter === 'rpl' && item.kategori === 'Rekayasa Perangkat Lunak') ||
      (categoryFilter === 'game' && item.kategori === 'Game Cerdas') ||
      (categoryFilter === 'data' && item.kategori === 'Data Sains') ||
      (categoryFilter === 'network' && item.kategori === 'Keamanan Jaringan');
    
    const searchMatch = item.nama_projek.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && categoryMatch && searchMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (value: string, type: 'status' | 'category') => {
    setCurrentPage(1);
    if (type === 'status') {
      setStatusFilter(value);
    } else {
      setCategoryFilter(value);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchQuery(e.target.value);
  };

  const handleView = (id: string) => {
    router.push(`/showcase/${id}`);
  };

  const handleEdit = (id: string, name: string) => {
    // Clear the edit portfolio store before navigating
    useEditPortfolioStore.getState().resetStore();
    router.push(`/portfolio/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete portfolio');
      }

      toast.success('Portfolio berhasil dihapus');
      router.refresh(); // Refresh the page to update the table
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast.error('Gagal menghapus portfolio');
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
            placeholder="Cari nama proyek..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <Select value={categoryFilter} onValueChange={(value) => handleFilterChange(value, 'category')}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Kategori Portofolio" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Kategori</SelectItem>
              <SelectItem value="rpl" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Rekayasa Perangkat Lunak</SelectItem>
              <SelectItem value="game" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Game Cerdas</SelectItem>
              <SelectItem value="data" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Data Sains</SelectItem>
              <SelectItem value="network" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Keamanan Jaringan</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(value) => handleFilterChange(value, 'status')}>
            <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
              <SelectValue placeholder="Status Portofolio" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Status</SelectItem>
              <SelectItem value="verified" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Terverifikasi</SelectItem>
              <SelectItem value="process" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Proses Verifikasi</SelectItem>
              <SelectItem value="rejected" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Dihapus</SelectItem>
              <SelectItem value="waiting" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Perlu Perubahan</SelectItem>
              <SelectItem value="unverified" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Belum di Verifikasi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-16">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-12">No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-64">Nama Proyek</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Kategori</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-24">Tahun</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-700/50 hover:bg-white/5">
                <td className="px-6 py-4 text-gray-300 w-12">{startIndex + index + 1}</td>
                <td className="px-6 py-4 text-white w-64 truncate">{item.nama_projek}</td>
                <td className="px-6 py-4 text-gray-300 w-40 truncate">{item.kategori}</td>
                <td className="px-6 py-4 text-gray-300 w-24">{item.tahun}</td>
                <td className="px-6 py-4 w-40">
                  <div className="flex flex-col gap-1">
                    <div className="flex">
                      <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(item.status)} whitespace-nowrap inline-block`}>
                        {item.status}
                      </span>
                    </div>
                    {item.status === 'Perlu Perubahan' && timeRemaining[item.id] && (
                      <span className="text-xs text-yellow-500">
                        Sisa waktu: {timeRemaining[item.id]}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 w-32">
                  <div className="flex gap-2">
                    {(item.status === 'Terverifikasi' || item.status === 'Proses Verifikasi' || item.status === 'Belum di Verifikasi') && (
                      <button 
                        onClick={() => handleView(item.id)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-transparent"
                        title="Lihat"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {item.status === 'Perlu Perubahan' && (
                      <button 
                        onClick={() => handleEdit(item.id, item.nama_projek)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-transparent"
                        title="Edit"
                      >
                        <PenLine className="h-4 w-4" />
                      </button>
                    )}
                    {(item.status === 'Terverifikasi' || item.status === 'Belum Diverifikasi') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button 
                            className="p-1 text-gray-400 hover:text-white hover:bg-transparent"
                            disabled={isDeleting}
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#001233] border border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Konfirmasi Hapus</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              Apakah Anda yakin ingin menghapus portofolio ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700 hover:text-white">Batal</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                              disabled={isDeleting}
                            >
                              {isDeleting ? 'Menghapus...' : 'Hapus'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
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
              Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredData.length)} dari {filteredData.length} entri
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                title="Halaman Sebelumnya"
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
                title="Halaman Selanjutnya"
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