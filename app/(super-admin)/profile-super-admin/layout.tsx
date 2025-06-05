// profile/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/user/landing-page/Footer";

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
