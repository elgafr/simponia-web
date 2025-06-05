import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import PortfolioEditClient from './PortfolioEditClient';


interface PageProps {
  params: { slug: string };
}

export default async function PortfolioEditPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioEditClient slug={params.slug} />
      <Footer />
    </div>
  );
} 