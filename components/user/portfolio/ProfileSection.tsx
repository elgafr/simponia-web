'use client';

import { Input } from "@/components/ui/input";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect, useCallback } from 'react';

interface ProfileSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export function ProfileSection({ sectionRef }: ProfileSectionProps) {
  const contact = usePortfolioStore((state) => state.contact);
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);

  // Set default values when component mounts
  useEffect(() => {
    setPortfolioData({
      contact: {
        name: "Elga Putri",
        id: "202210370311449"
      }
    });
  }, [setPortfolioData]);

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-300 mb-2">Nama Lengkap</p>
          <Input
            value={contact.name}
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">NIM</p>
          <Input
            value={contact.id}
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">Email</p>
          <Input
            value="elga@email.com"
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">Angkatan</p>
          <Input
            value="22"
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
} 