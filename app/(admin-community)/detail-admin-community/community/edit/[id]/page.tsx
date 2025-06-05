"use client";

import HeroSection1DetailCommunityScore from "@/components/admin-community/detail_component/community/edit/HeroSection1DetailCommunityScore";
import HeroSection2DetailCommunityScore from "@/components/admin-community/detail_component/community/edit/HeroSection2DetailCommunityScore";

const DetailCommunityEditPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection1DetailCommunityScore />
      <HeroSection2DetailCommunityScore />
    </div>
  );
};

export default DetailCommunityEditPage;