'use client';

import { FAQList } from "@/components/user/faq/FAQList";
import type { FAQItem } from "@/components/user/faq/types";

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "Apa itu Simponia dan bagaimana cara menggunakannya?",
    answer: "Simponia adalah platform portofolio digital yang memungkinkan mahasiswa untuk menampilkan karya dan proyek mereka. Untuk menggunakannya, Anda perlu mendaftar dan login terlebih dahulu. Setelah itu, Anda dapat membuat portofolio baru, mengedit portofolio yang ada, dan membagikannya dengan orang lain."
  },
  {
    id: "item-2",
    question: "Bagaimana cara membuat portofolio baru?",
    answer: "Untuk membuat portofolio baru, login ke akun Anda dan klik tombol 'Buat Portofolio'. Isi semua informasi yang diperlukan seperti nama proyek, kategori, deskripsi, dan anggota tim. Pastikan untuk menambahkan gambar proyek dan link yang relevan. Setelah selesai, klik 'Simpan' untuk menyimpan portofolio Anda."
  },
  {
    id: "item-3",
    question: "Berapa lama waktu yang dibutuhkan untuk verifikasi portofolio?",
    answer: "Proses verifikasi portofolio biasanya memakan waktu 1-3 hari kerja. Tim admin akan memeriksa konten portofolio Anda untuk memastikan semua informasi sesuai dengan panduan yang berlaku. Anda akan diberitahu melalui email atau notifikasi di platform ketika portofolio Anda telah diverifikasi."
  },
  {
    id: "item-4",
    question: "Apa yang harus dilakukan jika portofolio ditolak?",
    answer: "Jika portofolio Anda ditolak, Anda akan menerima catatan dari reviewer yang menjelaskan alasan penolakan dan perbaikan yang diperlukan. Anda memiliki waktu 3 hari untuk melakukan perbaikan. Setelah diperbaiki, portofolio akan diverifikasi kembali. Jika tidak diperbaiki dalam waktu yang ditentukan, portofolio akan otomatis dihapus."
  },
  {
    id: "item-5",
    question: "Bagaimana cara menambahkan anggota tim ke portofolio?",
    answer: "Untuk menambahkan anggota tim, buka halaman edit portofolio dan cari bagian 'Tim Proyek'. Klik tombol 'Tambah Anggota' dan isi informasi anggota seperti nama, NIM, dan peran dalam proyek. Anda dapat menambahkan beberapa anggota tim sesuai kebutuhan."
  },
  {
    id: "item-6",
    question: "Apakah ada batasan ukuran file untuk gambar portofolio?",
    answer: "Ya, ada batasan ukuran file untuk gambar portofolio. Ukuran maksimum yang diperbolehkan adalah 5MB dengan format yang didukung adalah JPG, PNG, dan JPEG. Pastikan gambar yang diunggah memiliki kualitas yang baik dan relevan dengan proyek Anda."
  }
];

export default function FAQClient() {
  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-30">
      <FAQList items={faqItems} />
    </main>
  );
} 