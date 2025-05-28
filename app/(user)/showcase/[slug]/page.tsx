import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import ShowcaseDetailClient from './ShowcaseDetailClient';

interface PageProps {
  params: { slug: string };
}

async function getPortfolioById(token: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  
  return response.json();
}

export default async function ShowcaseDetailPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const portfolioData = await getPortfolioById(token, params.slug);
    
    // Transform the API data to match the expected format
    const transformedData = {
      id: portfolioData.id,
      name: portfolioData.anggota[0]?.user?.nim || '',
      title: portfolioData.nama_projek,
      image: '/portfolio-1.png', // Using static image as requested
      category: portfolioData.kategori,
      status: portfolioData.status,
      tags: portfolioData.tags.map((tag: any) => tag.nama),
      date: new Date(portfolioData.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      tahun: portfolioData.tahun.toString(),
      subtitle: `${portfolioData.kategori} - ${portfolioData.tahun}`,
      description: portfolioData.deskripsi,
      links: portfolioData.detail_project.map((link: any) => ({
        title: link.judul_link,
        url: link.link_project
      })),
      teamMembers: portfolioData.anggota.map((member: any) => ({
        name: member.user.nim,
        role: member.role
      })),
      contact: {
        name: portfolioData.anggota[0]?.user?.nim || '',
        id: portfolioData.anggota[0]?.user?.id || ''
      }
    };

    return (
      <div className="min-h-screen flex flex-col">
        <ShowcaseDetailClient data={transformedData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <ShowcaseDetailClient data={null} />
        <Footer />
      </div>
    );
  }
} 