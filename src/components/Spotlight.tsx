"use client";

import React from "react";

/**
 * Attach to a card's `onMouseMove`. Writes the pointer position to CSS vars on
 * the card so <Spotlight/> can render a soft highlight that follows the cursor.
 * Add `group/spot relative overflow-hidden` to that same card.
 */
export function spotlightMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function Spotlight() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      style={{
        background:
          "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--brand) 20%, transparent), transparent 72%)",
      }}
    />
  );
}
