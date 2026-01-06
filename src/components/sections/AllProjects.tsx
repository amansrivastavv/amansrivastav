"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/lib/data";

const ProjectCard = ({ project, index }: { project: typeof allProjects[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.div 
            ref={cardRef}
            style={{ opacity, scale }}
            className="relative min-h-[90vh] flex items-center justify-center py-24 md:py-32 group"
        >
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 gap-12 md:gap-24 items-center">
                    
                    {/* Project Header (Title & Tags) */}
                    <div className="space-y-8 relative z-20">
                         <div className="flex items-center gap-6 overflow-hidden">
                              <span className="font-mono text-cyan-500 text-xs md:text-sm tracking-[0.2em]">0{index + 1}</span>
                              <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                              <span className="font-mono text-white/40 text-xs uppercase tracking-widest">{project.role}</span>
                         </div>
                         
                         <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-[0.85] tracking-tight mix-blend-exclusion">
                            {project.title}
                         </h2>

                         <div className="flex flex-wrap gap-2 max-w-xl">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs md:text-sm text-neutral-300 font-medium">
                                    {tag}
                                </span>
                            ))}
                         </div>
                    </div>

                    {/* Parallax Image Container */}
                    <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-lg md:rounded-2xl bg-[#0a0a0a]">
                         {/* Image with Parallax */}
                         <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
                             <Image 
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                             />
                         </motion.div>
                         
                         {/* Grading Overlays */}
                         <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                         <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/50 via-transparent to-transparent opacity-60" />

                         {/* Floating Description Card */}
                         <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:w-full md:max-w-md p-6 md:p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl z-20"
                         >
                            <p className="text-neutral-300 font-light leading-relaxed text-sm md:text-base mb-8">
                                {project.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] text-white/30">{project.year}</span>
                                <Link 
                                    href={project.link}
                                    className="group/btn flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
                                >
                                    View Project
                                    <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-cyan-500 group-hover/btn:bg-cyan-500/10 transition-all">
                                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                    </span>
                                </Link>
                            </div>
                         </motion.div>
                    </div>

                </div>
            </div>
            
            {/* Background number watermark */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]">
                <span className="text-[20vw] font-black">{index + 1}</span>
            </div>
        </motion.div>
    )
}

export const AllProjects = () => {
    return (
        <section className="relative bg-[#020202] text-white min-h-screen pb-32">
            {/* Header */}
            <div className="fixed top-0 left-0 w-full h-24 z-40 bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" />
            
            <div className="pt-32 pb-12 md:pt-48 md:pb-32 px-6 container mx-auto mb-12 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="font-mono text-xs text-cyan-500 uppercase tracking-widest">Selected Works</span>
                         </motion.div>
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9]">
                            Visual <br /> <span className="text-neutral-500 italic">Playground.</span>
                         </h1>
                    </div>
                    <div className="max-w-sm text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                        <p>
                            A curated selection of web experiences, heavy on interaction, motion, and obsession with detail. 
                            Designed to leave a mark.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="hidden md:block absolute left-12 top-0 bottom-0 w-[1px] bg-white/5" />
                
                {allProjects.map((project, i) => (
                    <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>

            {/* Bottom Contact CTA */}
            <div className="container mx-auto px-6 py-32 text-center border-t border-white/5">
                <h3 className="text-2xl md:text-4xl font-serif mb-8">Seen enough?</h3>
                <Link 
                    href="/contact"
                    className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-colors duration-300"
                >
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

        </section>
    );
};
