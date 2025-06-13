"use client";

import React from "react";

interface AnggotaAcara {
  id: string;
  acara: {
    id: string;
  };
  created_by: {
    id: string;
    nim: string;
    role: string;
  };
  id_user: string;
  nama: string;
  nim: string;
  gender: string;
  email: string;
  nama_komunitas: string | null;
  join_komunitas: string | null;
  divisi: string | null;
  posisi: string | null;
  jabatan: string;
  status: string;
  kerjasama: number | null;
  kedisiplinan: number | null;
  komunikasi: number | null;
  tanggung_jawab: number | null;
  nilai_rata_rata: number;
  grade: string;
  catatan: string | null;
  created_at: string;
  updated_at: string;
}

interface PropsBagianProfilKomunitas {
  anggotaData: AnggotaAcara;
}

const BagianProfilKomunitas: React.FC<PropsBagianProfilKomunitas> = ({
  anggotaData,
}) => {
  const getStatusBg = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-600";
      case "ABSENT":
        return "bg-red-600";
      case "PERMISSION":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="text-white px-2 md:px-8 py-10">
      {/* Bagian Profil */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-white mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">
              <i className="fa fa-user" />
            </span>
            <h2 className="text-2xl font-bold">Profil</h2>
          </div>
          <div className="border-t border-gray-400 mb-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base md:text-md">
          {/* Kartu Profil */}
          <div className="bg-white/10 rounded-xl shadow p-6 flex flex-col gap-2 flex-1">
            <div className="flex">
              <span className="w-40 text-gray-300">Nama Lengkap</span>:{" "}
              {anggotaData.nama}
            </div>
            <div className="flex">
              <span className="w-40 text-gray-300">NIM</span>:{" "}
              {anggotaData.nim}
            </div>
            <div className="flex">
              <span className="w-40 text-gray-300">Email</span>:{" "}
              {anggotaData.email}
            </div>
            <div className="flex">
              <span className="w-40 text-gray-300">Jenis Kelamin</span>:{" "}
              {anggotaData.gender === "-"
                ? "-"
                : anggotaData.gender === "L"
                ? "Laki-laki"
                : "Perempuan"}
            </div>
          </div>
          
          {/* Kartu Komunitas */}
          <div className="bg-white/10 rounded-xl shadow p-6 mt-6 md:mt-0 flex-1">
            <span className="font-bold text-lg mb-2 block">Komunitas</span>
            <div className="font-semibold ml-2">
              {anggotaData.nama_komunitas || "-"}
            </div>
            <div className="flex">
              <span className="ml-2 w-40 text-gray-300">Tanggal Bergabung</span>
              : {formatDate(anggotaData.join_komunitas)}
            </div>
            <div className="flex">
              <span className="ml-2 w-40 text-gray-300">Divisi</span>:{" "}
              {anggotaData.divisi || "-"}
            </div>
            <div className="flex">
              <span className="ml-2 w-40 text-gray-300">Posisi</span>:{" "}
              {anggotaData.posisi || "-"}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A1E42] rounded-lg p-6 mt-4 mx-auto max-w-[1150]">
        <span className="font-bold text-lg mb-2 block">Detail Acara</span>
        <div className="flex">
          <span className="ml-2 w-32 text-gray-300">Jabatan</span>:{" "}
          <span className="ml-2">{anggotaData.jabatan}</span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 w-32 text-gray-300">Status</span>:
          <span
            className={`${getStatusBg(
              anggotaData.status
            )} text-white ml-2 mt-2 mb-2 px-3 py-1 rounded-full text-sm`}
          >
            {anggotaData.status === "PRESENT"
              ? "Hadir"
              : anggotaData.status === "ABSENT"
              ? "Tidak Hadir"
              : anggotaData.status === "PERMISSION"
              ? "Izin"
              : anggotaData.status}
          </span>
        </div>
        <div className="flex">
          <span className="ml-2 w-32 text-gray-300">Catatan</span>:{" "}
          <span className="ml-2">{anggotaData.catatan || "-"}</span>
        </div>

        {/* Informasi Nilai */}
        <div className="mt-4">
          <span className="font-bold text-lg mb-2 block">Informasi Nilai</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex">
              <span className="ml-2 w-32 text-gray-300">Kerjasama</span>:{" "}
              <span className="ml-2">{anggotaData.kerjasama || "-"}</span>
            </div>
            <div className="flex">
              <span className="ml-2 w-32 text-gray-300">Kedisiplinan</span>:{" "}
              <span className="ml-2">{anggotaData.kedisiplinan || "-"}</span>
            </div>
            <div className="flex">
              <span className="ml-2 w-32 text-gray-300">Komunikasi</span>:{" "}
              <span className="ml-2">{anggotaData.komunikasi || "-"}</span>
            </div>
            <div className="flex">
              <span className="ml-2 w-32 text-gray-300">Tanggung Jawab</span>:{" "}
              <span className="ml-2">{anggotaData.tanggung_jawab || "-"}</span>
            </div>
            <div className="flex">
              <span className="ml-2 w-32 text-gray-300">Nilai</span>:{" "}
              <span className="ml-2 font-semibold">
                {anggotaData.grade || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BagianProfilKomunitas;
