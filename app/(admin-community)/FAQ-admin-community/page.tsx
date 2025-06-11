import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Footer from '@/components/user/landing-page/Footer';
import FAQ from '@/components/admin-community/FAQ_component/FAQ';
export default async function FAQPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <FAQ/>
    </div>
  );
}
