import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/navbar/AdminCommunityNavbar";
import { ReactNode } from "react";


interface DetailCommunityViewLayoutProps {
  children: ReactNode;
}

const DetailCommunityViewLayout = ({ children }: DetailCommunityViewLayoutProps) => {
  return (
    <div className="bg-gradient-to-t from-[#0B1623] to-blue-950 text-white min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DetailCommunityViewLayout;
