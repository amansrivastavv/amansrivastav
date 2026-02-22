"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { skillsData, Skill } from "../../data/skills";

const generateStars = (count: number) => {
  return [...Array(count)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random(),
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
};

export const Skills = () => {
  const stars = useMemo(() => generateStars(50), []); // Consistent star count, efficient generation

  return (
    <section
      id="skills"
      className="relative bg-[#020202] text-white py-24 md:py-48 overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      {/* Universe Background - Simplified for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#020202]" />
        
        {/* Static Nebula instead of animted pulses for scroll performance */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]" />
        
        {/* Efficient Starfield */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full opacity-20"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header - Aligned with the new 'Intelligence' theme */}
        <div className="max-w-4xl mb-24 md:mb-40">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="space-y-4"
           >
             <span className="text-cyan-500 font-mono tracking-[0.5em] text-[10px] uppercase">Technical_Capabilities</span>
             <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter leading-none">
               TECH<br/>
               <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-neutral-700">STACK</span>
             </h2>
           </motion.div>
        </div>

        {/* Responsive Content Switch */}
        <div className="relative w-full">
          {/* MOBILE VIEW: Structural Grid (High Performance) */}
          <div className="md:hidden space-y-16">
            <div className="grid grid-cols-2 gap-4">
              {skillsData.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-sm border border-white/5 bg-white/2 backdrop-blur-sm"
                >
                  <div className="p-2 bg-neutral-900/50 rounded-sm">
                    <skill.Icon size={18} className="text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">{skill.name}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-white/5">
               <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.4em] leading-relaxed">
                 All systems optimized for performance and production-ready interaction.
               </p>
            </div>
          </div>

          {/* DESKTOP VIEW: Cinematic Orbit (Immersive) */}
          <div className="hidden md:flex flex-col items-center justify-center min-h-[800px]">
            <div className="relative w-full h-[800px] flex items-center justify-center">
              {/* SOL: Center Image/Text */}
              <div className="absolute z-20 w-32 h-32 rounded-full bg-black/40 border border-white/10 backdrop-blur-3xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <span className="text-[8px] font-mono text-cyan-500 tracking-widest uppercase mb-1">Engine</span>
                <span className="font-serif font-black text-xl italic tracking-tighter">CORE</span>
              </div>

              {/* ORBITS */}
              <Orbit radius={160} duration={40} items={skillsData.slice(0, 6)} />
              <Orbit radius={280} duration={60} items={skillsData.slice(6, 14)} reverse />
              <Orbit radius={400} duration={80} items={skillsData.slice(14, 26)} />
              
              {/* Orbital Lines Support */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full border border-white/3" />
                <div className="w-[560px] h-[560px] rounded-full border border-white/3" />
                <div className="w-[800px] h-[800px] rounded-full border border-white/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side HUD marker */}
      <div className="absolute bottom-20 right-10 hidden lg:block opacity-10">
         <div className="flex items-center gap-6">
            <span className="text-[9px] font-mono tracking-[1em] text-neutral-500 uppercase">System_Cap_Verified</span>
            <div className="h-px w-24 bg-neutral-800" />
         </div>
      </div>
    </section>
  );
};

const Orbit = ({ radius, duration, items, reverse = false }: { 
  radius: number; 
  duration: number; 
  items: Skill[]; 
  reverse?: boolean; 
}) => {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: duration }}
        className="w-full h-full relative"
      >
        {items.map((skill: Skill, index: number) => {
          const angle = (index / items.length) * 360;
          return (
            <div
              key={skill.name}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
              }}
            >
              <CounterRotatingItem duration={duration} reverse={reverse}>
                <div className="group relative w-12 h-12 flex items-center justify-center bg-black/80 border border-white/10 rounded-full hover:scale-125 hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all cursor-pointer shadow-lg backdrop-blur-sm">
                  <skill.Icon size={20} className="text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                  <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-black/90 border border-white/10 px-3 py-1.5 rounded-sm text-[8px] font-mono tracking-widest uppercase whitespace-nowrap pointer-events-none z-50">
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

const CounterRotatingItem = ({ children, duration, reverse }: { 
  children: React.ReactNode; 
  duration: number; 
  reverse: boolean; 
}) => {
  return (
    <motion.div
      animate={{ rotate: reverse ? 360 : -360 }}
      transition={{ repeat: Infinity, ease: 'linear', duration: duration }}
    >
      {children}
    </motion.div>
  );
};
