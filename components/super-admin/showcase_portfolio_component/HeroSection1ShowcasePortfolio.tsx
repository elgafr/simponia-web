'use client';

// Import necessary modules and components
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define interfaces
export interface PortfolioItem {
  id: string; // Changed to string to preserve UUID
  title: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  subtitle: string;
  description: string | string[];
  links?: {
    title: string;
    url: string;
  }[];
  teamMembers?: {
    name: string;
    role: string;
  }[];
  contact?: {
    name: string;
    id: string;
  };
}

// Interface for Postman response (to type the fetched data)
interface BackendPortfolioItem {
  id: string;
  nama_projek: string;
  kategori: string;
  tahun: number;
  status: string;
  gambar: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  anggota: {
    id: string;
    user: {
      id: string;
      nim: string;
      password: string;
      role: string;
      remember_token: string | null;
      created_at: string;
      updated_at: string;
    };
    role: string;
    angkatan: string;
    createdAt: string;
    updatedAt: string;
  }[];
  detail_project: {
    id: string;
    judul_link: string;
    link_project: string;
    created_at: string;
    updated_at: string;
  }[];
  tags: {
    id: string;
    nama: string;
    created_at: string;
    updated_at: string;
  }[];
}

// ShowcaseHeader Component
export function ShowcaseHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Portfolio Showcase
      </h1>
      <p className="text-gray-300 max-w-3xl mx-auto">
        Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor
      </p>
    </div>
  );
}

// ShowcaseSearch Component
interface ShowcaseSearchProps {
  categories: string[];
}

export function ShowcaseSearch({ categories }: ShowcaseSearchProps) {
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
          <SelectItem value="all" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
            All Categories
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category.toLowerCase()} // Use lowercase for the value to ensure consistency
              className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ShowcaseCard Component
interface ShowcaseCardProps {
  item: PortfolioItem;
}

export function ShowcaseCard({ item }: ShowcaseCardProps) {
  return (
    <Link
      href={`/detail-super-admin/portfolio/view/${item.id}-${item.title.toLowerCase().replace(/[^\w\s]/g, '-').replace(/\s+/g, '-')}`}
      className="group"
    >
      <Card className="py-0 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden flex flex-col">
        <div className="w-full h-52 flex">
          <Image
            src={`/${item.image}`} // Prepend base URL to image path
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
        <CardHeader className="pt-2">
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.subtitle}</p>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="text-sm leading-relaxed line-clamp-2">
            {typeof item.description === 'string' ? item.description : item.description[0]}
          </p>
        </CardContent>
        <CardFooter className="pt-0 pb-4 flex justify-end">
          <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
            See More
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

// ShowcaseGrid Component
interface ShowcaseGridProps {
  items: PortfolioItem[];
}

export function ShowcaseGrid({ items }: ShowcaseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ShowcaseCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// Main HeroSection1ShowcasePortfolio Component
export default function HeroSection1ShowcasePortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolio data from backend
  useEffect(() => {
    const fetchPortfolios = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use Bearer token for authentication
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch portfolios: ${response.status} - ${errorText}`);
        }

        const data: BackendPortfolioItem[] = await response.json();

        // Map backend response to PortfolioItem interface
        const mappedItems: PortfolioItem[] = data.map((item) => ({
          id: item.id, // Use the full UUID as the id
          title: item.nama_projek,
          image: item.gambar,
          category: item.kategori,
          tags: item.tags.map(tag => tag.nama),
          date: item.created_at,
          subtitle: item.kategori, // No subtitle in response, using category as fallback
          description: item.deskripsi,
          links: item.detail_project.map(detail => ({
            title: detail.judul_link,
            url: detail.link_project,
          })),
          teamMembers: item.anggota.map(member => ({
            name: member.user.nim, // Temporarily using NIM; will update later with actual names
            role: member.role,
          })),
          contact: undefined, // Not present in Postman response
        }));

        setPortfolioItems(mappedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching portfolios.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Extract unique categories from portfolioItems
  const uniqueCategories = Array.from(new Set(portfolioItems.map(item => item.category)));

  if (loading) return <div className="text-white text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowcaseHeader />
          <ShowcaseSearch categories={uniqueCategories} />
          <ShowcaseGrid items={portfolioItems} />
        </div>
      </main>
    </div>
  );
}