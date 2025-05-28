'use client';

import { DashboardHeader } from '@/components/user/dashboard/DashboardHeader';
import { DashboardTable } from '@/components/user/dashboard/DashboardTable';
import { CategoryCards } from '@/components/user/dashboard/CategoryCards';

interface PortfolioItem {
  id: string;
  nama_projek: string;
  kategori: string;
  tahun: number;
  status: string;
  gambar: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  anggota: Array<{
    id: string;
    user: {
      id: string;
      nim: string;
      role: string;
    };
    role: string;
    angkatan: string;
  }>;
  detail_project: Array<{
    id: string;
    judul_link: string;
    link_project: string;
  }>;
  tags: Array<{
    id: string;
    nama: string;
  }>;
}

interface UserData {
  id: string;
  nim: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface DashboardContentProps {
  portfolioData: PortfolioItem[];
  userData: UserData | null;
}

const categories = [
  {
    icon: '/Source Code.svg',
    number: '50',
    title: 'Rekayasa Perangkat Lunak',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Game Controller.svg',
    number: '35',
    title: 'Game Cerdas',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Slice.svg',
    number: '20',
    title: 'Data Sains',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Network.svg',
    number: '15',
    title: 'Keamanan Jaringan',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  }
];

export default function DashboardContent({ portfolioData, userData }: DashboardContentProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader 
          title="Dashboard"
          description="Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor."
        />
        <DashboardTable portfolioData={portfolioData} />
        <CategoryCards categories={categories} />
      </div>
    </main>
  );
} 