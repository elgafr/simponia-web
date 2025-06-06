import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";

interface AccountDetailsData {
  linkedin: string;
  email: string;
  instagram: string;
  github: string;
}

interface AccountDetailsProps {
  profileData: AccountDetailsData;
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
          {isEditing === 'email' && (
            <div className="flex gap-2 mt-2 justify-end">
              <Button size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90" onClick={onCancel}>Batal</Button>
              <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => onSave('email')}>Simpan</Button>
            </div>
          )}
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
          {isEditing === 'linkedin' && (
            <div className="flex gap-2 mt-2 justify-end">
              <Button size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90" onClick={onCancel}>Batal</Button>
              <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => onSave('linkedin')}>Simpan</Button>
            </div>
          )}
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
          {isEditing === 'instagram' && (
            <div className="flex gap-2 mt-2 justify-end">
              <Button size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90" onClick={onCancel}>Batal</Button>
              <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => onSave('instagram')}>Simpan</Button>
            </div>
          )}
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
          {isEditing === 'github' && (
            <div className="flex gap-2 mt-2 justify-end">
              <Button size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90" onClick={onCancel}>Batal</Button>
              <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => onSave('github')}>Simpan</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 