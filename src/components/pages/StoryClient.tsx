"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { ArrowDown, Linkedin, Github, Twitter, Instagram } from "lucide-react";
import Image from "next/image";

// Extended Timeline Data
const timeline = [
  {
    year: "2016",
    title: "The Foundation",
    role: "GVM & SVM Inter College",
    location: "Gorakhpur",
    description: "The early years defined by discipline. A quiet determination took root here, setting the stage for engineering excellence.",
    image: "/images/story/school.png",
    tech: ["Physics", "Mathematics", "Logic"],
    achievements: ["Academic Excellence", "Science Olympiad"],
    color: "from-cyan-900/20 to-transparent"
  },
  {
    year: "2023",
    title: "The Convocation",
    role: "B.Tech CSE • ITM GIDA",
    location: "Gorakhpur",
    description: "A defining milestone. Graduating with a Computer Science degree wasn't just a certificate—it was the culmination of four years of relentless coding and problem solving.",
    image: "/images/story/convocation.jpg",
    tech: ["C++", "Java", "DSA", "DBMS"],
    achievements: ["First Division", "Hackathon Finalist"],
    color: "from-cyan-800/20 to-transparent",
    isPortrait: true
  },
  {
    year: "2024",
    title: "First Leap",
    role: "Frontend Developer",
    location: "Gventure Technology",
    description: "Transitioning from theory to practice. Mastering pixel-perfect UIs and shipping production-grade software in a fast-paced environment.",
    image: "/images/story/gventure.png",
    tech: ["React.js", "Redux", "Material UI", "Git"],
    achievements: ["Reduced Load Time", "Built Design System"],
    color: "from-cyan-700/20 to-transparent"
  },
  {
    year: "2024-25",
    title: "Evolution",
    role: "Software Developer",
    location: "RTF Insurance",
    description: "Scaling up. Managing complex data flows and secure financial systems. A chapter of responsibility, precision, and architectural growth.",
    image: "/images/story/rtf.png",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    achievements: ["Secure Auth Implementation", "Real-time Dashboard"],
    color: "from-cyan-600/20 to-transparent"
  },
  {
    year: "Now",
    title: "The Edge",
    role: "Building the Future",
    location: "Oaky Web",
    description: "Pushing boundaries. Working at the intersection of performance and aesthetics. Building digital products that inspire and convert.",
    image: "/images/story/oaky.png",
    tech: ["Next.js 14", "Framer Motion", "GSAP", "Tailwind"],
    achievements: ["Creative Developer", "Performance Focused"],
    color: "from-cyan-500/20 to-transparent"
  }
];

