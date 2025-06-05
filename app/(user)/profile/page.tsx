import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import ProfileClient from './ProfileClient';

async function getUserProfile(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  
  return response.json();
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const profileData = await getUserProfile(token);

    return (
      <div className="min-h-screen flex flex-col">
        <ProfileClient profileData={profileData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <ProfileClient profileData={null} />
        <Footer />
      </div>
    );
  }
}
