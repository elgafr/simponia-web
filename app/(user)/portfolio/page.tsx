import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortfolioClient from '@/components/user/portfolio/PortfolioClient';
import Footer from '@/components/user/landing-page/Footer';

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <PortfolioClient />
      </div>
      <Footer />
    </div>
  );
}
