import { AllProjects } from "@/components/sections/AllProjects";
import { Footer } from "@/components/layout/Footer";



import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Engineering Projects | Aman Srivastav",
  description: "A comprehensive portfolio of software engineering projects, web applications, and technical case studies by Aman Srivastav, based in Noida, India.",
  keywords: ["Software Engineering Portfolio", "Web Application Projects", "React Next.js Case Studies", "Technical Projects Noida"],
};

export default function ProjectsPage() {
  return (
    <main className="relative bg-[#020202] flex flex-col items-center overflow-x-hidden min-h-screen">

      <div className="w-full max-w-7xl pt-24">
        <AllProjects />
      </div>
      <Footer />
    </main>
  );
}
