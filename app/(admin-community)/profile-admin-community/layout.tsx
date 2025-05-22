// profile/layout.tsx
import Footer from "@/components/user/landing-page/Footer";
import Navbar from "@/components/navbar/AdminCommunityNavbar";
import { ReactNode } from "react";


interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="bg-gray-950 text-white min-h-screen w-full">
      <Navbar />
      <main >{children}</main>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
