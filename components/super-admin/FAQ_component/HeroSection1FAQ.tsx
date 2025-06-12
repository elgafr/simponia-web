'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";


// Define interfaces
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQItemProps {
  item: FAQItem;
}

export interface FAQListProps {
  items: FAQItem[];
}

// FAQItem Component
export function FAQItem({ item }: FAQItemProps) {
  return (
    <AccordionItem 
      value={item.id} 
      className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 px-6 pb-4">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  );
}

// FAQList Component
export function FAQList({ items }: FAQListProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}

// FAQ Items Data
const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "Apa Itu Dashboard ?",
    answer: "Dashboard yang ada di Super Admin berguna untuk melihat Portfolio yang dibuat oleh User atau Mahasiswa dari Informatika Universitas Muhammadiyah Malang."
  },
  {
    id: "item-2",
    question: "Bagaimana cara menilai Portfolio dari Dashboard ?",
    answer: "Admin bisa melakukan penilaian atau mengubah status dari Portfolio dengan mengklik icon 'Pensil' lalu akan diarahkan ke Detail Portfolio, dan untuk mengubah status nya bisa dipilih pojok kanan atas pada Detail Portfolio. Selain bisa mengubah status dari Portfolio, Super Admin bisa menambahkan catatan jika ada yang harus di revisi pada Portfolio."

  },
  {
    id: "item-3",
    question: "Apa saja status untuk penilaian pada Portfolio ?",
    answer: "Ada 3 Status yaitu yang pertama adalah 'Belum di Verifikasi' yang dimana status Portfolio menunggu untuk di Verifikasi. Yang kedua adalah 'Perlu Perubahan' yang dimana Portfolio memerlukan beberapa revisi. Yang Ketiga adalah 'Terverifikasi' yang dimana Porfolio User sudah di Acc oleh Admin"
  },
  {
    id: "item-4",
    question: "Icon 'Mata' yang ada di Dashboard berguna untuk apa ?",
    answer: "Icon 'Mata' berfungsi untuk melihat Detail dari Portofolio yang dibuat oleh Mahasiswa UMM. Berbeda dengan icon 'Pensil', icon 'Mata' hanya melihat detail dari Portfolio saja dan tidak bisa mengubah status dari Portfolio nya."
  },
  {
    id: "item-5",
    question: "Apa itu Showcase Portfolio ?",
    answer: "Showcase Portfolio digunakan untuk melihat Portfolio yang sudah memiliki status 'Terverifikasi', dengan kata lain, Showcase Portfolio berfungsi untuk melihat Portfolio yang sudah di Acc oleh Admin"
  },
  {
    id: "item-6",
    question: "Apa itu Showcase Community ?",
    answer: "Showcase Community merupakan Event atau acara yang dibuat oleh Mahasiswa, namun hanya menampilkan data dari Anggota Panitia yang sudah di nilai."
  }
];

// Main HeroSection1FAQ Component
export default function HeroSection1FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <FAQList items={faqItems} />
      </main>
    </div>
  );
}