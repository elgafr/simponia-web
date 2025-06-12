import Footer from "@/components/landing-page/Footer";
import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";

interface MemberDetailLayoutProps {
  children: ReactNode;
}

const MemberDetailLayout = ({ children }: MemberDetailLayoutProps) => {
  return (
    <div className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MemberDetailLayout; 