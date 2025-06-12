"use client";

import React, { useState, useEffect } from "react";
import { ShowcaseHeader } from "./ShowcaseHeader";
import { ShowcaseTable, Showcase } from "./ShowcaseTable";
import { EmptyState } from '@/components/ui/empty-state'; // Import the EmptyState component

interface MemberData {
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
  grade: string | null;
}

interface EventData {
  id: string;
  judul: string;
  tanggal: string;
  jumlah_panitia: number;
  skor: number;
  status: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  created_by: {
    id: string;
    nim: string;
    name: string;
    role: string;
  };
  anggota: MemberData[];
}

const HeroSection1ShowcaseCommunity: React.FC = () => {
  const [communityData, setCommunityData] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/acara`;
        console.log("Fetching from:", apiUrl);
        const acaraResponse = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", acaraResponse.status);
        if (!acaraResponse.ok) {
          const errorText = await acaraResponse.text();
          console.log("Error response:", errorText);
          throw new Error(`Failed to fetch data: ${acaraResponse.status} - ${errorText}`);
        }

        const data: EventData[] = await acaraResponse.json();
        console.log("Fetched data:", data);
        const memberMap = new Map<string, Showcase>();
        data.forEach(event => {
          event.anggota
            .filter(member => member.grade !== null && member.grade !== undefined)
            .forEach(member => {
              const key = `${member.id_user}-${event.tanggal.split('-')[0]}`;
              const performanceMatch = member.grade!.match(/^[A-E][+]?/);
              const performance = performanceMatch
                ? (performanceMatch[0] as 'A' | 'B' | 'C' | 'D' | 'E')
                : 'E';
              console.log("Processing member:", member.nama, "Grade:", member.grade, "Parsed performance:", performance);
              if (!memberMap.has(key) || event.tanggal.split('-')[0] > memberMap.get(key)!.year) {
                memberMap.set(key, {
                  id: member.id_user,
                  name: member.nama,
                  activity: event.judul,
                  year: event.tanggal.split('-')[0],
                  performance: performance,
                });
              }
            });
        });
        const processedData = Array.from(memberMap.values());
        console.log("Processed communityData:", processedData);
        setCommunityData(processedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <ShowcaseHeader
          title="Community Showcase"
          description="Loading..."
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <ShowcaseHeader
          title="Community Showcase"
          description={error}
        />
      </section>
    );
  }

  if (communityData.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
        <ShowcaseHeader
          title="Community Showcase"
          description="Kelola dan pantau showcase project dari komunitas. Anda dapat melihat, menambah, mengedit, dan menghapus showcase sesuai kebutuhan."
        />
        <EmptyState 
          title="Tidak Ada Data Komunitas"
          description="Tidak ada data komunitas yang tersedia saat ini. Silakan periksa kembali nanti atau hubungi admin jika ada masalah."
          actionLabel="Menuju Dashboard"
          actionHref="/dashboard-admin-community"
          showAction={true}
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 space-y-6 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <ShowcaseHeader
        title="Community Showcase"
        description="Kelola dan pantau showcase project dari komunitas. Anda dapat melihat, menambah, mengedit, dan menghapus showcase sesuai kebutuhan."
      />
      <h2 className="mt-5 text-3xl font-semibold">Results</h2>
      <ShowcaseTable showcaseData={communityData} />
    </section>
  );
};

export default HeroSection1ShowcaseCommunity;