"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Send, MapPin, Clock, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { cn } from "@/lib/utils";

export const Contact = () => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);

  // Magnetic Button Logic
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - left - width / 2;
    const yPos = e.clientY - top - height / 2;
    x.set(xPos * 0.3); // Magnetic strength
    y.set(yPos * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit", 
        timeZoneName: "short" 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      formRef.current?.reset();
      
      // Reset to idle after a delay
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-[#030014] overflow-hidden">
      
      {/* Particle Background - The "Cosmic Connection" */}
      <ParticleBackground />
      
      {/* Dark Overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* Left: Manifesto & Info */}
          <div className="lg:w-1/2 space-y-16">
            <div className="space-y-8">
              <span className="text-cyan-500 font-bold tracking-[0.4em] text-xs uppercase flex items-center gap-2">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Cosmic Terminal
              </span>
              <h2 className="text-7xl md:text-9xl font-serif font-black text-white leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                LET'S <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-white">CREATE</span>
              </h2>
              <p className="text-xl text-neutral-400 font-light max-w-md border-l-2 border-cyan-500/30 pl-6 backdrop-blur-sm">
                Ready to build something extraordinary? I'm currently available for select freelance projects and collaborations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
               <div className="group">
                  <div className="flex items-center gap-2 text-neutral-500 mb-2 group-hover:text-cyan-500 transition-colors">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Local Time</span>
                  </div>
                  <p className="text-2xl font-serif text-white">{mounted ? time : "--:--"}</p>
               </div>
               <div className="group">
                  <div className="flex items-center gap-2 text-neutral-500 mb-2 group-hover:text-cyan-500 transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Location</span>
                  </div>
                  <p className="text-2xl font-serif text-white">Noida, India</p>
               </div>
            </div>

            <a 
              href="mailto:amansrivastav1203@gmail.com"
              className="group inline-flex items-center gap-4 text-2xl font-bold text-white hover:text-cyan-500 transition-colors"
            >
              <span>amansrivastav1203@gmail.com</span>
              <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Right: Glass Prism Form */}
          <div className="lg:w-1/2 pt-12 lg:pt-32 relative min-h-[500px]">
             {/* Background Glow for Focus Mode */}
             <div 
                className={cn(
                  "absolute inset-0 bg-cyan-500/5 blur-[100px] transition-opacity duration-700 pointer-events-none",
                  focusedField ? "opacity-100" : "opacity-0"
                )}
             />

            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 bg-zinc-900/50 backdrop-blur-md rounded-[2rem] border border-white/10 z-50"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-4xl font-serif text-white">Message Sent!</h3>
                  <p className="text-neutral-400 max-w-xs">I'll get back to you within 24 hours. Let's make something great.</p>
                </motion.div>
              ) : (
                <motion.form 
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 relative z-20"
                >
                  <div className={cn(
                     "group relative bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300",
                     focusedField === "name" ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02] z-30" : "border-white/5 hover:border-white/10 z-10"
                  )}>
                     <label className={cn(
                        "block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 transition-colors",
                        focusedField === "name" ? "text-cyan-500" : "text-neutral-500"
                     )}>01. Name</label>
                     <input 
                       type="text" 
                       required
                       onFocus={() => setFocusedField("name")}
                       onBlur={() => setFocusedField(null)}
                       className="w-full bg-transparent text-2xl font-light text-white focus:outline-none placeholder:text-neutral-700/50 h-12"
                       placeholder=""
                     />
                  </div>

                  <div className={cn(
                     "group relative bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300",
                     focusedField === "email" ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02] z-30" : "border-white/5 hover:border-white/10 z-10"
                  )}>
                     <label className={cn(
                        "block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 transition-colors",
                        focusedField === "email" ? "text-cyan-500" : "text-neutral-500"
                     )}>02. Email</label>
                     <input 
                       type="email" 
                       required
                       onFocus={() => setFocusedField("email")}
                       onBlur={() => setFocusedField(null)}
                       className="w-full bg-transparent text-2xl font-light text-white focus:outline-none placeholder:text-neutral-700/50 h-12"
                       placeholder=""
                     />
                  </div>

                  <div className={cn(
                     "group relative bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300",
                     focusedField === "message" ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02] z-30" : "border-white/5 hover:border-white/10 z-10"
                  )}>
                     <label className={cn(
                        "block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 transition-colors",
                        focusedField === "message" ? "text-cyan-500" : "text-neutral-500"
                     )}>03. Vision</label>
                     <textarea 
                       rows={4}
                       required
                       onFocus={() => setFocusedField("message")}
                       onBlur={() => setFocusedField(null)}
                       className="w-full bg-transparent text-2xl font-light text-white focus:outline-none placeholder:text-neutral-700/50 resize-none leading-relaxed"
                       placeholder="Tell me about your project..."
                     ></textarea>
                  </div>

                  <div className="flex justify-end pt-4">
                    <motion.button 
                      ref={buttonRef}
                      type="submit"
                      disabled={formState === 'loading'}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{ x: mouseX, y: mouseY }}
                      className="relative flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-black text-xs tracking-[0.3em] uppercase hover:bg-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      <span className="relative z-10 flex items-center gap-2">
                        {formState === 'loading' ? 'Launching...' : 'Send Message'} 
                        {formState === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
