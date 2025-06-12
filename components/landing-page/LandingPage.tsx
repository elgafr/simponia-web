import About from "./About";
import Categories from "./Categories";
import Footer from "./Footer";
import Hero from "./Hero";
import Steps from "./Steps";


export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Steps />
      <Categories />
      <About />
      <Footer />
    </main>
  );
} 