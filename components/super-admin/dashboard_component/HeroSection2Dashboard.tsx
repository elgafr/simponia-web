// components/sections/HeroSection2Dashboard.tsx
import React from 'react';
import Image from 'next/image';

interface CardProps {
  count: number;
  title: string;
  description: string;
  icon: string;
}

const Card: React.FC<CardProps> = ({ count, title, description, icon }) => {
  return (
    <div className="bg-transparent border border-white rounded-2xl p-6 w-64 flex flex-col justify-between items-start hover:bg-white hover:text-blue-900 transition duration-300 ease-in-out hover:scale-110">
      <div className="text-6xl font-bold flex items-center justify-between w-full gap-2 mb-5">
        {count}
        <Image src={icon} alt={title} width={60} height={60} />    
      </div>
      <h3 className="text-2xl font-semibold mt-2">{title}</h3>
      <p className="text-lg mt-1">{description}</p>
      <div className="mt-4 self-end text-4xl">→</div>
    </div>
  );
};

const HeroSection2Dashboard: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-t from-[#001B45] via-[#001233] to-[#051F4C]">
      <h2 className="text-5xl font-bold text-center mb-15">Category Portfolio</h2>

      <div className="my-10 border-b border-gray-300"></div>

      <div className="max-w-screen-xl mx-auto flex justify-center mb-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            count={50}
            title="Software Engineering"
            description="Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac."
            icon="/images/Source Code.png"
          />
          <Card
            count={35}
            title="Game Intelligence"
            description="Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac."
            icon="/images/Game Controller.png"
          />
          <Card
            count={20}
            title="Data Science"
            description="Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac."
            icon="/images/Slice.png"
          />
          <Card
            count={15}
            title="Network and Security"
            description="Lorem ipsum dolor sit amet consectetur. Tellus aliquet amet tortor ut donec. Suscipit tortor cursus est ac."
            icon="/images/Network.png"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection2Dashboard;
