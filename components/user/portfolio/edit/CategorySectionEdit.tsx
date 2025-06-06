'use client';

import { RequiredLabel } from "../RequiredLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditPortfolioStore } from "@/store/editPortfolioStore";

interface CategorySectionEditProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  errors?: {
    [key: string]: string;
  };
  onCategoryChange: (value: string) => void;
}

export function CategorySectionEdit({ sectionRef, errors = {}, onCategoryChange }: CategorySectionEditProps) {
  const category = useEditPortfolioStore((state) => state.category);

  // Map API category values to select values
  const getCategoryValue = (apiCategory: string) => {
    const categoryMap: { [key: string]: string } = {
      'Rekayasa Perangkat Lunak': 'rpl',
      'Game Cerdas': 'game',
      'Data Sains': 'data',
      'Keamanan Jaringan': 'network'
    };
    return categoryMap[apiCategory] || apiCategory;
  };

  // Map select values to API category values
  const getApiCategory = (selectValue: string) => {
    const categoryMap: { [key: string]: string } = {
      'rpl': 'Rekayasa Perangkat Lunak',
      'game': 'Game Cerdas',
      'data': 'Data Sains',
      'network': 'Keamanan Jaringan'
    };
    return categoryMap[selectValue] || selectValue;
  };

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Kategori</h2>
      <div className="space-y-4">
        <div>
          <RequiredLabel>Kategori Project</RequiredLabel>
          <Select
            value={getCategoryValue(category)}
            onValueChange={(value) => onCategoryChange(getApiCategory(value))}
          >
            <SelectTrigger className={`w-full bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent className="bg-[#001233] border-[#001B45]">
              <SelectItem value="rpl" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Rekayasa Perangkat Lunak</SelectItem>
              <SelectItem value="game" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Game Cerdas</SelectItem>
              <SelectItem value="data" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Data Sains</SelectItem>
              <SelectItem value="network" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Keamanan Jaringan</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
      </div>
    </div>
  );
} 