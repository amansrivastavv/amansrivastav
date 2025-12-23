"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicImageProps extends ImageProps {
  containerClassName?: string;
}

export function CinematicImage({ src, alt, className, containerClassName, ...props }: CinematicImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden bg-neutral-900/50", containerClassName)}>
      {/* Skeleton / Shimmer Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-neutral-800" />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={alt}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-xl grayscale" : "scale-100 blur-0 grayscale-0",
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
