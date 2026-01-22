"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag" | "explore" | "hello">("default");

  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 }; // Heavier, smoother feel
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Enhanced detection including parent elements
      const cursorTarget = target.closest("[data-cursor]") || target.closest("a") || target.closest("button");
      
      if (cursorTarget) {
        // If it's a data-cursor element, use that type, otherwise generic hover
        const customType = cursorTarget.getAttribute("data-cursor");
        setCursorType((customType as any) || "hover");
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
      case "explore": return "OPEN";
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
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "mix-blend-difference" // Key change for visibility on all backgrounds
      )}
    >
      <motion.div 
        animate={{
            width: isLabelType ? 80 : cursorType === "hover" ? 20 : 10,
            height: isLabelType ? 80 : cursorType === "hover" ? 20 : 10,
            borderRadius: "100%",
        }}
        className={cn(
            "flex items-center justify-center border border-white bg-white/10 backdrop-blur-[1px]", 
            isLabelType ? "bg-white text-black" : ""
        )}
      >
        <AnimatePresence mode="wait">
            {isLabelType && (
                <motion.span
                    key={cursorType}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-[10px] font-black tracking-widest text-black"
                >
                    {getCursorContent()}
                </motion.span>
            )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
