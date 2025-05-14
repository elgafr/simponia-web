'use client';

import { useState } from 'react';
import Footer from '@/components/user/landing-page/Footer';
import { ShowcaseHeader } from '@/components/user/showcase/ShowcaseHeader';
import { ShowcaseSearch } from '@/components/user/showcase/ShowcaseSearch';
import { ShowcaseGrid } from '@/components/user/showcase/ShowcaseGrid';
import { portfolioItems } from '@/data/portfolioItems'; // Pindahkan data ke file terpisah

export default function ShowcasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contact?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
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
      <Footer />
    </div>
  );
}
