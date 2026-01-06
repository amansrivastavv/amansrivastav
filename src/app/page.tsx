import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#020202] flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="w-full max-w-7xl">
        <Hero />
        <div className="space-y-12 md:space-y-0">
          <About />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}
