"use client";

import React from "react";

const CommunityProfileSection: React.FC = () => {
  return (
    <section className="text-white px-2 md:px-8 py-10">
      {/* Profile Section */}
      <div>
        <div className="text-white mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl"><i className="fa fa-user" /></span>
            <h2 className="text-2xl font-bold">Profile</h2>
          </div>
          <div className="border-t border-gray-400 mb-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-base md:text-lg">
          <div className="flex flex-col gap-2">
            <div className="flex"><span className="w-40 text-gray-300">Nama Lengkap</span>: John Doe</div>
            <div className="flex"><span className="w-40 text-gray-300">NIM</span>: 202310730311001</div>
            <div className="flex"><span className="w-40 text-gray-300">Email</span>: johndoe@gmail.com</div>
            <div className="flex"><span className="w-40 text-gray-300">Gender</span>: Laki - Laki</div>
          </div>
          <div className="flex flex-col gap-2 md:pl-10 mt-4 md:mt-0">
            <span className="font-bold text-lg mb-2">Community</span>
            <div className="ml-2">
              <div className="font-semibold">- Infotech</div>
              <div className="flex"><span className="w-32 text-gray-300">Join Date</span>: 01/08/2024</div>
              <div className="flex"><span className="w-32 text-gray-300">Division</span>: Sistem Informasi</div>
              <div className="flex"><span className="w-32 text-gray-300">Position</span>: Sekretaris</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityProfileSection;
