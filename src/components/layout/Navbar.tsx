"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Story", href: "/story" },
  { name: "Work", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" }
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/amansrivastav", icon: <Github className="w-5 h-5" /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/amansrivastav", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Twitter", href: "https://twitter.com/amansrivastav", icon: <Twitter className="w-5 h-5" /> },
  { name: "Instagram", href: "https://instagram.com/amansrivastav", icon: <Instagram className="w-5 h-5" /> }
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- Top Bar --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-black/50 backdrop-blur-md border-white/5 py-4" : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="z-[101] relative group">
            <span className="text-lg md:text-2xl font-black tracking-widest text-white uppercase mix-blend-difference">
              AMAN<span className="text-cyan-500">.</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-6 z-[101]">
             {/* Resume Button (Desktop) */}
             <a 
               href="/aman-resume.pdf" 
               target="_blank" 
               className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 group"
             >
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Resume</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
             </a>

             {/* Menu Toggle */}
             <button 
               onClick={toggleMenu}
               className="flex items-center gap-3 group focus:outline-none"
             >
                <div className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-white mix-blend-difference">
                  {isOpen ? "Close" : "Menu"}
                </div>
                <div className="relative w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                   {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </div>
             </button>
          </div>

        </div>
      </motion.header>


      {/* --- Full Screen Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#050505] z-[90] flex flex-col justify-between pt-32 pb-12 px-6 md:px-24"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

            <div className="container mx-auto h-full flex flex-col md:flex-row justify-between relative z-10">
               
               {/* Left: Navigation Links */}
               <div className="flex flex-col justify-center space-y-2 md:space-y-4">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.5, delay: 0.1 + (i * 0.1) }}
                    >
                      <Link 
                        href={link.href} 
                        onClick={toggleMenu}
                        className="group flex items-center gap-4"
                      >
                         <span className="text-xs font-mono text-cyan-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                           0{i + 1}
                         </span>
                         <span className="text-5xl md:text-8xl font-serif font-black text-white/50 group-hover:text-white transition-colors duration-300 tracking-tight">
                           {link.name}
                         </span>
                      </Link>
                    </motion.div>
                  ))}
               </div>

               {/* Right: Info & Socials */}
               <div className="mt-12 md:mt-0 flex flex-col justify-end md:items-end">
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-8 text-right"
                  >
                     <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500">Contact</h4>
                        <a href="mailto:amansrivastav1203@gmail.com" className="block text-xl md:text-2xl font-light text-white hover:text-cyan-500 transition-colors">
                          amansrivastav1203@gmail.com
                        </a>
                     </div>

                     <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-500">Socials</h4>
                        <div className="flex gap-4 md:justify-end">
                           {socialLinks.map((s) => (
                              <a 
                                key={s.name} 
                                href={s.href} 
                                target="_blank"
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                              >
                                {s.icon}
                              </a>
                           ))}
                        </div>
                     </div>
                  </motion.div>

               </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
