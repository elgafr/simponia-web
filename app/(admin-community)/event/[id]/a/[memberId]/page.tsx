"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommunityProfileSection from "@/components/admin-community/detail_component/community/edit/CommunityProfileSection";
import CommunityActivitySection from "@/components/admin-community/detail_component/community/edit/CommunityActivitySection";
import { toast } from "sonner";

interface AnggotaAcara {
  id: string;
  acara: {
    id: string;
  };
  created_by: {
    id: string;
    nim: string;
    role: string;
  };
  id_user: string;
  nama: string;
  nim: string;
  gender: string;
  email: string;
  nama_komunitas: string | null;
  join_komunitas: string | null;
  divisi: string | null;
  posisi: string | null;
  jabatan: string;
  status: string;
  kerjasama: number | null;
  kedisiplinan: number | null;
  komunikasi: number | null;
  tanggung_jawab: number | null;
  nilai_rata_rata: number;
  grade: string;
  catatan: string | null;
  created_at: string;
  updated_at: string;
}

interface UserProfile {
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

interface EventData {
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
  ketua_pelaksana: {
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

const MemberDetailPage = () => {
  const params = useParams();
  const eventId = params.id;
  const memberId = params.memberId;
  const [anggotaData, setAnggotaData] = useState<AnggotaAcara | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Fetch anggota-acara data
      const anggotaResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${memberId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!anggotaResponse.ok) {
        throw new Error('Failed to fetch anggota data');
      }

      const anggotaData = await anggotaResponse.json();
      setAnggotaData(anggotaData);

      // Fetch event data
      const eventResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${anggotaData.acara.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!eventResponse.ok) {
        throw new Error('Failed to fetch event data');
      }

      const eventData = await eventResponse.json();
      setEventData(eventData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] flex items-center justify-center">
        <div className="text-white text-xl">Memuat...</div>
      </div>
    );
  }

  if (!anggotaData || !eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] flex items-center justify-center">
        <div className="text-white text-xl">Data tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="w-full px-2 md:px-6">
        <CommunityProfileSection 
          anggotaData={anggotaData}
        />
        <CommunityActivitySection 
          eventData={eventData} 
          onRefresh={fetchData}
        />
      </div>
    </div>
  );
};

export default MemberDetailPage; 