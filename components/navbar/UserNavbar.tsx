'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface UserNavbarProps {
  isStudentMode?: boolean;
  onStudentModeChange?: (value: boolean) => void;
  showSwitch?: boolean;
}

export default function UserNavbar({ isStudentMode, onStudentModeChange, showSwitch = false }: UserNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/showcase') {
      // Check if we're in the showcase section (including specific portfolio pages)
      return pathname.startsWith('/showcase')
        ? "text-white border-b-2 border-blue-500 px-3 py-2"
        : "text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500/50 px-3 py-2 transition-all duration-200";
    }
    
    return pathname === path 
      ? "text-white border-b-2 border-blue-500 px-3 py-2" 
      : "text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500/50 px-3 py-2 transition-all duration-200";
  };

  const handleModeChange = (checked: boolean) => {
    // Save to localStorage first
    localStorage.setItem('studentMode', checked ? 'true' : 'false');
    // Then update the state through callback
    if (onStudentModeChange) {
      onStudentModeChange(checked);
    }
    // Redirect to appropriate dashboard based on mode
    if (!checked) {
      router.push('/dashboard-admin-community');
    } else {
      router.push('/dashboard');
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
              {/* Student Mode Switch - Only show if showSwitch is true */}
              {showSwitch && isStudentMode !== undefined && onStudentModeChange && (
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
              )}
              {/* Profile Dropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 