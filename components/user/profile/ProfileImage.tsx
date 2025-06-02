import { User, Upload } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface ProfileImageProps {
  profileImage: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileImage({ profileImage, onImageUpload }: ProfileImageProps) {
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
            alt="Profile Picture"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
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