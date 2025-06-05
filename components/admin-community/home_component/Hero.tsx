"use client"; // Pastikan ini ada jika pakai Next.js App Router

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion

export default function HeroSection() {
  return (
    // Container utama dengan background statis
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      {/* Section yang di-animate, tanpa background */}
      <motion.section
        className="text-center"
        initial={{ opacity: 0, x: 0 }} // Mulai dari kiri
        animate={{ opacity: 1, x: 0 }} // Gerak ke posisi normal
        transition={{ duration: 0.5, ease: "easeOut" }} // Transisi smooth
      >
        <motion.div
          className="text-white space-y-4"
          initial={{ opacity: 0, y: 50 }} // Mulai lebih ke bawah
          animate={{ opacity: 1, y: 0 }} // Animasi naik
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }} // Delay agar muncul berurutan
        >
          {/* Bagian Icon */}
          <motion.div
            className="flex justify-center space-x-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          >
            <Image src="/images/Source Code.png" alt="Icon 1" width={100} height={100} />
            <Image src="/images/Game Controller.png" alt="Icon 2" width={100} height={100} />
            <Image src="/images/Slice.png" alt="Icon 3" width={100} height={100} />
            <Image src="/images/Network.png" alt="Icon 4" width={100} height={100} />
          </motion.div>

          {/* Bagian Teks */}
          <motion.h1
            className="text-6xl font-thin mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
          >
            Welcome To <span className="text-white font-bold">Simponia</span>
          </motion.h1>

          <motion.p
            className="text-2xl text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.2 }}
          >
            Showcase your project and skill: Your Portfolio, Our Expertise
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
          >
            <Link href={"/dashboard-admin-community"}>
              <button className="text-xl px-8 py-4 bg-white text-gray-900 font-semibold rounded-4xl mt-10 cursor-pointer hover:scale-110 transition">
                Go To Dashboard
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
