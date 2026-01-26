"use client";

import React, { useRef } from "react";
import { 
    motion, 
    useScroll, 
    useTransform, 
    useSpring, 
    useMotionTemplate, 
    useMotionValue 
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/lib/data";

const ProjectImage = ({ src, alt }: { src: string, alt: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
    
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full aspect-16/10 md:aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-none"
            data-cursor="view"
        >
            <motion.div 
                style={{ scale: 1.1 }}
                className="absolute inset-0"
            >
                 <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>

            <motion.div 
                style={{
                    background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 80%)`,
                }}
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
            />
            
            {/* Border Glow */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
        </motion.div>
    );
};

const ProjectCard = ({ project, index }: { project: typeof allProjects[0], index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.5]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(4px)"]);

    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <div ref={containerRef} className="h-[120vh] md:h-[150vh] relative">
            <motion.div 
                style={{ scale, opacity, y, filter }}
                className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#020202]"
            >
                {/* Massive Kinetic Background Text */}
                <motion.div 
                    style={{ x: bgX }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none select-none"
                >
                    <span className="text-[40vw] md:text-[30vw] font-black text-white/5 uppercase tracking-tighter opacity-10">
                        {project.title} {project.title}
                    </span>
                </motion.div>

                <div className="container mx-auto px-10 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 pt-12 md:pt-0">
                    {/* Center text on mobile for better framing */}
                    <div className="md:col-span-5 space-y-4 md:space-y-8 order-2 md:order-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <span className="font-mono text-cyan-500 text-sm md:text-lg">0{index + 1}</span>
                                <div className="h-px w-8 md:w-12 bg-white/20" />
                                <span className="font-mono text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-sm">
                                    {project.role} | {project.year}
                                </span>
                            </div>
                            
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tight md:tracking-tighter leading-none">
                                {project.title}<span className="text-cyan-500">.</span>
                            </h2>
                            
                            <p className="text-neutral-400 text-sm md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0 line-clamp-3 md:line-clamp-none">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest text-white/60">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-2 md:pt-4">
                                <Link 
                                    href={project.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-3 md:gap-4 group"
                                >
                                    <span className="text-sm md:text-lg font-medium text-white border-b border-white/20 pb-1 group-hover:border-white transition-colors">
                                        Launch Project
                                    </span>
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:col-span-7 order-1 md:order-2">
                        <ProjectImage src={project.image} alt={project.title} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export const AllProjects = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="bg-[#020202] text-white">
            
            {/* Cinematic Intro Header */}
            <section className="h-[90vh] md:h-screen flex items-center justify-center relative overflow-hidden">
                <div className="container mx-auto px-6 z-10">
                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 1.5 }}
                         className="text-center"
                    >
                        <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="block font-mono text-cyan-500 text-[10px] md:text-sm uppercase tracking-[0.4em] mb-8 md:mb-12"
                        >
                            Curated Selection
                        </motion.span>
                        <h1 className="text-[18vw] md:text-[12vw] leading-tight md:leading-[0.8] font-black tracking-tighter uppercase relative">
                            <motion.span 
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="block"
                            >
                                Selected
                            </motion.span>
                            <motion.span 
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                                className="block text-white/40 md:text-transparent md:stroke-text"
                            >
                                Works
                            </motion.span>

                            {/* Floating Context Label */}
                            <motion.div 
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 90 }}
                                transition={{ delay: 1 }}
                                className="absolute -right-20 top-1/2 hidden lg:flex items-center gap-4 origin-left"
                            >
                                <div className="h-px w-24 bg-cyan-500/50" />
                                <span className="font-mono text-cyan-500 text-xs tracking-[0.5em] uppercase whitespace-nowrap">
                                    Engineering Solutions
                                </span>
                            </motion.div>
                        </h1>
                    </motion.div>
                </div>
                
                {/* Floating Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-700" />
                </div>
            </section>

            {/* Projects Layered Stack */}
            <div className="relative">
                {allProjects.map((project, i) => (
                    <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>

            {/* Futuristic Final CTA */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white text-black">
                <div className="container mx-auto px-6 text-center z-10">
                    <motion.p 
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        className="text-lg md:text-xl font-mono uppercase tracking-[0.3em] mb-8 md:mb-12"
                    >
                        Have a vision?
                    </motion.p>
                    
                    <Link 
                        href="/contact"
                        className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-none hover:italic transition-all duration-500 block mb-16 md:mb-20"
                    >
                        LET&apos;S BUILD <br /> SOMETHING <br /> LEGENDARY.
                    </Link>

                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link 
                            href="/contact"
                            className="inline-flex items-center gap-4 bg-black text-white px-8 md:px-12 py-4 md:py-6 rounded-full text-base md:text-xl font-bold hover:scale-105 hover:bg-neutral-800 transition-all duration-300 group shadow-2xl"
                        >
                            <span>GET IN TOUCH</span>
                            <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
                
                {/* Inverse Noise Effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </section>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
                }
                @media (min-width: 768px) {
                    .stroke-text {
                        -webkit-text-stroke: 2px rgba(255,255,255,0.3);
                    }
                }
            `}</style>
        </div>
    );
};

