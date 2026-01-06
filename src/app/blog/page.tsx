"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main className="bg-[#020202] relative min-h-screen selection:bg-cyan-500/30">
      <Navbar />
      
      {/* Cinematic Hero */}
      <motion.header 
        style={{ y }}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-[#020202] to-[#020202] opacity-50" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />

         <div className="relative z-10 text-center space-y-8 px-4">
             
             {/* Tag */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="inline-flex items-center gap-2 px-4 py-2"
             >
                <div className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400">03 . Blog</span>
             </motion.div>

             {/* Headline */}
             <h1 className="text-6xl md:text-9xl font-serif font-black text-white mix-blend-difference tracking-tighter">
               <span className="block overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Words
                  </motion.span>
               </span>
               <span className="block overflow-hidden text-neutral-600 italic">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Unspoken
                  </motion.span>
               </span>
             </h1>

             {/* Description */}
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.4 }}
               className="text-neutral-500 max-w-md mx-auto font-light leading-relaxed"
             >
               Articles on Design Systems, React Architecture, and the psychology of User Experience.
               <br/>
               <span className="text-white/50">Coming Soon.</span>
             </motion.p>
             
             {/* Back Button */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.6 }}
               className="pt-8"
             >
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back Home
                </Link>
             </motion.div>

         </div>
      </motion.header>

      <Footer />
    </main>
  );
}
