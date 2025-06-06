'use client';

import { useState } from 'react';
import { ProfileImage } from '@/components/user/profile/ProfileImage';
import { ProfileBio } from '@/components/user/profile/ProfileBio';
import { MyProfile } from '@/components/user/profile/MyProfile';
import { AccountDetails } from '@/components/user/profile/AccountDetails';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";

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
  namaKomunitas?: string;
  divisi?: string;
  joinKomunitas?: string;
  posisi?: string;
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

// Helper functions for date formatting
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

function formatDateForInput(dateString: string | null | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

// CommunityDetails Component
interface CommunityDetailsProps {
  profileData: ProfileData;
  isEditing: string | null;
  editValue: string;
  onEdit: (field: string, value: string) => void;
  onSave?: (field: string) => void;
  onCancel?: () => void;
  setEditValue: (value: string) => void;
}

function CommunityDetails({ 
  profileData, 
  isEditing, 
  editValue, 
  onEdit, 
  onSave, 
  onCancel, 
  setEditValue 
}: CommunityDetailsProps) {
  const fields = [
    { label: 'Community', value: profileData.namaKomunitas || '-', field: 'namaKomunitas' },
    { label: 'Division', value: profileData.divisi || '-', field: 'divisi' },
    { label: 'Date Joined', value: formatDate(profileData.joinKomunitas), field: 'joinKomunitas', type: 'date' },
    { label: 'Position', value: profileData.posisi || '-', field: 'posisi' },
  ];

  return (
    <div className="bg-[#182B4D] rounded-xl p-6 mt-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Community Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ label, value, field, type }) => (
          <div key={field}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-300">{label}</label>
              <Button
                onClick={() => onEdit(field, value === '-' ? '' : value)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <PenLine className="h-4 w-4" />
              </Button>
            </div>
            {isEditing === field ? (
              <div className="flex flex-col gap-2">
                {type === 'date' ? (
                  <Input
                    type="date"
                    value={editValue ? formatDateForInput(editValue) : ''}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="bg-white/5 border-0 text-white [&::-webkit-calendar-picker-indicator]:invert"
                  />
                ) : (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="bg-white/5 border-0 text-white"
                  />
                )}
                <div className="flex gap-2 justify-end">
                  <Button onClick={onCancel} size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90">
                    Batal
                  </Button>
                  <Button onClick={() => onSave && onSave(field)} size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
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
              onImageUpload={handleImageUpload}
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
              dateOfBirth: formatDate(profile.tanggalLahir),
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

          <CommunityDetails
            profileData={profile}
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