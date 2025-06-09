'use client';

import { Input } from "@/components/ui/input";
import { RequiredLabel } from "../RequiredLabel";
import { useEditPortfolioStore } from "@/store/editPortfolioStore";
import { useEffect, useState } from 'react';

interface ProjectNameSectionEditProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  errors?: {
    [key: string]: string;
  };
  onTitleChange: (value: string) => void;
}

export function ProjectNameSectionEdit({ sectionRef, errors = {}, onTitleChange }: ProjectNameSectionEditProps) {
  const [mounted, setMounted] = useState(false);
  const title = useEditPortfolioStore((state) => state.title);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Nama Proyek</h2>
      <div className="space-y-4">
        <div>
          <RequiredLabel>Nama Proyek</RequiredLabel>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Masukkan nama proyek"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
      </div>
    </div>
  );
} 