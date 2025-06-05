'use client';

import { useState } from 'react';
import { ShowcaseHeader } from '@/components/user/showcase/ShowcaseHeader';
import { ShowcaseSearch } from '@/components/user/showcase/ShowcaseSearch';
import { ShowcaseGrid } from '@/components/user/showcase/ShowcaseGrid';
import type { PortfolioItem } from '@/components/user/showcase/types';
import { EmptyState } from '@/components/ui/empty-state';

interface ShowcaseClientProps {
  initialData: PortfolioItem[];
}

export default function ShowcaseClient({ initialData }: ShowcaseClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredItems = initialData.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  // If no data or filtered data is empty, show empty state
  if (!initialData || initialData.length === 0 || filteredItems.length === 0) {
    return (
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowcaseHeader />
          <ShowcaseSearch
            searchQuery={searchQuery}
            onSearchChange={e => setSearchQuery(e.target.value)}
            category={category}
            onCategoryChange={setCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 mt-8 mb-8">
            <EmptyState 
              title={!initialData || initialData.length === 0 ? "Belum ada portfolio" : "Tidak ada hasil ditemukan"}
              description={!initialData || initialData.length === 0 
                ? "Belum ada portfolio yang ditampilkan. Coba lagi nanti!" 
                : "Coba ubah filter atau kata kunci pencarian Anda."}
              showAction={false}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader />
        <ShowcaseSearch
          searchQuery={searchQuery}
          onSearchChange={e => setSearchQuery(e.target.value)}
          category={category}
          onCategoryChange={setCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        <ShowcaseGrid items={filteredItems} />
      </div>
    </main>
  );
} 