'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import { ProjectHeader } from '@/components/user/showcase/ShowcaseDetail/ProjectHeader';
import { ProjectContent } from '@/components/user/showcase/ShowcaseDetail/ProjectContent';
import { ProjectSidebar } from '@/components/user/showcase/ShowcaseDetail/ProjectSidebar';
import { portfolioItems } from '@/data/portfolioItems';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ShowcaseDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const id = parseInt(slug.split('-')[0]);
  const projectData = portfolioItems.find(item => item.id === id);
  
  if (!projectData) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectHeader project={projectData} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProjectContent project={projectData} />
            <ProjectSidebar project={projectData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 