import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    icon: '/Source Code.svg',
    title: 'Rekayasa\nPerangkat Lunak',
    description: 'Kembangkan aplikasi dan sistem perangkat lunak yang inovatif. Pelajari pengembangan web, mobile, dan desktop dengan teknologi terkini.',
    link: ''
  },
  {
    icon: '/Game Controller.svg',
    title: 'Kecerdasan\nGame',
    description: 'Eksplorasi dunia game development dan kecerdasan buatan dalam gaming. Buat game yang menarik dengan AI dan mekanik gameplay yang unik.',
    link: ''
  },
  {
    icon: '/Slice.svg',
    title: 'Data\nSains',
    description: 'Analisis dan visualisasi data untuk pengambilan keputusan yang lebih baik. Kuasai machine learning, data mining, dan big data analytics.',
    link: ''
  },
  {
    icon: '/Network.svg',
    title: 'Jaringan\ndan Keamanan',
    description: 'Pelajari keamanan siber dan manajemen jaringan. Kembangkan solusi keamanan dan infrastruktur jaringan yang handal dan aman.',
    link: ''
  }
];

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] pt-0">
      <div className="rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            KATEGORI PORTOFOLIO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link 
                href={category.link} 
                key={index}
                className="group bg-white/5 backdrop-blur-md p-6 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={50}
                      height={50}
                      className="filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 whitespace-pre-line">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm flex-grow">
                    {category.description}
                  </p>
                  <div className="mt-4 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-white">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 