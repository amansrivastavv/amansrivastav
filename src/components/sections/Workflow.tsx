"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  {
    id: "01",
    subtitle: "AUDIT_01 // COGNITIVE_LOAD",
    title: "I begin with observation.",
    description: "Studying user behavior, cognitive load, interface friction, and system constraints before defining structure.",
    alignment: "start", // Left-aligned
    paddingLeft: "lg:pl-20",
  },
  {
    id: "02",
    subtitle: "ARCHITECTURE_02 // SYSTEM_DESIGN",
    title: "Then I define structure.",
    description: "Architecting layout grids, component systems, scalable APIs, and state logic before execution.",
    alignment: "end", // Right-aligned
    paddingRight: "lg:pr-40",
  },
  {
    id: "03",
    subtitle: "ENGINEERING_03 // PRECISION_MOTION",
    title: "Then I craft the interface.",
    description: "Designing fluid interactions with motion, spacing rhythm, accessibility, and performance in mind.",
    alignment: "center", // Off-center left
    paddingLeft: "lg:pl-64",
  },
  {
    id: "04",
    subtitle: "PRODUCTION_04 // EDGE_DELIVERY",
    title: "Then I refine and optimize.",
    description: "Reducing complexity, improving performance, strengthening security, and preparing production-ready systems.",
    alignment: "start", // Indented left
    paddingLeft: "lg:pl-32",
  }
];

export const Workflow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Ghost Text Parallax
  const ghostY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const ghostSpring = useSpring(ghostY, { stiffness: 100, damping: 30 });

  return (
    <section 
      id="workflow" 
      ref={containerRef} 
      className="relative bg-[#020202] text-white py-40 md:py-80 overflow-hidden"
    >
      {/* 
          VISUAL LANGUAGE: 
          Massive background ghost word with extremely low opacity.
          Slow subtle parallax.
      */}
      <motion.div 
        style={{ y: ghostSpring }}
        className="absolute inset-x-0 top-1/4 flex justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] font-serif font-black text-white/2 tracking-tighter leading-none opacity-40">
          SYSTEM
        </span>
      </motion.div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* 
            HEADER: 
            Design Intelligence
            Translating imagination into structured systems.
        */}
        <header className="mb-64 md:mb-96">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6"
          >
            <h2 className="text-6xl md:text-7xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85] uppercase">
              DESIGN<br/>
              INTELLIGENCE
            </h2>
            <p className="text-[10px] md:text-sm font-mono tracking-[0.5em] text-neutral-500 uppercase">
              Translating imagination into structured systems.
            </p>
          </motion.div>
        </header>

        {/* 
            CHAPTERS: 
            Continuous thought evolving.
            Asymmetrical alignment.
            No cards, boxes, or borders.
        */}
        <div className="space-y-64 md:space-y-[35rem]">
          {CHAPTERS.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.5, 
                delay: 0.1, 
                ease: [0.19, 1, 0.22, 1] 
              }}
              className={cn(
                "flex flex-col group",
                chapter.alignment === "start" ? "items-start" : 
                chapter.alignment === "end" ? "items-end" : "items-start",
                chapter.paddingLeft,
                chapter.paddingRight
              )}
            >
              <div className={cn(
                "max-w-3xl space-y-12",
                chapter.alignment === "end" ? "text-right" : "text-left"
              )}>
                {/* Metadata */}
                <span className="block text-[10px] md:text-xs font-mono tracking-[0.4em] text-neutral-600 uppercase">
                  {chapter.subtitle}
                </span>

                {/* Subheading */}
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tighter leading-none text-white transition-colors duration-700">
                  {chapter.title}
                </h3>

                {/* Narrative Paragraph */}
                <p className="text-xl md:text-3xl font-light leading-snug text-neutral-400 max-w-2xl font-sans">
                  {chapter.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 
            FOOTER HINT:
            Visual restraint.
        */}
        <footer className="mt-96 opacity-10 flex justify-center">
          <div className="w-px h-32 bg-white/20" />
        </footer>
      </div>
    </section>
  );
};
