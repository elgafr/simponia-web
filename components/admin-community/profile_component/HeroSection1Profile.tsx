'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Pencil, User, Upload } from "lucide-react";
import Image from 'next/image';
import { useRef } from 'react';

// Define interfaces
export interface ProfileData {
  name: string;
  gender: string;
  nim: string;
  dateOfBirth: string;
  mobileNumber: string;
  state: string;
  linkedin: string;
  email: string;
  instagram: string;
  github: string;
  bio: string;
  profileImage: string;
  avatar?: string;
}

// ProfileImage Component
interface ProfileImageProps {
  profileImage: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileImage({ profileImage, onImageUpload }: ProfileImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-48 h-48 rounded-full bg-white/10 overflow-hidden flex-shrink-0 group">
      {profileImage === '/default-avatar.png' ? (
        <div className="w-full h-full flex items-center justify-center bg-white/5">
          <User className="w-24 h-24 text-white/50" />
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={profileImage}
            alt="Profile Picture"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={triggerFileInput}
          className="text-white hover:text-white hover:bg-blue-900"
        >
          <Upload className="h-6 w-6" />
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

// ProfileBio Component
interface ProfileBioProps {
  bio: string;
  isEditing: boolean;
  bioValue: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export function ProfileBio({
  bio,
  isEditing,
  bioValue,
  onEdit,
  onSave,
  onCancel,
  onChange,
}: ProfileBioProps) {
  return (
    <div className="flex-grow">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={bioValue}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/10 text-white px-3 py-2 rounded w-full resize-none"
            rows={4}
          />
          <div className="flex gap-2 justify-end">
            <Button onClick={onCancel} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
              Batal
            </Button>
            <Button onClick={onSave} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              Simpan
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-gray-300 text-base">{bio}</p>
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={onEdit} className="text-gray-400 hover:text-white hover:bg-transparent">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// MyProfile Component
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

// AccountDetails Component
interface AccountDetailsProps {
  profileData: ProfileData;
  isEditing: string | null;
  editValue: string;
  onEdit: (field: string, value: string) => void;
  onSave?: (field: string) => void; // Made optional
  onCancel?: () => void; // Made optional
  setEditValue: (value: string) => void;
}

/**
 * AccountDetails Component
 * @description Displays and allows editing of account-related fields (email, LinkedIn, Instagram, Github).
 * The onSave and onCancel props are optional for future extensibility but are used here for explicit save/cancel actions.
 */
export function AccountDetails({ 
  profileData, 
  isEditing, 
  editValue, 
  onEdit, 
  onSave, 
  onCancel, 
  setEditValue 
}: AccountDetailsProps) {
  const fields = [
    { label: 'Email', value: profileData.email, field: 'email' },
    { label: 'LinkedIn', value: profileData.linkedin, field: 'linkedin' },
    { label: 'Instagram', value: profileData.instagram, field: 'instagram' },
    { label: 'Github', value: profileData.github, field: 'github' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Account Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ label, value, field }) => (
          <div key={field}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-300">{label}</label>
              <Button
                onClick={() => onEdit(field, value)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <PenLine className="h-4 w-4" />
              </Button>
            </div>
            {isEditing === field ? (
              <div className="flex flex-col gap-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="bg-white/5 border-0 text-white"
                />
                <div className="flex gap-2 justify-end">
                  <Button onClick={onCancel} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                    Batal
                  </Button>
                  <Button onClick={() => onSave && onSave(field)} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                    Simpan
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-white">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main ProfilePage Component (renamed to HeroSection1Profile)
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

export default function HeroSection1Profile() {
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
              <div>
                <h1 className='text-2xl mb-3'>{profileData.name}</h1>
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
    </div>
  );
}