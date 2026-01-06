"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 w-full z-[100] transition-all",
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="w-full max-w-[90vw] md:max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-black tracking-widest text-white uppercase">
            AMAN<span className="text-cyan-500">.</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="/aman-resume.pdf"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition"
            >
              <span className="text-xs font-bold tracking-widest uppercase">Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#050505] z-[90] flex flex-col"
          >
            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-24 gap-12">
              {/* NAV LINKS */}
              <div className="flex-1 flex flex-col justify-center space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 group"
                    >
                      <span className="text-xs text-cyan-500 opacity-60">
                        0{i + 1}
                      </span>
                      <span className="text-4xl sm:text-5xl md:text-7xl font-black text-white/50 group-hover:text-white transition">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* INFO */}
              <div className="flex flex-col justify-end gap-8 md:items-end">
                <div className="text-right">
                  <p className="text-xs tracking-widest text-neutral-400 uppercase mb-2">
                    Contact
                  </p>
                  <a
                    href="mailto:amansrivastav1203@gmail.com"
                    className="text-lg sm:text-xl text-white hover:text-cyan-500"
                  >
                    amansrivastav1203@gmail.com
                  </a>
                </div>

                <div className="flex gap-3 md:justify-end">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
