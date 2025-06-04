export interface PortfolioItem {
  id: string;
  nama_projek: string;
  kategori: string;
  tahun: number;
  status: string;
  gambar: string | null;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  anggota: Array<{
    id: string;
    role: string;
    nim: string;
    angkatan: string;
    id_user: string;
    name: string | null;
  }>;
  detail_project: Array<{
    id: string;
    judul_link: string;
    link_project: string;
    created_at: string;
    updated_at: string;
  }>;
  tags: Array<{
    id: string;
    nama: string;
    created_at: string;
    updated_at: string;
  }>;
  creator: {
    user_id: string;
    nim: string;
    name: string | null;
    role: string;
    noHandphone?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
    github?: string;
  };
} 