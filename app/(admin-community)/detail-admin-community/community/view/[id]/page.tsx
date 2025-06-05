import HeroSection1DetailCommunity from "@/components/admin-community/detail_component/community/view/HeroSection1DetailCommunity";
import HeroSection2DetailCommunity from "@/components/admin-community/detail_component/community/view/HeroSection2DetailCommunity";
import HeroSection3DetailCommunity from "@/components/admin-community/detail_component/community/view/HeroSection3DetailCommunity";
import React from "react";


const DetailCommunityPage: React.FC = () => {
  return (
    <>
      <HeroSection1DetailCommunity />
      <HeroSection2DetailCommunity />
      <HeroSection3DetailCommunity />
    </>
  );
};

export default DetailCommunityPage;
