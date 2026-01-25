"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export const Footer = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
             setTime(new Date().toLocaleTimeString('en-US', { 
                 hour: '2-digit', 
                 minute: '2-digit', 
                 hour12: false 
             }));
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer 
            className="relative h-[80vh] md:h-[60vh] w-full" 
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="fixed bottom-0 h-[80vh] md:h-[60vh] w-full bg-[#0E0E0E] flex flex-col justify-between p-6 md:p-12">
                
                {/* Massive Animated Text in Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                    <div className="text-[30vw] font-black text-white leading-none tracking-tighter animate-pulse">
                        AMAN
                    </div>
                </div>

                {/* Content Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 w-full border-t border-white/10 pt-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
                            LET&apos;S WORK <br/> TOGETHER.
                        </h2>
                        <a href="mailto:amansrivastav1203@gmail.com" className="text-xl md:text-2xl text-neutral-400 hover:text-cyan-500 transition-colors">
                            amansrivastav1203@gmail.com
                        </a>
                    </div>
                    
                    <nav className="space-y-4" aria-label="Social links">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Socials</p>
                        <ul className="space-y-2 text-lg text-neutral-300">
                            <li><a href="https://linkedin.com/in/amansrivastav" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">LinkedIn</a></li>
                            <li><a href="https://github.com/amansrivastav" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">GitHub</a></li>
                            <li><a href="https://twitter.com/amansrivastav" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Twitter</a></li>
                            <li><a href="https://instagram.com/amansrivastav" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Instagram</a></li>
                        </ul>
                    </nav>
                    
                    <nav className="space-y-4" aria-label="Footer navigation">
                         <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Sitemap</p>
                         <ul className="space-y-2 text-lg text-neutral-300">
                            <li><Link href="/" className="hover:text-white">Home</Link></li>
                            <li><Link href="/projects" className="hover:text-white">Work</Link></li>
                            <li><Link href="/story" className="hover:text-white">Story</Link></li>
                            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom Bar */}
                <div className="relative z-10 flex justify-between items-end">
                     <div>
                        <p className="text-[100px] md:text-[8rem] font-bold text-white leading-[0.8]">
                            2026
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Local Time</p>
                        <p className="text-xl font-mono text-cyan-500 min-h-7">
                             {time}
                        </p>
                     </div>
                </div>

            </div>
        </footer>
    );
};
