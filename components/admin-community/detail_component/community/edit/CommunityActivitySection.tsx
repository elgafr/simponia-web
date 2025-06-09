import Image from "next/image";
import GradeScoring from "./GradeScoring";
import React from "react";
import { useRouter } from "next/navigation";

interface DataAcara {
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
  created_by: {
    id: string;
    nim: string;
    name: string;
    role: string;
  };
 
  anggota: Array<{
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
  }>;
}

interface PropsBagianAktivitasKomunitas {
  eventData: DataAcara;
  onRefresh?: () => void;
}

const BagianAktivitasKomunitas: React.FC<PropsBagianAktivitasKomunitas> = ({ eventData, onRefresh }) => {
  const [isGradeModalOpen, setIsGradeModalOpen] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const router = useRouter();

  const getStatusBg = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600 hover:bg-green-700";
      case "Ongoing":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "Finished":
        return "bg-blue-600 hover:bg-blue-700";
      case "ABSENT":
        return "bg-red-600 hover:bg-red-700";
      case "PERMISSION":
        return "bg-blue-600 hover:bg-blue-700";
      case "PRESENT":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-white/5";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Gagal memuat gambar:', e);
    setImageError(true);
  };

  const getImageUrl = () => {
    if (!eventData.gambar || imageError) return "/images/portfolio.png";
    
    // Hapus garis miring di awal path gambar
    const cleanPath = eventData.gambar.replace(/^\/+/, '');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');
    
    return `${baseUrl}/${cleanPath}`;
  };

  return (
    <section className="text-white px-2 md:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-left">Aktivitas</h2>
        <hr className="mb-8 border-gray-400" />
        {/* Kartu Aktivitas */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch bg-white/5 rounded-xl px-4 py-8 mb-8">
          <div className="relative w-full md:w-[400px] h-[250px] bg-gray-800 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl()}
              alt={eventData.judul}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="rounded-lg object-cover"
              onError={handleImageError}
              priority
              unoptimized
            />
          </div>
          <div className="text-left flex flex-col flex-1 justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">{eventData.judul}</h3>
              <p className="text-gray-300 mb-4 text-base line-clamp-2">
                {eventData.deskripsi}
              </p>
              <div className="text-sm text-gray-400">
                <p>Tanggal: {formatDate(eventData.tanggal)}</p>
                <p>Jumlah Panitia: {eventData.jumlah_panitia}</p>
                <p>Status: <span className={`${getStatusBg(eventData.status)} text-white px-2 py-0.5 rounded-full text-xs`}>
                  {eventData.status === "Active" ? "Aktif" : 
                   eventData.status === "Ongoing" ? "Sedang Berlangsung" : 
                   eventData.status === "Finished" ? "Selesai" : 
                   eventData.status}
                </span></p>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => router.push(`/event-detail-admin-community/${eventData.id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition w-fit"
              >
                Klik untuk detail lebih lanjut
              </button>
            </div>
          </div>
        </div>
       
        {/* Tombol */}
        <div className="mt-6 flex justify-end gap-4">
          <button 
           onClick={() => router.push(`/event-detail-admin-community/${eventData.id}`)}
          className="border border-gray-600 hover:bg-gray-100/20 text-white px-8 py-2 rounded-lg font-semibold transition">
            Kembali
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-semibold transition"
            onClick={() => setIsGradeModalOpen(true)}
          >
            Nilai
          </button>
        </div>

        <GradeScoring 
          isOpen={isGradeModalOpen} 
          onClose={() => setIsGradeModalOpen(false)} 
          onSuccess={onRefresh}
        />
      </div>
    </section>
  );
};

export default BagianAktivitasKomunitas;
