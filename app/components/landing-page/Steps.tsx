import Image from 'next/image';

export default function Steps() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          AYO MULAI PORTFOLIO KAMU
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Login Step */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/icon login.svg"
                  alt="Login Icon"
                  fill
                  className="object-contain brightness-0 invert sepia-[.60] saturate-[.75] hue-rotate-[180deg]"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">LOGIN</h3>
            <p className="text-gray-600">
              Silahkan login untuk dapat mengakses Simponia
            </p>
          </div>

          {/* Fill Data Step */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/icon profile.svg"
                  alt="Profile Icon"
                  fill
                  className="object-contain brightness-0 invert sepia-[.60] saturate-[.75] hue-rotate-[180deg]"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">ISI DATA</h3>
            <p className="text-gray-600">
              Lengkapi data profile dan skill mu dengan selengkap-lengkapnya
            </p>
          </div>

          {/* Submit Step */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/icon submit resume.svg"
                  alt="Submit Resume Icon"
                  fill
                  className="object-contain brightness-0 invert sepia-[.60] saturate-[.75] hue-rotate-[180deg]"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">SUBMIT PORTFOLIO</h3>
            <p className="text-gray-600">
              Portfoliomu akan di verifikasi oleh admin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 