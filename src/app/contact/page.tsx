import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <main className="relative bg-[#030014] flex flex-col items-center overflow-x-hidden min-h-screen">
      <div className="w-full max-w-7xl pt-24">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
