'use client';

import { Input } from "@/components/ui/input";
import { RequiredLabel } from "./RequiredLabel";

interface ProjectNameSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export function ProjectNameSection({ sectionRef }: ProjectNameSectionProps) {
  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Nama Project</h2>
      <RequiredLabel>Judul Project</RequiredLabel>
      <Input
        placeholder="Judul"
        className="bg-white/5 border-0 text-white placeholder:text-gray-400"
      />
    </div>
  );
} 