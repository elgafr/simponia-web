import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HeroSection1FAQ from "@/components/admin-community/FAQ_component/HeroSection1FAQ";
import Footer from '@/components/user/landing-page/Footer';

export default async function FAQPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection1FAQ />
    </div>
  );
}
