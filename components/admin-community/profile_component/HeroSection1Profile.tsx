'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Pencil, User, Upload } from "lucide-react";
import Image from 'next/image';
import { useRef } from 'react';

// Define interfaces
interface ProfileData {
  id: string;
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
  user: {
    id: string;
    nim: string;
    role: string;
  };
}

interface HeroSection1ProfileProps {
  profileData: ProfileData;
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
          <p className="text-white">{profileData.nama}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Gender</p>
          <p className="text-white">{profileData.gender}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">NIM</p>
          <p className="text-white">{profileData.user.nim}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Date Of Birth</p>
          <p className="text-white">{profileData.tanggalLahir}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Mobile Number</p>
          <p className="text-white">{profileData.noHandphone}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">State</p>
          <p className="text-white">{profileData.kota}</p>
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
const HeroSection1Profile = ({ profileData }: HeroSection1ProfileProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
      <div className="relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 mb-8">
            <ProfileImage
              profileImage={profileData.profilePicture}
              onImageUpload={() => {}}
            />
            <div>
              <h1 className='text-2xl mb-3'>{profileData.nama}</h1>
              <ProfileBio
                bio={profileData.keterangan}
                isEditing={false}
                bioValue=""
                onEdit={() => {}}
                onSave={() => {}}
                onCancel={() => {}}
                onChange={(value) => {}}
              />
            </div>
          </div>

          <MyProfile profileData={profileData} />
          
          <AccountDetails
            profileData={profileData}
            isEditing={null}
            editValue=""
            onEdit={(field, value) => {}}
            onSave={(field) => {}}
            onCancel={() => {}}
            setEditValue={(value) => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection1Profile;