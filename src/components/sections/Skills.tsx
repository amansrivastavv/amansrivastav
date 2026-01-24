"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData, Skill } from "../../data/skills";
import { cn } from "@/lib/utils";

export const Skills = () => {
    // Split skills into Orbit groups
    // Inner Orbit: High Priority / Core
    const innerOrbit = skillsData.slice(0, 6); 
    // Middle Orbit: Secondary
    const middleOrbit = skillsData.slice(6, 14);
    // Outer Orbit: Tools / Others
    const outerOrbit = skillsData.slice(14, 26);

    return (
        <section id="skills" className="py-24 bg-[#020202] text-white min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
            
            {/* Background Texture */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#020202_70%)]" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center h-[800px] justify-center">
                
                {/* Header */}
                <div className="text-center mb-12 absolute top-10 w-full">
                     <h2 className="text-cyan-400 tracking-widest mb-2 uppercase font-bold text-sm">
                        Tech Stack
                    </h2>
                    <h3 className="text-4xl font-black text-white">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Universe</span>
                    </h3>
                </div>
                
                {/* SOL: Center Image/Text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)]">
                    <span className="font-bold text-center leading-tight">
                        FULL<br/>STACK<br/><span className="text-cyan-400 text-xs">DEV</span>
                    </span>
                </div>

                {/* ORBIT 1 (INNER) */}
                <Orbit 
                    radius={140} 
                    duration={30} 
                    items={innerOrbit} 
                    className="z-20 border-white/10"
                />

                {/* ORBIT 2 (MIDDLE) */}
                <Orbit 
                    radius={240} 
                    duration={40} 
                    items={middleOrbit} 
                    reverse
                    className="z-10 border-white/5"
                />

                 {/* ORBIT 3 (OUTER) */}
                 <Orbit 
                    radius={340} 
                    duration={50} 
                    items={outerOrbit} 
                    className="z-0 border-white/5"
                />

            </div>
        </section>
    );
};

const Orbit = ({ radius, duration, items, reverse = false, className }: { radius: number, duration: number, items: Skill[], reverse?: boolean, className?: string }) => {
    return (
        <div 
            className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed", className)}
            style={{ 
                width: radius * 2, 
                height: radius * 2, 
            }}
        >
            <motion.div 
                animate={{ rotate: reverse ? -360 : 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: duration }}
                className="w-full h-full relative"
            >
                {items.map((skill, index) => {
                    // Calculate position on the circle
                    const angle = (index / items.length) * 360;
                    
                    // We don't need manual calc if we rotate the container wrapper, 
                    // BUT to keep icons upright we need a counter-rotation trick.
                    // Easier method: Rotate the PARENT wrapper for the item.
                    
                    return (
                        <div 
                            key={skill.name}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ 
                                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` 
                            }}
                        >
                            {/* Counter-rotation to keep icon up is handled by the last rotate(-angle) in the transform chain! 
                                Wait, if the MAIN container is spinning, the individual items are static relative to it.
                                So the item rotates with the container. 
                                To keep it upright, the Item Inner needs to counters-spin relative to the Time.
                            */}
                            <CounterRotatingItem duration={duration} reverse={reverse}>
                                <div className="group relative w-12 h-12 flex items-center justify-center bg-neutral-900 border border-white/10 rounded-full hover:scale-125 hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all cursor-pointer shadow-lg backdrop-blur-sm">
                                    <skill.Icon size={20} className="text-neutral-400 group-hover:text-cyan-400" />
                                    
                                    {/* Tooltip */}
                                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
                                        {skill.name}
                                    </div>
                                </div>
                            </CounterRotatingItem>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

const CounterRotatingItem = ({ children, duration, reverse }: { children: React.ReactNode, duration: number, reverse: boolean }) => {
    return (
        <motion.div
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: duration }}
        >
            {children}
        </motion.div>
    );
};
