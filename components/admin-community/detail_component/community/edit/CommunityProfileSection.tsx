"use client";

import React from "react";

interface AnggotaAcara {
  id: string;
  acara: {
    id: string;
  };
  profile_user: {
    id: string;
  };
  created_by: {
    id: string;
    nim: string;
    role: string;
  };
  nama: string;
  nim: string;
  jabatan: string;
  status: string;
  kerjasama: number | null;
  kedisiplinan: number | null;
  komunikasi: number | null;
  tanggung_jawab: number | null;
  nilai_rata_rata: number | null;
  grade: string | null;
  catatan: string | null;
  created_at: string;
  updated_at: string;
}

interface UserProfile {
  id: string;
  user: {
    id: string;
    nim: string;
    role: string;
  };
  nama: string;
  noHandphone: string;
  gender: string;
  tanggalLahir: string;
  kota: string;
  keterangan: string;
  linkedin: string;
  instagram: string;
  email: string;
  github: string;
  profilePicture: string | null;
  namaKomunitas: string;
  joinKomunitas: string;
  divisi: string;
  posisi: string;
  createdAt: string;
  updatedAt: string;
}

interface CommunityProfileSectionProps {
  userProfile: UserProfile;
  anggotaData: AnggotaAcara;
}

const CommunityProfileSection: React.FC<CommunityProfileSectionProps> = ({ userProfile, anggotaData }) => {
  // Default profile user ID if not provided in the response
  const profileUserId = anggotaData.profile_user?.id || "d98c0c5e-4d8a-4abe-a2e2-8f8809fdcc90";

  const getStatusBg = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-600";
      case "ABSENT":
        return "bg-red-600";
      case "PERMISSION":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="text-white px-2 md:px-8 py-10">
      {/* Profile Section */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-white mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl"><i className="fa fa-user" /></span>
            <h2 className="text-2xl font-bold">Profile</h2>
          </div>
          <div className="border-t border-gray-400 mb-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base md:text-md">
          {/* Profile Card */}
          <div className="bg-white/10 rounded-xl shadow p-6 flex flex-col gap-2 flex-1">
            <div className="flex"><span className="w-40 text-gray-300">Nama Lengkap</span>: {userProfile.nama}</div>
            <div className="flex"><span className="w-40 text-gray-300">NIM</span>: {userProfile.user.nim}</div>
            <div className="flex"><span className="w-40 text-gray-300">Email</span>: {userProfile.email}</div>
            <div className="flex"><span className="w-40 text-gray-300">Gender</span>: {userProfile.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
            <div className="flex"><span className="w-40 text-gray-300">No. Handphone</span>: {userProfile.noHandphone}</div>
           
          </div>
          {/* Community Card */}
          <div className="bg-white/10 rounded-xl shadow p-6 mt-6 md:mt-0 flex-1">
            <span className="font-bold text-lg mb-2 block">Community</span>
            <div className="font-semibold ml-2">{userProfile.namaKomunitas}</div>
            <div className="flex"><span className="ml-2 w-32 text-gray-300">Join Date</span>: {formatDate(userProfile.joinKomunitas)}</div>
            <div className="flex"><span className="ml-2 w-32 text-gray-300">Division</span>: {userProfile.divisi}</div>
            <div className="flex"><span className="ml-2 w-32 text-gray-300">Position</span>: {userProfile.posisi}</div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A1E42] rounded-lg p-6 mt-4">
        <span className="font-bold text-lg mb-2 block">Event Details</span>
        <div className="flex"><span className="ml-2 w-32 text-gray-300">Jabatan</span>: <span className="ml-2" >{anggotaData.jabatan}</span></div>
        <div className="flex items-center">
          <span className="ml-2 w-32 text-gray-300">Status</span>: 
          <span className={`${getStatusBg(anggotaData.status)} text-white ml-2 mt-2 mb-2 px-3 py-1 rounded-full text-sm`}>
            {anggotaData.status}
          </span>
        </div>
        <div className="flex"><span className="ml-2 w-32 text-gray-300">Catatan</span>: <span className="ml-2" >{anggotaData.catatan || "-"}</span></div>
      </div>
    </section>
  );
};

export default CommunityProfileSection;
