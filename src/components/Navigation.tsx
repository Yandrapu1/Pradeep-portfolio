"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { RESUME_URL } from "@/data/site";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-canvas/85 backdrop-blur-md border-b border-line py-3.5 shadow-sm"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#home"
            className="group flex items-center gap-3 focus-ring min-h-[44px] py-1 px-1.5 -ml-1.5 rounded-md transition-colors"
            onClick={() => setActiveSection("home")}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-125" />
            <span className="text-base font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
              Pradeep Yandrapu
            </span>
          </Link>

          {/* Desktop Nav Links with Framer Motion layoutId Pill Indicator */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative min-h-[40px] flex items-center px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors focus-ring ${
                    isActive
                      ? "text-ink"
                      : "text-muted hover:text-ink hover:bg-surface/60"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-brand rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions: Theme Toggle, Resume & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-ink bg-surface hover:bg-raised border border-line hover:border-line-strong min-h-[40px] px-4 rounded-lg transition-colors duration-200 focus-ring shadow-xs"
            >
              Résumé
              <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-ink transition-colors" />
            </a>

            {/* Mobile Hamburger Toggle (>=44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-ink hover:bg-surface rounded-md transition-colors focus-ring"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Overlay using AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 lg:hidden bg-canvas/95 backdrop-blur-xl flex flex-col justify-between p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pt-2 pb-6 border-b border-line">
              <span className="text-base font-semibold tracking-tight text-ink">
                Pradeep Yandrapu
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-ink hover:bg-surface rounded-md transition-colors focus-ring"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Nav List */}
            <nav className="flex flex-col gap-3 py-6">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                const indexStr = String(idx + 1).padStart(2, "0");

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="group flex items-center justify-between min-h-[48px] py-2 border-b border-line/40 transition-colors focus-ring"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-faint group-hover:text-brand transition-colors">
                        {indexStr}
                      </span>
                      <span
                        className={`text-2xl font-medium tracking-tight transition-colors ${
                          isActive
                            ? "text-ink font-semibold"
                            : "text-muted group-hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-brand" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Footer */}
            <div className="pt-6 border-t border-line flex flex-col gap-4">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 text-sm font-medium text-ink bg-surface hover:bg-raised border border-line py-3.5 rounded-lg transition-colors focus-ring"
              >
                View résumé
                <ArrowUpRight className="w-4 h-4 text-brand" />
              </a>
              <p className="text-center text-xs text-faint">
                Pradeep Yandrapu — Full Stack Developer
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
