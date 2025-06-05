'use client';

import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProfileData {
  id: string;
  profilePicture: string;
  nama: string;
}

export default function ProfileDropdown() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {/* {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <span className="text-white text-lg font-semibold">Logging out...</span>
          </div>
        </div>
      )} */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative w-8 h-8 rounded-full bg-gray-900 text-white hover:bg-blue-800 transition-colors duration-300 data-[state=open]:bg-blue-800 overflow-hidden"
          >
            {isLoading ? (
              <User className="w-5 h-5 text-white" />
            ) : profileData?.profilePicture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${profileData.profilePicture}`}
                alt={profileData.nama || "Profile"}
                fill
                className="object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-blue-900 border-blue-800">
          <DropdownMenuItem 
            onClick={() => router.push('/profile')} 
            className="cursor-pointer text-white focus:bg-blue-950 focus:text-white hover:bg-blue-950 hover:text-white"
          >
            <User className="mr-2 h-4 w-4 text-white" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-blue-800" />
          <DropdownMenuItem 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer text-white focus:bg-blue-950 focus:text-white hover:bg-blue-950 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="mr-2 h-4 w-4 text-white" />
            <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
} 