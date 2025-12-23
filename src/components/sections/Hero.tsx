"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([title1Ref.current, title2Ref.current], {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
      });

      gsap.from(".hero-detail", {
        opacity: 0,
        x: -20,
        duration: 1,
        delay: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#030014]"
    >
      {/* High-Depth Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(112,0,255,0.08),transparent_60%)]" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse" />
        
        {/* Ghost Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] select-none">
          <h2 className="text-[30vw] font-serif font-black leading-none">CREATIVE</h2>
        </div>
      </div>

      {/* Metadata Detail Rails */}
      <div className="absolute top-32 left-8 md:left-12 z-20 hidden md:flex flex-col gap-12 text-white/20 hero-detail">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-black">Location</p>
          <p className="text-xs font-serif italic text-white/40">Noida, Uttar Pradesh</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-black">Status</p>
          <p className="text-xs font-serif italic text-white/40">Available for projects</p>
        </div>
      </div>

      <div className="absolute bottom-32 left-8 md:left-12 z-20 hidden md:flex flex-col gap-4 hero-detail">
        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-cyan-500/50 vertical-text origin-left -rotate-90">ESTD. 2024</p>
      </div>

      <motion.div 
        style={{ y, scale, opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <div className="mb-6 overflow-hidden">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cyan-500 uppercase tracking-[0.5em] text-[10px] font-bold inline-flex items-center gap-4"
          >
            <span className="w-8 h-px bg-cyan-500/50" />
            Full Stack Developer
            <span className="w-8 h-px bg-cyan-500/50" />
          </motion.p>
        </div>

        <h1 className="text-[11vw] md:text-[8.5vw] leading-[0.85] font-serif font-black mb-10 select-none">
          <div className="overflow-hidden inline-block mr-4">
            <span ref={title1Ref} className="inline-block text-white">AMAN</span>
          </div>
          <br className="md:hidden" />
          <div className="overflow-hidden inline-block">
            <span ref={title2Ref} className="inline-block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent italic">
              SRIVASTAV
            </span>
          </div>
        </h1>

        <div className="hero-desc relative">
          <p className="text-neutral-400 text-lg md:text-2xl max-w-2xl mx-auto font-sans font-light leading-relaxed mb-12">
            Pioneering <span className="text-white italic font-serif">visual narratives</span> through high-performance code and architectural precision.
          </p>
        </div>

        <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="explore"
            className="px-12 py-5 rounded-full bg-white text-black font-black text-[13px] tracking-widest transition-all hover:bg-cyan-400 group flex items-center gap-3"
          >
            EXPLORE WORK
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="hello"
            className="px-12 py-5 rounded-full border border-white/20 text-white font-black text-[13px] tracking-widest hover:border-white transition-all italic font-serif"
          >
            Drop a Line
          </motion.button>
        </div>
      </motion.div>

      {/* Cinematic Frame Border */}
      <div className="absolute inset-0 border-[15px] md:border-[30px] border-[#030014] z-20 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-16 right-12 z-10 flex flex-col items-center gap-8 md:gap-16"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] rotate-90 origin-right text-neutral-500 font-bold whitespace-nowrap">
          The Journey Starts Here
        </p>
        <div className="w-px h-32 md:h-64 bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent" />
      </motion.div>
    </section>
  );
};
