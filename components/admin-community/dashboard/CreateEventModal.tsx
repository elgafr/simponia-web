"use client";

import { useState } from "react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const [poster, setPoster] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [panitia, setPanitia] = useState({ nama: '', nim: '', jabatan: '' });

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

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
      <div className="bg-[#001B45] text-white p-6 rounded-lg w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
        <form className="space-y-4">
          {/* Judul Acara */}
          <div>
            <label className="block text-sm font-medium mb-1">Judul Acara*</label>
            <input type="text" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Ketua Pelaksana */}
          <div>
            <label className="block text-sm font-medium mb-1">Ketua Pelaksana*</label>
            <input type="text" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Tanggal Pelaksanaan */}
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Pelaksanaan*</label>
            <div className="flex space-x-2">
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white">
                <option value="">Tanggal</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white">
                <option value="">Bulan</option>
                {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((bulan, i) => (
                  <option key={i} value={bulan}>{bulan}</option>
                ))}
              </select>
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white">
                <option value="">Tahun</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2024 - i}>{2024 - i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Jumlah Panitia & Batas Score */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Jumlah Panitia</label>
              <input type="number" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Batas Score</label>
              <input type="number" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Baris Panitia */}
          <div className="flex space-x-2">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Nama Panitia</label>
              <input type="text" value={panitia.nama} onChange={e => setPanitia({ ...panitia, nama: e.target.value })} className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">NIM</label>
              <input type="text" value={panitia.nim} onChange={e => setPanitia({ ...panitia, nim: e.target.value })} className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Jabatan</label>
              <input type="text" value={panitia.jabatan} onChange={e => setPanitia({ ...panitia, jabatan: e.target.value })} className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Poster Acara */}
          <div>
            <label className="block text-sm font-medium mb-1">Poster Acara*</label>
            <input type="file" accept="image/*" onChange={handlePosterChange} className="w-full text-gray-300" />
            {posterPreview && (
              <img src={posterPreview} alt="Preview Poster" className="mt-2 w-full h-40 object-contain rounded-md border border-gray-600" />
            )}
          </div>

          {/* Deskripsi Acara */}
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi Acara*</label>
            <textarea className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"></textarea>
          </div>

          {/* Button Action */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-500 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
