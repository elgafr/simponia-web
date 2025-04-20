import { Input } from "@/components/ui/input";

interface ProfileSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

export function ProfileSection({ sectionRef }: ProfileSectionProps) {
  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-300 mb-2">Nama Lengkap</p>
          <Input
            value="Elga Putri"
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">NIM</p>
          <Input
            value="202210370311449"
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">Email</p>
          <Input
            value="elga@email.com"
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <p className="text-gray-300 mb-2">Angkatan</p>
          <Input
            value="22"
            disabled
            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
} 