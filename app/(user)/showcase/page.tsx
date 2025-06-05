import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import ShowcaseClient from './ShowcaseClient';

async function getPortfolioData(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch portfolio data');
  }
  
  const data = await response.json();
  // Filter out items with status 'Perlu Perubahan' or 'Dihapus'
  return data.filter((item: any) => 
    item.status !== 'Perlu Perubahan' && item.status !== 'Dihapus'
  );
}

export default async function ShowcasePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const portfolioData = await getPortfolioData(token);
    
    // Transform the API data to match the expected format
    const transformedData = portfolioData.map((item: any) => ({
      id: item.id,
      name: item.anggota[0]?.user?.nim || '',
      title: item.nama_projek,
      image: item.gambar, // Using image from backend
      category: item.kategori,
      status: item.status,
      tags: item.tags.map((tag: any) => tag.nama),
      date: new Date(item.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      tahun: item.tahun.toString(),
      subtitle: `${item.kategori} - ${item.tahun}`,
      description: item.deskripsi,
      links: item.detail_project.map((link: any) => ({
        title: link.judul_link,
        url: link.link_project
      })),
      teamMembers: item.anggota.map((member: any) => ({
        name: member.user?.nim || '',
        role: member.role
      })),
      contact: {
        name: item.anggota[0]?.user?.nim || '',
        id: item.anggota[0]?.user?.id || ''
      }
    }));

    return (
      <div className="min-h-screen flex flex-col">
        <ShowcaseClient initialData={transformedData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <ShowcaseClient initialData={[]} />
        <Footer />
      </div>
    );
  }
}
