import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/user/landing-page/Footer";

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
