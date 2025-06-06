"use client";

import CommunityProfileSection from "@/components/admin-community/detail_component/community/edit/CommunityProfileSection";
import CommunityActivitySection from "@/components/admin-community/detail_component/community/edit/CommunityActivitySection";

const DetailCommunityEditPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="w-full px-2 md:px-6">
        <CommunityProfileSection />
        <CommunityActivitySection />
      </div>
    </div>
  );
};

export default DetailCommunityEditPage;