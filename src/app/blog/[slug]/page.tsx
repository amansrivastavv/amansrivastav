"use client";

import React, { useEffect, useState } from "react";
import { 
    ArrowLeft, 
    Type, 
    Monitor, 
    Moon, 
    Sun, 
    Globe, 
    ChevronDown,
    Maximize2,
    Minimize2
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

// --- TYPES ---
type FontSize = 'small' | 'standard' | 'large';
type LayoutWidth = 'standard' | 'wide';
type Theme = 'light' | 'dark' | 'auto';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<HashnodePostFull | null>(null);
  const [suggestedPosts, setSuggestedPosts] = useState<HashnodePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- PREFERENCES STATE ---
  const [fontSize, setFontSize] = useState<FontSize>('standard');
  const [layoutWidth, setLayoutWidth] = useState<LayoutWidth>('standard');
  const [theme, setTheme] = useState<Theme>('dark');
  const [showAppearanceMenu, setShowAppearanceMenu] = useState(false);

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

  // --- DYNAMIC CLASSES ---
  const fontSizeClasses = {
      small: 'prose-sm',
      standard: 'prose-lg',
      large: 'prose-xl'
  };

  const containerWidthClasses = {
      standard: 'max-w-[70ch]',
      wide: 'max-w-[90ch]'
  };

  const themeClasses = {
      light: 'bg-white text-zinc-900 selection:bg-zinc-200 selection:text-black',
      dark: 'bg-[#050505] text-zinc-400 selection:bg-zinc-800 selection:text-zinc-200',
      auto: 'bg-[#050505] text-zinc-400' // Defaulting auto to dark for now
  };

  const navbarClasses = {
      light: 'bg-white border-zinc-200',
      dark: 'bg-[#050505] border-zinc-900',
      auto: 'bg-[#050505] border-zinc-900'
  };

  const handleTranslate = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        alert("Translation is not available in development (localhost). It requires a public URL.");
        return;
    }
    window.open(`https://translate.google.com/translate?sl=auto&u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-[#050505]'}`}>
        <div className={`w-5 h-5 border-2 rounded-full animate-spin ${theme === 'light' ? 'border-zinc-300 border-t-zinc-900' : 'border-zinc-600 border-t-zinc-200'}`} />
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
    <div className={`min-h-screen w-full flex flex-col items-center transition-colors duration-300 ${themeClasses[theme]}`}>
      
      {/* NAVBAR */}
      <nav className={`w-full sticky top-0 z-40 border-b flex justify-center transition-colors duration-300 ${navbarClasses[theme]}`}>
        <div className="w-full max-w-[1280px] px-6 h-16 flex items-center justify-between">
            {/* Back Button (Top) */}
            <Link
                href="/blog"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${theme === 'light' ? 'text-zinc-600 hover:text-black' : 'text-zinc-500 hover:text-zinc-200'}`}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
            </Link>

            {/* Appearance Controls */}
            <div className="flex items-center gap-2 relative">
                
                {/* Visible Translate Button */}
                <button 
                    onClick={handleTranslate}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border
                        ${theme === 'light' 
                            ? 'border-transparent hover:bg-zinc-100 text-zinc-600' 
                            : 'border-transparent hover:bg-zinc-900 text-zinc-400'
                        }
                    `}
                    title="Translate Page"
                >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">Translate</span>
                </button>

                {/* Appearance Toggle */}
                <button 
                    onClick={() => setShowAppearanceMenu(!showAppearanceMenu)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                        showAppearanceMenu 
                            ? (theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-700 text-white')
                            : (theme === 'light' ? 'border-transparent hover:bg-zinc-100 text-zinc-900' : 'border-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200')
                    }`}
                >
                    <Type className="w-4 h-4" />
                    <span className="hidden sm:inline">Aa</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                </button>

                {/* POPUP MENU */}
                {showAppearanceMenu && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowAppearanceMenu(false)} />
                        <div className={`absolute top-full right-0 mt-2 w-72 rounded-xl shadow-xl border p-4 z-50 flex flex-col gap-4
                            ${theme === 'light' ? 'bg-white border-zinc-200 shadow-zinc-200/50' : 'bg-[#111] border-zinc-800 shadow-black/50'}
                        `}>
                            {/* 1. LAYOUT WIDTH */}
                            <div className="space-y-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-600'}`}>Width</span>
                                <div className={`flex rounded-lg p-1 border ${theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                                    {(['standard', 'wide'] as LayoutWidth[]).map((w) => (
                                        <button
                                            key={w}
                                            onClick={() => setLayoutWidth(w)}
                                            className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-2
                                                ${layoutWidth === w 
                                                    ? (theme === 'light' ? 'bg-white text-black shadow-sm border border-zinc-200' : 'bg-zinc-800 text-white border border-zinc-700') 
                                                    : (theme === 'light' ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-500 hover:text-zinc-300')
                                                }
                                            `}
                                        >
                                            {w === 'standard' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                                            <span className="capitalize">{w}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. TEXT SIZE */}
                            <div className="space-y-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-600'}`}>Text Size</span>
                                <div className={`flex rounded-lg p-1 border ${theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                                    {(['small', 'standard', 'large'] as FontSize[]).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setFontSize(s)}
                                            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center
                                                ${fontSize === s 
                                                    ? (theme === 'light' ? 'bg-white text-black shadow-sm border border-zinc-200' : 'bg-zinc-800 text-white border border-zinc-700') 
                                                    : (theme === 'light' ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-500 hover:text-zinc-300')
                                                }
                                            `}
                                        >
                                            <span style={{ fontSize: s === 'small' ? '12px' : s === 'standard' ? '14px' : '16px' }}>
                                                A
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 3. THEME MODE */}
                            <div className="space-y-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-600'}`}>Theme</span>
                                <div className={`flex rounded-lg p-1 border ${theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}>
                                    {[
                                        { id: 'light', icon: Sun, label: 'Light' },
                                        { id: 'auto', icon: Monitor, label: 'Auto' },
                                        { id: 'dark', icon: Moon, label: 'Dark' }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme(t.id as Theme)}
                                            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all flex flex-col items-center gap-1
                                                ${theme === t.id 
                                                    ? (theme === 'light' ? 'bg-white text-black shadow-sm border border-zinc-200' : 'bg-zinc-800 text-white border border-zinc-700') 
                                                    : (theme === 'light' ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-500 hover:text-zinc-300')
                                                }
                                            `}
                                        >
                                            <t.icon className="w-3 h-3" />
                                            <span className="hidden">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-[1280px] px-6 py-14 lg:py-20 flex-1">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* CONTENT — 70% (or dynamic based on preferences) */}
          <article className="w-full lg:w-[70%] min-w-0 transition-all duration-300">
            {/* HEADER */}
            <header className={`${containerWidthClasses[layoutWidth]} mb-12 transition-all duration-300`}>
              <div className={`flex items-center gap-3 text-xs uppercase tracking-wider mb-6 ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                <span>{date}</span>
                <span>•</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>

              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-8 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                {post.title}
              </h1>

              <div className={`flex items-center gap-4 py-5 border-y ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'}`}>
                <div className={`w-10 h-10 rounded-full overflow-hidden relative ${theme === 'light' ? 'bg-zinc-100' : 'bg-zinc-800'}`}>
                  {post.author?.profilePicture && (
                    <Image
                      src={post.author.profilePicture}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${theme === 'light' ? 'text-zinc-900' : 'text-zinc-200'}`}>
                    {post.author?.name}
                  </div>
                  <div className="text-xs text-zinc-500">Author</div>
                </div>
              </div>
            </header>

            {/* COVER */}
            {post.coverImage?.url && (
              <div className={`${containerWidthClasses[layoutWidth]} mb-14 transition-all duration-300`}>
                <div className={`relative aspect-[16/9] rounded-lg overflow-hidden border ${theme === 'light' ? 'border-zinc-200 bg-zinc-100' : 'border-zinc-900 bg-zinc-900'}`}>
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

            {/* CONTENT */}
            <div className={`${containerWidthClasses[layoutWidth]} transition-all duration-300`}>
              <div
                className={`
                  prose ${theme === 'light' ? 'prose-zinc prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-strong:text-zinc-900' : 'prose-invert prose-zinc prose-p:text-zinc-400 prose-headings:text-white'}
                  ${fontSizeClasses[fontSize]}
                  max-w-none
                  prose-p:leading-8 prose-p:mb-7
                  prose-headings:font-semibold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-14
                  prose-a:underline-offset-4
                  prose-blockquote:border-l-2 ${theme === 'light' ? 'prose-blockquote:border-zinc-200 prose-blockquote:text-zinc-500' : 'prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-300'} prose-blockquote:pl-6 prose-blockquote:italic
                  prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  ${theme === 'light' ? 'prose-code:bg-zinc-100 prose-code:text-rose-600 prose-pre:bg-zinc-50 prose-pre:border-zinc-200' : 'prose-code:bg-zinc-900 prose-code:text-zinc-200 prose-pre:bg-[#0A0A0A] prose-pre:border-zinc-800'}
                  prose-pre:border prose-pre:rounded-lg
                  prose-img:rounded-lg prose-img:border ${theme === 'light' ? 'prose-img:border-zinc-200' : 'prose-img:border-zinc-900'}
                `}
                dangerouslySetInnerHTML={{ __html: post.content.html }}
              />
            </div>

            {/* SUBSCRIBE */}
            <div className={`mt-24 pt-12 border-t ${containerWidthClasses[layoutWidth]} ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'}`}>
              <div className={`rounded-xl border p-8 flex flex-col md:flex-row gap-8 items-center ${theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/30 border-zinc-900'}`}>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                    Subscribe to the newsletter
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Get new articles delivered straight to your inbox.
                  </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Email address"
                    className={`flex-1 border rounded px-4 py-2.5 text-sm focus:outline-none 
                        ${theme === 'light' 
                            ? 'bg-white border-zinc-200 text-black placeholder-zinc-400 focus:border-zinc-400' 
                            : 'bg-[#050505] border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-600'
                        }
                    `}
                  />
                  <button className={`font-semibold text-sm px-6 py-2.5 rounded transition ${theme === 'light' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-100 hover:bg-white text-zinc-950'}`}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* BOTTOM NAV */}
            <div className={`mt-12 pt-12 border-t flex justify-between items-center ${containerWidthClasses[layoutWidth]} ${theme === 'light' ? 'border-zinc-200' : 'border-zinc-900'}`}>
                <Link
                    href="/blog"
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${theme === 'light' ? 'text-zinc-600 hover:text-black' : 'text-zinc-500 hover:text-zinc-200'}`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Archive</span>
                </Link>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`text-sm font-medium hover:underline ${theme === 'light' ? 'text-zinc-500' : 'text-zinc-500'}`}
                >
                    Scroll to Top
                </button>
            </div>
            
          </article>


          {/* SIDEBAR — 30% */}
          <aside className="w-full lg:w-[30%] shrink-0">
            <div className="lg:sticky lg:top-24 pl-0 lg:pl-8 border-l-0 lg:border-l border-zinc-200 dark:border-zinc-800 lg:ml-8 lg:border-opacity-50">
              <div className="flex items-center gap-3 mb-8">
                 <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                 <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 dark:text-zinc-500">
                    Read Next
                 </h3>
              </div>

              <div className="flex flex-col gap-8">
                {suggestedPosts.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                     <article className={`
                        relative overflow-hidden rounded-2xl transition-all duration-500
                        ${theme === 'light' 
                            ? 'bg-zinc-50 hover:bg-white border border-transparent hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/50' 
                            : 'bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/20'
                        }
                     `}>
                        {/* Image Container */}
                        <div className="relative w-full aspect-2/1 overflow-hidden">
                           {p.coverImage?.url || p.ogMetaData?.image ? (
                              <>
                                <Image
                                    src={p.coverImage?.url || p.ogMetaData?.image || ""}
                                    alt={p.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                              </>
                           ) : (
                              <div className={`absolute inset-0 flex items-center justify-center ${theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-800'}`}>
                                  <Monitor className="w-8 h-8 opacity-20" />
                              </div>
                           )}
                           
                           {/* Floating Read Time Badge */}
                           <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-white tracking-wider">{p.readTimeInMinutes} MIN</span>
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                           <div className={`text-[10px] font-black uppercase tracking-widest ${theme === 'light' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                {new Date(p.publishedAt).getFullYear()} Archive
                           </div>

                           <h4 className={`
                                text-sm sm:text-base font-bold leading-snug transition-colors line-clamp-2
                                ${theme === 'light' ? 'text-zinc-800 group-hover:text-cyan-600' : 'text-zinc-200 group-hover:text-cyan-400'}
                           `}>
                              {p.title}
                           </h4>
                           
                           <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${theme === 'light' ? 'text-zinc-400 group-hover:text-zinc-600' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                <span>Access Entry</span>
                                <ArrowLeft className="w-3 h-3 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                           </div>
                        </div>
                     </article>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
