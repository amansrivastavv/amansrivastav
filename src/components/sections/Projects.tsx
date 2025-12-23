"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { CinematicImage } from "@/components/ui/CinematicImage";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Decor 31",
    subtitle: "Interior E-Commerce",
    description: "A luxury shopping experience for home decor with high-end filtering and seamless transitions.",
    number: "01",
    tags: ["Next.js", "GSAP", "Stripe"],
    metrics: ["30% Speed Increase", "Mobile First", "Premium UX"],
    link: "#",
    color: "from-cyan-500 to-blue-600",
    image: "/images/projects/decor31.png"
  },
  {
    title: "ShadiGlam",
    subtitle: "Wedding Exhibition",
    description: "Premium wedding planning platform connecting couples with world-class vendors.",
    number: "02",
    tags: ["React", "Motion", "Tailwind"],
    metrics: ["Global Reach", "Vendor CRM", "High Conversion"],
    link: "#",
    color: "from-violet-500 to-purple-600",
    image: "/images/projects/shadiglam.png"
  },
  {
    title: "Excellence",
    subtitle: "Design Systems",
    description: "Architecting scalable web components for global product teams and design systems.",
    number: "03",
    tags: ["TypeScript", "Radix UI", "A11y"],
    metrics: ["Atomic Design", "Scalable Architecture", "99% A11y"],
    link: "#",
    color: "from-emerald-500 to-teal-600",
    image: "/images/projects/excellence.png"
  },
  {
    title: "Apollo",
    subtitle: "Bio-intelligent Solutions",
    description: "Empowering modern agriculture with bio-intelligent crop protection and soil regeneration technologies.",
    number: "04",
    tags: ["Next.js", "WebGL", "Analytics"],
    metrics: ["Yield Optimization", "Soil Health", "Sustainability"],
    link: "https://demo.nuovasoft.in/Apollo/",
    color: "from-orange-500 to-amber-600",
    image: "/images/projects/apollo.png"
  },
  {
    title: "Ivtpl",
    subtitle: "Smart City Traffic",
    description: "A comprehensive urban mobility platform optimizing traffic flow through real-time sensor integration.",
    number: "05",
    tags: ["React", "D3.js", "IoT"],
    metrics: ["Real-time Monitoring", "Smart Infrastructure", "Collision Prev."],
    link: "https://demo.nuovasoft.in/Ivtpl/",
    color: "from-blue-600 to-indigo-800",
    image: "/images/projects/ivtpl.png"
  },
  {
    title: "MakeupAura",
    subtitle: "Premium Beauty",
    description: "A curated platform simplifying the discovery and booking of professional makeup artists for luxury events.",
    number: "06",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    metrics: ["Artist Management", "Booking System", "Expert Curation"],
    link: "https://makeupaura.com/",
    color: "from-pink-500 to-rose-600",
    image: "/images/projects/makeupaura.png"
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect prevents flicker and ensures DOM is ready before we measure
  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Ensure we have valid elements
      if (!containerRef.current || !sectionRef.current || !progressRef.current) return;

      const setupAnimation = () => {
        const totalWidth = containerRef.current!.scrollWidth;
        const windowWidth = window.innerWidth;
        
        // If content fits in viewport (unlikely but possible on huge screens), no scroll needed
        if (totalWidth <= windowWidth) return;

        const scrollDistance = totalWidth - windowWidth;

        // Main horizontal animation
        gsap.to(containerRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            // Use function based values to support resizing better
            start: "top top",
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            anticipatePin: 1, // Helps with smoother pinning
          },
        });

        // Progress bar animation
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
          },
        });
      };

      // Initial setup
      setupAnimation();
      
      // Refresh ScrollTrigger to ensure all positions are correct
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-screen bg-[#030014] overflow-hidden flex flex-col justify-center">
      {/* Background Detail */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Static Header - Now part of the flow but still absolute to stay fixed relative to viewport if needed, 
          BUT users often prefer it to scroll away or stay pinned. 
          Let's make it fixed but non-overlapping by adding padding to the container or adjusting z-index.
          For this design, let's keep it fixed but ensure the cards don't overlap it by adding top margin to the scroller
          OR we can make the text part of the scroll but pinned.
          
          Simplified approach: Fixed header, but ensure cards are centered vertically and don't touch top.
      */}
      <div className="absolute top-12 left-8 md:left-24 z-20 pointer-events-none">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-px bg-cyan-500" />
          <span className="text-cyan-500 font-bold tracking-[0.4em] text-[10px] uppercase">Selected Works</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight">
          VISUAL <br /> <span className="text-white/10 italic">ARCHIVE</span>
        </h2>
      </div>

      {/* Projects Scroller */}
      <div 
        ref={containerRef} 
        className="flex h-screen items-center px-[10vw] gap-[8vw] will-change-transform"
      >
        {/* Spacer for the Title */}
        <div className="flex-shrink-0 w-[20vw] md:w-[30vw]" />

        {projects.map((project, i) => (
          <motion.div
            key={i}
            data-cursor="view"
            className="relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] group"
          >
            {/* Project Card */}
            <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-xl group-hover:border-white/30 transition-all duration-700 shadow-2xl shadow-black/50">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <CinematicImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out"
                  containerClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-transparent" />
              </div>

              <div className={cn(
                "absolute -inset-1 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-xl",
                project.color
              )} />

              <div className="absolute top-8 right-8 text-[8vw] md:text-[6vw] font-serif font-black text-white/[0.05] pointer-events-none z-10">
                {project.number}
              </div>

              <div className="relative z-20 flex flex-col h-full justify-between p-8 md:p-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif font-black text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed max-w-md line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-4">
                     <div className="flex flex-wrap gap-2">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-500" />
                          <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">{metric}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex gap-3">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-black uppercase tracking-[0.15em] text-white/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {/* End Spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-8 left-8 right-8 md:left-24 md:right-24 h-[1px] bg-white/10">
        <div 
          ref={progressRef}
          className="h-[2px] -mt-[0.5px] bg-cyan-500 origin-left scale-x-0 relative relative shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
      </div>
    </section>
  );
};
