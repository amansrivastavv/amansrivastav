"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.5 }); // Slight delay for preloader

        // 1. Grid & Background Subtle Fade
        tl.from(".hero-grid", {
            opacity: 0,
            duration: 2,
            ease: "power2.out"
        })
        
        // 2. Lines Expand from Center
        .from(".hero-line", {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "center",
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.2
        }, "-=1.5")

        // 3. Name Reveal (Masked Rise Up)
        .from(".hero-char", {
            y: "100%",
            rotateY: 10,
            opacity: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out"
        }, "-=1")

        // 4. Secondary Text & Metadata
        .from(".hero-meta", {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.8");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Simple Split Text Helper
  const SplitText = ({ children, className }: { children: string, className?: string }) => (
    <span className={`inline-block overflow-hidden ${className}`}>
        {children.split("").map((char, i) => (
            <span key={i} className="hero-char inline-block origin-bottom will-change-transform">
                {char === " " ? "\u00A0" : char}
            </span>
        ))}
    </span>
  );

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]"
    >
      {/* Structural Grid Background */}
      <div className="hero-grid absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />
      
      {/* Subtle Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

      {/* Main Content Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-[90vw] md:max-w-7xl px-4"
      >
        <div className="relative">
            {/* Top Decorative Line */}
            <div className="hero-line w-full h-px bg-white/10 mb-8 md:mb-12" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8 md:mb-12">
                <div className="overflow-hidden">
                    <p className="hero-meta text-sm md:text-base font-mono text-cyan-500 uppercase tracking-widest mb-2 origin-left">
                        Frontend Engineer
                    </p>
                    <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-serif font-black text-white tracking-tighter mix-blend-difference flex">
                        <SplitText>AMAN</SplitText>
                    </h1>
                </div>
                
                <div className="overflow-hidden text-right self-end pb-4 md:pb-0">
                    <h1 className="text-[11vw] md:text-[8vw] leading-[0.85] font-serif font-black text-neutral-800 tracking-tighter flex justify-end">
                        <SplitText className="text-neutral-800">SRIVASTAV</SplitText>
                    </h1>
                </div>
            </div>

            {/* Bottom Decorative Line */}
            <div className="hero-line w-full h-px bg-white/10" />
            
            {/* Metadata Footer */}
            <div className="flex flex-col md:flex-row justify-between items-start pt-6 md:pt-8 overflow-hidden gap-6 md:gap-0 relative z-20">
                <div className="hero-meta max-w-xs">
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        Crafting high-performance digital interfaces with a focus on motion, interaction, and architectural precision.
                    </p>
                </div>
                
                <a href="#projects" className="hero-meta group flex items-center gap-4 text-white hover:text-cyan-500 transition-colors cursor-pointer self-end md:self-auto">
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Explore Work</span>
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowDownRight className="w-5 h-5" />
                    </div>
                </a>
            </div>
        </div>
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)] opacity-80" />

    </section>
  );
};
