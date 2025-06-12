'use client';

import { useState, useEffect, useCallback } from 'react'; // Tambahkan useState, useEffect, useCallback
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from 'next/image'; // Tambahkan Image dari next/image
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export default function ProfileDropdown() {
  const router = useRouter();
  const { setUserRole } = useUser();
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // State untuk menyimpan profilePicture

  // Fungsi untuk mengambil data profil dari API
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch profile: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('GET profile response in ProfileDropdown:', data);
      setProfilePicture(data.profilePicture || null); // Simpan profilePicture
    } catch (error) {
      console.error('Error fetching profile in ProfileDropdown:', error);
    }
  }, []);

  // Panggil fetchProfile saat komponen dimuat
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    // Clear user role from context and localStorage
    setUserRole(null);
    localStorage.removeItem('userRole');
    // Redirect to home page
    router.push('/auth/login-admin');
  };

  // Buat URL untuk gambar
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const imageUrl = profilePicture && !profilePicture.startsWith('data:image/')
    ? `${baseUrl}${profilePicture.startsWith('/') ? '' : '/'}${profilePicture}`
    : '/default-avatar.png';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative w-8 h-8 rounded-full bg-gray-900 text-white hover:bg-blue-800 transition-colors duration-300 data-[state=open]:bg-blue-800"
        >
          {profilePicture ? (
            <Image
              src={imageUrl}
              alt="Profile Picture"
              width={32} // Sesuaikan dengan ukuran w-8 (8 * 4px = 32px)
              height={32}
              className="w-full h-full object-cover rounded-full"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onError={(e) => {
                console.error('Image load failed in ProfileDropdown, falling back to default. URL:', imageUrl);
                setProfilePicture(null); // Fallback ke null untuk menampilkan ikon User
              }}
              onLoad={() => console.log('Profile picture loaded in ProfileDropdown:', imageUrl)}
            />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-blue-900 border-blue-800">
        <DropdownMenuItem 
          onClick={() => router.push('/profile-super-admin')} 
          className="cursor-pointer text-white focus:bg-blue-950 focus:text-white hover:bg-blue-950 hover:text-white"
        >
          <User className="mr-2 h-4 w-4 text-white" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-blue-800" />
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-white focus:bg-blue-950 focus:text-white hover:bg-blue-950 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4 text-white" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}