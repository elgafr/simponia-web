
import Footer from "@/components/user/landing-page/Footer";
import { ReactNode } from "react";

interface EventDetailAdminCommunityLayoutProps {
  children: ReactNode;
}

const EventDetailAdminCommunityLayout = ({ children }: EventDetailAdminCommunityLayoutProps) => {
  return (
    <div className="bg-gradient-to-t from-[#0B1623] to-blue-950 text-white min-h-screen">

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default EventDetailAdminCommunityLayout;