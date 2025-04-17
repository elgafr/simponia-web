import Image from "next/image";

const HeroSection2DetailCommunity = () => {
  return (
    <section className=" text-white lg:px-100 py-1 px-20 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Activity</h2>
        <hr className="mb-6" />

        {/* Activity 1 */}
        <div className="flex flex-col md:flex-row items-center rounded-lg p-4 mb-6 shadow-2xl hover:scale-105 transition hover:bg-gradient-to-r from-red-400 to-blue-950 transition">
          <Image
            src="/images/portfolio.png" // Ganti dengan path gambar yang sesuai
            alt="Upgrading Event Caslab"
            width={450}
            height={200}
            className="rounded-lg object-cover"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-start">
            <h3 className="text-2xl font-bold">Upgrading Event Caslab</h3>
            <p className="text-base text-gray-400 font-semibold">TIM 1</p>
            <p className="text-gray-300 mt-8 text-lg">
              Lorem ipsum dolor sit amet consectetur. Eu nisl fames tortor risus egestas
              habitasse aliquet. Vel sit imperdiet in vestibulum malesuada ultricies
              egestas tempus. Lorem ultrices ut.
            </p>
            <button className="mt-10 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-300 transition">
              Click to see more details
            </button>
          </div>
        </div>

        {/* Activity 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center rounded-lg p-4 shadow-2xl hover:scale-105 transition hover:bg-gradient-to-l from-red-400 to-blue-950 transition">
          <Image
            src="/images/portfolio2.png" // Ganti dengan path gambar yang sesuai
            alt="IT Character Building 2024"
            width={450}
            height={200}
            className="rounded-lg object-cover"
          />
          <div className="md:mr-6 mt-4 md:mt-0 text-end">
            <h3 className="text-2xl font-bold">IT Character Building 2024</h3>
            <p className="text-gray-300 mt-8 text-lg">
              Lorem ipsum dolor sit amet consectetur. Eu nisl fames tortor risus egestas
              habitasse aliquet. Vel sit imperdiet in vestibulum malesuada ultricies
              egestas tempus. Lorem ultrices ut.
            </p>
            <button className="mt-10 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-300 transition">
              Click to see more details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2DetailCommunity;
