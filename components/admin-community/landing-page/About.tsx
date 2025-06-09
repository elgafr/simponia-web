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
                Simponia adalah platform portofolio digital yang dirancang khusus untuk mahasiswa dan profesional di bidang teknologi. Kami menyediakan wadah untuk menampilkan karya dan keahlian Anda dalam berbagai bidang seperti pengembangan perangkat lunak, game development, ilmu data, dan keamanan jaringan.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Dengan Simponia, Anda dapat membangun portofolio profesional yang menarik, terhubung dengan komunitas teknologi, dan mendapatkan peluang karir yang sesuai dengan keahlian Anda. Platform kami memudahkan Anda untuk menampilkan proyek-proyek terbaik dan mendapatkan pengakuan dari industri teknologi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 