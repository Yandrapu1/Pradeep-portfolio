"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every Framer Motion animation honors the visitor's
 * "reduce motion" OS setting automatically.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
