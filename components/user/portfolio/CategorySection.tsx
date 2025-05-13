'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequiredLabel } from "./RequiredLabel";

interface CategorySectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export function CategorySection({ sectionRef }: CategorySectionProps) {
  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Kategori</h2>
      <RequiredLabel>Kategori Bidang Minat</RequiredLabel>
      <Select>
        <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
          <SelectValue placeholder="Pilih Kategori Bidang Minat" />
        </SelectTrigger>
        <SelectContent className="bg-[#001233] border-[#001B45]">
          <SelectItem value="rpl" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Rekayasa Perangkat Lunak</SelectItem>
          <SelectItem value="game" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Game Intelligence</SelectItem>
          <SelectItem value="data" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Data Science</SelectItem>
          <SelectItem value="network" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Network and Security</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 