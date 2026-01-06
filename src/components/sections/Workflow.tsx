"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScanSearch, PencilRuler, Binary, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    subtitle: "The Vision",
    description: "We strip away the noise. We dive deep into the core objectives, understanding not just what we're building, but why it matters.",
    icon: <ScanSearch className="w-12 h-12 md:w-24 md:h-24 text-blue-500" />,
    color: "text-blue-500"
  },
  {
    id: "02",
    title: "Architecture",
    subtitle: "The Skeleton",
    description: "Planning the DNA of the application. Scalable patterns, robust databases, and a component hierarchy designed for growth.",
    icon: <PencilRuler className="w-12 h-12 md:w-24 md:h-24 text-amber-500" />,
    color: "text-amber-500"
  },
  {
    id: "03",
    title: "Development",
    subtitle: "The Craft",
    description: "Writing code that feels like poetry. Obsessing over 60fps animations, pixel-perfect layouts, and type-safety.",
    icon: <Binary className="w-12 h-12 md:w-24 md:h-24 text-cyan-500" />,
    color: "text-cyan-500"
  },
  {
    id: "04",
    title: "Launch",
    subtitle: "The Ignition",
    description: "Global deployment on the Edge. We optimize for speed, SEO, and accessibility, ensuring your vision reaches the world instantly.",
    icon: <Rocket className="w-12 h-12 md:w-24 md:h-24 text-green-500" />,
    color: "text-green-500"
  }
];

const Step = ({ step, index }: { step: typeof steps[0], index: number }) => {
    return (
        <div className="min-h-screen flex items-center justify-center sticky top-0 bg-[#020202] border-t border-white/5">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    
                    {/* Left: Typography */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-[10vw] md:text-8xl font-black text-white/5 font-serif select-none">
                                {step.id}
                            </span>
                            <div className={`h-px w-24 ${step.color.replace('text', 'bg')}`} />
                            <span className={`font-mono text-sm uppercase tracking-[0.3em] ${step.color}`}>
                                {step.subtitle}
                            </span>
                        </div>
                        
                        <h2 className="text-5xl md:text-8xl font-serif font-medium text-white leading-tight">
                            {step.title}
                        </h2>

                        <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-lg">
                            {step.description}
                        </p>
                    </motion.div>

                    {/* Right: Icon / Visual */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center md:justify-end"
                    >
                        <div className="relative w-48 h-48 md:w-96 md:h-96 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]">
                            <div className={`absolute inset-0 rounded-full border border-dashed opacity-20 animate-[spin_60s_linear_infinite] ${step.color.replace('text', 'border')}`} />
                            <div className={`absolute inset-4 rounded-full border border-white/5 animate-[pulse_4s_infinite]`} />
                            
                            {/* Icon */}
                            <div className="relative z-10">
                                {step.icon}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export const Workflow = () => {
  return (
    <section className="relative bg-[#020202]">
      {steps.map((step, i) => (
        <Step key={i} step={step} index={i} />
      ))}
    </section>
  );
};
