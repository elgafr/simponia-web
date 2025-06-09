'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Pencil, User, Upload } from "lucide-react";
import Image from 'next/image';
import { useRef } from 'react';

// Fungsi pembantu untuk format tanggal
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
  namaKomunitas?: string;
  divisi?: string;
  joinKomunitas?: string;
  posisi?: string;
  user: {
    id: string;
    nim: string;
    role: string;
  };
}

interface ProfileAdminCommunityClientProps {
  profileData: ProfileData | null;
}

// Komponen Gambar Profil
interface ProfileImageProps {
  profileImage: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfileImage({ profileImage, onImageUpload }: ProfileImageProps) {
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
            alt="Foto Profil"
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

// Komponen Bio Profil
interface ProfileBioProps {
  bio: string;
  isEditing: boolean;
  bioValue: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

function ProfileBio({
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
            <Button onClick={onCancel} size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90">
              Batal
            </Button>
            <Button onClick={onSave} size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
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

// Komponen Profil Saya
interface MyProfileProps {
  profileData: ProfileData;
}

function MyProfile({ profileData }: MyProfileProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-6">Profil Saya</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-400 mb-1">Nama</p>
          <p className="text-white">{profileData.nama}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Jenis Kelamin</p>
          <p className="text-white">{profileData.gender}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">NIM</p>
          <p className="text-white">{profileData.user.nim}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Tanggal Lahir</p>
          <p className="text-white">{formatDate(profileData.tanggalLahir)}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Nomor Telepon</p>
          <p className="text-white">{profileData.noHandphone}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Kota</p>
          <p className="text-white">{profileData.kota}</p>
        </div>
      </div>
    </div>
  );
}

// Komponen Detail Akun
interface AccountDetailsProps {
  profileData: ProfileData;
  isEditing: string | null;
  editValue: string;
  onEdit: (field: string, value: string) => void;
  onSave?: (field: string) => void;
  onCancel?: () => void;
  setEditValue: (value: string) => void;
}

function AccountDetails({ 
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
        <h2 className="text-xl font-semibold text-white">Detail Akun</h2>
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

// Komponen Detail Komunitas
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
    { label: 'Komunitas', value: profileData.namaKomunitas || '-', field: 'namaKomunitas' },
    { label: 'Divisi', value: profileData.divisi || '-', field: 'divisi' },
    { label: 'Tanggal Bergabung', value: formatDate(profileData.joinKomunitas), field: 'joinKomunitas', type: 'date' },
    { label: 'Posisi', value: profileData.posisi || '-', field: 'posisi' },
  ];

  return (
    <div className="bg-[#182B4D] rounded-xl p-6 mt-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Detail Komunitas</h2>
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

export default function ProfileAdminCommunityClient({ profileData }: ProfileAdminCommunityClientProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [bioValue, setBioValue] = useState('');
  const [profile, setProfile] = useState(profileData);

  if (!profile) {
    return <div>Memuat...</div>;
  }

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = async (field: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');

      const updateBody = { 
        ...profile, 
        [field]: editValue || null // Set ke null jika string kosong
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin-community/${profile.id}`, {
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
      console.error('Error memperbarui field:', error);
      alert('Gagal memperbarui field. Silakan coba lagi.');
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
      if (!token) throw new Error('Token tidak ditemukan');

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin-community/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || `HTTP error! status: ${response.status}`);

      setIsEditingBio(false);
      setProfile(responseData);
    } catch (error) {
      console.error('Error memperbarui bio:', error);
      alert('Gagal memperbarui bio. Silakan coba lagi.');
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
      if (!token) throw new Error('Token tidak ditemukan');

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-admin-community/${profile.id}`, {
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
      console.error('Error mengunggah gambar:', error);
      alert('Gagal mengunggah gambar. Silakan coba lagi.');
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

          <MyProfile profileData={profile} />
          
          <AccountDetails
            profileData={profile}
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