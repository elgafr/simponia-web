"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  nim: string;
  name: string;
  role: string;
}

interface FormData {
  judul: string;
  tanggal: string; // now stores full date in YYYY-MM-DD
  batas_score: string;
  deskripsi: string;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-1 text-gray-300 mb-1">
    {children}
    <span className="text-red-500">*</span>
  </div>
);

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const [poster, setPoster] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [panitia, setPanitia] = useState([
    { nama: '', nim: '', jabatan: 'Ketua Pelaksana', id_user: '' }
  ]);
  const [formData, setFormData] = useState<FormData>({
    judul: '',
    tanggal: '',
    batas_score: '',
    deskripsi: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  if (!isOpen) return null;

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPoster(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPosterPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPosterPreview(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUserSelect = (index: number, selectedNim: string) => {
    const selectedUser = users.find(user => user.nim === selectedNim);
    if (!selectedUser) return;

    setPanitia(prev => {
      const newPanitia = [...prev];
      newPanitia[index] = {
        ...newPanitia[index],
        nama: selectedUser.name,
        nim: selectedUser.nim,
        id_user: selectedUser.id
      };
      return newPanitia;
    });
  };

  const handleAddMember = () => {
    setPanitia(prev => [...prev, { nama: '', nim: '', jabatan: '', id_user: '' }]);
  };

  const handleDeleteMember = (index: number) => {
    if (index === 0) return; // Prevent deleting Ketua Pelaksana
    setPanitia(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.judul) newErrors.judul = "Judul acara harus diisi";
    if (!formData.tanggal) newErrors.tanggal = "Tanggal harus dipilih";
    if (!formData.batas_score) newErrors.batas_score = "Batas score harus diisi";
    if (!formData.deskripsi) newErrors.deskripsi = "Deskripsi acara harus diisi";
    if (!poster) newErrors.poster = "Poster acara harus diunggah";

    // Validate panitia
    panitia.forEach((member, index) => {
      if (!member.nim) {
        newErrors[`panitia_${index}_nim`] = "Nama panitia harus dipilih";
      }
      if (!member.jabatan) {
        newErrors[`panitia_${index}_jabatan`] = "Jabatan harus diisi";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('judul', formData.judul);
      form.append('tanggal', formData.tanggal); // already in YYYY-MM-DD
      form.append('jumlah_panitia', panitia.length.toString());
      form.append('skor', formData.batas_score);
      form.append('deskripsi', formData.deskripsi);
      if (poster) form.append('gambar', poster);

      // Add anggota/panitia as JSON string
      form.append('anggota', JSON.stringify(
        panitia.map(({ nama, nim, jabatan, id_user }) => ({
          nama,
          nim,
          jabatan,
          id_user
        }))
      ));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type' is NOT set when using FormData
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal membuat acara');
      }

      // Success: show dialog
      const data = await response.json().catch(() => null);
      setCreatedEventId(data?.id || null);
      setShowSuccessDialog(true);
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
      <div className="bg-[#001B45] text-white p-6 rounded-lg w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Detail Acara</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Judul Acara */}
          <div>
            <RequiredLabel>Judul Acara</RequiredLabel>
            <input 
              type="text" 
              placeholder="Masukkan judul acara" 
              value={formData.judul}
              onChange={(e) => setFormData(prev => ({ ...prev, judul: e.target.value }))}
              className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul}</p>}
          </div>

          {/* Tanggal Pelaksanaan */}
          <div>
            <RequiredLabel>Tanggal Pelaksanaan</RequiredLabel>
            <input
              type="date"
              value={formData.tanggal}
              onChange={e => setFormData(prev => ({ ...prev, tanggal: e.target.value }))}
              className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:invert"
            />
            {errors.tanggal && (
              <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>
            )}
          </div>

          {/* Jumlah Panitia & Batas Score */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <RequiredLabel>Jumlah Panitia</RequiredLabel>
              <input
                type="number"
                value={panitia.length}
                disabled
                className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 opacity-60 cursor-not-allowed"
              />
            </div>
            <div className="w-1/2">
              <RequiredLabel>Batas Score</RequiredLabel>
              <input
                type="number"
                placeholder="Masukkan batas score"
                value={formData.batas_score}
                onChange={(e) => setFormData(prev => ({ ...prev, batas_score: e.target.value }))}
                className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
              />
              {errors.batas_score && <p className="text-red-500 text-sm mt-1">{errors.batas_score}</p>}
            </div>
          </div>

          {/* Baris Panitia */}
          <div className="space-y-4">
            <RequiredLabel>Panitia</RequiredLabel>
            {panitia.map((member, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="w-1/3">
                  <label className="block text-sm text-gray-300 font-medium mb-1">Nama Panitia</label>
                  <Select
                    value={member.nim}
                    onValueChange={(value) => handleUserSelect(index, value)}
                  >
                    <SelectTrigger className="w-full bg-[#002B6B] border-white/20 text-white text-sm p-2 h-10">
                      <SelectValue placeholder="Pilih panitia" className="text-sm text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#001233] border-[#001B45] max-h-[200px]">
                      {users
                        .filter(user =>
                          !panitia.some(
                            existingMember =>
                              existingMember.nim === user.nim &&
                              existingMember !== member
                          )
                        )
                        .map((user) => (
                          <SelectItem
                            key={user.id}
                            value={user.nim}
                            className="text-white text-sm hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                          >
                            {user.name} ({user.nim})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors[`panitia_${index}_nim`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`panitia_${index}_nim`]}</p>
                  )}
                </div>
                <div className="w-1/3">
                  <label className="block text-sm text-gray-300 font-medium mb-1">NIM</label>
                  <input
                    type="text"
                    value={member.nim}
                    readOnly
                    placeholder="NIM akan terisi otomatis"
                    className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm text-gray-300 font-medium mb-1">Jabatan</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={member.jabatan}
                      readOnly={index === 0}
                      placeholder={index === 0 ? "Ketua Pelaksana" : "Masukkan jabatan"}
                      onChange={e => {
                        const newPanitia = [...panitia];
                        newPanitia[index].jabatan = e.target.value;
                        setPanitia(newPanitia);
                      }}
                      className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                    />
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteMember(index)}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {errors[`panitia_${index}_jabatan`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`panitia_${index}_jabatan`]}</p>
                  )}
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddMember}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Tambah Panitia
            </button>
          </div>

          {/* Poster Acara */}
          <div>
            <RequiredLabel>Poster Acara</RequiredLabel>
            <div 
              onClick={handleImageClick}
              className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePosterChange}
                className="hidden"
              />
              {posterPreview ? (
                <img 
                  src={posterPreview} 
                  alt="Preview Poster" 
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-400">Klik untuk memilih poster acara</p>
                </>
              )}
            </div>
            {errors.poster && <p className="text-red-500 text-sm mt-1">{errors.poster}</p>}
          </div>

          {/* Deskripsi Acara */}
          <div>
            <RequiredLabel>Deskripsi Acara</RequiredLabel>
            <textarea 
              placeholder="Masukkan deskripsi acara" 
              value={formData.deskripsi}
              onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
              className="w-full p-2 rounded-md bg-[#002B6B] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            ></textarea>
            {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>}
          </div>

          {/* Button Action */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-500 transition">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition">
              Kirim
            </button>
          </div>
        </form>
      </div>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-[#001233] border border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Berhasil!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Acara berhasil dibuat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => {
                setShowSuccessDialog(false);
                onClose();
                if (createdEventId) {
                  router.push(`/event-detail-admin-community/${createdEventId}`);
                }
              }}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Lihat Acara
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateEventModal;
