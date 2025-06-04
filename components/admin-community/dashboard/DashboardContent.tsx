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
}

export default function DashboardContent({ adminData }: DashboardContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader 
          title="Dashboard Admin Community"
          description="Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor."
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
          <h2 className="text-3xl font-bold mb-6 text-white text-center">About Infotech</h2>
          <img src="/labit.svg" alt="Labit UMM" className="w-56 h-56 object-contain rounded-lg shadow-lg mb-6" />
          <p className="max-w-xl text-center text-gray-300">
            Lorem ipsum dolor sit amet consectetur. Commodo viverra amet sollicitudin eu accumsan. Nibh metus inceptos neque gravida in laoreet proin enim. Blandit gravida convallis vulputate lobortis. Potenti semper non mi. Eleifend bibendum massa id fusce id fusce. Vestibulum tristique sociis ac eu sapien rhoncus rutrum id id a risus turpis eu mattis nunc ac tincidunt. At nunc tempus ornare ullamcorper imperdiet.
          </p>
        </section>
      </div>
    </main>
  );
} 