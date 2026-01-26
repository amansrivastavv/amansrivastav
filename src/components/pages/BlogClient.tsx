"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowUpRight, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchHashnodePosts, HashnodePost } from "@/lib/hashnode";

const HASHNODE_HOSTNAME = "amansrivastav.hashnode.dev"; 

const BlogCard = ({ post, index }: { post: HashnodePost, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative flex flex-col"
        >
            <Link href={`/blog/${post.slug}`} className="block relative h-full">
                {/* Image Container with Cinematic Scale */}
                <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-neutral-900 border border-white/5 shadow-2xl">
                    {(post.coverImage?.url || post.ogMetaData?.image) && (
                        <Image 
                            src={post.coverImage?.url || post.ogMetaData?.image || ""}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            priority={index < 6}
                        />
                    )}
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                            <ArrowUpRight className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                        <span className="bg-cyan-500/10 px-2 py-1 rounded-sm border border-cyan-500/20">
                            {post.tags?.[0]?.name || "Case Study"}
                        </span>
                        <div className="flex items-center gap-1.5 text-white/30 lowercase">
                            <Clock className="w-3 h-3" />
                            <span>8 min read</span>
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {post.title}
                    </h2>

                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                        {post.brief}
                    </p>

                    <div className="pt-4 flex items-center gap-2">
                        <div className="h-px w-8 bg-white/10 group-hover:w-16 transition-all duration-500 group-hover:bg-cyan-500/50" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Open Article</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export function BlogClient() {
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

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
    <main ref={containerRef} className="bg-[#020202] min-h-screen text-white selection:bg-cyan-500/30">
      
      {/* --- CINEMATIC HERO --- */}
      <motion.header 
        style={{ opacity: heroOpacity, y: heroY }}
        className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#020202]" />
        {/* Subtle Static Grid Background */}
        <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]" />
        
        <div className="relative z-10 text-center space-y-16 md:space-y-24">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
            >
                <Link href="/" className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 transition-all group">
                    <ArrowLeft className="w-4 h-4 text-cyan-500 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">Return Home</span>
                </Link>
            </motion.div>

            <h1 className="text-[14vw] md:text-[12vw] font-black tracking-tighter leading-[0.8] uppercase flex flex-col items-center">
                <span className="text-white">Engineering</span>
                <span className="text-transparent stroke-text">Journal.</span>
            </h1>

            <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
                <p className="text-neutral-500 text-lg md:text-xl font-light tracking-wide italic max-w-lg">
                    Decoding complex architectures, one transmit at a time.
                </p>
            </div>
        </div>

        {/* Cinematic Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-3 opacity-30">
            <div className="w-px h-16 bg-linear-to-b from-white to-transparent" />
            <span className="text-[10px] uppercase font-mono tracking-[0.3em]">Scroll</span>
        </div>
      </motion.header>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 pb-40">
        
        {/* --- ARTICLE GRID --- */}
        <section className="relative z-10 w-full px-4 md:px-0">
            {isLoading ? (
                <div className="py-40 flex flex-col items-center justify-center gap-6">
                    <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-500">Syncing Feed...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    <AnimatePresence mode="popLayout">
                        {posts.map((post, idx) => (
                            <BlogCard key={post.id} post={post} index={idx} />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </section>

      </div>

      <Footer />

      <style jsx>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        @media (min-width: 768px) {
            .stroke-text {
                -webkit-text-stroke: 2px rgba(255,255,255,0.2);
            }
        }
      `}</style>
    </main>
  );
}
