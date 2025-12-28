"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]); // Slight zoom in on scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Initial loader state simulation
        const tl = gsap.timeline();

        // 1. Title Reveal (Split text effect)
        tl.from(".char-reveal", {
            y: 200,
            opacity: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5
        })
        // 2. Metadata Reveal
        .from(".hero-detail", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.5")
        // 3. Button Reveal
        .from(".hero-btn", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Split text helper
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className="char-reveal inline-block translate-y-0">
            {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030014]"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Placeholder for Video - Replace src with your high-quality architectural/abstract video */}
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
        
        {/* Fallback Animated Gradient if no video */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#030014] to-[#030014] z-0" />
        
        {/* Optional: Add <video> here
        <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
            <source src="/path-to-your-cinematic-video.mp4" type="video/mp4" />
        </video>
        */}
        
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      {/* Metadata Detail Rails */}
      <div className="absolute top-32 left-8 md:left-12 z-20 hidden md:flex flex-col gap-12 text-white/40 hero-detail mix-blend-difference">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/60">Location</p>
          <p className="text-xs font-serif italic text-white/40">Noida, Uttar Pradesh</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/60">Status</p>
          <p className="text-xs font-serif italic text-white/40">Available for projects</p>
        </div>
      </div>

      <div className="absolute bottom-32 left-8 md:left-12 z-20 hidden md:flex flex-col gap-4 hero-detail mix-blend-difference">
         <div className="w-px h-24 bg-white/20" />
         <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40 vertical-text origin-left -rotate-180">
            SCROLL
         </p>
      </div>

      <motion.div 
        style={{ y, scale, opacity }}
        className="relative z-10 container mx-auto px-6 text-center mix-blend-screen"
      >
        <div className="mb-8 overflow-hidden flex justify-center">
          <p className="hero-detail text-cyan-400 uppercase tracking-[0.2em] text-xs font-bold inline-flex items-center gap-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            Frontend Developer & Designer
          </p>
        </div>

        <h1 className="text-6xl md:text-[10vw] leading-[0.9] md:leading-[0.8] font-serif font-black mb-12 select-none tracking-tighter text-white mix-blend-difference">
          <div className="block overflow-hidden" ref={title1Ref}>
            {splitText("AMAN")}
          </div>
          <div className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40" ref={title2Ref}>
            <span className="italic font-light">{splitText("SRIVASTAV")}</span>
          </div>
        </h1>

        <div className="hero-desc relative flex flex-col items-center">
          <p className="hero-detail text-neutral-300 text-lg md:text-xl max-w-xl mx-auto font-sans font-light leading-relaxed mb-12 text-center mix-blend-difference">
            Crafting <span className="text-white italic font-serif">digital experiences</span> that blur the line between utility and art.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="explore"
              className="hero-btn px-10 py-4 rounded-full bg-white text-black font-black text-[12px] tracking-widest transition-all hover:bg-cyan-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            >
              EXPLORE WORK
            </motion.button>
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               data-cursor="hello"
               className="hero-btn px-10 py-4 rounded-full border border-white/20 text-white font-black text-[12px] tracking-widest hover:border-white hover:bg-white/5 transition-all backdrop-blur-sm"
            >
              CONTACT ME
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Frame Border - Thinner for more elegance */}
      <div className="absolute inset-0 border-[10px] md:border-[20px] border-[#030014] z-50 pointer-events-none" />
      
      {/* Decorative corners */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 w-8 h-8 border-t border-r border-white/30 hero-detail" />
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 w-8 h-8 border-b border-r border-white/30 hero-detail" />

      {/* Journey Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 right-12 z-40 hidden md:flex flex-col items-end gap-2 hero-detail"
      >
        <span className="text-[10px] font-mono text-white/40">SCROLL INDEX</span>
        <div className="flex gap-1 h-1">
            <div className="w-1 bg-white/60" />
            <div className="w-8 bg-white/20 h-px self-center" />
        </div>
      </motion.div>
    </section>
  );
};
