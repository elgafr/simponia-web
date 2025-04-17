// app/home/page.tsx

import HeroSection from "@/components/super-admin/home_component/HeroSection1Home";
import HeroSection2 from "@/components/super-admin/home_component/HeroSection2Home";
import HeroSection3 from "@/components/super-admin/home_component/HeroSection3Home";


export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <HeroSection2 />
      <HeroSection3 />
    </div>
  );
}
