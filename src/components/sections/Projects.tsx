"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { homeProjects } from "@/lib/data";

const ProjectCard = ({ project, index }: { project: typeof homeProjects[0], index: number }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative border-t border-white/10 py-16 md:py-24"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Number & Role */}
                <div className="md:col-span-3 space-y-2">
                    <span className="text-xs font-mono text-cyan-500 mb-2 block">0{index + 1} / {project.year}</span>
                    <h3 className="text-4xl md:text-5xl font-serif font-medium text-white group-hover:text-neutral-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm uppercase tracking-widest text-neutral-500">{project.role}</p>
                </div>

                {/* Description */}
                <div className="md:col-span-4 text-neutral-400 font-light leading-relaxed">
                    {project.description}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-[10px] uppercase border border-white/10 rounded-full bg-white/5 text-neutral-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Image Interaction */}
                <div className="md:col-span-5 relative aspect-[16/10] overflow-hidden rounded-lg md:origin-left transition-all duration-500">
                    <div className="absolute inset-0 bg-neutral-900 group-hover:bg-transparent z-10 opacity-50 transition-colors duration-500" />
                    <Image 
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 md:grayscale transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        <div className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export const Projects = () => {
  return (
    <section id="projects" className="relative bg-[#020202] text-white pt-32 pb-64">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                <h2 className="text-[10vw] md:text-8xl font-serif font-black text-white/10 leading-none">
                    WORKS
                </h2>
                <div className="text-right hidden md:block">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Selected Projects</p>
                    <p className="text-neutral-500">2023 — Present</p>
                </div>
            </div>

            <div className="flex flex-col">
                {homeProjects.map((project, i) => (
                    <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>
            
            <div className="mt-32">
                 <a href="/projects" className="group block w-full border-t border-white/10 pt-10 hover:pt-14 transition-all duration-500">
                    <div className="flex items-center justify-between">
                        <span className="text-[8vw] md:text-[5vw] font-serif font-black text-white/20 group-hover:text-cyan-500 transition-colors uppercase leading-[0.8]">
                            View Archive
                        </span>
                        <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300">
                             <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
                        </div>
                    </div>
                 </a>
            </div>
        </div>
    </section>
  );
};
