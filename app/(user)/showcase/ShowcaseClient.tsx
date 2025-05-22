'use client';

import { useState } from 'react';
import { ShowcaseHeader } from '@/components/user/showcase/ShowcaseHeader';
import { ShowcaseSearch } from '@/components/user/showcase/ShowcaseSearch';
import { ShowcaseGrid } from '@/components/user/showcase/ShowcaseGrid';
import type { PortfolioItem } from '@/components/user/showcase/types';

interface ShowcaseClientProps {
  initialData: PortfolioItem[];
}

export default function ShowcaseClient({ initialData }: ShowcaseClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredItems = initialData.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader />
        <ShowcaseSearch
          searchQuery={searchQuery}
          onSearchChange={e => setSearchQuery(e.target.value)}
          category={category}
          onCategoryChange={setCategory}
        />
        <ShowcaseGrid items={filteredItems} />
      </div>
    </main>
  );
} 