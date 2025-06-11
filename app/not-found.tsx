import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#011B45]">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-white/90">Halaman Tidak Ditemukan</h2>
        <p className="text-white/70 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
} 