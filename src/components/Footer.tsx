import React from "react";
import { Container } from "./Container";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas py-10 text-muted">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Identity & Tagline */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-base font-semibold text-ink tracking-tight">
                Pradeep Yandrapu
              </span>
              <span className="text-line-strong">•</span>
              <span className="font-mono text-xs text-faint">
                Full Stack Developer
              </span>
            </div>

            <p className="text-sm text-faint">
              Building useful software from idea to production.
            </p>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-5">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors focus-ring min-h-[36px] inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors focus-ring min-h-[36px] inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors focus-ring min-h-[36px] inline-flex items-center gap-1"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </div>

            <span className="text-faint">© 2026 Pradeep Yandrapu</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
