import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import DashboardContent from '@/components/user/dashboard/DashboardContent';

async function getUserData(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  return response.json();
}

async function getPortfolioData(userId: string, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  
  return response.json();
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    // Get user data first
    const userData = await getUserData(token);
    
    // Then get portfolio data using user ID
    const portfolioData = await getPortfolioData(userData.id, token);

    return (
      <div>
        <DashboardContent portfolioData={portfolioData} userData={userData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error appropriately
    return (
      <div>
        <DashboardContent portfolioData={[]} userData={null} />
        <Footer />
      </div>
    );
  }
}
