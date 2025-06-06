// profile/page.tsx

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileAdminCommunityClient from './ProfileAdminCommunityClient';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

async function getProfileData(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // If unauthorized, redirect to login
      redirect('/auth/login');
    }
    throw new Error('Failed to fetch profile data');
  }
  
  return response.json();
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  try {
    const profileData = await getProfileData(token);

    return (
      <div className="min-h-screen flex flex-col">
        <ProfileAdminCommunityClient profileData={profileData} />
      </div>
    );
  } catch (error) {
    console.error('Error in profile page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
}
