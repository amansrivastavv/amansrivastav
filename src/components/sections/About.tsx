"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, GraduationCap, Briefcase, MapPin, Calendar, Building2 } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Years Experience", value: "2.5+" },
  { label: "Companies", value: "3" },
  { label: "Projects Delivered", value: "20+" },
];

const timeline = [
  {
    type: "education",
    year: "2016-2019",
    title: "Foundations",
    subtitle: "GVM & SVM Inter College, Gorakhpur",
    description: "The early years of discipline and academic rigor that laid the groundwork for engineering excellence.",
    icon: GraduationCap,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20"
  },
  {
    type: "education",
    year: "2019-2023",
    title: "B.Tech CSE",
    subtitle: "ITM GIDA, Gorakhpur",
    description: "Specialized in Computer Science Engineering. Deep dive into algorithms, system design, and the limitless world of code.",
    icon: GraduationCap,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20"
  },
  {
    type: "work",
    year: "Jan 2024 - Aug 2024",
    title: "Frontend Developer",
    subtitle: "Gventure Technology",
    description: "First professional leap. Mastered the art of pixel-perfect UIs and responsive design systems.",
    icon: Briefcase,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20"
  },
  {
    type: "work",
    year: "Sep 2024 - Sep 2025",
    title: "Software Developer",
    subtitle: "RTF Insurance",
    description: "Expanded horizons into full-stack development, managing complex data flows and secure enterprise applications.",
    icon: Building2,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20"
  },
  {
    type: "work",
    year: "Oct 2025 - Present",
    title: "Frontend Developer",
    subtitle: "Oaky Web",
    description: "Current Chapter. pushing the boundaries of web performance and crafting award-winning digital experiences.",
    icon: Zap,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20"
  }
];

import { Zap } from "lucide-react";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-[#030014] overflow-hidden">
      
      {/* Intro Section */}
      <div className="container mx-auto px-4 relative z-10 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] md:aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 group">
              <Image 
                src="/images/about/workspace.png" 
                alt="Workspace" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-2">The Architect</p>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-serif font-black">Aman Srivastav</span>
                 </div>
                 <p className="font-serif italic text-white/60 text-sm">Fullstack Developer • Noida, UP</p>
              </div>
            </div>

            <div className="absolute -bottom-12 -right-4 md:-right-12 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-xs">
              <div className="grid grid-cols-2 gap-8">
                 {stats.map((stat, i) => (
                   <div key={i} className={i === 2 ? "col-span-2" : ""}>
                     <h4 className="text-3xl font-serif font-black text-white mb-1">{stat.value}</h4>
                     <p className="text-[10px] uppercase tracking-wider text-neutral-400">{stat.label}</p>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-12 pt-12 lg:pt-0">
             <div className="space-y-6">
                <span className="text-cyan-500 font-bold tracking-[0.4em] text-xs uppercase">The Story</span>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.9]">
                  BEYOND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600 italic">CODE</span>
                </h2>
                <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-lg">
                  Born in Gorakhpur, crafted in code. My journey isn't just about syntax; it's about solving real-world problems. From the early days in college to engineering enterprise solutions for global clients, every line of code tells a story of evolution.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Timeline Removed - Moving to /story */}
    </section>
  );
};
