import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/user/landing-page/Footer";

interface DetailCommunityViewLayoutProps {
  children: ReactNode;
}

const DetailCommunityViewLayout = ({ children }: DetailCommunityViewLayoutProps) => {
  return (
    <div className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] text-white min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DetailCommunityViewLayout;
