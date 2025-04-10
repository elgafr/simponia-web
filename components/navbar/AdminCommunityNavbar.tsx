'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown';

export default function AdminCommunityNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path 
      ? "text-white border-b-2 border-blue-500 px-3 py-2" 
      : "text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500/50 px-3 py-2 transition-all duration-200";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#001B45] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-[150px] h-[50px] mx-2">
                <Image
                  src="/logo simponia.svg"
                  alt="Simponia Logo"
                  fill
                  priority
                  sizes="50px"
                  className="object-contain"
                  quality={100}
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/" className={isActive('/')}>
                Home
              </Link>
              <Link href="/dashboard-admin-community" className={isActive('/dashboard-admin-community')}>
                Dashboard
              </Link>
              <Link href="/student" className={isActive('/student')}>
                Student
              </Link>
              <Link href="/showcase-admin-community" className={isActive('/showcase-admin-community')}>
                Showcase
              </Link>
              <Link href="/faq-admin-community" className={isActive('/faq-admin-community')}>
                FAQ
              </Link>
              {/* Profile Dropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 