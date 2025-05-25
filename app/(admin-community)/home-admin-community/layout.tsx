// app/home/layout.tsx

import Footer from "@/components/user/landing-page/Footer";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="text-white min-h-screen">
       
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
