"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
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
        <div className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.link || (pathname === "/" && item.link === "/#home");
            
            return (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all group",
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="desktop-nav-active"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
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
          
          <div className="w-px h-5 bg-white/10 mx-2" />
          
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-cyan-400 transition-colors">
            <span>RESUME</span>
            <FileText className="w-3 h-3" />
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
        <div className="flex items-center gap-1 p-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/50">
          {navItems.map((item, idx) => {
             const isActive = pathname === item.link || (pathname === "/" && item.link === "/#home");

             return (
              <Link
                key={idx}
                href={item.link}
                className={cn(
                  "relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all",
                  isActive ? "text-white" : "text-neutral-500 hover:text-cyan-400"
                )}
              >
                <span className="relative z-10">{item.icon}</span>
                {isActive && (
                  <motion.div 
                    layoutId="mobile-dock-active"
                    className="absolute inset-0 rounded-xl bg-white/10 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
