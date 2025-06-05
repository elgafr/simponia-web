"use client";

import React from "react";

const HeroSection1DetailCommunity: React.FC = () => {
  return (
    <section className=" text-white p-8 rounded-lg lg:px-100 py-20">
      {/* Profile Section */}
      <div>
        <div className="text-white mb-15 text-center">
            <h1 className="text-4xl font-bold mb-5">Curiculum Vitae (CV) Community</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae illum dolorem nemo laboriosam voluptate voluptatem saepe harum voluptates. Similique, ratione. Expedita vitae officia nostrum. Necessitatibus voluptates ea placeat saepe?</p>
            </div>
        
        
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          Profile
        </h2>
        <div className="border-t border-gray-500 my-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-xl bg-white/5 p-5 rounded-2xl  hover:scale-102 transition">
          <p>
            <span className="text-gray-300">Fullname :</span> Fatahillah Al-Fatih
          </p>
          <p>
            <span className="text-gray-300 text-start">NIM :</span> 202310730311132
          </p>
          <p>
            <span className="text-gray-300">Email :</span>{" "}
            <a href="mailto:fatahillah.alt@gmail.com" className="text-blue-400 hover:underline">
              fatahillah.alt@gmail.com
            </a>
          </p>
          <p>
            <span className="text-gray-300">Gender :</span> Laki - Laki
          </p>
          <p>
            <span className="text-gray-300">Birth Place :</span> Balikpapan
          </p>
          <p>
            <span className="text-gray-300">Birth Date :</span> 13 Juni 2004
          </p>
        </div>
      </div>

      {/* Community Section */}
      <h2 className="text-3xl font-bold mb-4 flex items-center mt-10 gap-2">
          Community
      </h2>
      <div className="border-t border-gray-500 my-4"></div>

      <div className="mt-8 bg-white/5 p-4 rounded-2xl hover:scale-102 transition">
        <div className=" rounded-lg ">
          <h3 className="text-xl font-semibold">Infotech</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-xl mt-2">
            <p>
              <span className="text-gray-300">Join Date :</span> 01/08/2024
            </p>
            <p>
              <span className="text-gray-300">Division :</span> Sistem Informasi
            </p>
            <p>
              <span className="text-gray-300">Position :</span> Sekretaris
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1DetailCommunity;
