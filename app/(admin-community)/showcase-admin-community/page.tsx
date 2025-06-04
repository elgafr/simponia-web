'use client';

import { ShowcaseHeader } from "@/components/admin-community/showcase_community_component/ShowcaseHeader";
import { ShowcaseTable, Showcase } from "@/components/admin-community/showcase_community_component/ShowcaseTable";
import { useState } from "react";

const sampleShowcaseData = [
  {
    id: 1,
    name: "John Doe",
    activity: "Upgrading Event Caslab Tim 1",
    year: "2024",
    performance: "A"
  },
  {
    id: 2,
    name: "John Doe",
    activity: "Upgrading Event Caslab Tim 2",
    year: "2024",
    performance: "B"
  },
  {
    id: 3,
    name: "John Doe",
    activity: "IT Character Building",
    year: "2024",
    performance: "E"
  },
  {
    id: 4,
    name: "John Doe",
    activity: "Workshop Python",
    year: "2024",
    performance: "C"
  },
  {
    id: 5,
    name: "John Doe",
    activity: "Workshop 3D Game Design",
    year: "2024",
    performance: "D"
  },
  {
    id: 6,
    name: "John Doe",
    activity: "Workshop 3D Game Design",
    year: "2024",
    performance: "D"
  }
] as Showcase[];

export default function ShowcaseCommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader 
          title="Showcase Community"
          description="Kelola dan pantau showcase project dari komunitas. Anda dapat melihat, menambah, mengedit, dan menghapus showcase sesuai kebutuhan."
        />
        <ShowcaseTable showcaseData={sampleShowcaseData} />
        
      </div>
    </main>
  );
}
