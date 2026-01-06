import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/layout/Footer";

export default function ProjectsPage() {
  return (
    <main className="relative bg-[#030014] flex flex-col items-center overflow-x-hidden min-h-screen">
      <div className="w-full max-w-7xl pt-24">
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
