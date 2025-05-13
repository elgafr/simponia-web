import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ShowcaseSearch() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search project or name"
          className="pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
        />
      </div>
      <Select>
        <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-[#001233] border-[#001B45]">
          <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">All Categories</SelectItem>
          <SelectItem value="Rekayasa Perangkat Lunak" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Rekayasa Perangkat Lunak</SelectItem>
          <SelectItem value="Game Cerdas" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Game Cerdas</SelectItem>
          <SelectItem value="Data Sains" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Data Sains</SelectItem>
          <SelectItem value="Jaringan dan Keamanan" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Jaringan dan Keamanan</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 