"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HeroSection3() {
  // Menggunakan Intersection Observer untuk mendeteksi saat Section masuk ke layar
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Kategori Portfolio */}
        <motion.div
          className="bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-2xl shadow-lg text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-semibold text-center mb-6">Kategori Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioCategories.map((category, index) => (
              <motion.div
                key={index}
                className="border border-gray-500 rounded-lg p-6 hover:shadow-lg hover:border-white transition duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <Image 
                    src={category.imageSrc} 
                    alt={category.title} 
                    width={60} 
                    height={60} 
                    className="mb-4"
                  />
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{category.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-4xl">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Simponia */}
        <motion.div
          className="flex flex-col md:flex-row items-center mt-40 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div
            className="relative w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <Image
              src="/images/portfolio2.png"
              alt="Simponia"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <h2 className="text-4xl font-semibold mb-7 mt-1 text-black">About Simponia</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
              Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum
              massa mattis. Suspendisse at dolor.
            </p>
            <p className="text-xl text-gray-700 mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a.
              Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare dictum
              massa mattis. Suspendisse at dolor molestie etiam blandit ac pellentesque
              consectetur.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const portfolioCategories = [
  {
    imageSrc: "/images/Source Code.png",
    title: "Software Engineering",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
  {
    imageSrc: "/images/Game Controller.png",
    title: "Game Intelligence",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
  {
    imageSrc: "/images/Slice.png",
    title: "Data Science",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
  {
    imageSrc: "/images/Network.png",
    title: "Network and Security",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac.",
  },
];
