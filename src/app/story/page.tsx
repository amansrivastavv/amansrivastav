"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CinematicImage } from "@/components/ui/CinematicImage";

const timeline = [
  {
    year: "2016",
    title: "The Foundation",
    role: "GVM & SVM Inter College",
    location: "Gorakhpur",
    description: "The early years defined by discipline. A quiet determination took root here, setting the stage for engineering excellence.",
    image: "/images/story/school.png",
    color: "#0f172a", // Slate 900
    textColor: "text-slate-200"
  },
  {
    year: "2023",
    title: "The Convocation",
    role: "B.Tech CSE • ITM GIDA",
    location: "Gorakhpur",
    description: "A defining milestone. Graduating with a Computer Science degree wasn't just a certificate—it was the culmination of four years of relentless coding and architectural thinking.",
    image: "/images/story/convocation.jpg",
    color: "#2e1065", // Violet 950
    textColor: "text-violet-200",
    isPortrait: true
  },
  {
    year: "2024",
    title: "First Leap",
    role: "Frontend Developer",
    location: "Gventure Technology",
    description: "Transitioning from theory to practice. Mastering pixel-perfect UIs and shipping production-grade software in a fast-paced environment.",
    image: "/images/story/gventure.png",
    color: "#042f2e", // Teal 950
    textColor: "text-teal-200"
  },
  {
    year: "2024-25",
    title: "Evolution",
    role: "Software Developer",
    location: "RTF Insurance",
    description: "Scaling up. Managing complex data flows and secure financial systems. A chapter of responsibility and precision.",
    image: "/images/story/rtf.png",
    color: "#450a0a", // Red 950
    textColor: "text-red-200"
  },
  {
    year: "Now",
    title: "The Edge",
    role: "Building the Future",
    location: "Oaky Web",
    description: "Pushing boundaries. Working at the intersection of performance and aesthetics. Building digital products that inspire.",
    image: "/images/story/oaky.png",
    color: "#000000", // Black
    textColor: "text-white"
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

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, backgroundColor: item.color, top: `calc(-5vh + ${i * 25}px)` }} 
        className="flex flex-col relative -top-[25%] h-auto md:h-[500px] w-full md:w-[1000px] rounded-[25px] p-6 md:p-12 origin-top shadow-2xl border border-white/10 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-full gap-8 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-[40%] flex flex-col justify-between z-10 order-2 md:order-1">
             <div>
                <div className={cn("text-6xl md:text-8xl font-black opacity-10 mb-4", item.textColor)}>{item.year}</div>
                <h2 className={cn("text-2xl md:text-4xl font-serif font-bold mb-2", item.textColor)}>{item.title}</h2>
                <div className={cn("text-xs md:text-sm uppercase tracking-widest font-bold opacity-60 mb-4 md:mb-6", item.textColor)}>{item.role}</div>
                <p className={cn("text-sm md:text-lg leading-relaxed opacity-80", item.textColor)}>
                  {item.description}
                </p>
             </div>
             
             <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-40 mt-6 md:mt-0">
                <span className={cn("w-2 h-2 rounded-full", item.textColor === "text-white" ? "bg-white" : "bg-current")} />
                {item.location}
             </div>
          </div>

          {/* Image Container */}
          <div className="w-full md:w-[60%] relative h-[200px] md:h-full rounded-2xl overflow-hidden order-1 md:order-2">
            <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
              <CinematicImage
                fill
                src={item.image}
                alt={item.title}
                containerClassName="w-full h-full"
                className={cn(
                  "object-cover",
                  item.isPortrait ? "object-top" : "object-center"
                )}
              />
            </motion.div>
          </div>
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
    <main className="bg-black relative">
       <Navbar />
       
       <div className="h-[80vh] flex flex-col items-center justify-center text-white p-4">
           <h1 className="text-6xl md:text-9xl font-black text-center mb-8 tracking-tighter">
             THE <br /> ARCHIVE
           </h1>
           <p className="max-w-md text-center text-neutral-500 mb-12">
             A collection of moments, milestones, and the relentless pursuit of engineering excellence.
           </p>
           <ArrowDown className="animate-bounce opacity-50" />
       </div>

       <div ref={container} className="relative pb-[20vh] px-4 md:px-0">
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
