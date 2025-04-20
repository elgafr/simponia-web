import { Eye, PenLine, Trash2 } from 'lucide-react';
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

interface PortfolioItem {
  id: number;
  name: string;
  category: string;
  year: string;
  status: string;
}

interface DashboardTableProps {
  portfolioData: PortfolioItem[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terverifikasi':
      return 'bg-green-500';
    case 'Proses Verifikasi':
      return 'bg-gray-500';
    case 'Ditolak':
      return 'bg-red-500';
    case 'Perlu Perubahan':
      return 'bg-yellow-500';
    case 'Belum Diverifikasi':
      return 'bg-blue-400';
    default:
      return 'bg-gray-500';
  }
};

export function DashboardTable({ portfolioData }: DashboardTableProps) {
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/showcase/${id}-ui-ux-healthy-application`);
  };

  const handleDelete = (id: number) => {
    console.log('Deleting item with id:', id);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-16">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">No.</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama Project</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Kategori</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tahun</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {portfolioData.map((item) => (
            <tr key={item.id} className="border-b border-gray-700/50 hover:bg-white/5">
              <td className="px-6 py-4 text-gray-300">{item.id}</td>
              <td className="px-6 py-4 text-white">{item.name}</td>
              <td className="px-6 py-4 text-gray-300">{item.category}</td>
              <td className="px-6 py-4 text-gray-300">{item.year}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {(item.status === 'Terverifikasi' || item.status === 'Proses Verifikasi' || item.status === 'Belum Diverifikasi') && (
                    <button 
                      onClick={() => handleView(item.id)}
                      className="p-1 text-gray-400 hover:text-white hover:bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  {item.status === 'Perlu Perubahan' && (
                    <button className="p-1 text-gray-400 hover:text-white hover:bg-transparent">
                      <PenLine className="h-4 w-4" />
                    </button>
                  )}
                  {(item.status === 'Terverifikasi' || item.status === 'Belum Diverifikasi') && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-1 text-gray-400 hover:text-white hover:bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-[#001233] border border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Konfirmasi Hapus</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Apakah Anda yakin ingin menghapus portfolio ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700">Batal</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            Hapus
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
    </div>
  );
} 