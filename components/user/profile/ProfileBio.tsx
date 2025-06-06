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
            <Button size="sm" variant="outline" className="text-white border-white/20 text-blue-500 hover:text-blue-600 hover:bg-white/90" onClick={onCancel}>Batal</Button>
            <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600" onClick={onSave}>Simpan</Button>
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