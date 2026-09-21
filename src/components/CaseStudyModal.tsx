"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/projects";
import {
  X,
  ArrowUpRight,
  Terminal,
  Cpu,
  Database,
  Layers,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-canvas/85 backdrop-blur-xl flex justify-center p-4 sm:p-6 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Case Study: ${project.name}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-4xl bg-surface border border-line rounded-2xl shadow-2xl my-auto overflow-hidden"
          >
            {/* TOP MODAL BAR */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 bg-surface/95 backdrop-blur-md border-b border-line">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-brand bg-brand-subtle px-2.5 py-1 rounded-md border border-brand/20 font-semibold">
                  CASE STUDY // {project.number}
                </span>
                <span className="font-mono text-xs text-faint hidden sm:inline">
                  {project.badge}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-ink hover:bg-raised rounded-md transition-colors focus-ring"
                aria-label="Close Case Study Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL BODY CONTENT */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">
              {/* HEADER TITLE BLOCK */}
              <div className="space-y-4">
                <div className="font-mono text-xs text-faint uppercase tracking-wider">
                  {project.type}
                </div>
                <h2 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
                  {project.name}
                </h2>
                <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
                  {project.oneLiner}
                </p>

                {/* ROLE & TECH BADGES */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-muted border-t border-line">
                  <div>
                    <span className="text-faint">MY ROLE:</span>{" "}
                    <span className="text-ink font-medium">
                      {project.caseStudy.role}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-raised border border-line text-xs font-mono text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* OVERVIEW SECTION */}
              <div className="space-y-4 pt-4 border-t border-line">
                <h3 className="font-mono text-xs text-brand uppercase tracking-wider font-medium">
                  01 // PROJECT OVERVIEW
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {project.caseStudy.overview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-xl bg-canvas border border-line space-y-2">
                    <div className="flex items-center gap-2 text-faint font-mono text-xs uppercase font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-brand" />
                      THE PROBLEM
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-canvas border border-line space-y-2">
                    <div className="flex items-center gap-2 text-faint font-mono text-xs uppercase font-medium">
                      <Lightbulb className="w-3.5 h-3.5 text-brand" />
                      THE ENGINEERING SOLUTION
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {project.caseStudy.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* SYSTEM ARCHITECTURE DIAGRAM */}
              <div className="space-y-4 pt-4 border-t border-line">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs text-brand uppercase tracking-wider font-medium">
                    02 // SYSTEM ARCHITECTURE FLOW
                  </h3>
                  <span className="font-mono text-[10px] text-faint">
                    END-TO-END PIPELINE
                  </span>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-canvas border border-line space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
                      <div className="flex items-center gap-2 text-brand font-mono text-[11px]">
                        <Layers className="w-3.5 h-3.5" />
                        FRONTEND
                      </div>
                      <div className="text-xs font-mono text-ink">
                        {project.caseStudy.architectureNodes.frontend}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
                      <div className="flex items-center gap-2 text-brand font-mono text-[11px]">
                        <Cpu className="w-3.5 h-3.5" />
                        API LAYER
                      </div>
                      <div className="text-xs font-mono text-ink">
                        {project.caseStudy.architectureNodes.api}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
                      <div className="flex items-center gap-2 text-brand font-mono text-[11px]">
                        <Terminal className="w-3.5 h-3.5" />
                        BUSINESS LOGIC
                      </div>
                      <div className="text-xs font-mono text-ink">
                        {project.caseStudy.architectureNodes.businessLogic}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
                      <div className="flex items-center gap-2 text-brand font-mono text-[11px]">
                        <Database className="w-3.5 h-3.5" />
                        DATABASE
                      </div>
                      <div className="text-xs font-mono text-ink">
                        {project.caseStudy.architectureNodes.database}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
                      <div className="flex items-center gap-2 text-brand font-mono text-[11px]">
                        <ExternalLink className="w-3.5 h-3.5" />
                        EXTERNAL SERVICES
                      </div>
                      <div className="text-xs font-mono text-ink">
                        {project.caseStudy.architectureNodes.externalServices}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
                      <div className="flex items-center gap-2 text-brand font-mono text-[11px]">
                        <Cloud className="w-3.5 h-3.5" />
                        PRODUCTION
                      </div>
                      <div className="text-xs font-mono text-ink">
                        {project.caseStudy.architectureNodes.production}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KEY FEATURES */}
              <div className="space-y-4 pt-4 border-t border-line">
                <h3 className="font-mono text-xs text-brand uppercase tracking-wider font-medium">
                  03 // KEY FEATURES IMPLEMENTED
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.caseStudy.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-raised border border-line"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-muted">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENGINEERING CHALLENGES & DECISIONS */}
              <div className="space-y-6 pt-4 border-t border-line">
                <h3 className="font-mono text-xs text-brand uppercase tracking-wider font-medium">
                  04 // ENGINEERING CHALLENGES & DECISIONS (WHY / HOW / SOLVED)
                </h3>

                <div className="space-y-5">
                  {project.caseStudy.engineeringChallenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-canvas border border-line space-y-4"
                    >
                      <h4 className="text-base font-medium text-ink flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand" />
                        {challenge.title}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="space-y-1">
                          <span className="font-mono text-[11px] text-faint uppercase font-semibold">
                            WHY IT MATTERS:
                          </span>
                          <p className="text-muted">{challenge.why}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="font-mono text-[11px] text-faint uppercase font-semibold">
                            HOW IT WAS DESIGNED:
                          </span>
                          <p className="text-muted">{challenge.how}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-line/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="space-y-1">
                          <span className="font-mono text-[11px] text-faint uppercase font-semibold">
                            WHAT WAS HARD:
                          </span>
                          <p className="text-muted">{challenge.whatWasHard}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="font-mono text-[11px] text-brand uppercase font-semibold">
                            HOW IT WAS SOLVED:
                          </span>
                          <p className="text-ink">{challenge.howSolved}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-xs text-faint">
                  PRADEEP YANDRAPU — CASE STUDY
                </div>

                <div className="flex items-center gap-3">
                  {project.caseStudy.liveUrl && (
                    <a
                      href={project.caseStudy.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-brand hover:bg-brand-hover text-brand-ink text-xs font-mono font-medium transition-colors focus-ring min-h-[44px]"
                    >
                      <span>VISIT LIVE APP</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-md bg-raised hover:bg-surface border border-line text-xs font-mono text-muted hover:text-ink transition-colors focus-ring min-h-[44px]"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
