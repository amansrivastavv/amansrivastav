"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PremiumPreloader = () => {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Check session storage
    // const hasLoaded = sessionStorage.getItem("hasLoaded");
    const hasLoaded = false; // FORCE SHOW FOR VERIFY
    // const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (hasLoaded) {
      setComplete(true);
      return;
    }

    // Counter Logic
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.ceil(Math.random() * 5); 
      current = Math.min(current + increment, 100);
      setPercent(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => {
            setComplete(true);
            sessionStorage.setItem("hasLoaded", "true");
        }, 800);
      }
    }, 50); // Faster updates as requested

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }} // Slower, elegant fade out
          className="fixed inset-0 z-[999999] bg-[#0c0c0c] flex items-center justify-center overflow-hidden"
        >
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            {/* 
                TRUE MILKIN STYLE:
                1. Centered Percentage (Small, Clean Sans) -> Fixed width container to prevent jitter
                2. Rotating Text Ring surrounding it -> Slower rotation
            */}
            <div className="relative flex items-center justify-center">
                
                {/* The Percentage - Fixed width to prevent number jumping */}
                <div className="relative z-10 w-24 text-center">
                    <span className="text-sm md:text-base font-medium text-white/90 tracking-widest font-sans">
                        {percent}%
                    </span>
                </div>

                {/* The Rotating Ring - Slower, Classy */}
                <motion.div
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }} // 20s rotation for elegance
                >
                    <svg width="180" height="180" viewBox="0 0 160 160" className="w-40 h-40 md:w-48 md:h-48">
                        <defs>
                            <path id="circlePath" d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
                        </defs>
                        <text fill="#ffffff" fontSize="10" fontWeight="500" letterSpacing="0.18em" className="font-sans opacity-60 uppercase">
                            <textPath href="#circlePath" startOffset="0%">
                                Aman Srivastav  •  Creative Developer  •
                            </textPath>
                        </text>
                    </svg>
                </motion.div>

            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
