"use client";

import React from "react";
import { FaArrowLeft, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";
import { SlSocialLinkedin } from "react-icons/sl";
import { TbBrandGmail } from "react-icons/tb";


const HeroSection1DetailPortfolioView: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-[#0B1623] to-blue-950 lg:px-60 py-30">
          {/* Navigation Bar */}
          <div className="flex justify-between items-center mb-6">
            <Link href={'/dashboard'}>
                <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-110 transition">
              <FaArrowLeft className="mr-2" /> Back
                </button>
            </Link>
          </div>
      
          {/* Header Image */}
          <div className="w-full h-64 md:h-80 bg-gray-500 rounded-lg overflow-hidden">
            <Image
              src="/images/portfolio.png"
              alt="Portfolio Preview"
              width={1200}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
      
          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
            {/* Left Side - Description */}
            <div className="md:col-span-2">
              <h1 className="text-white text-3xl md:text-6xl font-bold">
                UI/UX Healthy Application
              </h1>
              <p className="text-gray-400 text-xl mt-3">Software Engineering - 2022</p>
      
              {/* Tags */}
              <div className="flex space-x-3 mt-4">
                <span className="px-3 py-1  bg-gradient-to-r from-indigo-800 to-red-600 text-lg font-semibold text-white rounded-2xl">
                  Mobile Application
                </span>
                <span className="px-3 py-1  bg-gradient-to-r from-indigo-800 to-red-600 text-lg font-semibold text-white rounded-2xl">
                  UI/UX Designer
                </span>
                <span className="px-3 py-1  bg-gradient-to-r from-indigo-900 to-red-600 text-lg font-semibold text-white rounded-2xl">
                  Design System
                </span>
              </div>
      
              {/* Description */}
              <p className="text-gray-300 mt-4 text-lg">
                Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
                Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis.
                Suspendisse at dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam voluptas incidunt quaerat enim inventore illo rerum dolorem temporibus atque accusantium,
                omnis, praesentium distinctio non esse itaque! At rem quam minima!
              </p>
      
              {/* Contact */}
              <div className="bg-gradient-to-b from-indigo-950 to-gray-700 shadow-2xl p-6 rounded-lg mt-38 w-100">
                <h3 className="text-white text-2xl font-semibold mb-2">Get in Touch</h3>
                <p className="text-gray-300 text-xl">Krisna Bimantoro / 202210730311254</p>
      
                <div className="flex space-x-3 mt-7">
                  {/* Whatsapp */}
                  <a href="https://wa.me/62XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                    <IoLogoWhatsapp size={30} className="transition transform duration-300 ease-in-out hover:scale-130 hover:text-green-500" />
                  </a>

                  {/* Github */}
                  <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
                    <FiGithub size={30} className="transition transform duration-300 ease-in-out hover:scale-130 hover:text-indigo-500" />
                  </a>

                  {/* Instagram */}
                  <a href="https://www.instagram.com/username" target="_blank" rel="noopener noreferrer">
                  <IoLogoInstagram size={30}className="text-white transition duration-300 ease-in-out hover:scale-130 hover:text-purple-500"/>
                  </a>

                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
                    <SlSocialLinkedin size={28} className="transition transform duration-300 ease-in-out hover:scale-130 hover:text-blue-800" />
                     
                  </a>

                  {/* Gmail */}
                  <a href="mailto:youremail@gmail.com">
                    <TbBrandGmail size={31} className="transition transform duration-300 ease-in-out hover:scale-130 hover:text-red-700" />
                      
                  </a>
                </div>

              </div>
            </div>
      
            {/* Right Side - Additional Info & Team Project */}
            <div className="md:col-span-1 space-y-10 mt-35 w-85 ml-30">
              {/* Additional Info */}
              
              <div className="shadow-2xl bg-gradient-to-l from-indigo-950 to-gray-800 p-6 rounded-lg">
                <h3 className="text-white font-semibold mb-2 text-xl">Figma Mobile App</h3>
                <a
                  href="http://www"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-700 px-4 py-2 rounded-lg text-white hover:underline cursor-pointer"
                >
                  <FaGlobe className="mr-2" />
                  http://www
                </a>

                <h3 className="text-white font-semibold mt-4 mb-2 text-xl">
                  Medium Study Case
                </h3>
                <a
                  href="http://www"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-700 px-4 py-2 rounded-lg text-white hover:underline cursor-pointer"
                >
                  <FaGlobe className="mr-2" />
                  http://www
                </a>
              </div>

      
              {/* Team Project */}
              <div className="shadow-2xl bg-gradient-to-l from-indigo-950 to-gray-800 p-6 rounded-lg">
                <h3 className="text-white font-semibold mb-4 text-xl">Team Project</h3>
                {Array(3)
                  .fill("Krisna Bimantoro")
                  .map((name, index) => (
                    <p key={index} className="text-gray-300 text-lg">
                      {name} <span className="text-gray-500 text-lg">UI/UX Designer</span>
                    </p>
                  ))}
              </div>
      
            </div>

          </div>
          

        </section>
      );

};

export default HeroSection1DetailPortfolioView;
