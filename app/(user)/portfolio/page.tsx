import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortfolioClient from '@/components/user/portfolio/PortfolioClient';

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return <PortfolioClient />;
}
