// layout/ShowcaseLayout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/user/landing-page/Footer";

interface ShowcaseLayoutCommunityProps {
  children: ReactNode;
}

const ShowcaseLayoutCommunity = ({ children }: ShowcaseLayoutCommunityProps) => {
  return (
    <div className="text-white min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ShowcaseLayoutCommunity;
