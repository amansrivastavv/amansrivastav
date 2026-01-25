"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchHashnodePosts, HashnodePost } from "@/lib/hashnode";

import { SearchBar } from "@/components/blog/SearchBar";

const HASHNODE_HOSTNAME = "amansrivastav.hashnode.dev"; 

const BlogCard = ({ post, index }: { post: HashnodePost, index: number }) => {
    // Format date: "DEC 24, 2024"
    const dateObj = new Date(post.publishedAt);
    const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
    
    // Primary Tag
    const tag = post.tags?.[0]?.name || "Article";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group block"
        >
            <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col gap-6">
                
                {/* Visual Header - 3:2 Ratio, Sharp, Clean */}
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-neutral-900">
                    {post.coverImage?.url || post.ogMetaData?.image ? (
                        <Image 
                            src={post.coverImage?.url || post.ogMetaData?.image || ""}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-800">
                            <Sparkles className="w-8 h-8 opacity-20" />
                        </div>
                    )}
                    
                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Body - Minimalist, Typographic */}
                <div className="flex flex-col gap-4">
                    {/* Meta Top */}
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-4 group-hover:border-neutral-800 transition-colors">
                        <span className="text-cyan-600 font-bold">{tag}</span>
                        <span>{date}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-serif font-medium text-neutral-100 leading-[1.1] group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-2 mix-blend-plus-lighter">
                        {post.brief}
                    </p>
                    
                    {/* 'Read' Indicator */}
                    <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 group-hover:text-white transition-colors duration-300">
                        Read Story <ArrowUpRight className="w-3 h-3 relative top-[1px]" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export function BlogClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.brief.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function getPosts() {
      try {
        const data = await fetchHashnodePosts(HASHNODE_HOSTNAME);
        setPosts(data);
      } catch (error) {
        console.error("Failed to load Hashnode posts", error);
      } finally {
        setIsLoading(false);
      }
    }
    getPosts();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#020202] relative min-h-screen selection:bg-cyan-500/30 overflow-x-hidden text-neutral-100 font-sans scroll-smooth">
      
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-size-[100px_100px] bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#020202] via-transparent to-[#020202]" />
        
        {/* Decorative Radial Radiance */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <div className="w-full max-w-7xl px-6 sm:px-12 pb-40">
        
        {/* --- BALANCED HERO --- */}
        <header className="min-h-[70vh] md:min-h-[90vh] flex flex-col justify-center py-16 md:py-32 text-center">
             <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6 mb-8 md:mb-16"
             >
                <Link href="/" className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.4em] text-cyan-500">
                    <div className="w-10 h-10 rounded-full border border-cyan-500/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Return to Terminal
                </Link>
                <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-white/10" />
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-neutral-600">Established MMXXVI</span>
                    <div className="h-px w-12 bg-white/10" />
                </div>
             </motion.div>

             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
             >
                <h1 className="text-7xl sm:text-9xl md:text-[13vw] font-serif font-black leading-[0.75] tracking-tighter uppercase">
                    ENGINEERING <br />
                    <span className="text-neutral-900 [-webkit-text-stroke:2px_rgba(255,255,255,0.1)] hover:[-webkit-text-stroke:2px_rgba(6,182,212,0.4)] transition-all duration-700 italic">
                        JOURNAL
                    </span>
                </h1>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 md:mt-16 flex flex-col items-center space-y-10"
             >
                <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed max-w-3xl mx-auto">
                    Notes on building software, understanding networks, and navigating modern cybersecurity.
                </p>
                
                <div className="flex flex-wrap justify-center gap-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-neutral-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            Status: Live Stream
                        </div>
                        <div className="w-32 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-[10px] uppercase font-black tracking-widest text-neutral-700 font-mono">
                            Frequency: 443.00 MHz
                        </div>
                        <div className="w-32 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-[10px] uppercase font-black tracking-widest text-neutral-700">
                            Volume: 26 Entries
                        </div>
                        <div className="w-32 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                </div>
             </motion.div>
        </header>

      {/* --- SEARCH SECTION --- */}
        <div className="w-full flex justify-center relative z-30">
            <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        </div>

        <div className="h-12 md:h-32 w-full" />

      {/* --- BEAUTIFUL GRID CARDS --- */}
        <section className="relative min-h-[400px]">
             
            {isLoading ? (
                <div className="py-40 flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
                        <div className="absolute inset-0 blur-sm text-cyan-500/30 animate-pulse">
                            <Loader2 className="w-12 h-12" />
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-neutral-500 ml-2">Mapping Global Feed...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, idx) => (
                            <BlogCard 
                                key={post.id} 
                                post={post} 
                                index={idx}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {!isLoading && filteredPosts.length === 0 && (
                <div className="py-40 text-center border border-white/5 rounded-3xl bg-white/2">
                    <Sparkles className="w-12 h-12 text-neutral-800 mx-auto mb-6" />
                    <p className="text-2xl font-serif italic text-neutral-500">
                        {searchQuery ? "No matching frequencies located." : "Wait... the signal is offline."}
                    </p>
                </div>
            )}
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-40 mt-32 border-t border-neutral-900 flex flex-col items-center relative overflow-hidden">
             {/* Background Noise/Gradient - Very Subtle */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
             
             <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-2xl text-center relative z-10 space-y-12"
            >
                <div>
                     <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500 mb-4 block">
                        Transmission Line
                    </span>
                    <h3 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-white leading-[0.9]">
                        Join the <br/>
                        <span className="text-neutral-500 italic">Collective.</span>
                    </h3>
                </div>

                <div className="flex flex-col gap-2">
                    <form className="relative w-full group">
                        <input 
                            type="email" 
                            placeholder="email@address.com" 
                            className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl font-light text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-cyan-500 transition-colors flex items-center gap-2">
                            Initialize <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                    <p className="text-left text-[10px] text-neutral-600 font-mono mt-2">
                        <span className="text-neutral-700 mr-2">{'//'}</span> No spam. Weekly frequencies only.
                    </p>
                </div>
            </motion.div>
        </section>

      </div>
    </div>

      <Footer />
    </main>
  );
}
