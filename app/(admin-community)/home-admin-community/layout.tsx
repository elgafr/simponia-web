// app/home/layout.tsx

import Footer from "@/components/user/landing-page/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#001B45]">
      {children}
      <Footer />
    </div>
  );
}
