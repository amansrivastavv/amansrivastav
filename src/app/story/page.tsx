"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Extended Timeline Data
const timeline = [
  {
    year: "2016",
    title: "The Foundation",
    role: "GVM & SVM Inter College",
    location: "Gorakhpur",
    description: "The early years defined by discipline. A quiet determination took root here, setting the stage for engineering excellence.",
    image: "/images/story/school.png",
    tech: ["Physics", "Mathematics", "Logic"],
    achievements: ["Academic Excellence", "Science Olympiad"],
    color: "from-cyan-900/20 to-transparent"
  },
  {
    year: "2023",
    title: "The Convocation",
    role: "B.Tech CSE • ITM GIDA",
    location: "Gorakhpur",
    description: "A defining milestone. Graduating with a Computer Science degree wasn't just a certificate—it was the culmination of four years of relentless coding and problem solving.",
    image: "/images/story/convocation.jpg",
    tech: ["C++", "Java", "DSA", "DBMS"],
    achievements: ["First Division", "Hackathon Finalist"],
    color: "from-cyan-800/20 to-transparent",
    isPortrait: true
  },
  {
    year: "2024",
    title: "First Leap",
    role: "Frontend Developer",
    location: "Gventure Technology",
    description: "Transitioning from theory to practice. Mastering pixel-perfect UIs and shipping production-grade software in a fast-paced environment.",
    image: "/images/story/gventure.png",
    tech: ["React.js", "Redux", "Material UI", "Git"],
    achievements: ["Reduced Load Time", "Built Design System"],
    color: "from-cyan-700/20 to-transparent"
  },
  {
    year: "2024-25",
    title: "Evolution",
    role: "Software Developer",
    location: "RTF Insurance",
    description: "Scaling up. Managing complex data flows and secure financial systems. A chapter of responsibility, precision, and architectural growth.",
    image: "/images/story/rtf.png",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    achievements: ["Secure Auth Implementation", "Real-time Dashboard"],
    color: "from-cyan-600/20 to-transparent"
  },
  {
    year: "Now",
    title: "The Edge",
    role: "Building the Future",
    location: "Oaky Web",
    description: "Pushing boundaries. Working at the intersection of performance and aesthetics. Building digital products that inspire and convert.",
    image: "/images/story/oaky.png",
    tech: ["Next.js 14", "Framer Motion", "GSAP", "Tailwind"],
    achievements: ["Creative Developer", "Performance Focused"],
    color: "from-cyan-500/20 to-transparent"
  }
];

const TimelineItem = ({ item, index }: { item: typeof timeline[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24 border-l-0 md:border-l border-white/10 md:ml-0 md:pl-0 relative"
    >
       {/* Sticky Year marker for Desktop */}
       <div className="hidden md:block md:col-span-2 relative">
          <div className="sticky top-1/2 -translate-y-1/2 text-right pr-8 border-r border-white/10 h-full max-h-[200px] flex flex-col justify-center">
             <span className="text-6xl font-black text-white/20 absolute right-4 top-1/2 -translate-y-1/2 select-none">
                {index + 1}
             </span>
             <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500 relative z-10">
                {item.year}
             </span>
          </div>
          {/* Dot on the timeline spine */}
          <div className="absolute top-1/2 right-[-5px] w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] -translate-y-1/2 hidden md:block" />
       </div>

       {/* Mobile Year Banner */}
       <div className="md:hidden flex flex-col items-center justify-center gap-2 mb-8 sticky top-20 z-20 mix-blend-difference">
          <span className="text-4xl font-black text-white/20">0{index + 1}</span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500 bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
             {item.year}
          </span>
       </div>

       {/* Content */}
       <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6 order-2 md:order-1 text-center md:text-left">
             <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-white">
                   {item.title}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400">
                   <span className="w-1 h-1 rounded-full bg-neutral-600" />
                   <p className="text-sm uppercase tracking-widest">{item.role}</p>
                </div>
             </div>

             <p className="text-neutral-400 leading-relaxed font-light text-lg">
                {item.description}
             </p>

             {/* Tech & Achievements */}
             <div className="space-y-6">
                 <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {item.tech.map(t => (
                       <span key={t} className="px-3 py-1 text-[10px] uppercase tracking-wider border border-white/5 bg-white/[0.02] text-neutral-400 rounded-full">
                          {t}
                       </span>
                    ))}
                 </div>
                 
                 <div className="space-y-3 pt-4 border-t border-white/5 inline-block md:block w-full">
                    {item.achievements.map(ach => (
                       <div key={ach} className="flex items-center justify-center md:justify-start gap-3 text-sm text-neutral-300 font-light">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-900" />
                          {ach}
                       </div>
                    ))}
                 </div>
             </div>
          </div>

          {/* Image */}
          <motion.div 
            style={{ y }}
            className="relative aspect-[4/5] md:aspect-square rounded-sm overflow-hidden group order-1 md:order-2 w-full max-w-sm mx-auto md:max-w-none"
          >
             <div className="absolute inset-0 bg-neutral-900 group-hover:bg-transparent transition-colors duration-700 z-10 opacity-20" />
             <Image 
               src={item.image} 
               alt={item.title}
               fill
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
             />
             <div className="absolute inset-0 border border-white/5 z-20 pointer-events-none" />
          </motion.div>

       </div>
    </motion.div>
  );
};

export default function StoryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-[#020202] relative min-h-screen selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Cinematic Hero */}
      <motion.header 
        style={{ y: heroY, opacity: heroOpacity }}
        className="h-[80vh] flex flex-col items-center justify-center relative overflow-hidden"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-[#020202] to-[#020202]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

         <div className="relative z-10 text-center space-y-8 px-4">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="inline-block"
             >
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-500">
                   02 . The Journey
                </span>
             </motion.div>

             <h1 className="text-5xl md:text-8xl font-serif font-medium text-white tracking-tight">
               From <span className="text-neutral-600 italic">Roots</span><br/>
               to <span className="text-cyan-500">Reality.</span>
             </h1>
         </div>

         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12"
         >
            <ArrowDown className="w-5 h-5 text-neutral-600 animate-bounce" />
         </motion.div>
      </motion.header>

      {/* Timeline Section */}
      <section ref={containerRef} className="relative container mx-auto px-6 md:px-12 pb-32 max-w-6xl">
         {timeline.map((item, i) => (
           <TimelineItem key={i} item={item} index={i} />
         ))}
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/5 pointer-events-none" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
             >
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-600">
                  What's Next?
                </p>
                <h2 className="text-5xl md:text-8xl font-serif font-black text-white mix-blend-difference tracking-tight">
                  <span className="block text-neutral-800">The Story</span>
                  <span className="block mt-2">Continues With You.</span>
                </h2>
                
                <div className="pt-8">
                   <a 
                     href="/contact" 
                     className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black transition-all duration-500 group"
                   >
                      <span className="text-xs font-bold uppercase tracking-widest">Start a Project</span>
                      <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                   </a>
                </div>
             </motion.div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
