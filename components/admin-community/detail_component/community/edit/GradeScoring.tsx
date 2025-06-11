"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface DataNilai {
  kerjasama: number | null;
  kedisiplinan: number | null;
  komunikasi: number | null;
  tanggung_jawab: number | null;
  catatan: string | null;
}

interface PropsPenilaian {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const Penilaian: React.FC<PropsPenilaian> = ({ isOpen, onClose, onSuccess }) => {
  const params = useParams();
  const [kerjasamaGrade, setKerjasamaGrade] = useState("");
  const [kedisiplinanGrade, setKedisiplinanGrade] = useState("");
  const [komunikasiGrade, setKomunikasiGrade] = useState("");
  const [tanggungjawabGrade, setTanggungjawabGrade] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil data nilai saat modal dibuka
  useEffect(() => {
    const fetchNilai = async () => {
      if (isOpen) {
        try {
          setIsLoading(true);
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token autentikasi tidak ditemukan');
          }

          const memberId = params.memberId;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${memberId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Gagal mengambil data nilai');
          }

          const data = await response.json();
          
          // Mengisi form dengan data yang ada
          if (data.kerjasama) setKerjasamaGrade(data.kerjasama.toString());
          if (data.kedisiplinan) setKedisiplinanGrade(data.kedisiplinan.toString());
          if (data.komunikasi) setKomunikasiGrade(data.komunikasi.toString());
          if (data.tanggung_jawab) setTanggungjawabGrade(data.tanggung_jawab.toString());
          if (data.catatan) setCatatan(data.catatan);

        } catch (error) {
          console.error('Error mengambil data nilai:', error);
          toast.error('Gagal mengambil data nilai');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNilai();
  }, [isOpen, params.memberId]);

  // Reset form ketika modal ditutup
  useEffect(() => {
    if (!isOpen) {
      setKerjasamaGrade("");
      setKedisiplinanGrade("");
      setKomunikasiGrade("");
      setTanggungjawabGrade("");
      setCatatan("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token autentikasi tidak ditemukan');
      }

      const memberId = params.memberId;
      
      // Buat body request hanya dengan nilai yang diisi
      const requestBody: any = {};
      
      if (kerjasamaGrade) {
        requestBody.kerjasama = Number(kerjasamaGrade);
      }
      if (kedisiplinanGrade) {
        requestBody.kedisiplinan = Number(kedisiplinanGrade);
      }
      if (komunikasiGrade) {
        requestBody.komunikasi = Number(komunikasiGrade);
      }
      if (tanggungjawabGrade) {
        requestBody.tanggung_jawab = Number(tanggungjawabGrade);
      }
      if (catatan) {
        requestBody.catatan = catatan;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${memberId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui nilai');
      }

      toast.success('Nilai berhasil diperbarui');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error memperbarui nilai:', error);
      toast.error('Gagal memperbarui nilai');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
      <div className="bg-gradient-to-b from-[#001B45] to-[#051F4C] p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <FaTasks className="mr-4"/> Atur Nilai
        </h2>
        <hr className="border-gray-600 mb-4" />

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* Detail Penilaian */}
            <div className="bg-white/10 p-4 rounded-lg mb-6">
              <p className="text-gray-200 text-lg text-base">
                Detail Penilaian
                <br />
                A: &gt;80, B+: &gt;= 75, B: &gt;= 70, C+: &gt;= 60, C: &gt;= 55, D: &gt;= 40, E: &lt; 40
              </p>
            </div>

            {/* Kerjasama */}
            <div className="mb-4">
              <label className="block text-white text-lg mb-2">Kerjasama</label>
              <input
                type="number"
                min="0"
                max="100"
                value={kerjasamaGrade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                    setKerjasamaGrade(value);
                  }
                }}
                className="w-full p-2 bg-white/5 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                placeholder="Nilai*"
              />
            </div>

            {/* Kedisiplinan */}
            <div className="mb-4">
              <label className="block text-white text-lg mb-2">Kedisiplinan</label>
              <input
                type="number"
                min="0"
                max="100"
                value={kedisiplinanGrade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                    setKedisiplinanGrade(value);
                  }
                }}
                className="w-full p-2 bg-white/5 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                placeholder="Nilai*"
              />
            </div>

            {/* Komunikasi */}
            <div className="mb-4">
              <label className="block text-white text-lg mb-2">Komunikasi</label>
              <input
                type="number"
                min="0"
                max="100"
                value={komunikasiGrade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                    setKomunikasiGrade(value);
                  }
                }}
                className="w-full p-2 bg-white/5 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                placeholder="Nilai*"
              />
            </div>

            {/* Tanggung Jawab */}
            <div className="mb-4">
              <label className="block text-white text-lg mb-2">Tanggung Jawab</label>
              <input
                type="number"
                min="0"
                max="100"
                value={tanggungjawabGrade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                    setTanggungjawabGrade(value);
                  }
                }}
                className="w-full p-2 bg-white/5 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                placeholder="Nilai*"
              />
            </div>

            {/* Catatan */}
            <div className="mb-6">
              <label className="block text-white text-lg mb-2">Catatan</label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-2 bg-white/5 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none placeholder:text-gray-400"
                placeholder="Catatan"
              />
            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-4">
              <button
                  onClick={onClose}
                  className="border border-gray-600 hover:bg-gray-100/20 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                  Batal
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Penilaian;