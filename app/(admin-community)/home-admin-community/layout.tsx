// app/home/layout.tsx

import Footer from "@/components/user/landing-page/Footer";

export default function HomeAdminCommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] -z-10" />
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </div>
  );
}
