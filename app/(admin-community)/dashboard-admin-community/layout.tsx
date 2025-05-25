// dashboard/layout.tsx

import Footer from "@/components/user/landing-page/Footer";
import { ReactNode } from "react";


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-gray-950 text-white min-h-screen w-full">
   
    {children}
    <Footer />
    </div>
  );
};

export default DashboardLayout;
