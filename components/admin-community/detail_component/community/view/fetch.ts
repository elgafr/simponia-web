// D:\Project\Project Aslab Web 1\github\simponia-web\components\super-admin\detail_component\community\view\fetch.ts

interface CreatedBy {
  id: string;
  nim: string;
  role: string;
}

interface Acara {
  id: string;
}

export interface AnggotaAcara {
  id: string;
  acara: Acara;
  created_by: CreatedBy;
  id_user: string;
  nama: string;
  nim: string;
  gender: string; // Added from response
  email: string; // Added from response
  nama_komunitas: string; // Added from response
  join_komunitas: string; // Added from response
  divisi: string; // Added from response
  posisi: string; // Added from response
  jabatan: string;
  status: string;
  kerjasama: number;
  kedisiplinan: number;
  komunikasi: number;
  tanggung_jawab: number;
  nilai_rata_rata: number;
  grade: string;
  catatan: string | null;
  created_at: string;
  updated_at: string;
}

export interface AcaraData {
  id: string;
  judul: string;
  tanggal: string;
  jumlah_panitia: number;
  skor: number;
  status: string;
  gambar: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  created_by: CreatedBy;
  anggota: Anggota[];
}

export interface Anggota {
  id: string;
  id_user: string;
  nama: string;
  nim: string;
  jabatan: string;
  status: string;
  kerjasama: number;
  kedisiplinan: number;
  komunikasi: number;
  tanggung_jawab: number;
  nilai_rata_rata: number;
  grade: string;
}

// Define API_BASE_URL using process.env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Existing fetch functions
export const fetchAnggotaAcara = async (id: string): Promise<AnggotaAcara> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_BASE_URL}/anggota-acara/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch anggota acara: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export const fetchAcara = async (): Promise<AcaraData[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_BASE_URL}/acara`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch acara: ${response.statusText}`);
  }

  const data: AcaraData[] = await response.json();
  return data.map(acara => ({
    ...acara,
    gambar: acara.gambar.startsWith('/') ? `${API_BASE_URL}${acara.gambar}` : acara.gambar,
  }));
};