"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Command, CornerDownLeft, Copy, FileText, Github } from "lucide-react";

type CommandItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
};

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [miscSelected, setMiscSelected] = useState(0); // For keyboard navigation if needed, simpler to just filter for now
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go Home",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/"),
    },
    {
      id: "work",
      label: "View Projects",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/projects"),
    },
    {
      id: "story",
      label: "Read Story",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/story"),
    },
    {
      id: "contact",
      label: "Contact Me",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => router.push("/contact"),
    },
    {
      id: "email",
      label: "Copy Email",
      icon: <Copy className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText("amansrivastav1203@gmail.com");
        // Could add a toast here, but for now just close
        setIsOpen(false);
      },
      shortcut: "Cp",
    },
    {
      id: "resume",
      label: "Download Resume",
      icon: <FileText className="w-4 h-4" />,
      action: () => window.open("/aman-resume.pdf", "_blank"),
    },
    {
      id: "source",
      label: "View Source",
      icon: <Github className="w-4 h-4" />,
      action: () => window.open("https://github.com/amansrivastav", "_blank"),
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
             {/* Header */}
             <div className="flex items-center px-4 py-4 border-b border-white/5 gap-3">
                <Search className="w-5 h-5 text-neutral-500" />
                <input 
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent text-white placeholder:text-neutral-600 focus:outline-none font-mono text-sm"
                />
                <div className="flex items-center gap-1">
                   <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-400 font-mono">ESC</span>
                </div>
             </div>

             {/* Results */}
             <div className="py-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {filteredCommands.length > 0 ? (
                    <div className="px-2 space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-600 px-2 py-2 block">Suggestions</span>
                        {filteredCommands.map((cmd) => (
                            <button
                                key={cmd.id}
                                onClick={() => handleSelect(cmd)}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 group transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-cyan-500 group-hover:bg-cyan-500/10 transition-colors">
                                        {cmd.icon}
                                    </div>
                                    <span className="text-sm text-neutral-300 group-hover:text-white font-medium">
                                        {cmd.label}
                                    </span>
                                </div>
                                {cmd.shortcut && (
                                    <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-neutral-500 font-mono">
                                        {cmd.shortcut}
                                    </span>
                                )}
                                {!cmd.shortcut && (
                                     <CornerDownLeft className="w-3 h-3 text-neutral-700 group-hover:text-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                                )}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-neutral-600 text-sm">
                        No commands found.
                    </div>
                )}
             </div>

             {/* Footer */}
             <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-600 font-mono">
                <div className="flex gap-4">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                </div>
                <div>
                   Open with <span className="text-neutral-400">⌘K</span>
                </div>
             </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
