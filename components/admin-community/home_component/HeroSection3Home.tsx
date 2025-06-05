"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HeroSection3() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <motion.div
          className="rounded-3xl mx-4 sm:mx-8 lg:mx-16 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            KATEGORI PORTFOLIO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioCategories.map((category, index) => (
              <motion.div
                key={index}
                className="group bg-white/5 backdrop-blur-md p-6 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Image
                      src={category.imageSrc}
                      alt={category.title}
                      width={50}
                      height={50}
                      className="filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 whitespace-pre-line">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm flex-grow">
                    {category.description}
                  </p>
                  <div className="mt-4 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-white">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <div className="relative w-[380px] h-[250px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/portfolio-preview.png"
                  alt="Portfolio Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white">
                About Simponia
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
                  Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum
                  massa mattis. Suspendisse at dolor.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
                  Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum
                  massa mattis. Suspendisse at dolor molestie etiam blandit ac pellentesque
                  consectetur.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const portfolioCategories = [
  {
    imageSrc: "/Source Code.svg",
    title: "Software\nEngineering",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
  {
    imageSrc: "/Game Controller.svg",
    title: "Game\nIntelligence",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
  {
    imageSrc: "/Slice.svg",
    title: "Data\nScience",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
  {
    imageSrc: "/Network.svg",
    title: "Network\nand Security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
];
