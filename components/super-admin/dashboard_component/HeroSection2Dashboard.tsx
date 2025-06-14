import React from 'react';
import Image from 'next/image';

interface Category {
  icon: string;
  number: string;
  title: string;
  description: string;
}

interface CategoryCardsProps {
  categories?: Category[]; // Make categories optional with default value
}

const HeroSection2Dashboard: React.FC<CategoryCardsProps> = ({ categories = [
  {
    icon: '/Source Code.svg',
    number: '50',
    title: 'Rekayasa\nPerangkat Lunak',
    description: 'Pengembangan dan pembuatan perangkat lunak berkualitas tinggi dengan fokus pada desain, pengujian, dan pemeliharaan sistem.',
  },
  {
    icon: '/Game Controller.svg',
    number: '35',
    title: 'Game\nCerdas',
    description: 'Pengembangan game dengan integrasi kecerdasan buatan dan teknologi interaktif untuk pengalaman bermain yang lebih menarik.',
  },
  {
    icon: '/Slice.svg',
    number: '20',
    title: 'Data\nSains',
    description: 'Analisis dan pengolahan data untuk mendapatkan wawasan berharga dan pengambilan keputusan berbasis data.',
  },
  {
    icon: '/Network.svg',
    number: '15',
    title: 'Keamanan\ndan Jaringan',
    description: 'Implementasi dan pengelolaan sistem keamanan jaringan untuk melindungi infrastruktur digital dari ancaman siber.',
  }
] }) => {
  return (
    <section className="px-80 py-30 bg-gradient-to-t from-[#001B45] via-[#001233] to-[#051F4C]">
      <h2 className="text-5xl font-bold text-white mb-20 flex justify-center">Category Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category: Category, index: number) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={60}
                  height={60}
                  className="filter brightness-0 invert"
                />
                <span className="text-5xl font-bold text-white">{category.number}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white mb-2 whitespace-pre-line">
                {category.title}
              </h3>
              <p className="mt-2 text-gray-400 text-base flex-grow">{category.description}</p>
              <div className="mt-7">
                <span className="text-4xl flex justify-end text-white">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


export default HeroSection2Dashboard;