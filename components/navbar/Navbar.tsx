'use client';

import Image from 'next/image';
import Link from 'next/link';
import UserNavbar from './UserNavbar';
import AdminCommunityNavbar from './AdminCommunityNavbar';
import SuperAdminNavbar from './SuperAdminNavbar';
import { useUser } from '../../context/UserContext';

export default function Navbar() {
  const { userRole } = useUser();

  // If no userRole is set, show the default navbar with login button
  if (!userRole) {
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

            {/* Login Button */}
            <div>
              <Link 
                href="/auth/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Return appropriate navbar based on user role
  switch (userRole) {
    case 1:
      return <SuperAdminNavbar />;
    case 2:
      return <AdminCommunityNavbar />;
    case 3:
      return <UserNavbar />;
    default:
      return <UserNavbar />; // Fallback to user navbar
  }
} 