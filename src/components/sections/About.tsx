"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="relative bg-[#020202] text-white py-32 md:py-64 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          {/* Left: Sticky Editorial Image */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 self-start">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="relative aspect-3/4 md:aspect-4/5 w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
             >
                <Image 
                  src="/images/about/workspace.png" 
                  alt="Aman Srivastav - Editorial Portrait" 
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
             </motion.div>
             <div className="mt-8 flex justify-between items-end border-t border-white/20 pt-8">
                <div>
                   <p className="text-xs uppercase tracking-[0.2em] mb-1">Based in</p>
                   <p className="font-serif text-2xl">Noida, India</p>
                </div>
                 <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-1">Role</p>
                    <p className="font-serif text-2xl">Software Engineer</p>
                 </div>
              </div>
           </div>
 
           {/* Right: Scrolling Editorial Content */}
           <div className="lg:w-1/2 lg:pt-32 flex flex-col justify-center min-h-[50vh]">
              
              <div className="relative mb-12">
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-cyan-500 mb-6 block">Biography</span>
                 <h2 className="text-4xl md:text-7xl font-serif font-black leading-[0.9] mb-8">
                    SOFTWARE <br /> <span className="text-neutral-500">ENGINEERING</span>
                 </h2>
                 <div className="space-y-6 text-lg md:text-xl font-light text-neutral-300 leading-relaxed max-w-xl">
                    <p>
                       I am a Software Engineer based in Noida, India. I possess over two years of professional experience in developing scalable web applications. My career focuses on technical excellence and real-world results. I move beyond simple code to build systems that solve complex business challenges. These systems deliver seamless user experiences across all major digital platforms.
                    </p>
                    <p>
                       My engineering approach combines rigorous architectural planning with modern development practices. I specialize in building high-performance, secure, and accessible applications. My core technologies include React, Next.js, and Node.js. Every technical decision prioritizes maintainability and system stability. I create intuitive interfaces that bridge the gap between complex logic and human interaction.
                    </p>
                 </div>
              </div>
 
              <a 
                href="/story"
                className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-cyan-500 transition-colors"
                aria-label="Read the full story of Aman Srivastav"
              >
                <span>Read Full Biography</span>
                <div className="w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-cyan-500 transition-all duration-300" />
              </a>

          </div>
        </div>
      </div>
    </section>
  );
};
