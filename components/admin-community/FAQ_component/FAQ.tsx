'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Definisi interface
export interface PertanyaanUmum {
  id: string;
  pertanyaan: string;
  jawaban: string;
}

export interface ItemPertanyaanProps {
  item: PertanyaanUmum;
}

export interface DaftarPertanyaanProps {
  items: PertanyaanUmum[];
}

// Komponen Item Pertanyaan
export function ItemPertanyaan({ item }: ItemPertanyaanProps) {
  return (
    <AccordionItem 
      value={item.id} 
      className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
        {item.pertanyaan}
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 px-6 pb-4">
        {item.jawaban}
      </AccordionContent>
    </AccordionItem>
  );
}

// Komponen Daftar Pertanyaan
export function DaftarPertanyaan({ items }: DaftarPertanyaanProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <ItemPertanyaan key={item.id} item={item} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}

// Data Pertanyaan Umum
const pertanyaanUmum: PertanyaanUmum[] = [
  {
    id: "item-1",
    pertanyaan: "Apa itu Simponia?",
    jawaban: "Simponia adalah platform manajemen acara yang dirancang khusus untuk komunitas. Platform ini membantu dalam mengelola, melacak, dan mengevaluasi berbagai acara komunitas dengan lebih efisien."
  },
  {
    id: "item-2",
    pertanyaan: "Bagaimana cara membuat acara baru?",
    jawaban: "Untuk membuat acara baru, klik tombol 'Tambah Acara' di dashboard. Isi semua informasi yang diperlukan seperti judul acara, tanggal pelaksanaan, deskripsi, dan unggah poster acara. Pastikan semua informasi yang dimasukkan sudah lengkap dan benar."
  },
  {
    id: "item-3",
    pertanyaan: "Bagaimana cara mengelola panitia acara?",
    jawaban: "Anda dapat mengelola panitia acara melalui fitur 'Tambah Panitia' saat membuat atau mengedit acara. Pilih anggota dari daftar yang tersedia dan tentukan jabatan mereka dalam kepanitiaan."
  },
  {
    id: "item-4",
    pertanyaan: "Bagaimana sistem penilaian acara bekerja?",
    jawaban: "Sistem penilaian acara menggunakan skor yang ditentukan saat pembuatan acara. Setiap acara memiliki batas skor minimum yang harus dicapai. Skor ini digunakan untuk mengevaluasi keberhasilan acara."
  },
  {
    id: "item-5",
    pertanyaan: "Apakah saya bisa mengedit acara yang sudah dibuat?",
    jawaban: "Ya, Anda dapat mengedit acara yang sudah dibuat melalui menu detail acara. Namun, beberapa informasi mungkin tidak dapat diubah jika acara sudah berlangsung atau selesai."
  },
  {
    id: "item-6",
    pertanyaan: "Bagaimana cara melacak statistik acara?",
    jawaban: "Statistik acara dapat dilihat di dashboard utama. Anda dapat melihat jumlah acara, status acara, dan metrik lainnya yang membantu dalam evaluasi kinerja acara."
  }
];

// Komponen Utama FAQ
export default function FAQ() {
  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 py-30">
      <DaftarPertanyaan items={pertanyaanUmum} />
    </main>
  );
} 