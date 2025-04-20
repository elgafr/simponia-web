import { ShowcaseCard } from './ShowcaseCard';
import type { PortfolioItem } from './types';

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