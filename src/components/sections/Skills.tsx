"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"]
  },
  {
    category: "DevOps",
    items: ["Docker", "AWS", "CI/CD", "Vercel", "Linux", "Git"]
  },
  {
    category: "Design",
    items: ["Figma", "Adobe XD", "UI/UX Principles", "Design Systems", "Prototyping"]
  }
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 bg-[#030014] text-white">
      <div className="container mx-auto px-4">
        
        <div className="mb-24 border-b border-white/10 pb-12">
            <h2 className="text-6xl md:text-9xl font-serif font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">
              TOOLKIT
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            {skills.map((section, idx) => (
               <div key={idx} className="group relative">
                  <div className="border-t border-white/20 py-8 transition-all duration-300 group-hover:border-white group-hover:pl-4">
                     <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 mb-4 block">0{idx + 1} / {section.category}</span>
                     
                     <div className="flex flex-wrap gap-x-8 gap-y-2 max-w-md">
                        {section.items.map((item, i) => (
                           <span key={i} className="text-2xl md:text-4xl font-light text-neutral-500 group-hover:text-white transition-colors duration-300">
                              {item}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
        </div>

      </div>
    </section>
  );
};
