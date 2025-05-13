'use client';

import { Input } from "@/components/ui/input";
import { RequiredLabel } from "./RequiredLabel";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect, useState } from 'react';

interface ProjectNameSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export function ProjectNameSection({ sectionRef }: ProjectNameSectionProps) {
  const [mounted, setMounted] = useState(false);
  const title = usePortfolioStore((state) => state.title);
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Nama Project</h2>
      <RequiredLabel>Judul Project</RequiredLabel>
      <Input
        value={title}
        onChange={(e) => setPortfolioData({ title: e.target.value })}
        placeholder="Masukkan Nama Project"
        className="bg-white/5 border-0 text-white placeholder:text-gray-400"
      />
    </div>
  );
} 