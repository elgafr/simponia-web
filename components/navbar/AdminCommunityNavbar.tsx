'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ProfileDropdown from './ProfileDropdownAdminCommunity';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface AdminCommunityNavbarProps {
  isStudentMode: boolean;
  onStudentModeChange: (value: boolean) => void;
}

export default function AdminCommunityNavbar({ isStudentMode, onStudentModeChange }: AdminCommunityNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    // Special case for dashboard - it should be active when on /dashboard
    if (path === '/dashboard-admin-community' && pathname === '/dashboard') {
      return "text-white border-b-2 border-blue-500 px-3 py-2";
    }

    return pathname === path
      ? "text-white border-b-2 border-blue-500 px-3 py-2"
      : "text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500/50 px-3 py-2 transition-all duration-200";
  };

  const handleModeChange = (checked: boolean) => {
    // Save to localStorage first
    localStorage.setItem('studentMode', checked ? 'true' : 'false');
    // Then update the state
    onStudentModeChange(checked);
    // Redirect to appropriate dashboard based on mode
    if (checked) {
      router.push('/dashboard');
    } else {
      router.push('/dashboard-admin-community');
    }
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

              {isStudentMode ? (
                <>
                  <Link href="/" className={isActive('/')}>
                    Home
                  </Link>
                  <Link href="/dashboard" className={isActive('/dashboard')}>
                    Dashboard
                  </Link>
                  <Link href="/portfolio" className={isActive('/portfolio')}>
                    Portfolio
                  </Link>
                  <Link href="/showcase" className={isActive('/showcase')}>
                    Showcase
                  </Link>
                  <Link href="/faq" className={isActive('/faq')}>
                    FAQ
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/home-admin-community" className={isActive('/home-admin-community')}>
                    Home
                  </Link>
                  <Link href="/dashboard-admin-community" className={isActive('/dashboard-admin-community')}>
                    Dashboard
                  </Link>
                  <Link href="/showcase-admin-community" className={isActive('/showcase-admin-community')}>
                    Showcase
                  </Link>
                  <Link href="/faq-admin-community" className={isActive('/faq-admin-community')}>
                    FAQ
                  </Link>
                </>
              )}
              {/* Student Mode Switch */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isStudentMode}
                  onCheckedChange={handleModeChange}
                  id="student-mode"
                  className={cn(
                    "data-[state=checked]:bg-blue-600",
                    "data-[state=unchecked]:bg-gray-500"
                  )}
                />
                <label htmlFor="student-mode" className="text-sm font-medium text-white">
                  Student
                </label>
              </div>
              {/* Profile Dropdown */}
              <ProfileDropdown isStudentMode={isStudentMode} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 