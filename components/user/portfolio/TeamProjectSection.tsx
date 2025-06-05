'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { RequiredLabel } from "./RequiredLabel";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  nim: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface TeamMember {
  id: number;
  userId?: string;
  name: string;
  nim: string;
  role: string;
  angkatan: string;
}

interface TeamProjectSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  teamMembers: TeamMember[];
  onAddMember: () => void;
  onDeleteMember: (id: number) => void;
  onMemberChange: (id: number, field: keyof TeamMember, value: string) => void;
  users: User[];
  onUserSelect: (id: number, selectedNim: string) => void;
  errors?: {
    [key: string]: string;
  };
}

export function TeamProjectSection({ 
  sectionRef, 
  teamMembers, 
  onAddMember, 
  onDeleteMember, 
  onMemberChange,
  users,
  onUserSelect,
  errors = {}
}: TeamProjectSectionProps) {
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedNims, setSelectedNims] = useState<{ [key: number]: string }>({});

  const handleUserSelect = (id: number, nim: string) => {
    const selectedUser = users.find(user => user.nim === nim);
    if (selectedUser) {
      setSelectedNims(prev => ({ ...prev, [id]: nim }));
      
      // Update all fields at once with the selected user's data
      const updatedMember = {
        id,
        userId: selectedUser.id,
        nim: selectedUser.nim,
        name: selectedUser.name,
        angkatan: selectedUser.nim.slice(0, 4),
        role: teamMembers.find(m => m.id === id)?.role || '' // Preserve existing role
      };

      // Update local state through parent component
      onMemberChange(id, 'userId', selectedUser.id);
      onMemberChange(id, 'nim', selectedUser.nim);
      onMemberChange(id, 'name', selectedUser.name);
      onMemberChange(id, 'angkatan', selectedUser.nim.slice(0, 4));
      
      // Call parent's onUserSelect to handle store update
      onUserSelect(id, selectedUser.nim);
      
      // Log the update
      console.log('Selected user:', selectedUser);
      console.log('Updated member data:', updatedMember);
    }
  };

  // Update store whenever team members change
  useEffect(() => {
    const updatedTeamMembers = teamMembers.map(member => {
      // If member has no userId but has nim, try to find user data
      if (!member.userId && member.nim) {
        const userData = users.find(user => user.nim === member.nim);
        if (userData) {
          return {
            name: userData.name,
            role: member.role,
            nim: userData.nim,
            angkatan: userData.nim.slice(0, 4),
            userId: userData.id
          };
        }
      }
      
      return {
        name: member.name || '',
        role: member.role || '',
        nim: member.nim || '',
        angkatan: member.angkatan || '',
        userId: member.userId || ''
      };
    });

    setPortfolioData({
      teamMembers: updatedTeamMembers
    });

    // Log the update
    console.log('Updated team members in store:', updatedTeamMembers);
  }, [teamMembers, setPortfolioData, users]);

  // Fetch profile data for first member
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Find the current user in the users list
          const currentUserData = users.find(user => user.nim === data.user?.nim);
          if (currentUserData) {
            setCurrentUser(currentUserData);
            // Set first member data
            if (teamMembers.length > 0) {
              const angkatan = data.user?.nim?.slice(0, 4) || '';
              onMemberChange(0, 'userId', currentUserData.id);
              onMemberChange(0, 'nim', data.user?.nim || '');
              onMemberChange(0, 'name', data.name || '');
              onMemberChange(0, 'angkatan', angkatan);
              setSelectedNims(prev => ({ ...prev, [0]: data.user?.nim || '' }));
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile user', err);
      }
    };
    if (users.length > 0) {
      fetchProfile();
    }
  }, [users]);

  const handleDeleteMember = (id: number) => {
    if (id === 1) return; // Prevent deleting the first member
    onDeleteMember(id);
  };

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Team Project</h2>
      <div className="space-y-6">
        {teamMembers.map((member, index) => (
          <div key={member.id} className="flex gap-6">
            <div className="flex-1">
              <RequiredLabel>Nama/NIM</RequiredLabel>
              <Select
                value={member.nim || undefined}
                onValueChange={(value) => handleUserSelect(member.id, value)}
                disabled={index === 0}
              >
                <SelectTrigger className={`w-full bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''} ${errors[`teamMember_${member.id}_nim`] ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Pilih Anggota" />
                </SelectTrigger>
                <SelectContent className="bg-[#001233] border-[#001B45]">
                  {users.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={user.nim}
                      className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                    >
                      {user.name}/{user.nim}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors[`teamMember_${member.id}_nim`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`teamMember_${member.id}_nim`]}</p>
              )}
            </div>
            
            <div className="flex-1">
              <RequiredLabel>Angkatan</RequiredLabel>
              <Input
                value={member.angkatan || ""}
                disabled={true}
                className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors[`teamMember_${member.id}_angkatan`] ? 'border-red-500' : ''}`}
                placeholder="Masukkan Angkatan"
              />
              {errors[`teamMember_${member.id}_angkatan`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`teamMember_${member.id}_angkatan`]}</p>
              )}
            </div>
            <div className="flex-1">
              <RequiredLabel>Role</RequiredLabel>
              <Input
                value={member.role || ""}
                onChange={(e) => onMemberChange(member.id, 'role', e.target.value)}
                className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors[`teamMember_${member.id}_role`] ? 'border-red-500' : ''}`}
                placeholder="Masukkan Role"
              />
              {errors[`teamMember_${member.id}_role`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`teamMember_${member.id}_role`]}</p>
              )}
            </div>
            {index > 0 && (
              <div className="flex items-end">
                <Button
                  onClick={() => handleDeleteMember(member.id)}
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-10 w-10 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            {index === 0 && <div className="w-10" />}
          </div>
        ))}
        <Button 
          onClick={onAddMember}
          variant="outline" 
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-blue-500 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Tambah Anggota
        </Button>
      </div>
    </div>
  );
} 