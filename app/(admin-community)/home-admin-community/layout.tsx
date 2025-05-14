// app/home/layout.tsx

import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/navbar/AdminCommunityNavbar";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
