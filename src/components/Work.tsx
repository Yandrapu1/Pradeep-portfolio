"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { ProjectBanner } from "./ProjectBanner";
import { PROJECTS, Project } from "@/data/projects";
import { CaseStudyModal } from "./CaseStudyModal";
import { Spotlight, spotlightMove } from "./Spotlight";
import { useTilt } from "./TiltCard";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 rounded-md bg-raised border border-line text-xs text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  featured = false,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: () => void;
}) {
  const { rotateX, rotateY, onMove, onLeave } = useTilt(featured ? 5 : 9);

  return (
    <div className="[perspective:1100px] h-full">
      <motion.article
        style={{ rotateX, rotateY }}
        role="button"
        tabIndex={0}
        aria-label={`Open case study: ${project.name}`}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        onMouseMove={(e) => {
          onMove(e);
          spotlightMove(e);
        }}
        onMouseLeave={onLeave}
        className="group group/spot relative overflow-hidden h-full cursor-pointer rounded-2xl bg-surface border border-line hover:border-line-strong transition-colors shadow-xs focus-ring will-change-transform"
      >
        <Spotlight />

        {featured ? (
          <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 h-full">
            <ProjectBanner
              project={project}
              className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[240px] border-b lg:border-b-0 lg:border-r border-line"
            />
            <div className="p-6 sm:p-8 lg:p-9 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand tabular-nums">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-faint">
                  {project.type}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
                {project.name}
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.oneLiner}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {project.caseStudy.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between pt-2">
                <TechChips items={project.technologies.slice(0, 4)} />
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand shrink-0">
                  Case study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-[1] flex flex-col h-full">
            <ProjectBanner
              project={project}
              className="aspect-[16/10] border-b border-line"
            />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand tabular-nums">
                    {project.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-faint truncate">
                    {project.type}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-muted leading-relaxed line-clamp-3">
                {project.oneLiner}
              </p>
              <div className="mt-auto pt-2">
                <TechChips items={project.technologies.slice(0, 3)} />
              </div>
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
}

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [featured, ...rest] = PROJECTS;

  return (
    <>
      <section id="work" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
        <Container>
          <div className="border-t border-line pt-12 space-y-10">
            <SectionHeader
              eyebrow="Selected work"
              title="Projects built for production"
              description="E-commerce platforms, full-stack systems, and real products shipped end to end. Open any project for the full case study."
            />

            <Reveal>
              <ProjectCard
                project={featured}
                featured
                onOpen={() => setSelected(featured)}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rest.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.06} className="h-full">
                  <ProjectCard project={project} onOpen={() => setSelected(project)} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
