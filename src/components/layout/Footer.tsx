"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/amansrivastav" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/amansrivastav" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/amansrivastav" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/amansrivastav" },
  ];

  const pages = [
    { name: "Home", href: "/" },
    { name: "The Work", href: "/projects" },
    { name: "The Story", href: "/story" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#020202] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Section: Big CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24 border-b border-white/10 pb-24">
            <div className="space-y-6">
                <h2 className="text-5xl md:text-8xl font-serif font-medium tracking-tight">
                    Have an idea?
                </h2>
                <a href="mailto:amansrivastav1203@gmail.com" className="inline-flex items-center gap-4 text-xl md:text-2xl text-neutral-400 hover:text-cyan-500 transition-colors group">
                    <span className="border-b border-white/20 group-hover:border-cyan-500 pb-1">amansrivastav1203@gmail.com</span>
                    <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
            </div>

            <div className="flex flex-col justify-end items-start md:items-end text-left md:text-right space-y-4">
                 <p className="text-neutral-500 max-w-sm text-lg leading-relaxed">
                    Building digital products that blend architectural precision with cinematic motion.
                 </p>
                 <button 
                    onClick={scrollToTop}
                    className="group flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-500 hover:text-white transition-colors mt-4"
                 >
                    Back to Top
                    <div className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                        <ArrowUp className="w-4 h-4" />
                    </div>
                 </button>
            </div>
        </div>

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            
            {/* Pages */}
            <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6">Sitemap</h4>
                <ul className="space-y-4">
                    {pages.map((page) => (
                        <li key={page.name}>
                            <a href={page.href} className="text-lg text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-cyan-500 transition-colors" />
                                {page.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Socials */}
            <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6">Connect</h4>
                <ul className="space-y-4">
                    {socialLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-lg text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group">
                                <link.icon className="w-4 h-4 text-neutral-500 group-hover:text-cyan-500 transition-colors" />
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 col-span-2 md:col-span-1">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6">Studio</h4>
                <div className="space-y-4 text-neutral-400">
                    <p>Noida, India</p>
                    <p>Open for opportunities</p>
                    <p className="text-cyan-500">Available: March 2026</p>
                </div>
            </div>

             {/* Brand Watermark (Mobile Only / Small Desktop) */}
             <div className="col-span-2 md:col-span-1 flex items-end justify-start md:justify-end">
                <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-widest text-neutral-600 mb-2">Designed & Built By</span>
                    <span className="font-serif text-2xl text-white">Aman Srivastav</span>
                </div>
             </div>

        </div>

        {/* Bottom Bar: Massive Watermark & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6 md:gap-0">
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-black text-white/5 select-none absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap">
                SRIVASTAV
            </h1>
            
            <p className="text-xs text-neutral-600 uppercase tracking-widest relative z-10">
                © {new Date().getFullYear()} Aman Srivastav. All Rights Reserved.
            </p>

            <div className="flex gap-8 relative z-10">
                <a href="#" className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest transition-colors">Privacy</a>
                <a href="#" className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest transition-colors">Terms</a>
            </div>
        </div>

      </div>
    </footer>
  );
};
