import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

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