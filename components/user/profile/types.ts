export interface ProfileData {
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
  avatar?: string;
}

export interface EditableFieldProps {
  label: string;
  value: string;
  field: string;
  isEditing: boolean;
  onEdit: (field: string, value: string) => void;
  onSave: (field: string) => void;
  onCancel: () => void;
  editValue: string;
  setEditValue: (value: string) => void;
} 