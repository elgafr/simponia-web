'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Eye, Trash2, PenLine } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    icon: '/Source Code.svg',
    number: '50',
    title: 'Rekayasa\nPerangkat Lunak',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Game Controller.svg',
    number: '35',
    title: 'Game\nIntelligence',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Slice.svg',
    number: '20',
    title: 'Data\nScience',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  },
  {
    icon: '/Network.svg',
    number: '15',
    title: 'Network\nand Security',
    description: 'Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
  }
];

const portfolioData = [
  { id: 1, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Terverifikasi' },
  { id: 2, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Proses Verifikasi' },
  { id: 3, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Ditolak' },
  { id: 4, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Perlu Perubahan' },
  { id: 5, name: 'Analisis Database Tokopedia', category: 'Data Science', year: '2024', status: 'Belum Diverifikasi' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Terverifikasi':
      return 'bg-green-500';
    case 'Proses Verifikasi':
      return 'bg-gray-500';
    case 'Ditolak':
      return 'bg-red-500';
    case 'Perlu Perubahan':
      return 'bg-yellow-500';
    case 'Belum Diverifikasi':
      return 'bg-blue-400';
    default:
      return 'bg-gray-500';
  }
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at et. Tincidunt et sapien donec id integer pulvinar. Scelerisque accumsan a ornare dictum massa media. Suspendisse at dolor.
          </p>
        </div>

        {/* Search and Filter Section */}
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
              <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white">
                <SelectValue placeholder="Kategori Portfolio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="rpl">Rekayasa Perangkat Lunak</SelectItem>
                <SelectItem value="game">Game Intelligence</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="network">Network and Security</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white">
                <SelectValue placeholder="Status Portfolio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="verified">Terverifikasi</SelectItem>
                <SelectItem value="process">Proses Verifikasi</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
                <SelectItem value="waiting">Menunggu Approval</SelectItem>
                <SelectItem value="unverified">Belum Diverifikasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden mb-16">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">No.</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tahun</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((item) => (
                <tr key={item.id} className="border-b border-gray-700/50 hover:bg-white/5">
                  <td className="px-6 py-4 text-gray-300">{item.id}</td>
                  <td className="px-6 py-4 text-white">{item.name}</td>
                  <td className="px-6 py-4 text-gray-300">{item.category}</td>
                  <td className="px-6 py-4 text-gray-300">{item.year}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </button>
                      {item.status === 'Menunggu Approval' && (
                        <button className="p-1 text-gray-400 hover:text-white">
                          <PenLine className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Cards */}
        <h2 className="text-2xl font-bold text-white mb-8">Kategori Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    width={40}
                    height={40}
                    className="filter brightness-0 invert"
                  />
                  <span className="text-2xl font-bold text-white">{category.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 whitespace-pre-line">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm flex-grow">
                  {category.description}
                </p>
                <div className="mt-4">
                  <span className="text-white">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
