import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardSearch() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search"
          className="pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
            <SelectValue placeholder="Kategori Portfolio" />
          </SelectTrigger>
          <SelectContent className="bg-[#001233] border-[#001B45]">
            <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Kategori</SelectItem>
            <SelectItem value="rpl" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Rekayasa Perangkat Lunak</SelectItem>
            <SelectItem value="game" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Game Cerdas</SelectItem>
            <SelectItem value="data" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Data Sains</SelectItem>
            <SelectItem value="network" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Keamanan Jaringan</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
            <SelectValue placeholder="Status Portfolio" />
          </SelectTrigger>
          <SelectContent className="bg-[#001233] border-[#001B45]">
            <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Semua Status</SelectItem>
            <SelectItem value="verified" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Terverifikasi</SelectItem>
            <SelectItem value="process" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Proses Verifikasi</SelectItem>
            <SelectItem value="rejected" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Ditolak</SelectItem>
            <SelectItem value="waiting" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Menunggu Approval</SelectItem>
            <SelectItem value="unverified" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Belum Diverifikasi</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 