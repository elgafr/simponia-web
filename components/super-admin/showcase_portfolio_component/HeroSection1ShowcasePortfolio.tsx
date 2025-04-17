"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; // Tambahkan import ini
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";


const portfolios = [
  { id: 1, name: "M. Heykal Dhafariel Rajendra", project: "Menguasai Rekayasa Perangkat Lunak: Kumpulan Proyek dan Pencapaian", year: 2024, category: "Software Engineering", tag: "Mobile Application, UI/UX Designer, Design System", image: "/images/portfolio2.png" },
  { id: 2, name: "Fitra Romeo Winky", project: "Transformasi Digital: Inovasi dalam Rekayasa Perangkat Lunak", year: 2024, category: "Software Engineering", tag: "Backend Developer, Cloud Computing", image: "/images/portfolio.png" },
  { id: 3, name: "Nadira Ulya Nisa", project: "Dari Konsep ke Realisasi: Portofolio Proyek Rekayasa Perangkat Lunak", year: 2024, category: "Software Engineering", tag: "Frontend Developer, Web Design", image: "/images/portfolio.png" },
  { id: 4, name: "Krisna Bimantoro", project: "Perjalanan Karier dalam Rekayasa Perangkat Lunak: Studi Kasus dan Aplikasi", year: 2024, category: "Game Intelligence", tag: "Game Developer, AI Programmer", image: "/images/portfolio2.png" },
];

const HeroSection1ShowcasePortfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredPortfolios = portfolios.filter(
    (portfolio) =>
      (selectedCategory === "" || portfolio.category === selectedCategory) &&
      portfolio.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="flex flex-col items-center py-20 justify-center min-h-screen w-full text-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="p-6 rounded-lg pb-8 max-w-5xl text-center">
        <h1 className="text-6xl font-bold text-white mb-10 mt-20">Portofolio Showcase</h1>
        <p className="text-lg mt-2 text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
        </p>
      </div>

      <div className="my-6 border-b border-gray-300 w-3/5"></div>

      {/* Search & Category Filter */}
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-center gap-4 px-4">
        <div className="relative flex items-center w-2/3 hover:scale-101 transition">
          <input
            type="text"
            placeholder="Search Portofolio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-200 w-full p-3 pl-10 text-gray-800 rounded-xl shadow-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <IoSearchOutline className="absolute left-3 text-gray-500" size={20} />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 bg-gray-200 text-gray-800 rounded-xl shadow-lg outline-none"
        >
          <option value="">All Category</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Game Intelligence">Game Intelligence</option>
          <option value="Data Science">Data Science</option>
          <option value="Network and Security">Network and Security</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Cyber Security">Cyber Security</option>
        </select>
      </div>

      <h2 className="text-3xl font-semibold text-white mt-5 mb-10">{selectedCategory || "All Category"}</h2>

      {/* Grid Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-70">
        
        {filteredPortfolios.map((portfolio) => (
          <div key={portfolio.id} className="border-transparent border-1 hover:border-white bg-gradient-to-b from-indigo-900 to-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-gray-700">
            <Image 
              src={portfolio.image} 
              alt={portfolio.project} 
              width={500} 
              height={300} 
              className="w-full h-48 object-cover" 
            />

            <div className="p-5 text-left">

             {/* Tag */}
              <div className="flex flex-wrap gap-1 mt-2">
                {portfolio.tag.split(", ").map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-white font-semibold text-sm 
                              bg-gradient-to-r from-indigo-800 to-red-600 
                              px-2 py-2 rounded-2xl cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Title */}
              <h3 className="text-white text-xl font-bold mt-2">{portfolio.project}</h3>

              {/* Category */}
              <h2 className="text-gray-300 text-base font-semibold mt-2">{portfolio.category}</h2>
              
              
              {/* Name & Year */}
              <p className="text-gray-400 mt-1 mb-3">{portfolio.name} - {portfolio.year}</p>

              <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum illum doloremque ex repellat temporibus voluptatum libero incidunt nisi repellendus mollitia optio quibusdam voluptatem et, unde qui? Molestiae, fuga? Dolorem, quae.</p>
              
              <div className="text-right">
              <Link href={`/detail-super-admin/portfolio/view`} className="inline-block mt-4">
                <IoIosArrowForward size={'30'} className="text-white mt-10 hover:text-gray-500"/>
              </Link>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {filteredPortfolios.length === 0 && (
        <p className="text-gray-300 mt-10">No portfolio found</p>
      )}
    </section>
  );
};

export default HeroSection1ShowcasePortfolio;
