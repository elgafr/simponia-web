"use client";

import React from "react";
import Image from "next/image"; // Import Image dari next/image

/** Component for Profile Detail */
interface ProfileDetailProps {
  label: string;
  value: string;
  isBold?: boolean;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ label, value, isBold }) => {
  return (
    <div className="flex justify-between text-xl text-gray-300">
      <span>{label}</span>
      <span className={`${isBold ? "font-bold text-white" : "text-gray-200"}`}>
        {value}
      </span>
    </div>
  );
};

const HeroSection1Profile = () => {
  // **Data langsung di dalam komponen**
  const profileData = {
    name: "Haidar Dimas Heryanto",
    gender: "Male",
    nim: "202210370311088",
    role: "Student / Admin",
    dateOfBirth: "18/10/2003",
    mobileNumber: "+628133445566",
    state: "Gresik",
    linkedin: "Haidar Dimas Heryanto",
    email: "haidardimas003@gmail.com",
    instagram: "@yuhardiya_",
    github: "Dimashery_",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image:
      "/images/person2.jpeg", // Ganti dengan URL gambar yang sesuai
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] py-35 px-6">
      <div className="max-w-4xl mx-auto text-white">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Profile Image */}
          <div className="md:w-180 md:h-70 rounded-full overflow-hidden shadow-2xl flex items-center justify-center bg-gray-900">
            <Image
              src={profileData.image}
              alt="Profile"
              width={200} // Pastikan ukuran proporsional
              height={200}
              className="w-full h-full object-cover rounded-full aspect-square"
              priority // Agar gambar di-load lebih cepat
            />
          </div>

          {/* Profile Description */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mt-2">{profileData.name}</h2>
            <h3 className="text-xl mb-5 text-gray-400">{profileData.role}</h3>
            <p className="text-gray-300 text-lg">{profileData.description}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white my-8"></div>

        {/* Profile Details */}
        <div className="p-6 rounded-lg shadow-2xl">
          <h3 className="text-3xl font-bold mb-10">My Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileDetail label="Name" value={profileData.name} />
            <ProfileDetail label="Gender" value={profileData.gender} />
            <ProfileDetail label="NIM" value={profileData.nim} />
            <ProfileDetail label="Date of Birth" value={profileData.dateOfBirth} />
            <ProfileDetail label="Mobile Number" value={profileData.mobileNumber} />
            <ProfileDetail label="State" value={profileData.state} />
          </div>
        </div>

        {/* Accounts Section */}
        <div className="p-6 mt-6 rounded-lg shadow-2xl">
          <h3 className="text-3xl font-bold mb-10">My Accounts Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileDetail label="LinkedIn" value={profileData.linkedin} />
            <ProfileDetail label="Email Address" value={profileData.email} isBold />
            <ProfileDetail label="Instagram" value={profileData.instagram} isBold />
            <ProfileDetail label="Github" value={profileData.github} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1Profile;
