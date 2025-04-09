'use client';

import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/landing-page/Footer";
import Link from 'next/link';

const portfolioItems = [
  {
    id: 1,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    date: 'Released November 21, 2023',
    description: 'Lorem ipsum dolor sit amet consectetur. In non lectus scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque sed nunc mi gravida dignissim sed. Ipsum convallis.',
  },
  {
    id: 2,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    date: 'Released November 21, 2023',
    description: 'Lorem ipsum dolor sit amet consectetur. In non lectus scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque sed nunc mi gravida dignissim sed. Ipsum convallis.',
  },
  {
    id: 3,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    date: 'Released November 21, 2023',
    description: 'Lorem ipsum dolor sit amet consectetur. In non lectus scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque sed nunc mi gravida dignissim sed. Ipsum convallis.',
  },
  {
    id: 4,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    date: 'Released November 21, 2023',
    description: 'Lorem ipsum dolor sit amet consectetur. In non lectus scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque sed nunc mi gravida dignissim sed. Ipsum convallis.',
  },
  {
    id: 5,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    date: 'Released November 21, 2023',
    description: 'Lorem ipsum dolor sit amet consectetur. In non lectus scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque sed nunc mi gravida dignissim sed. Ipsum convallis.',
  },
  {
    id: 6,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    date: 'Released November 21, 2023',
    description: 'Lorem ipsum dolor sit amet consectetur. In non lectus scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque feugiat urna vitae. Neque convallis ut adipiscing ut scelerisque sed nunc mi gravida dignissim sed. Ipsum convallis.',
  },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Portfolio Showcase
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search project or name"
                className="pl-10 bg-white/5 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ui">UI/UX Design</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                href={`/showcase/${item.id}-${item.title.toLowerCase().replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <span className="text-white group-hover:text-blue-400 transition-colors">
                    See More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
