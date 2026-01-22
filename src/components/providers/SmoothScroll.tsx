"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SmoothScroll = ({ children }: { children: any }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
