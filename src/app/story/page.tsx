"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CinematicImage } from "@/components/ui/CinematicImage";

const timeline = [
  {
    year: "2016",
    title: "The Foundation",
    role: "GVM & SVM Inter College",
    location: "Gorakhpur",
    description: "The early years defined by discipline. A quiet determination took root here, setting the stage for engineering excellence.",
    image: "/images/story/school.png",
    gradient: "from-slate-950 to-black",
    accent: "text-slate-400",
    border: "group-hover:border-slate-500/30"
  },
  {
    year: "2023",
    title: "The Convocation",
    role: "B.Tech CSE • ITM GIDA",
    location: "Gorakhpur",
    description: "A defining milestone. Graduating with a Computer Science degree wasn't just a certificate—it was the culmination of four years of relentless coding.",
    image: "/images/story/convocation.jpg",
    gradient: "from-violet-950 to-black",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/30",
    isPortrait: true
  },
  {
    year: "2024",
    title: "First Leap",
    role: "Frontend Developer",
    location: "Gventure Technology",
    description: "Transitioning from theory to practice. Mastering pixel-perfect UIs and shipping production-grade software in a fast-paced environment.",
    image: "/images/story/gventure.png",
    gradient: "from-teal-950 to-black",
    accent: "text-teal-400",
    border: "group-hover:border-teal-500/30"
  },
  {
    year: "2024-25",
    title: "Evolution",
    role: "Software Developer",
    location: "RTF Insurance",
    description: "Scaling up. Managing complex data flows and secure financial systems. A chapter of responsibility and precision.",
    image: "/images/story/rtf.png",
    gradient: "from-rose-950 to-black",
    accent: "text-rose-400",
    border: "group-hover:border-rose-500/30"
  },
  {
    year: "Now",
    title: "The Edge",
    role: "Building the Future",
    location: "Oaky Web",
    description: "Pushing boundaries. Working at the intersection of performance and aesthetics. Building digital products that inspire.",
    image: "/images/story/oaky.png",
    gradient: "from-neutral-900 to-black",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/30"
  }
];

const Card = ({ 
  i, 
  item, 
  progress, 
  range, 
  targetScale 
}: { 
  i: number; 
  item: typeof timeline[0]; 
  progress: MotionValue<number>; 
  range: [number, number]; 
  targetScale: number; 
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-[120vh] flex items-center justify-center sticky top-0 perspective-1000">
      <motion.div 
        style={{ 
          scale, 
          top: `calc(-10vh + ${i * 45}px)` 
        }} 
        className={cn(
          "relative flex flex-col md:flex-row -top-[15%] h-[700px] w-full max-w-[1200px] rounded-[3rem] overflow-hidden origin-top shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/5 transition-all duration-700 bg-gradient-to-br backdrop-blur-3xl",
          item.gradient,
          item.border
        )}
      >
        {/* Abstract Cinematic Watermark - Moved for better art direction */}
        <div className="absolute -bottom-24 -left-12 text-[350px] font-black text-white/[0.02] select-none leading-none z-0 pointer-events-none font-serif tracking-tighter mix-blend-overlay">
          {item.year}
        </div>

        {/* Inner Glass Highlight */}
        <div className="absolute inset-0 border border-white/5 rounded-[3rem] pointer-events-none z-20" />
        
        {/* Text Content */}
        <div className="w-full md:w-[45%] p-10 md:p-16 flex flex-col justify-center relative z-10 order-2 md:order-1">
          
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", item.accent)}>
                   0{i + 1} — {item.year}
                 </span>
                 <div className={cn("h-px w-12 opacity-50", item.accent.replace("text-", "bg-"))} />
              </div>

              <div>
                <h2 className="text-5xl md:text-7xl font-serif font-medium text-white leading-[0.9] text-balance tracking-tight mix-blend-screen">
                  {item.title}
                </h2>
                <div className="mt-4 flex flex-col gap-1">
                  <p className={cn("text-xs font-bold uppercase tracking-[0.25em] opacity-70", item.accent)}>
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-md text-balance">
                {item.description}
              </p>
           </div>

           {/* Location Tag */}
           <div className="absolute bottom-12 left-16 hidden md:flex items-center gap-3 opacity-30 mix-blend-plus-lighter">
             <MapPin className="w-3 h-3" />
             <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{item.location}</span>
           </div>
        </div>

        {/* Image Side - Cinematic Sizing */}
        <div className="w-full md:w-[55%] h-[350px] md:h-full relative overflow-hidden order-1 md:order-2">
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black via-black/20 to-transparent z-10" />
          
          <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
             <CinematicImage
               fill
               src={item.image}
               alt={item.title}
               containerClassName="w-full h-full"
               className={cn(
                 "object-cover transition-transform duration-1000 will-change-transform",
                 item.isPortrait ? "object-[center_25%]" : "object-center"
               )}
             />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function StoryPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <main className="bg-[#020202] relative">
       <Navbar />
       
       {/* Hero Title V2 */}
       <div className="h-[100vh] flex flex-col items-center justify-center text-white relative overflow-hidden">
           
           {/* Abstract Background Elements */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_60%)]" />
           <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full" />
           
           <div className="relative z-10 text-center space-y-6">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.6em] text-neutral-500">The Chronology</span>
              
              <h1 className="text-[18vw] md:text-[14vw] font-serif font-medium leading-[0.8] tracking-tighter mix-blend-difference select-none">
                <span className="block italic opacity-40">visual</span>
                <span className="block">memoir</span>
              </h1>
           </div>

           <div className="absolute bottom-12 flex flex-col items-center gap-6 z-10 mix-blend-difference">
              <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-500">Scroll</span>
              <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
           </div>
       </div>

       <div ref={container} className="relative pb-[20vh] px-4 md:px-0 bg-[#020202]">
        {
          timeline.map((item, i) => {
            const targetScale = 1 - ( (timeline.length - i) * 0.05);
            return (
              <Card 
                key={i} 
                i={i} 
                item={item}
                progress={scrollYProgress}
                range={[i * .25, 1]}
                targetScale={targetScale}
              />
            )
          })
        }
       </div>
       
       <Footer />
    </main>
  )
}
