"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden selection:bg-red-500/30">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      {/* Red/Cyan Aberration Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />

      <div className="relative z-10 text-center space-y-12 px-6">
        
        {/* The 404 Glitch */}
        <div className="relative inline-block">
            <h1 className="text-[12rem] md:text-[20rem] font-black leading-none text-white/5 select-none font-serif tracking-tighter">
                404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    className="text-2xl md:text-4xl font-mono text-red-500 font-bold uppercase tracking-[0.5em] bg-black px-4"
                >
                    System_Failure
                </motion.span>
            </div>
        </div>

        {/* Narrative */}
        <div className="space-y-4 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 text-red-500/80 mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Signal Lost</span>
            </div>
            <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed">
                The coordinates you are looking for do not exist in this sector.
                You have drifted into the void.
            </p>
        </div>

        {/* Action */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            <Link 
                href="/"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Return to Base</span>
            </Link>
        </motion.div>

      </div>

      {/* Footer Meta */}
      <div className="absolute bottom-12 text-center w-full">
         <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Error Code: ID_10_T</p>
      </div>

    </main>
  );
}
