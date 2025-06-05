import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    icon: '/Source Code.svg',
    title: 'Software\nEngineering',
    description: 'Lorem ipsum dolor sit amet, consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
    link: '/category/software'
  },
  {
    icon: '/Game Controller.svg',
    title: 'Game\nIntelligence',
    description: 'Lorem ipsum dolor sit amet, consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
    link: '/category/game'
  },
  {
    icon: '/Slice.svg',
    title: 'Data\nScience',
    description: 'Lorem ipsum dolor sit amet, consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
    link: '/category/data'
  },
  {
    icon: '/Network.svg',
    title: 'Network\nand Security',
    description: 'Lorem ipsum dolor sit amet, consectetur. Tellus aliquet amet tortor ut donec. Suscipit, tortor cursus est ac.',
    link: '/category/network'
  }
];

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] pt-0">
      <div className="rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            KATEGORI PORTFOLIO
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