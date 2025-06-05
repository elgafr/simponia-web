'use client';

import { Input } from "@/components/ui/input";
import { RequiredLabel } from "./RequiredLabel";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect, useState } from 'react';

interface ProjectNameSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  errors?: {
    [key: string]: string;
  };
  onTitleChange: (value: string) => void;
}

export function ProjectNameSection({ sectionRef, errors = {}, onTitleChange }: ProjectNameSectionProps) {
  const [mounted, setMounted] = useState(false);
  const title = usePortfolioStore((state) => state.title);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Nama Project</h2>
      <div className="space-y-4">
        <div>
          <RequiredLabel>Nama Project</RequiredLabel>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Masukkan nama project"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
      </div>
    </div>
  );
} 