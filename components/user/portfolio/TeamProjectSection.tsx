'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { RequiredLabel } from "./RequiredLabel";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect } from "react";

interface TeamMember {
  id: number;
  name: string;
  nim: string;
  role: string;
}

interface TeamProjectSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  teamMembers: TeamMember[];
  onAddMember: () => void;
  onDeleteMember: (id: number) => void;
  onMemberChange: (id: number, field: keyof TeamMember, value: string) => void;
}

export function TeamProjectSection({ 
  sectionRef, 
  teamMembers, 
  onAddMember, 
  onDeleteMember, 
  onMemberChange 
}: TeamProjectSectionProps) {
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);

  useEffect(() => {
    setPortfolioData({
      teamMembers: teamMembers.map(member => ({
        name: member.name,
        role: member.role,
        nim: member.nim
      }))
    });
  }, [teamMembers]);

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Team Project</h2>
      <div className="space-y-6">
        {teamMembers.map((member, index) => (
          <div key={member.id} className="flex gap-6">
            <div className="flex-1">
              <RequiredLabel>Nama Lengkap</RequiredLabel>
              <Input
                value={member.name}
                disabled={index === 0}
                onChange={(e) => onMemberChange(member.id, 'name', e.target.value)}
                className="bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder={index === 0 ? "" : "Masukkan Nama Lengkap"}
              />
            </div>
            <div className="flex-1">
              <RequiredLabel>NIM</RequiredLabel>
              <Input
                value={member.nim}
                disabled={index === 0}
                onChange={(e) => onMemberChange(member.id, 'nim', e.target.value)}
                className="bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder={index === 0 ? "" : "Masukkan NIM"}
              />
            </div>
            <div className="flex-1">
              <RequiredLabel>Role</RequiredLabel>
              <Input
                value={member.role}
                onChange={(e) => onMemberChange(member.id, 'role', e.target.value)}
                className="bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder="Masukkan Role"
              />
            </div>
            {index > 0 && (
              <div className="flex items-end">
                <Button
                  onClick={() => onDeleteMember(member.id)}
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
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>
    </div>
  );
} 