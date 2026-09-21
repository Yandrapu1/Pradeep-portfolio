"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * Reusable tilt logic (rotation only — pair with your own surface/glow).
 * Returns motion values for rotateX/rotateY plus pointer handlers. Tilt is
 * disabled for touch devices and reduced-motion users.
 */
export function useTilt(max = 8) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return { rotateX, rotateY, onMove, onLeave, enabled: !reduce };
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/**
 * An interactive 3D tilt card: it leans toward the pointer in perspective and
 * a soft brand sheen tracks the cursor. Disabled for touch devices and for
 * visitors who prefer reduced motion.
 */
export function TiltCard({ children, className = "", max = 10 }: TiltCardProps) {
  const reduce = useReducedMotion();

  // Normalized pointer position within the card: -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, color-mix(in srgb, var(--brand) 22%, transparent), transparent 55%)`;
  // Sheen fades in as the card tilts away from rest, and out when centered.
  const glareOpacity = useTransform([sx, sy], ([a, b]: number[]) =>
    Math.min(1, (Math.abs(a) + Math.abs(b)) * 1.7)
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="[perspective:1200px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className={`relative will-change-transform ${className}`}
      >
        {children}
        <motion.span
          aria-hidden="true"
          style={{ background: glare, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
}
