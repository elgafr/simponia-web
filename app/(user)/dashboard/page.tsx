import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import DashboardContent from '@/components/user/dashboard/DashboardContent';
import DashboardClient from './DashboardClient';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

async function getUserData(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // If unauthorized, redirect to login
      redirect('/auth/login');
    }
    throw new Error('Failed to fetch user data');
  }
  
  return response.json();
}

async function getPortfolioData(token: string) {
  try {
    // Get user data first to get the user ID
    const userData = await getUserData(token);
    
    // Then get all portfolios
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // If unauthorized, redirect to login
        redirect('/auth/login');
      }
      return []; // Return empty array for other errors
    }
    
    const portfolios = await response.json();
    
    // Filter portfolios where the user is either the creator or a member
    const filteredPortfolios = portfolios.filter((portfolio: any) => {
      const isCreator = portfolio.creator?.user_id === userData.id;
      const isMember = portfolio.anggota?.some((member: any) => member.id_user === userData.id);
      return isCreator || isMember;
    });
    
    return filteredPortfolios;
  } catch (error) {
    console.error('Error in getPortfolioData:', error);
    return [];
  }
}

export default async function DashboardPage() {
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
    // Get user data first
    const userData = await getUserData(token);
    
    // Then get portfolio data using user ID
    const portfolioData = await getPortfolioData(token);

    return (
      <div className="min-h-screen flex flex-col">
        <DashboardClient portfolioData={portfolioData} userData={userData} />
      </div>
    );
  } catch (error) {
    console.error('Error in dashboard page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
}
