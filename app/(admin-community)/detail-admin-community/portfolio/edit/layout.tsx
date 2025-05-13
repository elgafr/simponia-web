import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/navbar/AdminCommunityNavbar";
import { ReactNode } from "react";


interface DetailPortfolioEditLayoutProps {
  children: ReactNode;
}

const DetailPortfolioEditLayout = ({ children }: DetailPortfolioEditLayoutProps) => {
  return (
    <div className="text-white min-h-screen bg-gradient-to-t from-[#0B1623] to-indigo-950">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DetailPortfolioEditLayout;
