'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skillsData, Skill } from '../../data/skills';
import { cn } from '@/lib/utils';

const generateStars = (count: number) => {
  return [...Array(count)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random(),
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  }));
};

export const Skills = () => {
  const innerOrbit = skillsData.slice(0, 6);
  // Middle Orbit: Secondary
  const middleOrbit = skillsData.slice(6, 14);
  // Outer Orbit: Tools / Others
  const outerOrbit = skillsData.slice(14, 26);

  const [stars, setStars] = React.useState<{ id: number; top: string; left: string; size: number; opacity: number; duration: number; delay: number }[]>([]);

  React.useEffect(() => {
    setStars(generateStars(100));
  }, []);

  return (
    <section
      id="skills"
      className="pt-40 pb-24 bg-[#020202] text-white min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Universe Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-[#020202]" />
        
        {/* Nebula Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[100px]" />
        
        {/* Starfield */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              initial={{ opacity: star.opacity }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay
              }}
              className="absolute bg-white rounded-full"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
              }}
            />
          ))}
        </div>
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center min-h-[1000px] justify-start">
        {/* Header */}
        <div className="text-center mb-24 mt-8 relative z-30">
          <p className="text-cyan-400 tracking-widest mb-2 uppercase font-bold text-sm">
            Tech Stack
          </p>
          <h2 className="text-4xl font-black text-white">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
              Expertise
            </span>
          </h2>
        </div>

        {/* Orbit Container - to properly center orbits below the header */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-20">
          {/* SOL: Center Image/Text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)]">
            <span className="font-bold text-center leading-tight tracking-widest text-sm">
              THE
              <br />
              <span className="text-cyan-400 text-xl font-black">CORE</span>
            </span>
          </div>

          {/* ORBIT 1 (INNER) */}
          <Orbit radius={140} duration={30} items={innerOrbit} className="z-20 border-white/10" />

          {/* ORBIT 2 (MIDDLE) */}
          <Orbit
            radius={240}
            duration={40}
            items={middleOrbit}
            reverse
            className="z-10 border-white/5"
          />

          {/* ORBIT 3 (OUTER) */}
          <Orbit radius={340} duration={50} items={outerOrbit} className="z-0 border-white/5" />
        </div>
      </div>
    </section>
  );
};

const Orbit = ({
  radius,
  duration,
  items,
  reverse = false,
  className,
}: {
  radius: number;
  duration: number;
  items: Skill[];
  reverse?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed',
        className
      )}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: duration }}
        className="w-full h-full relative"
      >
        {items.map((skill, index) => {
          // Calculate position on the circle
          const angle = (index / items.length) * 360;


          return (
            <div
              key={skill.name}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
              }}
            >
    
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

const CounterRotatingItem = ({
  children,
  duration,
  reverse,
}: {
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
