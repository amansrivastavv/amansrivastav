"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Contact = ({ isPage = false }: { isPage?: boolean }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormState('success');
  };

  const HeadingTag = isPage ? "h1" : "h2";

  return (
    <section id="contact" className="relative min-h-screen flex items-center bg-[#050505] py-24 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Heading */}
        <div className="space-y-8">
            <p className="text-cyan-500 font-mono text-sm uppercase tracking-widest">
                Get in Touch
            </p>
            <HeadingTag className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                CONTACT AMAN <br/>
                SRIVASTAV.
            </HeadingTag>
            <p className="text-neutral-400 max-w-md text-lg leading-relaxed">
                Have an idea? Let&apos;s engineer it into reality. Fill out the manifest below.
            </p>
        </div>

        {/* Right: Cyberpunk Structured Form */}
        <form onSubmit={handleSubmit} className="space-y-px bg-white/10 border border-white/10">
           
           {/* Name Field */}
           <div className="group relative bg-[#0a0a0a] p-6 transition-colors hover:bg-neutral-900 border-b border-white/10">
               <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 group-focus-within:text-cyan-500 transition-colors">
                  01 // Identification name
               </label>
               <input 
                 type="text" 
                 required 
                 placeholder="Your Name"
                 className="w-full bg-transparent text-2xl md:text-3xl font-medium text-white placeholder:text-neutral-800 focus:outline-none uppercase"
               />
           </div>

           {/* Email Field */}
           <div className="group relative bg-[#0a0a0a] p-6 transition-colors hover:bg-neutral-900 border-b border-white/10">
               <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 group-focus-within:text-cyan-500 transition-colors">
                  02 // Communication Frequency
               </label>
               <input 
                 type="email" 
                 required 
                 placeholder="EMAIL@ADDRESS.COM"
                 className="w-full bg-transparent text-2xl md:text-3xl font-medium text-white placeholder:text-neutral-800 focus:outline-none uppercase"
               />
           </div>

           {/* Project Details */}
           <div className="group relative bg-[#0a0a0a] p-6 transition-colors hover:bg-neutral-900">
               <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 group-focus-within:text-cyan-500 transition-colors">
                  03 // Mission Parameters
               </label>
               <textarea 
                 rows={4}
                 required 
                 placeholder="DESCRIBE YOUR OBJECTIVE..."
                 className="w-full bg-transparent text-xl md:text-2xl font-medium text-white placeholder:text-neutral-800 focus:outline-none uppercase resize-none"
               />
           </div>

           {/* Submit Button Block */}
           <button 
                type="submit"
                disabled={formState !== 'idle'}
                className={cn(
                    "w-full px-6 py-3 flex items-center justify-between transition-all duration-300 rounded font-semibold uppercase tracking-wide text-sm",
                    formState === 'success' ? "bg-green-500 text-white" : "bg-white text-black hover:bg-cyan-500 hover:text-white"
                )}
           >
               <span>
                    {formState === 'idle' ? 'Send Message' : formState === 'submitting' ? 'Sending...' : 'Sent!'}
               </span>
               <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
           </button>

        </form>

      </div>
    </section>
  );
};
