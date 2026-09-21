"use client";

import React from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Compass, Database, Code2, Rocket } from "lucide-react";

const STAGES = [
  {
    step: "01",
    icon: Compass,
    title: "Discovery & architecture",
    body: "Understand the product, map user workflows, and set clear system boundaries before writing code.",
  },
  {
    step: "02",
    icon: Database,
    title: "Data & API design",
    body: "Model relational schemas, define constraints, and design clean, predictable API contracts.",
  },
  {
    step: "03",
    icon: Code2,
    title: "Full-stack build",
    body: "Implement type-safe interfaces, service routing, authentication, and payment and third-party flows.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Test & deploy",
    body: "Validate edge cases, configure environments, and ship to production with monitoring in place.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="border-t border-line pt-12 space-y-12">
          <SectionHeader
            eyebrow="Process"
            title="How I build"
            description="A consistent path from requirements to production — the same lifecycle whether it's a feature or a full application."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAGES.map(({ step, icon: Icon, title, body }, i) => (
              <Reveal key={step} delay={i * 0.06} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-surface border border-line hover:border-line-strong transition-colors space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-brand tabular-nums tracking-tight">
                      {step}
                    </span>
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-subtle border border-brand/20 text-brand">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
