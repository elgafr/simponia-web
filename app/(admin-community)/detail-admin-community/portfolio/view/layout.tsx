import Footer from "@/components/landing-page/Footer";

import { ReactNode } from "react";


interface DetailPortfolioLayoutViewProps {
  children: ReactNode;
}

const DetailPortfolioLayoutView = ({ children }: DetailPortfolioLayoutViewProps) => {
  return (
    <div className="text-white min-h-screen  bg-gradient-to-t from-[#0B1623] to-indigo-950">
      
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DetailPortfolioLayoutView;
