"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiMaximize2, FiCpu } from "react-icons/fi";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const ghostSpring = useSpring(ghostX, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative bg-[#020202] text-white py-24 md:py-80 overflow-hidden"
    >
      {/* 
          VISUAL ENGINE: 
          Deep Parallax Text
      */}
      <motion.div 
        style={{ x: ghostSpring }}
        className="absolute inset-y-0 left-0 hidden md:flex items-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] font-serif font-black text-white/[0.01] tracking-tighter leading-none uppercase -rotate-90">
          ENGINEER
        </span>
      </motion.div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col gap-24 md:gap-80">
          
          {/* Section 01: THE IDENTITY STATEMENT */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-32 items-start lg:items-baseline border-l border-white/10 md:border-none pl-6 md:pl-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3 shrink-0"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-mono tracking-[0.5em] text-neutral-600 uppercase">Identity // Origin</span>
                <div className="hidden md:block h-px w-24 bg-neutral-800" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="lg:w-2/3"
            >
              <h2 className="text-4xl md:text-8xl lg:text-[11rem] font-serif font-black leading-[0.8] tracking-tighter uppercase mb-10 md:mb-16">
                SYSTEMS FIRST.<br/>
                <span className="text-transparent bg-clip-text bg-linear-to-b from-neutral-100 to-neutral-700">
                  INTERFACE SECOND.
                </span>
              </h2>
              <p className="text-lg md:text-4xl font-light leading-tight text-neutral-400 max-w-4xl font-sans">
                Building digital foundations designed for technical longevity. I resolve absolute complexity into clean, resilient architectures that prioritize stability over superficial trends.
              </p>
            </motion.div>
          </div>

          {/* Section 02: THE PHILOSOPHY FRAGMENT */}
          <div className="relative flex flex-col lg:flex-row justify-between items-start md:items-center gap-16 md:gap-24 border-l border-white/10 md:border-none pl-6 md:pl-0">
             {/* The "Blueprint" Image */}
             <div className="relative group w-full lg:w-auto">
               <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-3/4 w-72 md:w-lg grayscale contrast-110 brightness-[0.7] rounded-sm overflow-hidden border border-white/10"
              >
                <Image 
                  src="/images/about/workspace.png" 
                  alt="Architecture Studio" 
                  fill
                  className="object-cover transition-transform duration-4000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-[#020202]/40 via-transparent to-transparent" />
                
                {/* Scrolling Scan Overlay */}
                <motion.div 
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-40 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"
                />
              </motion.div>
              
              <div className="absolute -top-4 -right-4 hidden md:block">
                 <div className="p-4 border border-white/5 bg-black/40 backdrop-blur-md">
                    <FiMaximize2 className="text-neutral-700" size={16} />
                 </div>
              </div>
             </div>

            <div className="max-w-2xl space-y-20 lg:pr-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="h-px w-10 bg-cyan-500/50" />
                   <span className="text-[10px] font-mono text-cyan-500 tracking-[0.4em] uppercase">Architecture_Protocol</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                  Interface is a function of system integrity.
                </h3>
                
                <p className="text-neutral-500 font-sans text-lg leading-relaxed">
                  I prioritize the engineering of decoupled, modular architectures that resolve complex requirements into intuitive digital flows, ensuring that scale is never a byproduct of chance, but a result of deliberate technical intent.
                </p>
              </div>

              {/* Technical Block: System Config Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div className="space-y-4">
                  <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.3em]">Core.Dependencies</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-white tracking-widest uppercase">MERN // Next.js 15</span>
                    <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">TypeScript // SQL</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.3em]">Runtime.Deploy</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-white tracking-widest uppercase">Linux // Docker</span>
                    <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">AWS Edge // Vercel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 03: THE FINAL PUSH & CTA */}
          <div className="flex flex-col lg:flex-row items-start md:items-end gap-16 md:gap-24 border-l border-white/10 md:border-none pl-6 md:pl-0">
             <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
                   {[
                     { label: "Stability", value: "99.99%", desc: "High availability" },
                     { label: "Response", value: "<100ms", desc: "Edge delivery" },
                     { label: "Standards", value: "WCAG AA", desc: "Accessible by design" },
                     { label: "Lifecycle", value: "CI / CD", desc: "Hardened pipelines" }
                   ].map((item, i) => (
                     <div key={i} className="space-y-1 md:space-y-3 group cursor-default">
                        <span className="text-[8px] font-mono text-neutral-700 uppercase tracking-[0.4em] group-hover:text-cyan-500 transition-colors">{item.label}</span>
                        <p className="text-3xl md:text-5xl font-serif font-black text-neutral-300 group-hover:translate-x-2 transition-transform duration-500">{item.value}</p>
                        <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-tighter md:opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="lg:w-1/2 space-y-16 order-1 lg:order-2">
                <div className="space-y-8">
                  <h4 className="text-4xl md:text-6xl font-serif font-black tracking-tighter leading-none text-white lg:max-w-md">
                     ENGINEERING FOR THE LONG TAIL.
                  </h4>
                  <p className="text-neutral-500 font-sans leading-relaxed text-sm max-w-sm">
                     Building production-grade systems that bridge the gap between high-fidelity interaction and enterprise-level reliability.
                  </p>
                </div>

                {/* THE MAIN REDESIGNED BUTTON */}
                <div className="pt-10">
                  <a 
                    href="/story" 
                    className="group relative inline-flex items-center gap-6 md:gap-12 bg-white text-black py-4 md:py-6 px-8 md:px-12 overflow-hidden transition-all duration-500 hover:pr-14"
                  >
                    {/* Visual Hover Slide */}
                    <div className="absolute inset-0 bg-cyan-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    
                    <span className="relative z-10 text-[10px] font-mono font-bold tracking-[0.6em] uppercase">
                      The Full Narrative
                    </span>
                    <FiArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-3" />
                  </a>
                  
                  <div className="mt-8 flex items-center gap-4 opacity-10">
                    <FiCpu size={12} />
                    <span className="text-[8px] font-mono tracking-[1em] uppercase">Auth_Finalize_01</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* FIXED SIDE HUD (ARCHITECTURAL DECOR) */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:flex flex-col items-center gap-12 opacity-5 pointer-events-none">
         <div className="h-64 flex flex-col items-center gap-8">
            <span className="vertical-text text-[9px] font-mono tracking-[2em] text-neutral-500 uppercase">MNFST // ARCHITECT</span>
            <div className="w-px flex-1 bg-white" />
         </div>
      </div>
    </section>
  );
};
