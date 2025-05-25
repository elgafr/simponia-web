

import Footer from "@/components/user/landing-page/Footer";
import { ReactNode } from "react";


interface DetailCommunityViewLayoutProps {
  children: ReactNode;
}

const DetailCommunityViewLayout = ({ children }: DetailCommunityViewLayoutProps) => {
  return (
    <div className="bg-gradient-to-t from-[#0B1623] to-blue-950 text-white min-h-screen">
    
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DetailCommunityViewLayout;
