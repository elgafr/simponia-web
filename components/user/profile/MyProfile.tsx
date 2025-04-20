import type { ProfileData } from './types';

interface MyProfileProps {
  profileData: ProfileData;
}

export function MyProfile({ profileData }: MyProfileProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-6">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-400 mb-1">Name</p>
          <p className="text-white">{profileData.name}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Gender</p>
          <p className="text-white">{profileData.gender}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">NIM</p>
          <p className="text-white">{profileData.nim}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Date Of Birth</p>
          <p className="text-white">{profileData.dateOfBirth}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Mobile Number</p>
          <p className="text-white">{profileData.mobileNumber}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">State</p>
          <p className="text-white">{profileData.state}</p>
        </div>
      </div>
    </div>
  );
} 