import { EmptyState } from '@/components/ui/empty-state';
import { ShowcaseCard } from './ShowcaseCard';
import type { PortfolioItem } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';


interface ShowcaseGridProps {
  items: PortfolioItem[];
}

const ITEMS_PER_PAGE = 6;

export function ShowcaseGrid({ items }: ShowcaseGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // If no items, show empty state
  if (!items || items.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState 
          title="Belum ada portfolio"
          description="Belum ada portfolio yang ditampilkan. Coba lagi nanti!"
          showAction={false}
        />
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <ShowcaseCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700/50">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, items.length)} of {items.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 