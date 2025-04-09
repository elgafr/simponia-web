'use client';

import Image from 'next/image';
import Footer from '@/components/landing-page/Footer';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Header */}
            <div className="flex items-center gap-8 mb-8">
              <div className="w-48 h-48 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
                <Image
                  src="/default-avatar.png"
                  alt="Profile Picture"
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-4">
                  <p className="text-gray-300 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <Button variant="ghost" size="icon" className="text-gray-400 bg-blue-100/10 hover:text-white hover:bg-blue-900 flex-shrink-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* My Profile Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-6">My Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-1">Name</p>
                  <p className="text-white">Nadhira Ulya Nisa</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Gender</p>
                  <p className="text-white">Female</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">NIM</p>
                  <p className="text-white">202210370311079</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Date Of Birth</p>
                  <p className="text-white">07/03/2004</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Mobile Number</p>
                  <p className="text-white">+6281242979421</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">State</p>
                  <p className="text-white">Malang</p>
                </div>
              </div>
            </div>

            {/* My Accounts Details Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">My Accounts Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-1">LinkedIn</p>
                    <p className="text-white">Nadhira Ulya Nisa</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 bg-blue-100/10 hover:text-white hover:bg-blue-900">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-1">Email Address</p>
                    <p className="text-white">nadhiraulyanisa0207@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-1">Instagram</p>
                    <p className="text-white">@nadhiraulya_</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 bg-blue-100/10 hover:text-white hover:bg-blue-900">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-1">Github</p>
                    <p className="text-white">---</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 bg-blue-100/10 hover:text-white hover:bg-blue-900">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
