import Image from 'next/image';
import { PortfolioItem } from '@/types/portfolio';

interface Category {
  icon: string;
  title: string;
  description: string;
}

interface CategoryCardsProps {
  categories: Category[];
  portfolioData: PortfolioItem[];
}

export function CategoryCards({ categories, portfolioData }: CategoryCardsProps) {
  // Function to count projects by category
  const getCategoryCount = (categoryTitle: string) => {
    return portfolioData.filter(project => {
      // Map the category titles to match the API response categories
      const categoryMapping: { [key: string]: string } = {
        'Rekayasa Perangkat Lunak': 'Rekayasa Perangkat Lunak',
        'Game Cerdas': 'Game Cerdas',
        'Data Sains': 'Data Sains',
        'Keamanan Jaringan': 'Keamanan Jaringan'
      };
      
      // Filter out portfolios with status 'Perlu Perubahan' or 'Dihapus'
      return project.kategori === categoryMapping[categoryTitle] && 
             project.status !== 'Perlu Perubahan' && 
             project.status !== 'Dihapus';
    }).length;
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-8 flex justify-center">Kategori Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <span className="text-2xl font-bold text-white">{getCategoryCount(category.title)}</span>
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
    </>
  );
} 