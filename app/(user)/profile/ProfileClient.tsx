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
  profilePicture: string;
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
  const [profile, setProfile] = useState(profileData);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = async (field: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Buat objek update dinamis
      const updateBody = { ...profile, [field]: editValue };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateBody)
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || `HTTP error! status: ${response.status}`);

      setIsEditing(null);
      setProfile(responseData);
    } catch (error) {
      console.error('Error updating field:', error);
      alert('Failed to update field. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleEditBio = () => {
    setBioValue(profile.keterangan);
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
        nama: profile.nama,
        noHandphone: profile.noHandphone,
        gender: profile.gender,
        tanggalLahir: profile.tanggalLahir,
        kota: profile.kota,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        email: profile.email,
        github: profile.github
      };

      console.log('Request body:', requestBody);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user/${profile.id}`, {
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
      setProfile(responseData);
    } catch (error) {
      console.error('Error updating bio:', error);
      alert('Failed to update bio. Please try again.');
    }
  };

  const handleCancelBio = () => {
    setIsEditingBio(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('user_id', profile.user.id);
      formData.append('nama', profile.nama);
      formData.append('noHandphone', profile.noHandphone);
      formData.append('gender', profile.gender);
      formData.append('tanggalLahir', profile.tanggalLahir);
      formData.append('kota', profile.kota);
      formData.append('keterangan', profile.keterangan);
      formData.append('linkedin', profile.linkedin);
      formData.append('instagram', profile.instagram);
      formData.append('email', profile.email);
      formData.append('github', profile.github);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || `HTTP error! status: ${response.status}`);

      setProfile(responseData);

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 mb-8">
            <ProfileImage
              profileImage={profile.profilePicture ? `${process.env.NEXT_PUBLIC_API_URL}${profile.profilePicture}` : "/default-avatar.png"}
              onImageUpload={() => {}}
            />
            <div className="flex-1">
              <h1 className="text-2xl text-white mb-3">{profile.nama}</h1>
              <ProfileBio
                bio={profile.keterangan}
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
              name: profile.nama,
              gender: profile.gender === 'P' ? 'Female' : 'Male',
              nim: profile.user.nim,
              dateOfBirth: profile.tanggalLahir,
              mobileNumber: profile.noHandphone,
              state: profile.kota,
            }}
        
          />
          
          <AccountDetails
            profileData={{
              linkedin: profile.linkedin,
              email: profile.email,
              instagram: profile.instagram,
              github: profile.github,
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