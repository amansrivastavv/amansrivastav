"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const SignaturePreloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the preloader this session
    // const hasLoaded = sessionStorage.getItem("hasLoaded");
    const hasLoaded = false; // FORCE SHOW FOR DEBUGGING
    
    if (hasLoaded) {
      setLoading(false);
    } else {
      // Set a timer to dismiss the preloader after animation
      // Increased to match the new slower animation sequence (approx 7s)
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 7500); 
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999999] bg-[#030014] flex items-center justify-center flex-col"
        >
          {/* Noise Overlay for consistency */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />

          <svg
            width="500"
            height="250"
            viewBox="0 0 500 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[90vw] md:w-[500px]"
          >
            {/* 
               Professional "Aman" - Fast, aggressive cursive style
            */}
            <motion.path
              d="M50 150 C 60 120, 90 80, 100 70 C 110 60, 130 150, 120 180 C 110 210, 80 180, 90 150 C 100 120, 140 120, 160 120 C 180 120, 200 120, 220 150 C 230 170, 240 120, 260 120"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* 
               Professional "Srivastav" - Connected, flowing, with a distinct 'S'
            */}
            <motion.path
              d="M280 100 C 270 90, 260 110, 270 130 C 280 150, 310 150, 320 130 C 330 110, 340 130, 350 130 C 370 130, 380 110, 390 120 C 400 130, 410 130, 420 120 C 430 110, 440 130, 450 130"
              stroke="#06b6d4" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 3.0 }}
            />
            
            {/* The "Underline" / Flourish - Fast Swoosh */}
            <motion.path
              d="M40 200 C 100 190, 300 220, 480 160"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1, ease: "easeOut", delay: 5.5 }}
            />
          </svg>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 7.2, duration: 0.5 }}
            className="mt-8 flex gap-2"
          >
             <span className="w-1 h-1 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"/>
             <span className="w-1 h-1 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"/>
             <span className="w-1 h-1 rounded-full bg-cyan-500 animate-bounce"/>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
