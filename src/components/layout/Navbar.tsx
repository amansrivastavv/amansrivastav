"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Mail, Zap, FileText, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", link: "/#home", icon: <Home className="w-5 h-5" /> },
  { name: "Story", link: "/story", icon: <BookOpen className="w-5 h-5" /> },
  { name: "About", link: "/#about", icon: <User className="w-5 h-5" /> },
  { name: "Work", link: "/#projects", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Skills", link: "/#skills", icon: <Zap className="w-5 h-5" /> },
  { name: "Contact", link: "/#contact", icon: <Mail className="w-5 h-5" /> },
];

export const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar if scrolling up or at the very top
      if (currentScrollY < 10 || currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      
      {/* Desktop Top Pill */}
      <motion.nav
        key="desktop-navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -100, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 inset-x-0 mx-auto z-[5000] w-max hidden md:flex"
      >
        <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.link || (pathname === "/" && item.link === "/#home");
            
            return (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all group overflow-hidden",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="desktop-nav-active"
                    className="absolute inset-0 rounded-full bg-white/10 mix-blend-overlay border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </Link>
            );
          })}
          
          <div className="w-px h-4 bg-white/10 mx-2" />
          
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs tracking-widest hover:bg-cyan-200 transition-colors">
            <span>RESUME</span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Bottom Dock */}
      <motion.nav
        key="mobile-navbar"
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : 100, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 inset-x-0 mx-auto z-[5000] w-max md:hidden"
      >
        <div className="flex items-center gap-1 p-2 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-xl shadow-2xl">
          {navItems.map((item, idx) => {
             const isActive = pathname === item.link || (pathname === "/" && item.link === "/#home");

             return (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  "relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all",
                  isActive ? "text-white" : "text-neutral-500 hover:text-white"
                )}
              >
                <span className="relative z-10">{item.icon}</span>
                {isActive && (
                  <motion.div 
                    layoutId="mobile-dock-active"
                    className="absolute inset-0 rounded-xl bg-white/10 border border-white/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-cyan-500"
                  />
                )}
              </Link>
             );
          })}
        </div>
      </motion.nav>

    </AnimatePresence>
  );
};
