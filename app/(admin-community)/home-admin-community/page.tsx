// app/home/page.tsx
import Hero from "@/components/admin-community/landing-page/Hero";
import Steps from "@/components/admin-community/landing-page/Steps";
import Categories from "@/components/admin-community/landing-page/Categories";
import About from "@/components/admin-community/landing-page/About";

export default function HomePage() {
  return (
    <main className="min-h-screen">
        <Hero />
        <Steps />
        <Categories />
        <About />
    </main>
  );
}
