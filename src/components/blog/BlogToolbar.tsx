"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface BlogToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
}

export function BlogToolbar({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  allTags,
}: BlogToolbarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 mb-20 flex flex-col gap-8">
      
      {/* 1. SEARCH BAR */}
      <div className="relative group w-full max-w-xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-4 backdrop-blur-sm group-hover:border-white/20 transition-all">
          <Search className="w-5 h-5 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Search transmissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none text-white ml-4 placeholder:text-neutral-600 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="ml-2 hover:bg-white/10 p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. AUTO-SCROLL TAG MARQUEE */}
      {allTags.length > 0 && (
        <div className="relative w-full overflow-hidden group/tags mask-linear-fade">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

          <div className="w-full overflow-hidden flex">
            <motion.div
              className="flex items-center gap-3 pr-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: Math.max(20, allTags.length * 2), // Ensure minimum duration for smooth scroll
                repeatType: "loop",
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* Quadruple tags for extra safety in loop seamlessness */}
              {[...allTags, ...allTags, ...allTags, ...allTags].map((tag, i) => (
                <button
                  key={`${tag}-${i}`}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`
                        shrink-0 text-[10px] uppercase font-bold tracking-widest px-6 py-3 rounded-full border transition-all duration-300
                        ${
                          selectedTag === tag
                            ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                            : "bg-white/5 border-white/10 text-neutral-500 hover:text-white hover:bg-white/10 hover:border-white/30"
                        }
                    `}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
