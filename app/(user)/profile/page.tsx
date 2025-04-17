'use client';

import Image from 'next/image';
import Footer from '@/components/landing-page/Footer';
import { Pencil, Check, X, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

interface ProfileData {
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
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
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
    profileImage: '/default-avatar.png'
  });

  const [editValue, setEditValue] = useState('');
  const [bioValue, setBioValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Profile Header */}
            <div className="flex items-center gap-8 mb-8">
              <div className="relative w-48 h-48 rounded-full bg-white/10 overflow-hidden flex-shrink-0 group">
                {profileData.profileImage === '/default-avatar.png' ? (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <User className="w-24 h-24 text-white/50" />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={profileData.profileImage}
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
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="flex-grow">
                {isEditingBio ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={bioValue}
                      onChange={(e) => setBioValue(e.target.value)}
                      className="bg-white/10 text-white px-3 py-2 rounded w-full resize-none"
                      rows={4}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button onClick={handleCancelBio} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                        Batal
                      </Button>
                      <Button onClick={handleSaveBio} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                        Simpan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-300 text-base">
                      {profileData.bio}
                    </p>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon" onClick={handleEditBio} className="text-gray-400 hover:text-white hover:bg-transparent">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* My Profile Section */}
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

            {/* My Accounts Details Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">My Accounts Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-1">LinkedIn</p>
                  {isEditing === 'linkedin' ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white/10 text-white px-2 py-1 rounded flex-grow"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={handleCancel} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                          Batal
                        </Button>
                        <Button onClick={() => handleSave('linkedin')} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-white">{profileData.linkedin}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit('linkedin', profileData.linkedin)} className="text-gray-400 hover:text-white hover:bg-transparent">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Email Address</p>
                  {isEditing === 'email' ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white/10 text-white px-2 py-1 rounded flex-grow"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={handleCancel} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                          Batal
                        </Button>
                        <Button onClick={() => handleSave('email')} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-white">{profileData.email}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit('email', profileData.email)} className="text-gray-400 hover:text-white hover:bg-transparent">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Instagram</p>
                  {isEditing === 'instagram' ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white/10 text-white px-2 py-1 rounded flex-grow"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={handleCancel} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                          Batal
                        </Button>
                        <Button onClick={() => handleSave('instagram')} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-white">{profileData.instagram}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit('instagram', profileData.instagram)} className="text-gray-400 hover:text-white hover:bg-transparent">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Github</p>
                  {isEditing === 'github' ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-white/10 text-white px-2 py-1 rounded flex-grow"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button onClick={handleCancel} className="bg-red-600 text-white hover:bg-red-700 transition-colors">
                          Batal
                        </Button>
                        <Button onClick={() => handleSave('github')} className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-white">{profileData.github}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit('github', profileData.github)} className="text-gray-400 hover:text-white hover:bg-transparent">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
