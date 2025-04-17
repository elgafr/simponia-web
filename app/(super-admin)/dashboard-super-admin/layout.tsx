// dashboard/layout.tsx
import { ReactNode } from "react";

import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/landing-page/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-gray-950 text-white min-h-screen w-full">
    <Navbar />
    {children}
    <Footer />
    </div>
  );
};

export default DashboardLayout;
