import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { PortfolioItem } from './types';

interface ShowcaseCardProps {
  item: PortfolioItem;
}

export function ShowcaseCard({ item }: ShowcaseCardProps) {
  return (
    <Link
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
        <CardHeader className="pt-2">
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.category} - {item.tahun}</p>
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