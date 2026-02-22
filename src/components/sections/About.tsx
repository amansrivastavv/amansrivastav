"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative bg-[#020202] text-white py-32 md:py-64 overflow-hidden border-y border-white/5"
    >
      {/* 10X Background: Generative Technical Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Light Spots */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[100px]" 
        />
        
        {/* Parallax Blueprint Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-white/5" />
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            className="absolute top-1/2 left-0 w-full h-px bg-white/10" 
          />
        </div>

        {/* Floating Technical Markers */}
        <div className="absolute bottom-20 left-10 font-mono text-[9px] text-neutral-700 uppercase tracking-[0.8em] vertical-rl h-48 flex items-center gap-4">
          <div className="w-px flex-1 bg-white/10" />
          <span>LNX_USR_AMN // 04.22.98</span>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 lg:gap-x-12 items-center">
          
          {/* 10X Portrait: The "Scan" Aesthetic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group perspective-1000">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                className="relative aspect-4/5 w-[85vw] max-w-sm md:max-w-md overflow-hidden rounded-sm ring-1 ring-white/20"
              >
                {/* Image Layer */}
                <Image 
                  src="/images/about/workspace.png" 
                  alt="Aman Srivastav Studio" 
                  fill
                  className="object-cover object-center grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                  priority
                />
                
                {/* Scrolling Scan Line */}
                <motion.div 
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 top-0 w-full h-24 bg-linear-to-b from-transparent via-cyan-500/20 to-transparent z-20 pointer-events-none"
                />

                {/* Cyberpunk Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)] opacity-60" />
                <div className="absolute top-4 right-4 flex flex-col items-end">
                   <span className="text-[10px] font-mono text-cyan-500 tracking-widest bg-black/80 px-2 py-1 border border-cyan-500/50">CAM_01</span>
                </div>
              </motion.div>

              {/* Decorative Frame Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-white/20" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-cyan-500/40" />
            </div>
          </div>

          {/* 10X Content: The Technical Narrative */}
          <div className="lg:col-span-7">
            <div className="space-y-20 lg:pl-16 relative">
              
              {/* Scroll Triggered Background Title */}
              <motion.div 
                style={{ x: titleX }}
                className="absolute -top-32 left-0 text-[15vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none"
              >
                ARCHITECTING SYSTEMS
              </motion.div>

              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-4 group">
                  <div className="h-px w-16 bg-cyan-500 transition-all group-hover:w-24" />
                  <span className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 uppercase">Core_Specialization</span>
                </div>
                
                <motion.h2 
                  style={{ opacity }}
                  className="text-6xl md:text-8xl lg:text-9xl font-serif font-black leading-[0.8] tracking-tighter"
                >
                  FULL STACK<br/>
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-100 via-neutral-500 to-neutral-800">ENGINEER.</span>
                </motion.h2>

                <p className="text-2xl md:text-4xl font-light leading-tight text-neutral-100 max-w-2xl">
                  Designing <span className="italic text-cyan-400 font-medium">high-fidelity systems</span> from initial pixel to edge-optimized production.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-l border-white/10 pl-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Process_01</span>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    I engineer performant web applications and resilient architectures. Specialized in the <span className="text-white">MERN ecosystem</span>, I prioritize absolute fluidity in user interaction.
                  </p>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Process_02</span>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    Scaling systems isn&apos;t just about code—it&apos;s about stability. Leveraging <span className="text-white">modern SQL</span> for enterprise robustness, ensuring 99.9% uptime across all environments.
                  </p>
                </div>
              </div>

              {/* High-Fidelity Technical Stats */}
              <div className="flex flex-wrap gap-12 pt-8">
                 {[
                   { label: "Reliability", value: "99.9%" },
                   { label: "Stack", value: "MERN // SQL" },
                   { label: "OS", value: "LINUX_CORE" }
                 ].map((stat, i) => (
                   <div key={i} className="group cursor-default">
                      <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em] mb-2 group-hover:text-cyan-500 transition-colors uppercase">{stat.label}</p>
                      <div className="h-px w-full bg-white/5 mb-4 overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          whileInView={{ x: "0%" }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="h-full w-full bg-cyan-500/50" 
                        />
                      </div>
                      <p className="text-2xl font-serif text-white">{stat.value}</p>
                   </div>
                 ))}
              </div>

              <motion.div
                whileHover={{ x: 10 }}
                className="pt-12"
              >
                <a href="/story" className="group relative inline-flex items-center gap-8 py-6 px-12 overflow-hidden border border-white/10 rounded-xs">
                  {/* Glass Background */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl group-hover:bg-cyan-500 transition-all duration-500" />
                  
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 group-hover:text-black/60 transition-colors">Manifesto_04</span>
                      <span className="text-lg font-serif italic text-white group-hover:text-black transition-colors">Digital Biography</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
