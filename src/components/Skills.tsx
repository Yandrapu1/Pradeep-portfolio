"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { SKILL_CATEGORIES } from "@/data/skills";
import { Spotlight, spotlightMove } from "./Spotlight";
import { motion, AnimatePresence } from "framer-motion";

export function Skills() {
  const [activeId, setActiveId] = useState(SKILL_CATEGORIES[0].id);
  const active =
    SKILL_CATEGORIES.find((c) => c.id === activeId) ?? SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="border-t border-line pt-12 space-y-12">
          <SectionHeader
            eyebrow="Capabilities"
            title="The stack I build with"
            description="Every technology here is one I've used in real production applications, APIs, or deployments — grouped by where it fits in the stack."
          />

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 border-b border-line pb-4" role="tablist" aria-label="Skill categories">
            {SKILL_CATEGORIES.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(category.id)}
                  className={`min-h-[44px] px-4 sm:px-5 rounded-lg text-sm font-medium transition-colors focus-ring ${
                    isActive
                      ? "bg-brand text-brand-ink shadow-sm"
                      : "text-muted hover:text-ink hover:bg-raised border border-line"
                  }`}
                >
                  {category.label}
                  <span className={`ml-2 text-xs ${isActive ? "text-brand-ink/70" : "text-faint"}`}>
                    {category.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-8"
            >
              <p className="text-base text-muted leading-relaxed max-w-3xl">
                {active.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {active.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseMove={spotlightMove}
                    className="group/spot relative overflow-hidden p-5 rounded-xl bg-surface border border-line hover:border-line-strong transition-colors"
                  >
                    <Spotlight />
                    <div className="relative z-[1] space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base font-semibold text-ink">
                          {skill.name}
                        </h3>
                        <span className="text-[11px] text-brand bg-brand-subtle px-2 py-0.5 rounded-md border border-brand/20 shrink-0">
                          {skill.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        {skill.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
