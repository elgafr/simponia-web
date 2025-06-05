'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Pencil, User } from "lucide-react";
import Image from 'next/image'; // Import Image from next/image

// Define interfaces
export interface ProfileData {
  id: string;
  nama: string;
  gender: string;
  nim: string;
  tanggalLahir: string;
  noHandphone: string;
  kota: string;
  linkedin: string;
  email: string;
  instagram: string;
  github: string;
  keterangan: string;
  profilePicture: string | null; // Will store filename or URL from response
  createdAt: string;
  updatedAt: string;
}

// ProfileImage Component
interface ProfileImageProps {
  profilePicture: string | null;
}

export function ProfileImage({ profilePicture }: ProfileImageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const imageUrl = profilePicture && !profilePicture.startsWith('data:image/')
    ? `${baseUrl}${profilePicture.startsWith('/') ? '' : '/'}${profilePicture}`
    : profilePicture || '/default-avatar.png';

  console.log('Attempting to load image from:', imageUrl); // Debug log

  return (
    <div className="relative w-48 h-48 rounded-full bg-white/10 overflow-hidden flex-shrink-0" key={imageUrl}>
      {imageUrl === '/default-avatar.png' ? (
        <div className="w-full h-full flex items-center justify-center bg-white/5">
          <User className="w-24 h-24 text-white/50" />
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt="Profile Picture"
            width={192}
            height={192}
            loading="eager" // Tambahkan untuk debugging
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              console.error('Image load failed, falling back to default. URL:', imageUrl);
              e.currentTarget.src = '/default-avatar.png';
            }}
            onLoad={() => console.log('Image loaded successfully:', imageUrl)} // Tambahkan untuk debugging
          />
        </div>
      )}
    </div>
  );
}

// ProfileBio Component
interface ProfileBioProps {
  keterangan: string;
  isEditing: boolean;
  bioValue: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export function ProfileBio({
  keterangan,
  isEditing,
  bioValue,
  onEdit,
  onSave,
  onCancel,
  onChange,
}: ProfileBioProps) {
  return (
    <div className="flex-grow min-w-[300px] md:min-w-[600px]">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={bioValue}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white/10 text-white px-4 py-3 rounded w-full resize-none text-base"
            rows={5}
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
          <p className="text-gray-300 text-base">{keterangan}</p>
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
          <p className="text-white">{profileData.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">NIM</p>
          <p className="text-white">{profileData.nim || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Date Of Birth</p>
          <p className="text-white">{new Date(profileData.tanggalLahir).toLocaleDateString('id-ID')}</p>
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
  onSave: (field: string) => void;
  onCancel: () => void;
  setEditValue: (value: string) => void;
}

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
                  <Button onClick={() => onSave(field)} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
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
  id: '',
  nama: '',
  gender: '',
  nim: '',
  tanggalLahir: '',
  noHandphone: '',
  kota: '',
  linkedin: '',
  email: '',
  instagram: '',
  github: '',
  keterangan: '',
  profilePicture: null,
  createdAt: '',
  updatedAt: ''
};

export default function HeroSection1Profile() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [editValue, setEditValue] = useState('');
  const [bioValue, setBioValue] = useState('');

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch profile: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('GET profile response:', data);
      setProfileData({
        id: data.id,
        nama: data.nama,
        gender: data.gender,
        nim: data.user?.nim || '',
        tanggalLahir: data.tanggalLahir,
        noHandphone: data.noHandphone,
        kota: data.kota,
        linkedin: data.linkedin,
        email: data.email,
        instagram: data.instagram,
        github: data.github,
        keterangan: data.keterangan || '',
        profilePicture: data.profilePicture || '/default-avatar.png',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    console.log('Profile picture updated:', profileData.profilePicture);
  }, [profileData.profilePicture]);

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = async (field: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    if (!profileData.id) {
      console.error('Profile ID not found');
      return;
    }

    const updatedData = {
      [field]: editValue,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
      }

      setProfileData(prev => ({
        ...prev,
        [field]: editValue
      }));
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating profile:', error);
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
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    if (!profileData.id) {
      console.error('Profile ID not found');
      return;
    }

    const updatedData = {
      keterangan: bioValue,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update bio: ${response.status} - ${errorText}`);
      }

      setProfileData(prev => ({
        ...prev,
        keterangan: bioValue,
      }));
      setIsEditingBio(false);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  const handleCancelBio = () => {
    setIsEditingBio(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 mb-8">
              <ProfileImage
                profilePicture={profileData.profilePicture}
              />
              <div>
                <h1 className='text-2xl mb-3'>{profileData.nama}</h1>
                <ProfileBio
                  keterangan={profileData.keterangan}
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