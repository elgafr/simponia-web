'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileDropdownAdmin from './ProfileDropdownAdmin';


export default function SuperAdminNavbar() {
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
            <Link href="/home-super-admin" className="flex items-center">
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
              <Link href="/home-super-admin" className={isActive('/home-super-admin')}>
                Home
              </Link>
              <Link href="/dashboard-super-admin" className={isActive('/dashboard-super-admin')}>
                Dashboard
              </Link>
              <Link href="/showcase-portfolio-super-admin" className={isActive('/showcase-portfolio-super-admin')}>
                Showcase Portfolio
              </Link>
              <Link href="/showcase-community-super-admin" className={isActive('/showcase-community-super-admin')}>
                Showcase Community
              </Link>
              <Link href="/FAQ-super-admin" className={isActive('/FAQ-super-admin')}>
                FAQ
              </Link>
              {/* Profile Dropdown */}
              <ProfileDropdownAdmin />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 