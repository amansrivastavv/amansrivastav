"use client";

import React from "react";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-[18vw] md:text-9xl font-serif font-black text-white/5 tracking-tighter leading-none select-none">
              AMAN
            </h2>
            <p className="text-xl text-neutral-400 font-light max-w-md">
              Crafting digital experiences that merge <span className="text-white">art</span> with <span className="text-white">functionality</span>.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-8">Sitemap</h4>
            <ul className="space-y-4">
              {["Home", "Work", "About", "Skills", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-6">
             <h4 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-500 mb-8">Socials</h4>
             <ul className="space-y-4">
                {[
                  { name: "Github", link: "https://github.com/amansrivastavv" },
                  { name: "LinkedIn", link: "https://www.linkedin.com/in/aman-kumar-srivastav-627ba1258/" },
                  { name: "Twitter", link: "#" },
                  { name: "Instagram", link: "#" }
                ].map((social) => (
                  <li key={social.name}>
                    <a 
                      href={social.link} 
                      target="_blank" 
                      className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wider flex items-center gap-2 group"
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0" />
                    </a>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">
          <p className="text-xs text-neutral-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Aman Srivastav. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-neutral-600 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
