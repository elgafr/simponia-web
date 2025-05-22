// layout/ShowcaseLayout.tsx
"use client";
import Navbar from "@/components/navbar/AdminCommunityNavbar";
import Footer from "@/components/user/landing-page/Footer";
import { ReactNode } from "react";


interface ShowcaseLayoutCommunityProps {
  children: ReactNode;
}

const ShowcaseLayoutCommunity = ({ children }: ShowcaseLayoutCommunityProps) => {
  return (
    <html lang="id">
      <body className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default ShowcaseLayoutCommunity;
