import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EditableFieldProps } from './types';

export function EditableField({
  label,
  value,
  field,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editValue,
  setEditValue,
}: EditableFieldProps) {
  return (
    <div>
      <p className="text-gray-400 mb-1">{label}</p>
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="bg-white/10 text-white px-2 py-1 rounded flex-grow"
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
        <div className="flex items-center justify-between">
          <p className="text-white">{value}</p>
          <Button variant="ghost" size="icon" onClick={() => onEdit(field, value)} className="text-gray-400 hover:text-white hover:bg-transparent">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 