import PreviewEditClient from './PreviewEditClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  // Log the params to verify they are being passed correctly
  console.log('Page component received params:', params);
  console.log('Portfolio ID in page:', params?.id);

  // Ensure params and id exist before rendering
  if (!params || !params.id) {
    console.error('Missing params or portfolio ID in page component');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <div className="text-white text-xl">Portfolio ID tidak ditemukan</div>
      </div>
    );
  }

  return <PreviewEditClient params={params} />;
} 