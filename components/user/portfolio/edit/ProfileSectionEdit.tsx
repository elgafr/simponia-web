'use client';

import { Input } from "@/components/ui/input";
import { useEditPortfolioStore } from "@/store/editPortfolioStore";
import { useEffect, useState } from 'react';
import { RequiredLabel } from "../RequiredLabel";

interface ProfileSectionEditProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  errors?: {
    [key: string]: string;
  };
}

export function ProfileSectionEdit({ sectionRef, errors = {} }: ProfileSectionEditProps) {
  const contact = useEditPortfolioStore((state) => state.contact);
  const setPortfolioData = useEditPortfolioStore((state) => state.setPortfolioData);

  // State untuk data profil user
  const [profile, setProfile] = useState<{
    name: string;
    nim: string;
    email: string;
    angkatan: string;
  } | null>(null);

  useEffect(() => {
    // Fetch profile user
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Ambil angkatan dari NIM (misal: 202210370311449 → 22)
          const angkatan = data.user?.nim?.slice(0, 4) || '';
          setProfile({
            name: data.nama,
            nim: data.user?.nim || '',
            email: data.email || '',
            angkatan,
          });
          // Set ke store jika perlu
          setPortfolioData({
            contact: {
              name: data.nama,
              id: data.user?.nim
            }
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile user', err);
      }
    };
    fetchProfile();
  }, [setPortfolioData]);

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-gray-300 mb-2">Nama Lengkap</p>
            <Input
              value={profile?.name || ''}
              disabled
              className="bg-white/5 border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-300 mb-2">NIM</p>
            <Input
              value={profile?.nim || ''}
              disabled
              className="bg-white/5 border-0 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-gray-300 mb-2">Email</p>
            <Input
              value={profile?.email || ''}
              disabled
              className="bg-white/5 border-0 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-300 mb-2">Angkatan</p>
            <Input
              value={profile?.angkatan || ''}
              disabled
              className="bg-white/5 border-0 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 