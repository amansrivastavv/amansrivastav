"use client";

import React, { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer"; 
import { 
    ArrowLeft, 
    ArrowUpRight,
    Share2,
    Monitor
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  fetchHashnodePostBySlug,
  fetchHashnodePosts,
  HashnodePostFull,
  HashnodePost,
} from "@/lib/hashnode";

const HASHNODE_HOSTNAME = "amansrivastav.hashnode.dev";

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<HashnodePostFull | null>(null);
  const [suggestedPosts, setSuggestedPosts] = useState<HashnodePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!params.slug) return;
      try {
        const postData = await fetchHashnodePostBySlug(
          HASHNODE_HOSTNAME,
          params.slug as string
        );
        setPost(postData);

        const all = await fetchHashnodePosts(HASHNODE_HOSTNAME);
        setSuggestedPosts(
          all.filter((p) => p.slug !== params.slug).slice(0, 5)
        );
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-1 stroke-current animate-pulse text-white" />
             <span className="text-[10px] uppercase font-black tracking-widest opacity-50 text-white">Loading Data</span>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center pb-20 font-sans bg-[#050505] text-[#E0E0E0] selection:bg-white selection:text-black">
      
      {/* Spacer to clear fixed navbar */}
      <div className="w-full h-[120px] lg:h-[160px] shrink-0" />
      
      {/* MAIN CONTAINER */}
      <main className="w-full max-w-[1400px] px-4 md:px-8 flex-1 ">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 relative">
          
          {/* ARTICLE CONTENT */}
          <article className="w-full lg:flex-1 min-w-0">
            
            {/* Header */}
            <header className="mx-auto max-w-3xl mb-12 lg:mb-16">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono mb-8 opacity-60 text-zinc-400">
                 <Link href="/blog" className="hover:text-cyan-400 transition-colors flex items-center gap-1 uppercase tracking-widest">
                    <ArrowLeft className="w-3 h-3" /> Back to Archive
                 </Link>
                 <span className="w-px h-3 bg-current" />
                 <span className="uppercase tracking-widest">{date}</span>
                 <span className="w-px h-3 bg-current" />
                 <span className="uppercase tracking-widest">{post.readTimeInMinutes} MIN READ</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] mb-10 tracking-tight text-white">
                {post.title}
              </h1>

              {/* Author & Share Row */}
              <div className="flex items-center justify-between py-6 border-y border-white/10">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-none bg-neutral-800 relative overflow-hidden">
                         {post.author?.profilePicture && (
                             <Image src={post.author.profilePicture} alt={post.author.name} fill className="object-cover" />
                         )}
                    </div>
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wider leading-none mb-1 text-white">{post.author?.name}</p>
                        <p className="text-[10px] opacity-50 font-mono uppercase tracking-widest text-zinc-400">Operator</p>
                    </div>
                 </div>

                 <button className="p-3 hover:bg-white/5 rounded-none transition-colors" title="Share Article">
                    <Share2 className="w-5 h-5 opacity-60" />
                 </button>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage?.url && (
              <div className="mx-auto max-w-5xl mb-16">
                <div className="relative aspect-21/9 w-full bg-neutral-900 overflow-hidden">
                   <Image 
                      src={post.coverImage.url} 
                      alt={post.title} 
                      fill 
                      className="object-cover" 
                      priority 
                   />
                </div>
              </div>
            )}

            {/* HTML Body */}
            <div className="mx-auto max-w-3xl">
                <div 
                    className="
                        prose prose-lg prose-invert max-w-none
                        prose-headings:font-serif prose-headings:font-medium prose-headings:leading-tight prose-headings:text-white
                        prose-p:font-light prose-p:leading-[1.9] prose-p:mb-8 prose-p:text-zinc-300
                        prose-strong:font-bold prose-strong:text-white
                        prose-li:marker:text-neutral-500
                        prose-blockquote:border-l-2 prose-blockquote:border-cyan-500 prose-blockquote:pl-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-zinc-400
                        prose-img:rounded-none prose-img:my-10
                        prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-[''] prose-code:after:content-[''] prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-white/5 prose-code:text-cyan-300
                        prose-pre:rounded-none prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10
                        prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                    "
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                />
            </div>

            {/* Post-Read Divider */}
            <div className="w-full h-px bg-white/10 mt-20 mb-20" />

          </article>


          {/* SIDEBAR (Desktop Right) */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-40 h-fit">
               <div className="pl-8 border-l border-white/10">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-8 block text-zinc-500">
                       Incoming Signals
                   </span>
                   <div className="flex flex-col gap-8">
                       {suggestedPosts.map((p) => (
                           <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                               <div className="aspect-3/2 bg-neutral-900 mb-3 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                   {p.coverImage?.url || p.ogMetaData?.image ? (
                                       <Image 
                                        src={p.coverImage?.url || p.ogMetaData?.image || ""} 
                                        alt={p.title} 
                                        fill 
                                        className="object-cover" 
                                       />
                                   ) : (
                                       <div className="absolute inset-0 flex items-center justify-center opacity-20"><Monitor className="w-8 h-8"/></div>
                                   )}
                               </div>
                               <h4 className="font-serif text-lg leading-tight group-hover:underline decoration-1 underline-offset-4 decoration-cyan-500 transition-all text-zinc-200 group-hover:text-white">
                                   {p.title}
                               </h4>
                               <p className="text-xs font-mono mt-2 opacity-50 uppercase tracking-wide text-zinc-500">
                                   Read: {p.readTimeInMinutes}m
                               </p>
                           </Link>
                       ))}
                   </div>
               </div>
          </aside>
        </div>


        {/* FOOTER / NEWSLETTER */}
        <div className="mt-12 py-20 border-t border-white/10">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-8">
                 <h3 className="text-4xl md:text-5xl font-serif font-medium text-white">
                     Stay connected.
                 </h3>
                 <p className="opacity-60 font-light text-lg text-zinc-400">
                     Join the collective to receive updates on software, design, and system architecture.
                 </p>
                 
                 <div className="flex w-full max-w-md border-b border-white/20 focus-within:border-cyan-500 transition-colors">
                     <input 
                        type="email" 
                        placeholder="ENTER EMAIL ADDRESS" 
                        className="flex-1 bg-transparent py-4 text-sm font-bold uppercase tracking-wider outline-none placeholder:text-zinc-700 text-white"
                     />
                     <button className="px-4 py-4 text-xs font-black uppercase tracking-widest hover:text-cyan-500 transition-colors text-white">
                        Subscribe
                     </button>
                 </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-between items-center mt-24 opacity-50 hover:opacity-100 transition-opacity text-white">
                 <Link href="/blog" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-cyan-500 transition-colors">
                     <ArrowLeft className="w-4 h-4" /> Back to Archive
                 </Link>
                 <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-cyan-500 transition-colors"
                 >
                     Top <ArrowUpRight className="w-4 h-4" />
                 </button>
            </div>
        </div>

      </main>

      {/* Global Footer */}
      <Footer />
      <div className="h-6" />
    </div>
  );
}
