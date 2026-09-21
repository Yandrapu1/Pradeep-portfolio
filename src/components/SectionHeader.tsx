"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`space-y-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-brand/60" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-ink leading-[1.1] text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
