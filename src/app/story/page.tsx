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
    color: "from-blue-500/20 to-transparent"
  },
  {
    year: "2023",
    title: "The Convocation",
    role: "B.Tech CSE • ITM GIDA",
    location: "Gorakhpur",
    description: "A defining milestone. Graduating with a Computer Science degree wasn't just a certificate—it was the culmination of four years of relentless coding and problem solving.",
    image: "/images/story/convocation.jpg",
    tech: ["C++", "Java", "DSA", "DBMS"],
    achievements: ["Top 5% of Class", "Hackathon Finalist"],
    color: "from-violet-500/20 to-transparent",
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
    achievements: ["Reduced Load Time by 40%", "Built Design System"],
    color: "from-teal-500/20 to-transparent"
  },
  {
    year: "2024-25",
    title: "Evolution",
    role: "Software Developer",
    location: "RTF Insurance",
    description: "Scaling up. Managing complex data flows and secure financial systems. A chapter of responsibility, precision, and architectural growth.",
    image: "/images/story/rtf.png",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    achievements: ["Secure Auth System", "Real-time Dashboard"],
    color: "from-rose-500/20 to-transparent"
  },
  {
    year: "Now",
    title: "The Edge",
    role: "Building the Future",
    location: "Oaky Web",
    description: "Pushing boundaries. Working at the intersection of performance and aesthetics. Building digital products that inspire and convert.",
    image: "/images/story/oaky.png",
    tech: ["Next.js 14", "Framer Motion", "GSAP", "Tailwind"],
    achievements: ["Awwwards Nominee", "High Performance Web Apps"],
    color: "from-cyan-500/20 to-transparent"
  }
];

const TimelineItem = ({ item, index }: { item: typeof timeline[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={cn(
        "flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 py-24 md:py-32 relative",
        !isEven && "md:flex-row-reverse"
      )}
    >
      {/* Connector Line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
      
      {/* Date Marker (Center) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-[#030014] items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-5/12 space-y-8 relative z-10 group">
        <div className="space-y-4">
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                  {item.year}
                </span>
                <div className="h-px w-8 bg-white/20" />
             </div>
             
             <h2 className="text-4xl md:text-5xl font-serif font-medium text-white leading-none">
               {item.title}
             </h2>

             <p className="text-lg font-light text-cyan-400">
               {item.role} <span className="text-neutral-600 px-2">•</span> <span className="text-neutral-400">{item.location}</span>
             </p>
        </div>

        <p className="text-neutral-400 font-light leading-relaxed">
          {item.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-4">
           {item.tech.map((t) => (
             <span key={t} className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-wider text-neutral-400 hover:border-white/20 hover:text-white transition-colors">
               {t}
             </span>
           ))}
        </div>

        {/* Achievements */}
        <div className="pt-6 border-t border-white/5">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-3">Highlights</h4>
             <ul className="space-y-2">
               {item.achievements.map((ach) => (
                 <li key={ach} className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="w-1 h-1 rounded-full bg-cyan-500" />
                    {ach}
                 </li>
               ))}
             </ul>
        </div>
      </div>

      {/* Image Side */}
      <motion.div 
        style={{ y, scale }}
        className="w-full md:w-5/12 relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 group"
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-soft-light z-10", item.color)} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
        
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-[1.5s] will-change-transform group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

export default function StoryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Hero Parallax
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-[#020202] relative min-h-screen selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Cinematic Hero */}
      <motion.header 
        style={{ y: heroY, opacity: heroOpacity }}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#020202] to-[#020202] opacity-50" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

         <div className="relative z-10 text-center space-y-6 px-4">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm"
             >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">The Journey So Far</span>
             </motion.div>

             <h1 className="text-6xl md:text-9xl font-serif font-black text-white/90 tracking-tighter mix-blend-difference">
               <span className="block overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    My
                  </motion.span>
               </span>
               <span className="block overflow-hidden text-neutral-500 italic">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Journey
                  </motion.span>
               </span>
             </h1>
         </div>

         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12 flex flex-col items-center gap-4"
         >
            <p className="text-[10px] font-mono text-neutral-500 uppercase">Scroll to Explore</p>
            <ArrowDown className="w-4 h-4 text-neutral-500 animate-bounce" />
         </motion.div>
      </motion.header>

      {/* Timeline Section */}
      <section ref={containerRef} className="relative container mx-auto px-4 pb-32">
         {timeline.map((item, i) => (
           <TimelineItem key={i} item={item} index={i} />
         ))}
      </section>

      {/* CTA Section */}
      <section className="h-[50vh] flex flex-col items-center justify-center relative overflow-hidden border-t border-white/5">
          <div className="text-center space-y-6 relative z-10 px-4">
             <h2 className="text-4xl md:text-5xl font-serif text-white">The story continues...</h2>
             <p className="text-neutral-400 max-w-sm mx-auto font-light">
               I am currently open for freelance projects and new opportunities. Let's write the next chapter together.
             </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}
