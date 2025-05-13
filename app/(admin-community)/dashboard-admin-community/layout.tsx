// dashboard/layout.tsx
import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/navbar/AdminCommunityNavbar";
import { ReactNode } from "react";


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
