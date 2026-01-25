import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Aman Srivastav | Software Engineer in Noida, India",
  description: "Get in touch with Aman Srivastav, a Software Engineer based in Noida, India. Available for collaborations on high-performance web applications and system design.",
  keywords: ["Contact Aman Srivastav", "Hire Software Engineer Noida", "Software Engineering Collaboration", "Noida India"],
};

export default function ContactPage() {
  return (
    <main className="relative bg-background flex flex-col items-center overflow-x-hidden min-h-screen">
      <div className="w-full max-w-7xl pt-24">
        <Contact isPage={true} />
        <Footer />
      </div>
    </main>
  );
}
