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
                alt="Portfolio Preview"
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
                Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor
              </p>
              <p className="text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum massa mattis. Suspendisse at dolor molestie etiam blandit ac pellentesque consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 