'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../navbar/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={!isAuthPage ? "pt-16" : ""}>
        {children}
      </main>
    </>
  );
} 