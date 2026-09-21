"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-surface border border-line hover:border-brand text-muted hover:text-ink shadow-md transition-colors focus-ring min-w-[44px] min-h-[44px] flex items-center justify-center group"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-brand" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
