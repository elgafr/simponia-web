'use client';

import { useState } from 'react';
import Footer from '@/components/user/landing-page/Footer';
import { ProfileImage } from '@/components/user/profile/ProfileImage';
import { ProfileBio } from '@/components/user/profile/ProfileBio';
import { MyProfile } from '@/components/user/profile/MyProfile';
import { AccountDetails } from '@/components/user/profile/AccountDetails';
import type { ProfileData } from '@/components/user/profile/types';

const initialProfileData: ProfileData = {
    name: 'Nadhira Ulya Nisa',
    gender: 'Female',
    nim: '202210370311079',
    dateOfBirth: '07/03/2004',
    mobileNumber: '+6281242979421',
    state: 'Malang',
    linkedin: 'Nadhira Ulya Nisa',
    email: 'nadhiraulyanisa0207@gmail.com',
    instagram: '@nadhiraulya_',
    github: '---',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    profileImage: '/default-avatar.png',
    avatar: '/default-avatar.png'
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [editValue, setEditValue] = useState('');
  const [bioValue, setBioValue] = useState('');

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = (field: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: editValue
    }));
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleEditBio = () => {
    setBioValue(profileData.bio);
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    setProfileData(prev => ({
      ...prev,
      bio: bioValue
    }));
    setIsEditingBio(false);
  };

  const handleCancelBio = () => {
    setIsEditingBio(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 mb-8">
              <ProfileImage
                profileImage={profileData.profileImage}
                onImageUpload={handleImageUpload}
              />
              <ProfileBio
                bio={profileData.bio}
                isEditing={isEditingBio}
                bioValue={bioValue}
                onEdit={handleEditBio}
                onSave={handleSaveBio}
                onCancel={handleCancelBio}
                onChange={setBioValue}
              />
            </div>

            <MyProfile profileData={profileData} />
            
            <AccountDetails
              profileData={profileData}
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
      <Footer />
    </div>
  );
}
