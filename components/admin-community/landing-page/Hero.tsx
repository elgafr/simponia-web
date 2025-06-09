"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Hero() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDashboardClick = () => {
    try {
      if (!isMounted) return;

      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');

      if (!token) {
        // If not logged in, redirect to login page
        router.push('/auth/login');
      } else if (userRole === '2') { // 2 is ADMINCOM role
        // If logged in as admin community, redirect to dashboard
        router.push('/dashboard-admin-community');
      } else {
        // If logged in but not as admin community, redirect to home
        router.push('/');
      }
    } catch (error) {
      console.error('Error handling dashboard click:', error);
      // Fallback to login page if there's an error
      router.push('/auth/login');
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-12 mb-16">
          <Image 
            src="/Source Code.svg" 
            alt="Kode" 
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
            alt="Jaringan" 
            width={60} 
            height={60}
            className="filter brightness-0 invert hover:scale-110 transition-transform duration-300" 
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Selamat Datang di <span className="text-blue-400">Simponia</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Tampilkan proyek dan keahlian Anda: Portofolio Anda, Keahlian Kami
        </p>
        <div className="relative z-50">
          <button
            onClick={handleDashboardClick}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer select-none relative z-50"
          >
            Masuk ke Dashboard
          </button>
        </div>
      </div>
    </section>
  );
} 