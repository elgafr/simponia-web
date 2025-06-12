const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  profile_id: { id: string }; // Added profile_id
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
  catatan: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: string;
  nim: string;
  password: string;
  role: string;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUser {
  id: string;
  user: User;
  nama: string;
  noHandphone: string;
  gender: string;
  tanggalLahir: string;
  kota: string;
  keterangan: string;
  linkedin: string;
  instagram: string;
  email: string;
  github: string;
  profilePicture: string;
  namaKomunitas: string;
  joinKomunitas: string;
  divisi: string;
  posisi: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileAdminCommunity {
  id: string;
  user: User;
  nama: string;
  noHandphone: string;
  gender: string;
  tanggalLahir: string;
  kota: string;
  keterangan: string;
  linkedin: string;
  instagram: string;
  email: string;
  github: string;
  namaKomunitas: string;
  joinKomunitas: string;
  divisi: string;
  posisi: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
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

export const fetchProfileUser = async (profileId: string): Promise<ProfileUser> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_BASE_URL}/profile-user/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch profile user: ${response.status} - ${errorText}`);
  }

  return response.json();
};

export const fetchProfileAdminCommunity = async (profileId: string): Promise<ProfileAdminCommunity> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_BASE_URL}/profile-admin-community/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch profile admin community: ${response.status} - ${errorText}`);
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