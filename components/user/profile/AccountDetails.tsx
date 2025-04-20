import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import type { ProfileData } from "./types";

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
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Account Details</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">Email</label>
            <Button
              onClick={() => onEdit('email', profileData.email)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={isEditing === 'email' ? editValue : profileData.email}
            onChange={(e) => isEditing === 'email' && setEditValue(e.target.value)}
            disabled={isEditing !== 'email'}
            className="bg-white/5 border-0 text-white"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">LinkedIn</label>
            <Button
              onClick={() => onEdit('linkedin', profileData.linkedin)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={isEditing === 'linkedin' ? editValue : profileData.linkedin}
            onChange={(e) => isEditing === 'linkedin' && setEditValue(e.target.value)}
            disabled={isEditing !== 'linkedin'}
            className="bg-white/5 border-0 text-white"
          />
        </div>

        {/* Instagram */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">Instagram</label>
            <Button
              onClick={() => onEdit('instagram', profileData.instagram)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={isEditing === 'instagram' ? editValue : profileData.instagram}
            onChange={(e) => isEditing === 'instagram' && setEditValue(e.target.value)}
            disabled={isEditing !== 'instagram'}
            className="bg-white/5 border-0 text-white"
          />
        </div>

        {/* Github */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">Github</label>
            <Button
              onClick={() => onEdit('github', profileData.github)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={isEditing === 'github' ? editValue : profileData.github}
            onChange={(e) => isEditing === 'github' && setEditValue(e.target.value)}
            disabled={isEditing !== 'github'}
            className="bg-white/5 border-0 text-white"
          />
        </div>
      </div>
    </div>
  );
} 