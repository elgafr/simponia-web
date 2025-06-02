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
      href={`/showcase/${item.id}`}
      className="group h-full"
    >
      <Card className="py-0 h-full flex flex-col bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 rounded-t-xl">
        {/* Image Container - Fixed Height */}
        <div className="w-full h-52 relative rounded-t-xl overflow-hidden">
          <Image
            src={item.image ? `${process.env.NEXT_PUBLIC_API_URL}${item.image}` : "/default-avatar.png"}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Tags - Fixed Height */}
        <div className="flex flex-wrap gap-2 px-6 mt-0 min-h-[2rem] max-h-[2rem] overflow-hidden">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1 bg-white/5 backdrop-blur-sm rounded-full text-xs text-white flex items-center justify-center"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Header - Fixed Height */}
        <CardHeader className="pt-0 pb-0">
          <h3 className="text-xl font-bold text-white line-clamp-1">{item.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-1">{item.subtitle}</p>
        </CardHeader>

        {/* Content - Flexible Height */}
        <CardContent className="flex-grow">
          <p className="text-sm leading-relaxed line-clamp-2 text-gray-300">
            {typeof item.description === 'string' ? item.description : item.description[0]}
          </p>
        </CardContent>

        {/* Footer - Fixed Height */}
        <CardFooter className="pt-4 pb-4 mt-auto">
          <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors ml-auto">
            See More
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
} 