import Image from 'next/image';

export default function Steps() {
  return (
    <>
      <section className="pt-20 bg-white">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            AYO MULAI PORTFOLIO KAMU
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Login Step */}
            <div className="group bg-[#2563EB] p-8 rounded-xl hover:bg-[#1E40AF] transition-all duration-300 border border-white/10">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/icon login.svg"
                      alt="Login Icon"
                      fill
                      className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">LOGIN</h3>
                <p className="text-gray-300 text-center">
                  Silahkan login untuk dapat mengakses Simponia
                </p>
              </div>
            </div>

            {/* Fill Data Step */}
            <div className="group bg-[#2563EB] p-8 rounded-xl hover:bg-[#1E40AF] transition-all duration-300 border border-white/10">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/icon profile.svg"
                      alt="Profile Icon"
                      fill
                      className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">ISI DATA</h3>
                <p className="text-gray-300 text-center">
                  Lengkapi data profile dan skill mu dengan selengkap-lengkapnya
                </p>
              </div>
            </div>

            {/* Submit Step */}
            <div className="group bg-[#2563EB] p-8 rounded-xl hover:bg-[#1E40AF] transition-all duration-300 border border-white/10">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/icon submit resume.svg"
                      alt="Submit Resume Icon"
                      fill
                      className="object-contain brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">SUBMIT PORTFOLIO</h3>
                <p className="text-gray-300 text-center">
                  Portfoliomu akan di verifikasi oleh admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Apa itu Portfolio?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor molestie etiam blandit ac pellentesque consectetur.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[380px] h-[250px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/portfolio-preview.png"
                  alt="Portfolio Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 