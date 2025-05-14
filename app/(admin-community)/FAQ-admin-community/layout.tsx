"use client";

import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/navbar/AdminCommunityNavbar";
import { ReactNode } from "react";


interface FAQLayoutProps {
  children: ReactNode;
}

const FAQLayout = ({ children }: FAQLayoutProps) => {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default FAQLayout;
