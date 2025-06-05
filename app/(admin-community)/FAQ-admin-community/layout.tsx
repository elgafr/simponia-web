"use client";

import Footer from "@/components/user/landing-page/Footer";
import { ReactNode } from "react";

interface FAQLayoutProps {
  children: ReactNode;
}

const FAQLayout = ({ children }: FAQLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default FAQLayout;
