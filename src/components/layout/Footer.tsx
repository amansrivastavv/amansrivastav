"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.9, 1], [-100, 0]);

  return (
    <div className="relative w-full bg-[#050505] border-t border-white/5">
        <div className="flex flex-col justify-end pb-12">
             <div className="container mx-auto px-4 pt-32 relative">
                {/* Massive Brand - Background Logo */}
                {/* Massive Brand - Background Logo Removed */}

                <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24 relative z-20">
                
                {/* Brand Column */}
                <div className="lg:w-1/3 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tighter leading-none select-none">
                    AMAN SRIVASTAV
                    </h2>
                    <p className="text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
                    Crafting digital experiences that merge <span className="text-white">art</span> with <span className="text-white">functionality</span>. Building the web of tomorrow, one pixel at a time.
                    </p>
                    
                    <div className="flex gap-4">
                        {[
                        { name: "Github", link: "https://github.com/amansrivastavv", icon: Github },
                        { name: "LinkedIn", link: "https://www.linkedin.com/in/aman-kumar-srivastav-627ba1258/", icon: Linkedin },
                        { name: "Twitter", link: "#", icon: Twitter },
                        ].map((social, i) => (
                        <a 
                            key={i}
                            href={social.link} 
                            target="_blank" 
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500 hover:text-black hover:scale-110 transition-all duration-300"
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                        ))}
                    </div>
                </div>

                {/* Links Columns */}
                <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-4">Sitemap</h4>
                    <ul className="space-y-3">
                        {["Home", "Work", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="text-sm text-neutral-400 hover:text-white transition-colors block py-1 hover:translate-x-2 duration-300">{item}</a>
                        </li>
                        ))}
                    </ul>
                    </div>

                    <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-4">Legal</h4>
                    <ul className="space-y-3">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                        <li key={item}>
                            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors block py-1 hover:translate-x-2 duration-300">{item}</a>
                        </li>
                        ))}
                    </ul>
                    </div>
                    
                    <div className="col-span-2 md:col-span-2 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-4">Newsletter</h4>
                        <p className="text-xs text-neutral-500 mb-4">Subscribe to stay updated with my latest projects and insights.</p>
                        <div className="flex px-4 py-2 bg-zinc-900/50 rounded-full border border-white/5 focus-within:border-cyan-500/50 transition-colors">
                        <input 
                            type="email" 
                            placeholder="Enter email address" 
                            className="bg-transparent w-full text-sm text-white focus:outline-none placeholder:text-neutral-700"
                        />
                        <button className="text-white hover:text-cyan-500 transition-colors uppercase text-[10px] font-bold tracking-widest pl-4">Join</button>
                        </div>
                    </div>
                </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6 relative z-20">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                    © {new Date().getFullYear()} Aman Srivastav. All rights reserved.
                </p>
                
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                    Back to Top
                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:text-black transition-all">
                    <ArrowUp className="w-3 h-3" />
                    </span>
                </motion.button>
                </div>
            </div>
        </div>
    </div>
  );
};
