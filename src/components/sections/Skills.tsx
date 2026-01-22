"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
    Atom, 
    Blocks, 
    FileType, 
    Code2, 
    Database, 
    Layers, 
    Palette, 
    Server,
    GitBranch
} from "lucide-react";

// Mapping icons to tech stack
const techs = [
  { name: "React", category: "Framework", level: "Expert", Icon: Atom },
  { name: "Next.js", category: "Fullstack", level: "Expert", Icon: Blocks },
  { name: "TypeScript", category: "Language", level: "Advanced", Icon: FileType },
  { name: "Node.js", category: "Backend", level: "Advanced", Icon: Server },
  { name: "PHP", category: "Backend", level: "Intermediate", Icon: Code2 },
  { name: "MySQL", category: "Database", level: "Advanced", Icon: Database },
  { name: "MongoDB", category: "Database", level: "Intermediate", Icon: Database }, // Reusing Database icon
  { name: "Tailwind", category: "Styling", level: "Expert", Icon: Palette },
  { name: "Framer Motion", category: "Animation", level: "Advanced", Icon: Layers },
  { name: "Git", category: "DevOps", level: "Intermediate", Icon: GitBranch },
];

export const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    
    // Parallax & Skew Effects
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

    return (
        <section id="skills" ref={containerRef} className="py-32 bg-[#020202] text-white overflow-hidden perspective-1000">
            <div className="container mx-auto px-6 md:px-12 mb-24 relative z-10">

                <h2 className="text-6xl md:text-9xl font-black tracking-tighter mix-blend-difference">
                    DIGITAL<br />CRAFT.
                </h2>
            </div>

            {/* Floating 3D Cards Rail */}
            <div className="w-full">
                <motion.div 
                    style={{ x: y, rotateZ: rotate }}
                    className="flex gap-8 px-12 w-max"
                >
                    {techs.map((tech, i) => (
                        <TechCard key={i} tech={tech} index={i} />
                    ))}
                    {/* Duplicate for infinite feel hint */}
                     {techs.slice(0,3).map((tech, i) => (
                        <TechCard key={`dup-${i}`} tech={tech} index={i + 10} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

interface TechProps {
    name: string;
    category: string;
    level: string;
    Icon: React.ElementType;
}

const TechCard = ({ tech, index }: { tech: TechProps, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 150, damping: 20 });

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="relative w-[300px] h-[400px] rounded-xl bg-neutral-900 border border-white/10 group cursor-none overflow-hidden"
        >
             {/* Background Mesh Pattern for Texture */}
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

             <div 
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0 p-8 flex flex-col justify-between z-20"
             >
                <div className="flex justify-between items-start">
                    <span className="text-4xl font-mono text-white/20 font-bold">0{index + 1}</span>
                    <div className="p-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                        <tech.Icon className="w-6 h-6 text-neutral-400 group-hover:text-cyan-400" />
                    </div>
                </div>
                
                {/* Massive Icon Watermark */}
                <div 
                    style={{ transform: "translateZ(20px)" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                >
                    <tech.Icon className="w-48 h-48" />
                </div>

                <div>
                    <h3 className="text-4xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors tracking-tighter">{tech.name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <p className="text-sm text-neutral-500 font-mono uppercase tracking-widest">{tech.category}</p>
                    </div>
                </div>
             </div>
             
             {/* Hover Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
        </motion.div>
    );
};
