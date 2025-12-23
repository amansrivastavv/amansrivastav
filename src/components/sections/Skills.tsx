"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, Braces, Palette, Zap, Cpu, Terminal, Layers, Search } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Braces className="w-5 h-5 text-cyan-500" />,
    skills: [
      { name: "React / Next.js", level: 98, tags: ["SSR", "Hooks"] },
      { name: "Tailwind CSS", level: 98, tags: ["Design Systems"] },
      { name: "Three.js / GSAP", level: 90, tags: ["WebGL", "Animations"] },
      { name: "Angular", level: 85, tags: ["Enterprise"] }
    ],
    className: "md:col-span-2"
  },
  {
    title: "Backend & Cloud",
    icon: <Cpu className="w-5 h-5 text-orange-500" />,
    skills: [
      { name: "Node.js / Express", level: 92, tags: ["API", "Microservices"] },
      { name: "AWS (EC2, S3)", level: 85, tags: ["Cloud", "IAM"] },
      { name: "SQL / MySQL", level: 88, tags: ["Database"] },
      { name: "MongoDB", level: 90, tags: ["NoSQL"] }
    ],
    className: "md:col-span-1"
  },
  {
    title: "DevOps & Tools",
    icon: <Terminal className="w-5 h-5 text-violet-500" />,
    skills: [
      { name: "Git / GitHub", level: 95, tags: ["CI/CD"] },
      { name: "Docker / Vercel", level: 88, tags: ["Containerization"] },
      { name: "Linux / cPanel", level: 85, tags: ["Server Mgmt"] },
      { name: "Jira / Bitbucket", level: 90, tags: ["Agile"] }
    ],
    className: "md:col-span-1"
  },
  {
    title: "Design Engineering",
    icon: <Palette className="w-5 h-5 text-emerald-500" />,
    skills: [
      { name: "Figma", level: 92, tags: ["Prototyping"] },
      { name: "Photoshop", level: 85, tags: ["Editing"] },
      { name: "UI Architecture", level: 94, tags: ["Systems"] }
    ],
    className: "md:col-span-2"
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-32 relative bg-[#030014] overflow-hidden">
      {/* Background Depth */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <span className="text-cyan-500 font-bold tracking-[0.5em] text-[10px] uppercase mb-4">Architecture</span>
          <h2 className="text-4xl md:text-9xl font-serif font-black text-white italic">
            TECHNICAL <span className="text-white/10 not-italic">DNA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative p-6 md:p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-cyan-500/20 transition-all duration-700",
                category.className
              )}
            >
              <div className="absolute top-8 right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                {category.icon}
              </div>

              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white italic">{category.title}</h3>
              </div>

              <div className="space-y-10">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold tracking-widest text-neutral-400 group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-[10px] font-black text-cyan-500/50">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.level / 100 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        style={{ originX: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side Label Detail */}
      <div className="absolute bottom-32 left-12 hidden xl:block opacity-10">
        <p className="text-[10px] font-black uppercase tracking-[1em] -rotate-90 origin-left">PERFORMANCE FIRST</p>
      </div>
    </section>
  );
};
