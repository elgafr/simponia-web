import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Footer from '@/components/user/landing-page/Footer';
import ShowcaseDetailClient from './ShowcaseDetailClient';
import { Metadata } from 'next';

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
    return null;
  }
  
  return response.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  try {
    const portfolioData = await getPortfolioById(token, params.slug);
    return {
      title: portfolioData?.nama_projek || 'Portfolio Not Found',
    };
  } catch (error) {
    return {
      title: 'Portfolio Not Found',
    };
  }
}

export default async function ShowcaseDetailPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    // Ensure params.slug is available before using it
    if (!params?.slug) {
      redirect('/showcase');
    }

    const portfolioData = await getPortfolioById(token, params.slug);
    
    // If no data or error occurred, redirect to showcase page
    if (!portfolioData) {
      redirect('/showcase');
    }
    
    // Transform the API data to match the expected format
    const transformedData = {
      id: portfolioData.id,
      name: portfolioData.creator?.nim || '',
      title: portfolioData.nama_projek,
      image: portfolioData.gambar,
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
        name: member.name || '',
        nim: member.nim || '',
        role: member.role
      })),
      creator: {
        user_id: portfolioData.creator?.user_id || '',
        nim: portfolioData.creator?.nim || '',
        name: portfolioData.creator?.name || '',
        role: portfolioData.creator?.role || '',
        noHandphone: portfolioData.creator?.noHandphone || '',
        linkedin: portfolioData.creator?.linkedin || '',
        instagram: portfolioData.creator?.instagram || '',
        email: portfolioData.creator?.email || '',
        github: portfolioData.creator?.github || ''
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <ShowcaseDetailClient data={transformedData} />
        <Footer />
      </div>
    );
  } catch (error) {
    // Redirect to showcase page on any error
    redirect('/showcase');
  }
}

// Add loading state
export function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-white text-xl">Memuat...</div>
        </div>
      </div>
    </div>
  );
}
