"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Send, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";

export const Contact = () => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
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
    <section id="contact" className="py-32 relative bg-[#030014] overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* Left: Manifesto & Info */}
          <div className="lg:w-1/2 space-y-16">
            <div className="space-y-8">
              <span className="text-cyan-500 font-bold tracking-[0.4em] text-xs uppercase">Contact</span>
              <h2 className="text-7xl md:text-9xl font-serif font-black text-white leading-[0.85] tracking-tight">
                LET'S <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-white">CREATE</span>
              </h2>
              <p className="text-xl text-neutral-400 font-light max-w-md border-l-2 border-white/10 pl-6">
                Ready to build something extraordinary? I'm currently available for select freelance projects and collaborations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
               <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Local Time</span>
                  </div>
                  <p className="text-2xl font-serif text-white">{mounted ? time : "--:--"}</p>
               </div>
               <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-2">
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

          {/* Right: Interactive Form */}
          <div className="lg:w-1/2 pt-12 lg:pt-32 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
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
                  className="space-y-12"
                >
                  <div className="group relative">
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-neutral-700 peer"
                      placeholder="What's your name?"
                    />
                    <span className="absolute left-0 bottom-full text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 peer-focus:text-cyan-500 transition-colors">01. Name</span>
                  </div>

                  <div className="group relative">
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-neutral-700 peer"
                      placeholder="Your email address?"
                    />
                    <span className="absolute left-0 bottom-full text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 peer-focus:text-cyan-500 transition-colors">02. Email</span>
                  </div>

                  <div className="group relative">
                    <textarea 
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-neutral-700 resize-none peer"
                      placeholder="Tell me about your project..."
                    ></textarea>
                    <span className="absolute left-0 bottom-full text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2 peer-focus:text-cyan-500 transition-colors">03. Vision</span>
                  </div>

                  <div className="flex justify-end">
                    <motion.button 
                      ref={buttonRef}
                      type="submit"
                      disabled={formState === 'loading'}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{ x: mouseX, y: mouseY }}
                      className="relative flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-black text-xs tracking-[0.3em] uppercase hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {formState === 'loading' ? 'Sending...' : 'Send Message'} 
                        {formState === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
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
