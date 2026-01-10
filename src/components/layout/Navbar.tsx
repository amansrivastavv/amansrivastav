"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Configuration ---
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Story", href: "/story" },
  { name: "Work", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/amansrivastav", icon: <Github className="w-5 h-5" /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/amansrivastav", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Twitter", href: "https://twitter.com/amansrivastav", icon: <Twitter className="w-5 h-5" /> },
  { name: "Instagram", href: "https://instagram.com/amansrivastav", icon: <Instagram className="w-5 h-5" /> },
];

// --- Components ---

/** 
 * Magnetic Effect Component
 * Pulls the element towards the cursor on hover
 */
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  
  const smoothX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.5); // Tune intensity
    position.y.set(middleY * 0.5);
  };

  const handleMouseLeave = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Hamburger Animation Variants
  const lineVariants = {
    closed: { rotate: 0, y: 0, opacity: 1 },
    opened: (custom: number) => ({
      rotate: custom === 1 ? 45 : -45,
      y: custom === 1 ? 6 : -6,
      opacity: custom === 2 ? 0 : 1, // Hide middle line
    }),
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-all duration-500 ease-in-out font-sans",
          scrolled || isOpen ? "py-4 bg-black/50 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
        )}
      >
        <div className="w-full max-w-[95vw] md:max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link 
            href="/" 
            className="relative z-[101] group flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors uppercase leading-none">
                AMAN<span className="text-cyan-500">.</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] text-neutral-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1 transform translate-y-2 group-hover:translate-y-0">
                PORTFOLIO
              </span>
            </div>
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-6 relative z-[101]">
            <Magnetic>
              <a
                href="/aman-resume.pdf"
                target="_blank"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 group backdrop-blur-sm"
              >
                <span className="text-xs font-bold tracking-widest uppercase">Resume</span>
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Magnetic>

            {/* HAMBURGER BUTTON */}
            <Magnetic>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all duration-300"
              >
                <div className="flex flex-col gap-[5px] items-center justify-center w-6 overflow-hidden">
                    {/* Top Line */}
                    <motion.span 
                        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="w-6 h-[2px] bg-current block origin-center transition-transform"
                    />
                    {/* Middle Line */}
                    <motion.span 
                        animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                        className="w-6 h-[2px] bg-current block transition-all"
                    />
                    {/* Bottom Line */}
                    <motion.span 
                        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="w-6 h-[2px] bg-current block origin-center transition-transform"
                    />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      {/* FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0A0A0A] z-[90] flex flex-col justify-center items-center overflow-hidden"
          >
             {/* Background decoration */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 h-full py-24 md:py-32 items-center">
              
              {/* NAVIGATION LINKS */}
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-8 ml-1">Navigation</p>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-6"
                    >
                      <span className="text-base text-neutral-500 font-mono group-hover:text-cyan-500 transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-5xl md:text-7xl lg:text-8xl font-black text-white/40 group-hover:text-white transition-all duration-300 md:group-hover:translate-x-4">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CONTACT & SOCIALS */}
              <div className="flex flex-col justify-between h-full max-h-[400px]">
                <div className="space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Get in touch</p>
                        <a 
                            href="mailto:amansrivastav1203@gmail.com"
                            className="text-2xl md:text-3xl text-white font-medium hover:text-cyan-400 transition-colors border-b border-white/20 pb-1 inline-block"
                        >
                            amansrivastav1203@gmail.com
                        </a>
                    </motion.div>

                    <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.6 }}
                         className="space-y-4"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Connect</p>
                        <div className="flex gap-4">
                            {socialLinks.map((s, idx) => (
                                <Magnetic key={idx}>
                                    <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                    {s.icon}
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-auto"
                >
                    <p className="text-neutral-600 text-sm">
                        &copy; {new Date().getFullYear()} Aman Srivastav. <br />
                        Made with love & code.
                    </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
