import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-12 mb-16">
          <Image 
            src="/Source Code.svg" 
            alt="Code" 
            width={60} 
            height={60}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
          <Image 
            src="/Game Controller.svg" 
            alt="Game" 
            width={60} 
            height={60}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
          <Image 
            src="/Slice.svg" 
            alt="Data" 
            width={60} 
            height={60}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
          <Image 
            src="/Network.svg" 
            alt="Network" 
            width={60} 
            height={60}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Selamat Datang di <span className="text-blue-400">Simponia</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Showcase your project and skill: Your Portfolio, Our Expertise
        </p>
        <Link
          href="/portfolio/create"
          className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Buat Portfolio
        </Link>
      </div>
    </section>
  );
} 