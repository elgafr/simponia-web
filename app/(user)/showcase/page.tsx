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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Footer from "@/components/landing-page/Footer";
import Link from 'next/link';

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  subtitle: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    tags: ['Mobile Application', 'UI/UX Design', 'Design System'],
    date: 'Released November 21, 2023',
    subtitle: 'Rekayasa Perangkat Lunak - 2022',
    description: 'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac elementum ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
  },
  {
    id: 2,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    tags: ['Mobile Application', 'UI/UX Design', 'Design System'],
    date: 'Released November 21, 2023',
    subtitle: 'Rekayasa Perangkat Lunak - 2022',
    description: 'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac elementum ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
  },
  {
    id: 3,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    tags: ['Mobile Application', 'UI/UX Design', 'Design System'],
    date: 'Released November 21, 2023',
    subtitle: 'Rekayasa Perangkat Lunak - 2022',
    description: 'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac elementum ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
  },
  {
    id: 4,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    tags: ['Mobile Application', 'UI/UX Design', 'Design System'],
    date: 'Released November 21, 2023',
    subtitle: 'Rekayasa Perangkat Lunak - 2022',
    description: 'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac elementum ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
  },
  {
    id: 5,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    tags: ['Mobile Application', 'UI/UX Design', 'Design System'],
    date: 'Released November 21, 2023',
    subtitle: 'Rekayasa Perangkat Lunak - 2022',
    description: 'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac elementum ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
  },
  {
    id: 6,
    title: 'UI/UX Healthy Application',
    image: '/portfolio-1.png',
    category: 'UI/UX Design',
    tags: ['Mobile Application', 'UI/UX Design', 'Design System'],
    date: 'Released November 21, 2023',
    subtitle: 'Rekayasa Perangkat Lunak - 2022',
    description: 'Lorem ipsum dolor sit amet consectetur. In non iaculis scelerisque feugiat urna. Neque curabitur ac elementum ut elementum sed vel lobortis. Dui turpis nisl facilisis in vitae consectetur accumsan in. Sed tristique est sit semper. Scelerisque dui nunc mi gravida dignissim erat ipsum consequat aliquam.',
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
              <SelectTrigger className="w-[180px] bg-white/5 border-0 text-white hover:bg-white/10 transition-colors">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#001233] border-[#001B45]">
                <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">All Categories</SelectItem>
                <SelectItem value="ui" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">UI/UX Design</SelectItem>
                <SelectItem value="web" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Web Development</SelectItem>
                <SelectItem value="mobile" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">Mobile App</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                href={`/showcase/${item.id}-${item.title.toLowerCase().replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')}`}
                className="group"
              >
                <Card className="py-0 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="w-full h-52 flex">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={208}
                      className="w-full h-full object-fill"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 px-6 mt-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardHeader className="pt-2 ">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {item.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p className="text-sm leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 flex justify-end">
                    <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                      See More
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
