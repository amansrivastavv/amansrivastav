import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

export const SearchBar = ({ onSearch, value }: SearchBarProps) => {
  return (
    <div className="w-full max-w-2xl relative">
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
        
        <div className="relative flex items-center bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden focus-within:border-cyan-500/50 transition-colors duration-300">
          <div className="pl-6 text-neutral-500 group-focus-within:text-cyan-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            type="text"
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="SEARCH ARCHIVE..."
            className="w-full bg-transparent text-lg py-5 px-4 text-white placeholder:text-neutral-700 outline-none font-sans tracking-wide"
          />

          {value && (
            <button
              onClick={() => onSearch("")}
              className="mr-2 p-2 rounded-full hover:bg-white/10 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex pr-4 items-center gap-2">
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] uppercase tracking-widest text-neutral-700 font-bold px-3 whitespace-nowrap">
              CTRL + K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
