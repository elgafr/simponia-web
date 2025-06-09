import Image from 'next/image';

export default function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative w-[380px] h-[250px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/portfolio-preview.png"
                alt="Pratinjau Portofolio"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              TENTANG SIMPONIA
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Simponia adalah platform portofolio digital yang dirancang khusus untuk mahasiswa dalam menampilkan karya dan proyek mereka. Platform ini memungkinkan Anda untuk membuat portofolio profesional yang dapat dibagikan dengan mudah.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Dengan Simponia, Anda dapat menampilkan proyek dalam berbagai kategori seperti Rekayasa Perangkat Lunak, Game Intelligence, Sains Data, dan Jaringan & Keamanan. Setiap portofolio akan melalui proses verifikasi untuk memastikan kualitas dan keaslian karya yang ditampilkan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 