"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag" | "explore" | "hello">("default");

  const springConfig = { damping: 20, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]");
      const hoverType = cursorTarget?.getAttribute("data-cursor") as any;
      
      if (hoverType) {
        setCursorType(hoverType);
      } else if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const getCursorContent = () => {
    switch (cursorType) {
      case "view": return "VIEW";
      case "drag": return "DRAG";
      case "explore": return "EXPLORE";
      case "hello": return "HELLO";
      default: return "";
    }
  };

  const isLabelType = ["view", "drag", "explore", "hello"].includes(cursorType);

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center transition-[width,height,background-color,border-radius] duration-300 ease-out ${
        isLabelType 
          ? "w-20 h-20 rounded-full bg-cyan-500 text-black font-black text-[10px] tracking-widest scale-100" 
          : cursorType === "hover"
          ? "w-12 h-12 rounded-full border border-cyan-500/20 bg-cyan-500/10 scale-100"
          : "w-8 h-8 rounded-full border border-cyan-500/50 scale-100"
      }`}
    >
      <AnimatePresence mode="wait">
        {isLabelType ? (
          <motion.span
            key={cursorType}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center"
          >
            {getCursorContent()}
          </motion.span>
        ) : (
          <div className={`w-1 h-1 rounded-full bg-cyan-500 transition-opacity duration-300 ${cursorType === "hover" ? "opacity-0" : "opacity-100"}`} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
