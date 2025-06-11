import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/landing-page/Footer";

interface DetailCommunityViewLayoutProps {
  children: ReactNode;
}

const DetailCommunityViewLayout = ({ children }: DetailCommunityViewLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DetailCommunityViewLayout;