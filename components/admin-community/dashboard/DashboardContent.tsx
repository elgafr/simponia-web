'use client';

import { DashboardHeader } from '@/components/admin-community/dashboard/DashboardHeader';
import { DashboardTable } from '@/components/admin-community/dashboard/DashboardTable';
import CreateEventModal from '@/components/admin-community/dashboard/CreateEventModal';
import { useState } from 'react';

interface AdminData {
  id: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface DashboardContentProps {
  adminData: AdminData | null;
  title?: string;
  description?: string;
}

export default function DashboardContent({ adminData, title = "Dashboard Admin Komunitas", description = "Selamat datang di dashboard admin komunitas. Di sini Anda dapat mengelola acara-acara komunitas, melihat statistik, dan mengatur pengguna." }: DashboardContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader 
          title={title}
          description={description}
        />
        <DashboardTable />
        <div className="flex justify-end mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-500 transition"
          >
            Tambah Acara
          </button>
        </div>
        <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <section className="flex flex-col items-center justify-center mt-16">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Tentang Infotech</h2>
          <img src="/labit.svg" alt="Labit UMM" className="w-56 h-56 object-contain rounded-lg shadow-lg mb-6" />
          <p className="max-w-xl text-center text-gray-300">
          Laboratorium Teknik Informatika berfungsi sebagai pusat pembelajaran praktis dan eksperimental yang dipergunakan oleh mahasiswa dan pelayanan untuk riset dan konsultasi keteknikan mencakup desain sofware untuk animasi, administrasi, grafis dll.
          </p>
        </section>
      </div>
    </main>
  );
} 