import Image from 'next/image';

export default function Steps() {
  return (
    <section className="pt-0 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] text-white">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          MARI MULAI PORTOFOLIO ANDA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Langkah Login */}
          <div className="group p-8 rounded-xl transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/icon login.svg"
                    alt="Ikon Login"
                    fill
                    className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">MASUK</h3>
              <p className="text-gray-300 text-center">
                Silakan masuk untuk mengakses Simponia
              </p>
            </div>
          </div>

          {/* Langkah Isi Data */}
          <div className="group p-8 rounded-xl transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/icon profile.svg"
                    alt="Ikon Profil"
                    fill
                    className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">ISI DATA</h3>
              <p className="text-gray-300 text-center">
                Lengkapi data profil dan keahlian Anda sebaik mungkin
              </p>
            </div>
          </div>

          {/* Langkah Kirim */}
          <div className="group p-8 rounded-xl transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/icon submit resume.svg"
                    alt="Ikon Kirim Resume"
                    fill
                    className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">KIRIM PORTOFOLIO</h3>
              <p className="text-gray-300 text-center">
                Portofolio Anda akan diverifikasi oleh admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Apa itu Portofolio */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Apa itu Portofolio?
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Portofolio adalah kumpulan karya dan pencapaian yang menunjukkan keahlian dan pengalaman Anda dalam bidang tertentu. Dalam konteks teknologi, portofolio mencakup proyek-proyek yang telah Anda kerjakan, aplikasi yang telah Anda kembangkan, atau solusi yang telah Anda buat.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Portofolio yang baik tidak hanya menampilkan hasil akhir, tetapi juga menjelaskan proses pengembangan, tantangan yang dihadapi, dan solusi yang diterapkan. Ini membantu orang lain memahami kemampuan teknis Anda, cara berpikir Anda dalam menyelesaikan masalah, dan potensi Anda untuk berkontribusi dalam proyek-proyek masa depan.
              </p>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
} 