"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock, ArrowRight, ArrowUpRight, Loader2, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchHashnodePosts, HashnodePost } from "@/lib/hashnode";

import { SearchBar } from "@/components/blog/SearchBar";

const HASHNODE_HOSTNAME = "amansrivastav.hashnode.dev"; 

export default function BlogPage() {
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
        <header className="min-h-[90vh] flex flex-col justify-center py-32 text-center">
             <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6 mb-16"
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
                    Journal <br />
                    <span className="text-neutral-900 [-webkit-text-stroke:2px_rgba(255,255,255,0.1)] hover:[-webkit-text-stroke:2px_rgba(6,182,212,0.4)] transition-all duration-700 italic">
                        Archive
                    </span>
                    <span className="text-cyan-500/80 text-4xl sm:text-6xl md:text-[5vw] align-top ml-4 font-black">.v01</span>
                </h1>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-16 flex flex-col items-center space-y-10"
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

        <div className="h-32 w-full" />

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
        <section className="py-48 mt-48 border-t border-white/5 flex flex-col items-center">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-12 w-full max-w-4xl"
            >
                <h3 className="text-5xl sm:text-7xl font-serif font-black uppercase tracking-tighter leading-none">
                    Join the <br /><span className="text-neutral-900 [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] italic">Collective via Email.</span>
                </h3>
                <div className="relative group">
                    <input 
                        type="email" 
                        placeholder="ENTER TRANSMISSION ID" 
                        className="w-full bg-white/2 border border-white/10 rounded-2xl py-8 px-8 text-2xl sm:text-3xl focus:outline-none focus:border-cyan-500 transition-all placeholder:text-neutral-800 font-serif lowercase"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-xl flex items-center justify-center group/btn hover:bg-cyan-500 transition-all duration-500">
                        <ArrowRight className="w-6 h-6 text-black group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </section>

      </div>
    </div>

      <Footer />
    </main>
  );
}

const BlogCard = ({ post, index }: { post: HashnodePost, index: number }) => {
    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
            }}
            className="group block relative"
        >
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full bg-[#080808]/40 border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-700 shadow-2xl hover:shadow-cyan-500/5 group" >
                
                {/* Visual Header */}
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-900">
                    {post.coverImage?.url || post.ogMetaData?.image ? (
                        <Image 
                            src={post.coverImage?.url || post.ogMetaData?.image || ""}
                            alt={post.title}
                            fill
                            className="object-cover transition-all duration-1000 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-800">
                            <Sparkles className="w-12 h-12" />
                        </div>
                    )}
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                            <p className="text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 text-cyan-400">
                                <Clock className="w-2.5 h-2.5" />
                                {post.readTimeInMinutes} min
                            </p>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-[#020202] via-[#020202]/10 to-transparent opacity-80" />
                </div>

                {/* Content Body */}
                <div className="p-8 flex-1 flex flex-col space-y-6 relative">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500/60">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </div>
                        <div className="h-px w-8 bg-white/5" />
                    </div>

                    <div className="space-y-4 flex-1">
                        <h2 className="text-2xl font-serif font-black text-white group-hover:text-cyan-400 leading-[1.1] transition-colors duration-500 line-clamp-2">
                            {post.title}
                        </h2>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-3">
                            {post.brief}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-700 group-hover:text-white transition-colors">
                            Access Entry
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:-rotate-45">
                            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-black" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
