import { ReactNode } from "react";
import Footer from "@/components/user/landing-page/Footer";

interface LayoutProps {
  children: ReactNode;
}

const DetailCommunityEditLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] min-h-screen">

        <main>{children}</main>
        <Footer />
    </div>
  );
};

export default DetailCommunityEditLayout;