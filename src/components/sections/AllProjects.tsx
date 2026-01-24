"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/lib/data";

const ProjectImage = ({ src, alt }: { src: string, alt: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
    
    // Dynamic glare gradient moving with mouse
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full aspect-4/3 md:aspect-16/10 rounded-xl bg-[#0a0a0a] overflow-hidden perspective-1000 cursor-none"
        >
            {/* The Image Layer */}
            <motion.div 
                style={{ 
                    scale: 1.15, // Scale up to avoid edge clipping during tilt
                    z: 0
                }}
                className="absolute inset-0"
            >
                 <Image 
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Glare/Reflection Layer */}
            <motion.div 
                style={{
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.5]),
                    background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 80%)`,
                    z: 50
                }}
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
            />
            
            {/* Border Glow */}
             <motion.div
                style={{
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0.3, 0.8]),
                    background: useMotionTemplate`radial-gradient(800px circle at ${glareX} ${glareY}, rgba(255,255,255,0.15), transparent 40%)`,
                    z: 60
                }}
                className="absolute inset-0 pointer-events-none"
            />

        </motion.div>
    );
};

const ProjectCard = ({ project, index }: { project: typeof allProjects[0], index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    
    // Text Reveal
    const textY = useTransform(scrollYProgress, [0.1, 0.4], [50, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    return (
        <section ref={containerRef} className="min-h-screen flex items-center py-24 md:py-0">
            <div className="container mx-auto px-6 md:px-12">
                <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${isEven ? "" : "md:flex-row-reverse"}`}>
                    
                    {/* TEXT SECTION */}
                    <motion.div 
                        style={{ y: textY, opacity: textOpacity }}
                        className="w-full md:w-5/12 space-y-8 md:space-y-12 z-10"
                    >
                         {/* Meta */}
                         <div className="flex items-center gap-4 overflow-hidden">
                              <span className="font-mono text-cyan-500 text-sm md:text-base">0{index + 1}</span>
                              <div className="h-px w-12 bg-white/20" />
                              <span className="font-mono text-white/50 text-sm uppercase tracking-widest">{project.role}</span>
                         </div>

                         {/* Title */}
                         <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter">
                            {project.title}
                            <span className="text-cyan-500">.</span>
                         </h2>

                         {/* Description */}
                         <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                            {project.description}
                         </p>

                         {/* Tags */}
                         <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-white/40 uppercase tracking-wider">
                            {project.tags.map(tag => (
                                <span key={tag}>#{tag}</span>
                            ))}
                         </div>

                         {/* Link */}
                         <div className="pt-4">
                            <Link 
                                href={project.link}
                                target="_blank"
                                className="inline-flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300 group"
                            >
                                <span className="text-lg font-medium">View Project</span>
                                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Link>
                         </div>
                    </motion.div>

                    {/* IMAGE SECTION */}
                    <div className="w-full md:w-7/12">
                         <ProjectImage src={project.image} alt={project.title} />
                    </div>

                </div>
            </div>
        </section>
    );
}

export const AllProjects = () => {
    return (
        <div className="bg-[#020202] text-white overflow-hidden">
            
            {/* Header Section */}
            <section className="min-h-[60vh] flex flex-col justify-end pb-24 container mx-auto px-6 md:px-12">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="block font-mono text-cyan-500 text-sm uppercase tracking-[0.2em] mb-6">
                        Selected Works (2025-2026)
                    </span>
                    <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-white">
                        DIGITAL <br />
                        <span className="text-white/20">REALITY.</span>
                    </h1>
                </motion.div>
            </section>

            {/* Projects Loop */}
            <div className="pb-32">
                {allProjects.map((project, i) => (
                    <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>

             {/* Minimal Footer CTA */}
             <section className="py-32 border-t border-white/5">
                <div className="container mx-auto px-6 flex flex-col items-center text-center">
                    <p className="text-neutral-500 font-mono uppercase tracking-widest mb-8">Got an idea?</p>
                    <Link 
                        href="/contact"
                        className="text-6xl md:text-8xl font-black text-white hover:text-cyan-500 transition-colors tracking-tighter"
                    >
                        START A PROJECT
                    </Link>
                </div>
            </section>

        </div>
    );
};
