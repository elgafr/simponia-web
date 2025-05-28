'use client';

import { Input } from "@/components/ui/input";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect, useState } from 'react';

interface ProfileSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export function ProfileSection({ sectionRef }: ProfileSectionProps) {
  const contact = usePortfolioStore((state) => state.contact);
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);

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
          const angkatan = data.user?.nim?.slice(2, 4) || '';
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
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-300 mb-2">Nama Lengkap</p>
          <Input
            value={profile?.name || ''}
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">NIM</p>
          <Input
            value={profile?.nim || ''}
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">Email</p>
          <Input
            value={profile?.email || ''}
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">Angkatan</p>
          <Input
            value={profile?.angkatan || ''}
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
} 