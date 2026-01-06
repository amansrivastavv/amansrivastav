"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, Zap, Terminal, Plus, Minus, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { allProjects } from "@/lib/data";

const ProjectBlade = ({ project, index, isOpen, onClick }: { project: typeof allProjects[0], index: number, isOpen: boolean, onClick: () => void }) => {
    const [mode, setMode] = useState<"visual" | "system">("visual");

    return (
        <motion.div 
            layout="position"
            className={`border-b border-white/10 overflow-hidden transition-colors duration-500 ${isOpen ? "bg-white/[0.02]" : "hover:bg-cyan-500/5 group"}`}
        >
            {/* Blade Header (Always Visible) */}
            <motion.button 
                layout="position"
                onClick={onClick}
                className="w-full flex flex-col md:flex-row md:items-center justify-between py-12 md:py-8 px-4 md:px-0 text-left outline-none group/blade"
            >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                     <div className="flex items-center justify-between w-full md:w-auto">
                        <span className={`font-mono text-xs md:text-sm tracking-widest transition-colors ${isOpen ? "text-cyan-500" : "text-white/30 group-hover/blade:text-cyan-500"}`}>
                            0{index + 1}
                        </span>
                        {/* Mobile Only Arrow */}
                        <div className={`md:hidden w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "border-cyan-500 text-cyan-500 rotate-90" : "border-white/20 text-white/50"}`}>
                             <ChevronRight className="w-4 h-4" />
                        </div>
                     </div>
                     
                     <div className="space-y-2 md:space-y-1">
                        <h3 className={`text-4xl md:text-4xl font-serif transition-colors ${isOpen ? "text-cyan-500" : "text-white group-hover/blade:text-cyan-500"}`}>
                            {project.title}
                        </h3>
                        <motion.p 
                            className={`text-xs uppercase tracking-widest transition-colors md:hidden ${isOpen ? "text-white/50" : "text-neutral-500"}`}
                        >
                            {project.role}
                        </motion.p>
                     </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">{project.role}</span>
                        <span className="text-[10px] font-mono text-white/20">{project.year}</span>
                    </div>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "border-cyan-500 text-cyan-500 rotate-90" : "border-white/20 text-white/50 group-hover/blade:border-white/50 group-hover/blade:text-white"}`}>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    >
                        <div className="pb-12 md:pb-24 pt-4 px-4 md:px-0">
                            
                            {/* Toggle Switch */}
                            <div className="flex justify-end mb-8 md:mb-12">
                                <div className="inline-flex bg-black border border-white/10 rounded-full p-1 relative">
                                    <div className={`absolute top-1 bottom-1 w-[80px] rounded-full bg-cyan-900/50 transition-all duration-300 ${mode === "visual" ? "left-1" : "left-[88px]"}`} />
                                    <button 
                                        onClick={() => setMode("visual")}
                                        className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === "visual" ? "text-cyan-50" : "text-neutral-500 hover:text-white"}`}
                                    >
                                        Visual
                                    </button>
                                    <button 
                                        onClick={() => setMode("system")}
                                        className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === "system" ? "text-cyan-50" : "text-neutral-500 hover:text-white"}`}
                                    >
                                        System
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative min-h-[400px]">
                                {/* Left Content */}
                                <div className="order-2 md:order-1 relative">
                                    <AnimatePresence mode="wait">
                                        {mode === "visual" ? (
                                            <motion.div 
                                                key="visual-txt"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="space-y-8 md:space-y-6"
                                            >
                                                <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 pt-4">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-neutral-400">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="pt-8">
                                                    <a href={project.link} className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 transition-colors">
                                                        <span>View Case Study</span>
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="system-txt"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="font-mono text-sm space-y-6 text-cyan-500/80"
                                            >
                                                <div className="p-6 border border-cyan-500/20 bg-cyan-950/10 rounded-sm relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2 opacity-50"><Terminal className="w-4 h-4" /></div>
                                                    <div className="space-y-4 relative z-10">
                                                        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                                                            <span className="uppercase tracking-widest text-[10px] opacity-60">Status</span>
                                                            <span className="text-green-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online</span>
                                                        </div>
                                                        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                                                            <span className="uppercase tracking-widest text-[10px] opacity-60">Latency</span>
                                                            <span>12ms</span>
                                                        </div>
                                                        <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                                                            <span className="uppercase tracking-widest text-[10px] opacity-60">Security</span>
                                                            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Encrypted</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-xs uppercase tracking-widest opacity-50">// Stack Initialization</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tags.map((tag, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-xs">
                                                                <span className="text-cyan-500">{">"}</span>
                                                                <span className="text-cyan-100">{tag}.init()</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Right Visual */}
                                <div className="order-1 md:order-2">
                                     <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-black">
                                        <AnimatePresence mode="wait">
                                            {mode === "visual" ? (
                                                <motion.div 
                                                    key="visual-img"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="absolute inset-0"
                                                >
                                                     <Image 
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
                                                </motion.div>
                                            ) : (
                                                <motion.div 
                                                    key="system-img"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="absolute inset-0"
                                                >
                                                    <Image 
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover opacity-20 invert hue-rotate-180"
                                                    />
                                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-24 h-24 border-2 border-cyan-500/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                                            <div className="w-20 h-20 border border-cyan-500/30 rounded-full border-dashed" />
                                                        </div>
                                                        <div className="absolute text-cyan-500 font-mono text-xs animate-pulse">ANALYZING</div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export const AllProjects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-[#020202] text-white pt-48 pb-32 min-h-screen">
        <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-24 flex items-end justify-between">
                 <div>
                     <p className="text-cyan-500 font-mono text-sm uppercase tracking-[0.2em] mb-4">CLASSIFIED_ARCHIVES_V2.0</p>
                     <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.9]">
                        THE CONSTRUCT
                    </h2>
                 </div>
                 <div className="hidden md:block text-right">
                    <p className="text-neutral-500 font-mono text-xs">SYS.STATUS: <span className="text-green-500">ONLINE</span></p>
                    <p className="text-neutral-500 font-mono text-xs">ENCRYPTION: <span className="text-cyan-500">AES-256</span></p>
                 </div>
            </div>
            
            <LayoutGroup>
                <div className="flex flex-col border-t border-white/10">
                    {allProjects.map((project, i) => (
                        <ProjectBlade 
                            key={i} 
                            project={project} 
                            index={i} 
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </LayoutGroup>
            
        </div>
    </section>
  );
};
