// app/home/layout.tsx
import Navbar from "@/components/navbar/SuperAdminNavbar";
import Footer from "@/components/user/landing-page/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
