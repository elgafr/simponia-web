// layout/ShowcaseLayout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/landing-page/Footer";

interface ShowcaseLayoutCommunityProps {
  children: ReactNode;
}

const ShowcaseLayoutCommunity = ({ children }: ShowcaseLayoutCommunityProps) => {
  return (
    <html lang="id">
      <body className="text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default ShowcaseLayoutCommunity;
