import React from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { GraduationCap, Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="pb-14 sm:pb-16 lg:pb-20 scroll-mt-20">
      <Container>
        <div className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Education"
                title="Academic foundation"
                description="Where the engineering mindset started."
              />
            </div>

            <Reveal className="lg:col-span-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brand">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-[0.14em]">
                      Bachelor of Technology
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-ink">
                    Electronics &amp; Communication Engineering
                  </h3>
                  <p className="text-sm text-muted">
                    Dr. Lankapalli Bullayya College of Engineering
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-6 gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-faint">
                    <Award className="w-3.5 h-3.5 text-brand" />
                    <span>Academic record</span>
                  </div>
                  <div className="text-base font-semibold text-ink">
                    CGPA <span className="text-brand">8.55</span>
                    <span className="text-faint font-normal"> / 10</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
