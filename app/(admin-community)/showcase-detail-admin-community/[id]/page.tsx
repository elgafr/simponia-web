"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommunityProfileSection from "@/components/admin-community/detail_component/community/edit/CommunityProfileSection";
import CommunityActivitySection from "@/components/admin-community/detail_component/community/edit/CommunityActivitySection";

interface ProfilPengguna {
  id: string;
  user: {
    id: string;
    nim: string;
    role: string;
  };
  nama: string;
  noHandphone: string;
  gender: string;
  tanggalLahir: string;
  kota: string;
  keterangan: string;
  linkedin: string;
  instagram: string;
  email: string;
  github: string;
  profilePicture: string | null;
  namaKomunitas: string;
  joinKomunitas: string;
  divisi: string;
  posisi: string;
  createdAt: string;
  updatedAt: string;
}

interface AnggotaAcara {
  id: string;
  acara: {
    id: string;
  };
  profile_user: {
    id: string;
  };
  created_by: {
    id: string;
    nim: string;
    role: string;
  };
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
  catatan: string | null;
  created_at: string;
  updated_at: string;
}

interface DataAcara {
  id: string;
  judul: string;
  tanggal: string;
  jumlah_panitia: number;
  skor: number;
  status: string;
  lokasi: string;
  deskripsi: string;
  gambar: string;
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
  created_at: string;
  updated_at: string;
}

// Data dummy untuk testing
const dummyUserProfile: ProfilPengguna = {
  id: "1",
  user: {
    id: "1",
    nim: "1234567890",
    role: "admin"
  },
  nama: "John Doe",
  noHandphone: "081234567890",
  gender: "Laki-laki",
  tanggalLahir: "2000-01-01",
  kota: "Jakarta",
  keterangan: "Anggota aktif",
  linkedin: "https://linkedin.com/in/johndoe",
  instagram: "https://instagram.com/johndoe",
  email: "john.doe@example.com",
  github: "https://github.com/johndoe",
  profilePicture: "/default-avatar.png",
  namaKomunitas: "Komunitas Teknologi",
  joinKomunitas: "2024-01-01",
  divisi: "Pengembangan",
  posisi: "Anggota",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01"
};

const dummyShowcaseData: AnggotaAcara = {
  id: "1",
  acara: {
    id: "1"
  },
  profile_user: {
    id: "1"
  },
  created_by: {
    id: "1",
    nim: "1234567890",
    role: "admin"
  },
  nama: "John Doe",
  nim: "1234567890",
  jabatan: "Peserta",
  status: "PRESENT",
  kerjasama: 90,
  kedisiplinan: 85,
  komunikasi: 88,
  tanggung_jawab: 92,
  nilai_rata_rata: 89,
  grade: "A",
  catatan: "Kinerja sangat baik",
  created_at: "2024-01-01",
  updated_at: "2024-01-01"
};

const dummyEventData: DataAcara = {
  id: "1",
  judul: "Hackathon 2024",
  tanggal: "2024-03-01",
  jumlah_panitia: 50,
  skor: 90,
  status: "Finished",
  lokasi: "Jakarta",
  deskripsi: "Kompetisi pengembangan aplikasi inovatif",
  gambar: "/event-image.jpg",
  created_by: {
    id: "1",
    nim: "1234567890",
    name: "John Doe",
    role: "admin"
  },
  anggota: [
    {
      id: "1",
      id_user: "1",
      nama: "John Doe",
      nim: "1234567890",
      jabatan: "Peserta",
      status: "PRESENT",
      kerjasama: 90,
      kedisiplinan: 85,
      komunikasi: 88,
      tanggung_jawab: 92,
      nilai_rata_rata: 89,
      grade: "A"
    }
  ],
  created_at: "2024-01-01",
  updated_at: "2024-01-01"
};

const ShowcaseDetailPage = () => {
  const params = useParams();
  const showcaseId = params.id;
  const [userProfile, setUserProfile] = useState<ProfilPengguna | null>(null);
  const [showcaseData, setShowcaseData] = useState<AnggotaAcara | null>(null);
  const [eventData, setEventData] = useState<DataAcara | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    const loadDummyData = async () => {
      try {
        setIsLoading(true);
        // Simulasi delay network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set data dummy berdasarkan ID
        setUserProfile({
          ...dummyUserProfile,
          id: showcaseId as string,
          nama: `John Doe (ID: ${showcaseId})`
        });
        setShowcaseData({
          ...dummyShowcaseData,
          id: showcaseId as string,
          nama: `John Doe (ID: ${showcaseId})`
        });
        setEventData({
          ...dummyEventData,
          id: showcaseId as string,
          judul: `Hackathon 2024 (ID: ${showcaseId})`
        });
      } catch (error) {
        console.error("Error loading dummy data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDummyData();
  }, [showcaseId]);

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Memuat...</p>
      </div>
    </div>
  );

  if (!userProfile || !showcaseData) return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <p>Data tidak ditemukan</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="w-full px-2 md:px-6">
        <CommunityProfileSection userProfile={userProfile} anggotaData={showcaseData} />
        {eventData && <CommunityActivitySection eventData={eventData} />}
      </div>
    </div>
  );
};

export default ShowcaseDetailPage; 