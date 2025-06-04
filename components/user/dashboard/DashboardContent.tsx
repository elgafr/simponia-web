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
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Game Controller.svg',
    title: 'Game Cerdas',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Slice.svg',
    title: 'Data Sains',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Network.svg',
    title: 'Keamanan Jaringan',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
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
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader 
          title="Dashboard"
          description="Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor."
        />
        <DashboardTable portfolioData={filteredPortfolioData} />
        <CategoryCards categories={categories} portfolioData={filteredPortfolioData} />
      </div>
    </main>
  );
} 