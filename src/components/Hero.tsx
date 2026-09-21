"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { TiltCard } from "./TiltCard";
import { Hero3DOrb } from "./Hero3DOrb";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/data/site";
import { ArrowRight, ArrowUpRight, FileText, Layers, Cpu, Database, Cloud } from "lucide-react";
import { motion } from "framer-motion";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const STACK = [
  { icon: Layers, label: "Frontend", detail: "Next.js · React · TypeScript" },
  { icon: Cpu, label: "Backend", detail: "Node.js · Express · REST APIs" },
  { icon: Database, label: "Data", detail: "MySQL · PostgreSQL · Prisma" },
  { icon: Cloud, label: "Production", detail: "Linux · Nginx · PM2 · Vercel" },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block word-reveal pr-[0.25em]"
            style={{ animationDelay: `${0.12 + i * 0.06}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}

function PortraitFrame() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[5/4] bg-gradient-to-br from-raised to-surface flex items-center justify-center border-b border-line overflow-hidden">
      <span className="text-6xl font-semibold tracking-tight text-line-strong select-none">
        PY
      </span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/portrait.jpg"
          alt="Pradeep Yandrapu"
          // Catch a 404 that resolves before React attaches onError (SSR hydration).
          ref={(node) => {
            if (node && node.complete && node.naturalWidth === 0) setFailed(true);
          }}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      )}
      {failed && (
        <span className="absolute bottom-4 left-5 text-xs text-faint">
          Portrait coming soon
        </span>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-24 pb-12 sm:pt-24 sm:pb-14 lg:pt-24 lg:pb-16"
    >
      {/* Subtle, near-weightless ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,var(--brand-subtle),transparent_70%)]"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs text-muted shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Available for full-time & freelance
              </span>
            </motion.div>

            <div className="space-y-6">
              <AnimatedHeadline
                text="Building products from idea to production."
                className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink leading-[1.08]"
              />

              <motion.p
                variants={item}
                className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl"
              >
                I&apos;m Pradeep Yandrapu, a full stack developer. I build modern
                web applications end to end — frontend, backend, databases, APIs,
                integrations, and the infrastructure that keeps them running.
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-ink bg-brand hover:bg-brand-hover min-h-[48px] px-6 rounded-lg transition-colors focus-ring shadow-sm group"
              >
                <span>View my work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink bg-surface hover:bg-raised border border-line hover:border-line-strong min-h-[48px] px-6 rounded-lg transition-colors focus-ring"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
            >
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring"
              >
                <FileText className="w-4 h-4" />
                <span>Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Interactive 3D System Model Canvas */}
            <Hero3DOrb />

            <TiltCard className="rounded-2xl bg-surface border border-line shadow-sm overflow-hidden">
              {/* Stack summary */}
              <div className="p-4 sm:p-5 space-y-1">
                {STACK.map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex items-center gap-3 py-1.5">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-raised border border-line text-brand shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-ink">{label}</div>
                      <div className="text-[11px] font-mono text-faint truncate">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
