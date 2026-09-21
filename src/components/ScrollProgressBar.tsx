"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin progress line at the very top of the page, tracking scroll depth.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-brand origin-left z-[60]"
    />
  );
}
