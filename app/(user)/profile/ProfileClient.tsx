'use client';

import { useState } from 'react';
import { ProfileImage } from '@/components/user/profile/ProfileImage';
import { ProfileBio } from '@/components/user/profile/ProfileBio';
import { MyProfile } from '@/components/user/profile/MyProfile';
import { AccountDetails } from '@/components/user/profile/AccountDetails';

interface ProfileData {
  id: string;
  user: {
    id: string;
    nim: string;
    role: string;
    created_at: string;
    updated_at: string;
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
  createdAt: string;
  updatedAt: string;
}

interface MyProfileData {
  name: string;
  gender: string;
  nim: string;
  dateOfBirth: string;
  mobileNumber: string;
  state: string;
}

interface AccountDetailsData {
  linkedin: string;
  email: string;
  instagram: string;
  github: string;
}

interface ProfileClientProps {
  profileData: ProfileData | null;
}

export default function ProfileClient({ profileData }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [bioValue, setBioValue] = useState('');

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = async (field: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [field]: editValue,
          nama: profileData.nama,
          noHandphone: profileData.noHandphone,
          gender: profileData.gender,
          tanggalLahir: profileData.tanggalLahir,
          kota: profileData.kota,
          keterangan: profileData.keterangan,
          linkedin: profileData.linkedin,
          instagram: profileData.instagram,
          email: profileData.email,
          github: profileData.github
        })
      });

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }
      
      setIsEditing(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Failed to update field. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleEditBio = () => {
    setBioValue(profileData.keterangan);
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const requestBody = {
        keterangan: bioValue,
        nama: profileData.nama,
        noHandphone: profileData.noHandphone,
        gender: profileData.gender,
        tanggalLahir: profileData.tanggalLahir,
        kota: profileData.kota,
        linkedin: profileData.linkedin,
        instagram: profileData.instagram,
        email: profileData.email,
        github: profileData.github
      };

      console.log('Request body:', requestBody);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }
      
      setIsEditingBio(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating bio:', error);
      alert('Failed to update bio. Please try again.');
    }
  };

  const handleCancelBio = () => {
    setIsEditingBio(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Implement image upload logic here
    }
  };

  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 mb-8">
            <ProfileImage
              profileImage="/default-avatar.png"
              onImageUpload={handleImageUpload}
            />
            <div className="flex-1">
              <h1 className="text-2xl text-white mb-3">{profileData.nama}</h1>
              <ProfileBio
                bio={profileData.keterangan}
                isEditing={isEditingBio}
                bioValue={bioValue}
                onEdit={handleEditBio}
                onSave={handleSaveBio}
                onCancel={handleCancelBio}
                onChange={setBioValue}
              />
            </div>
          </div>

          <MyProfile 
            profileData={{
              name: profileData.nama,
              gender: profileData.gender === 'P' ? 'Female' : 'Male',
              nim: profileData.user.nim,
              dateOfBirth: profileData.tanggalLahir,
              mobileNumber: profileData.noHandphone,
              state: profileData.kota,
            }}
          />
          
          <AccountDetails
            profileData={{
              linkedin: profileData.linkedin,
              email: profileData.email,
              instagram: profileData.instagram,
              github: profileData.github,
            }}
            isEditing={isEditing}
            editValue={editValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            setEditValue={setEditValue}
          />
        </div>
      </div>
    </main>
  );
} 