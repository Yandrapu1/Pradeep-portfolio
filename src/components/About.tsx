import React from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Cpu, Code2, Layers, ShieldCheck } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Cpu,
    title: "Systems thinking",
    desc: "An ECE background trained me to reason about end-to-end data flow, bottlenecks, and how components integrate.",
  },
  {
    icon: Code2,
    title: "Full-stack architecture",
    desc: "I build cohesive platforms across client interfaces, backend APIs, relational databases, and third-party services.",
  },
  {
    icon: Layers,
    title: "Adaptability",
    desc: "I pick up new frameworks, database paradigms, and infrastructure tooling quickly and put them to work.",
  },
  {
    icon: ShieldCheck,
    title: "Production quality",
    desc: "I prioritize maintainability, clean schemas, secure authentication, and robust error handling.",
  },
];

export function About() {
  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="border-t border-line pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-5">
              <SectionHeader
                eyebrow="About"
                title="Engineering from first principles"
              />
              <p className="text-sm text-faint">
                ECE → Software → Full stack → Production
              </p>
            </div>

            <Reveal className="lg:col-span-8 space-y-10">
              <div className="space-y-6 text-lg text-muted leading-relaxed max-w-prose">
                <p>
                  My background is in Electronics &amp; Communication Engineering.
                  Studying hardware logic, signal systems, and low-level
                  computation built a disciplined, systems-first mindset — I treat
                  software as interconnected, deterministic architecture rather
                  than isolated snippets.
                </p>
                <p>
                  Moving into software was a natural step. The core principles
                  carried over: break complex requirements into modular
                  components, understand how data moves across layers, and keep
                  systems stable under real-world constraints.
                </p>
                <p>
                  Today I design and build full-stack web applications — from
                  responsive interfaces to SQL schemas, REST APIs, and production
                  deployments — with a focus on software that works predictably
                  and scales reliably.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="pl-4 border-l-2 border-brand/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-ink">
                      <Icon className="w-4 h-4 text-brand" />
                      <span className="text-sm font-semibold">{title}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