const TimelineItem = ({ item, index }: { item: typeof timeline[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y_num = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-16 md:py-24 border-l-0 md:border-l border-white/10 md:ml-0 md:pl-0 relative"
    >
       {/* Sticky Year marker for Desktop */}
       <div className="hidden md:block md:col-span-2 relative">
          <div className="sticky top-1/2 -translate-y-1/2 text-right pr-8 border-r border-white/10 h-full max-h-[200px] flex flex-col justify-center">
             <motion.span style={{ y: y_num }} className="text-6xl font-black text-white/20 absolute right-4 top-1/2 -translate-y-1/2 select-none">
                {index + 1}
             </motion.span>
             <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500 relative z-10">
                {item.year}
             </span>
          </div>
          {/* Dot on the timeline spine */}
          <div className="absolute top-1/2 right-[-5px] w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] -translate-y-1/2 hidden md:block" />
       </div>

       {/* Mobile Year Banner */}
       <div className="md:hidden flex flex-col items-center justify-center gap-2 mb-8 sticky top-20 z-20 mix-blend-difference">
          <span className="text-4xl font-black text-white/20">0{index + 1}</span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500 bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
             {item.year}
          </span>
       </div>

       {/* Content */}
       <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6 order-2 md:order-1 text-center md:text-left">
             <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-white">
                   {item.title}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-400">
                   <span className="w-1 h-1 rounded-full bg-neutral-600" />
                   <p className="text-sm uppercase tracking-widest">{item.role}</p>
                </div>
             </div>

             <p className="text-neutral-400 leading-relaxed font-light text-lg">
                {item.description}
             </p>

             {/* Tech & Achievements */}
             <div className="space-y-6">
                 <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {item.tech.map(t => (
                       <span key={t} className="px-3 py-1 text-[10px] uppercase tracking-wider border border-white/5 bg-white/[0.02] text-neutral-400 rounded-full">
                          {t}
                       </span>
                    ))}
                 </div>
                 
                 <div className="space-y-3 pt-4 border-t border-white/5 inline-block md:block w-full">
                    {item.achievements.map(ach => (
                       <div key={ach} className="flex items-center justify-center md:justify-start gap-3 text-sm text-neutral-300 font-light">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-900" />
                          {ach}
                       </div>
                    ))}
                 </div>
             </div>
          </div>

          {/* Image */}
          <motion.div 
            style={{ y }}
            className="relative aspect-[4/5] md:aspect-square rounded-sm overflow-hidden group order-1 md:order-2 w-full max-w-sm mx-auto md:max-w-none"
          >
             <div className="absolute inset-0 bg-neutral-900 group-hover:bg-transparent transition-colors duration-700 z-10 opacity-20" />
             <Image 
               src={item.image} 
               alt={item.title}
               fill
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
             />
             <div className="absolute inset-0 border border-white/5 z-20 pointer-events-none" />
          </motion.div>

       </div>
    </motion.div>
  );
};

export function StoryClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-[#020202] relative min-h-screen w-full flex flex-col items-center selection:bg-cyan-500/30">

      
      {/* Cinematic Hero */}
      <motion.header 
        style={{ y: heroY, opacity: heroOpacity }}
        className="w-full h-[80vh] flex flex-col items-center justify-center relative overflow-hidden"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-neutral-900/20 via-[#020202] to-[#020202]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

         <div className="relative z-10 text-center space-y-8 px-4">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="inline-block"
             >
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-500">
                   02 . The Journey
                </span>
             </motion.div>

             <h1 className="text-5xl md:text-8xl font-serif font-medium text-white tracking-tight">
               MY <span className="text-neutral-600 italic">PROFESSIONAL</span><br/>
               STORY & <span className="text-cyan-500">JOURNEY.</span>
             </h1>
         </div>

         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12"
         >
            <ArrowDown className="w-5 h-5 text-neutral-600 animate-bounce" />
         </motion.div>
      {/* HERO END */}
      </motion.header>

      {/* --- WHO IS AMAN SECTION --- */}
      <section className="relative z-20 w-full bg-[#020202] container mx-auto px-6 md:px-12 py-24 lg:py-40 max-w-7xl space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* Left: Portrait Profile */}
              <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative w-full max-w-md mx-auto lg:max-w-none aspect-3/4 lg:aspect-square"
              >
                  <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 lg:translate-x-8 lg:translate-y-8 z-0" />
                  <div className="absolute inset-0 bg-neutral-900 overflow-hidden z-10 grayscale hover:grayscale-0 transition-all duration-700">
                      <Image 
                          src="/images/story/Aman_Srivastav.jpeg" // Ensure you have this image or change path
                          alt="Aman Srivastav Portrait" 
                          fill 
                          className="object-contain"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      {/* Name Tag on Image */}
                      <div className="absolute bottom-6 left-6 z-20">
                          <h3 className="text-3xl font-serif text-white leading-none">Aman Srivastav</h3>
                          <p className="text-xs uppercase tracking-[0.2em] text-cyan-500 mt-2">Software Engineer</p>
                      </div>
                  </div>
              </motion.div>


              {/* Right: Bio & Info */}
              <div className="space-y-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                      <div className="flex items-center gap-4 mb-6">
                          <span className="h-px w-12 bg-cyan-500" />
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Software Engineer</span>
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                          Aman Srivastav
                      </h2>
                      <p className="text-xl text-neutral-400 font-light mb-8">
                          Frontend Engineering & Interactive Design
                      </p>

                      <div className="space-y-6 text-neutral-400 font-light text-lg leading-relaxed">
                          <p>
                              I am a <strong>Software Engineer</strong> based in <strong>Noida, India</strong>, with over <strong>2 years of production experience</strong>. My work bridges the gap between functional logic and immersive user interfaces.
                          </p>
                          <p>
                             My engineering philosophy is grounded in <strong>component architecture</strong> and <strong>performance-first principles</strong>. I specialize in developing <strong>high-performance web applications</strong> that are responsive, accessible, and engaging.
                          </p>
                      </div>
                  </motion.div>

                  {/* QUICK STATS / INFO GRID */}
                  <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8"
                  >
                      <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Location</h4>
                          <p className="text-white text-sm font-medium">Noida, Uttar Pradesh</p>
                      </div>
                      <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Experience</h4>
                          <p className="text-white text-sm font-medium">2+ Years (Production)</p>
                      </div>
                      <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Email</h4>
                          <a href="mailto:amansrivastav1203@gmail.com" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                              amansrivastav1203...
                          </a>
                      </div>
                      <div>
                          <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Availability</h4>
                          <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              Open for Work
                          </span>
                      </div>

                      {/* Social Connect */}
                      <div className="col-span-2 pt-8 mt-4 border-t border-white/10">
                           <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4">Connect</h4>
                           <div className="flex items-center gap-6">
                               <a href="https://www.linkedin.com/in/aman-kumar-srivastav-627ba1258" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                                   <Linkedin className="w-5 h-5" />
                               </a>
                               <a href="https://github.com/amansrivastavv" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                                   <Github className="w-5 h-5" />
                               </a>
                               <a href="https://x.com/amansrivastavv" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                                   <Twitter className="w-5 h-5" />
                               </a>
                               <a href="https://www.instagram.com/amansrivastav" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                                   <Instagram className="w-5 h-5" />
                               </a>
                           </div>
                      </div>
                  </motion.div>
              </div>

          </div>
      </section>

      {/* Timeline Section Start */}
      <section ref={containerRef} className="relative z-40 bg-[#020202] mt-48 w-full container mx-auto px-6 md:px-12 pb-32 max-w-6xl">
         {timeline.map((item, i) => (
           <TimelineItem key={i} item={item} index={i} />
         ))}
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-cyan-900/5 pointer-events-none" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
             >
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-600">
                  What&apos;s Next?
                </p>
                <h2 className="text-5xl md:text-8xl font-serif font-black text-white mix-blend-difference tracking-tight">
                  <span className="block text-neutral-800">The Story</span>
                  <span className="block mt-2">Continues With You.</span>
                </h2>
                
                <div className="pt-8">
                   <a 
                     href="/contact" 
                     className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 group"
                   >
                      <span className="text-xs font-bold uppercase tracking-widest">Start a Project</span>
                      <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                   </a>
                </div>
             </motion.div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
