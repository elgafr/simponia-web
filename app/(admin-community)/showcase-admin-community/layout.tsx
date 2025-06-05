// layout/ShowcaseLayout.tsx
"use client";

import Footer from "@/components/user/landing-page/Footer";
import { ReactNode } from "react";


interface ShowcaseLayoutCommunityProps {
  children: ReactNode;
}

const ShowcaseLayoutCommunity = ({ children }: ShowcaseLayoutCommunityProps) => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ShowcaseLayoutCommunity;
