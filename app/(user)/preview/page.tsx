import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from "@/components/user/landing-page/Footer";
import PreviewClient from './PreviewClient';

export default async function PreviewPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PreviewClient />
      <Footer />
    </div>
  );
} 