'use client';

import Footer from '@/components/user/landing-page/Footer';
import { DashboardHeader } from '@/components/user/dashboard/DashboardHeader';
import { DashboardSearch } from '@/components/user/dashboard/DashboardSearch';
import { DashboardTable } from '@/components/user/dashboard/DashboardTable';
import { CategoryCards } from '@/components/user/dashboard/CategoryCards';

const categories = [
  {
    icon: '/Source Code.svg',
    number: '50',
    title: 'Rekayasa\nPerangkat Lunak',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Game Controller.svg',
    number: '35',
    title: 'Game\nIntelligence',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Slice.svg',
    number: '20',
    title: 'Data\nScience',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Network.svg',
    number: '15',
    title: 'Network\nand Security',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  }
];

const portfolioData = [
  { id: 1, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Terverifikasi' },
  { id: 2, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Proses Verifikasi' },
  { id: 3, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Ditolak' },
  { id: 4, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Perlu Perubahan' },
  { id: 5, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Belum Diverifikasi' },
];

export default function DashboardPage() {
  return (
    <div>
      <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardHeader 
            title="Dashboard"
            description="Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor."
          />
          <DashboardSearch />
          <DashboardTable portfolioData={portfolioData} />
          <CategoryCards categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
