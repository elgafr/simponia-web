"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

export default function HeroSection2() {
  return (
    // Container utama
    <div className="py-16 bg-white text-gray-900">
      {/* Bagian Proses Portfolio */}
      <motion.div
        className="max-w-6xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }} // Animasi saat masuk layar
      >
        <h2 className="md:text-5xl font-bold mt-20 mb-30">
          LETS START YOUR PORTFOLIO
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Langkah 1 */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image src="/images/Enter.png" alt="Login" width={100} height={100} />
            <h3 className="text-3xl font-semibold mt-9">LOGIN</h3>
            <p className="text-gray-600 text-lg max-w-xs mt-5">
              Please login to access Simponia
            </p>
          </motion.div>

          {/* Panah */}
          <motion.span
            className="hidden md:block text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            →
          </motion.span>

          {/* Langkah 2 */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image src="/images/Registration.png" alt="Isi Data" width={100} height={100} />
            <h3 className="text-3xl font-semibold mt-9">FILL DATA</h3>
            <p className="text-gray-600 text-lg max-w-xs mt-5">
              Complete your profile data and skills as thoroughly as possible.
            </p>
          </motion.div>

          {/* Panah */}
          <motion.span
            className="hidden md:block text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            →
          </motion.span>

          {/* Langkah 3 */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image src="/images/Submit Resume.png" alt="Submit Portfolio" width={100} height={100} />
            <h3 className="text-3xl font-semibold mt-9">SUBMIT PORTFOLIO</h3>
            <p className="text-gray-600 text-lg max-w-xs mt-5">
              Your portfolio will be verified by the admin.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bagian "What is a Portfolio?" */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mt-16 flex flex-col md:flex-row items-center gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Text Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="md:text-4xl font-bold text-gray-900 mt-40 mb-10">
            What is a Portfolio?
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. 
            Tincidunt et sapien donec id integer pulvinar. Eu purus accumsan a ornare 
            dictum massa mattis. Suspendisse at dolor molestie.
          </p>
          <p className="text-xl text-gray-600 mt-4">
            Lorem ipsum dolor sit amet consectetur. Quisque purus risus in purus at a. 
            Tincidunt et sapien donec id integer pulvinar. Suspendisse at dolor molestie 
            etiam blandit ac pellentesque consectetur.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2 mt-40"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src="/images/portfolio.png"
            alt="Portfolio Example"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
