import { AllProjects } from "@/components/sections/AllProjects";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function ProjectsPage() {
  return (
    <main className="relative bg-[#020202] flex flex-col items-center overflow-x-hidden min-h-screen">
      <Navbar />
      <div className="w-full max-w-7xl pt-24">
        <AllProjects />
      </div>
      <Footer />
    </main>
  );
}
