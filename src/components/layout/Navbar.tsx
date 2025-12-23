"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Zap, FileText } from "lucide-react";

const navItems = [
  { name: "Home", link: "/#home", icon: <Home className="w-4 h-4" /> },
  { name: "Story", link: "/story", icon: <User className="w-4 h-4" /> },
  { name: "About", link: "/#about", icon: <User className="w-4 h-4" /> },
  { name: "Work", link: "/#projects", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Skills", link: "/#skills", icon: <Zap className="w-4 h-4" /> },
  { name: "Contact", link: "/#contact", icon: <Mail className="w-4 h-4" /> },
];

export const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -100, 
          opacity: visible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 inset-x-0 mx-auto z-[5000] w-max"
      >
        <div className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl">
          {/* Mobile Icon Only / Desktop Text */}
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="relative px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
            >
              <span className="relative z-10">{item.name}</span>
              <motion.div 
                className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-hover"
              />
            </Link>
          ))}
          
          <div className="w-px h-4 bg-white/20 mx-2" />
          
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-cyan-400 transition-colors">
            <span className="hidden sm:inline">RESUME</span>
            <FileText className="w-3 h-3" />
          </button>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};
