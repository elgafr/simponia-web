'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardContent from '@/components/user/dashboard/DashboardContent';
import Footer from '@/components/user/landing-page/Footer';

interface DashboardClientProps {
  portfolioData: any;
  userData?: any;
}

export default function DashboardClient({ portfolioData, userData }: DashboardClientProps) {
  const router = useRouter();

  useEffect(() => {
    // If no data is available, redirect to login after a short delay
    if (!portfolioData) {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 1500); // 1.5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [portfolioData, router]);

  if (!portfolioData) {
    return null; // This will show the loading spinner from the parent component
  }

  return (
    <>
      <DashboardContent portfolioData={portfolioData} userData={userData} />
      <Footer />
    </>
  );
} 