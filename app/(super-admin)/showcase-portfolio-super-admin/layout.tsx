// layout/ShowcaseLayout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/landing-page/Footer";

interface ShowcaseLayoutPortfolioProps {
  children: ReactNode;
}

const ShowcaseLayoutPortfolio = ({ children }: ShowcaseLayoutPortfolioProps) => {
  return (
    <html lang="id">
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default ShowcaseLayoutPortfolio;
