import type { ProfileData } from './types';

interface MyProfileData {
  name: string;
  gender: string;
  nim: string;
  dateOfBirth: string;
  mobileNumber: string;
  state: string;
}

interface MyProfileProps {
  profileData: MyProfileData;
}

export function MyProfile({ profileData }: MyProfileProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-6">Profil Saya</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-400 mb-1">Nama</p>
          <p className="text-white">{profileData.name}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Jenis Kelamin</p>
          <p className="text-white">{profileData.gender}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">NIM</p>
          <p className="text-white">{profileData.nim}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Tanggal Lahir</p>
          <p className="text-white">{profileData.dateOfBirth}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Nomor Telepon</p>
          <p className="text-white">{profileData.mobileNumber}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Kota</p>
          <p className="text-white">{profileData.state}</p>
        </div>
      </div>
    </div>
  );
} 