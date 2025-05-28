"use client";

import Footer from "@/components/user/landing-page/Footer";

import { ReactNode } from "react";


interface FAQLayoutProps {
  children: ReactNode;
}

const FAQLayout = ({ children }: FAQLayoutProps) => {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-950">
        
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default FAQLayout;
