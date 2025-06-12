'use client';

import { DashboardHeader } from '@/components/user/dashboard/DashboardHeader';
import { DashboardTable } from '@/components/user/dashboard/DashboardTable';
import { CategoryCards } from '@/components/user/dashboard/CategoryCards';
import { useEffect, useState } from 'react';
import { PortfolioItem } from '@/types/portfolio';

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
    title: 'Rekayasa Perangkat Lunak',
    description: 'Pengembangan dan pembuatan perangkat lunak berkualitas tinggi dengan fokus pada desain, pengujian, dan pemeliharaan sistem.',
  },
  {
    icon: '/Game Controller.svg',
    title: 'Game Cerdas',
    description: 'Pengembangan game dengan integrasi kecerdasan buatan dan teknologi interaktif untuk pengalaman bermain yang lebih menarik.',
  },
  {
    icon: '/Slice.svg',
    title: 'Data Sains',
    description: 'Analisis dan pengolahan data untuk mendapatkan wawasan berharga dan pengambilan keputusan berbasis data.',
  },
  {
    icon: '/Network.svg',
    title: 'Keamanan Jaringan',
    description: 'Implementasi dan pengelolaan sistem keamanan jaringan untuk melindungi infrastruktur digital dari ancaman siber.',
  }
];

export default function DashboardContent({ portfolioData, userData }: DashboardContentProps) {
  const [filteredPortfolioData, setFilteredPortfolioData] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    if (userData && portfolioData) {
      // Filter portfolio data based on creator's user_id
      const filtered = portfolioData.filter(portfolio => 
        portfolio.creator.user_id === userData.id
      );
      setFilteredPortfolioData(filtered);
    }
  }, [userData, portfolioData]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader 
          title="Dashboard"
          description="Selamat datang di dashboard Anda. Di sini Anda dapat melihat dan mengelola portofolio Anda. Jelajahi berbagai kategori dan lihat proyek-proyek yang telah Anda buat."
        />
        <DashboardTable portfolioData={filteredPortfolioData} />
        <CategoryCards categories={categories} portfolioData={portfolioData} />
      </div>
    </main>
  );
} 