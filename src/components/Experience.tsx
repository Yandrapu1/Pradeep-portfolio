import React from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Briefcase, CheckCircle2 } from "lucide-react";

interface Role {
  title: string;
  company: string;
  period: string;
  tag: string;
  bullets: string[];
  tech: string[];
}

const ROLES: Role[] = [
  {
    title: "Junior Software Engineer — Full Stack",
    company: "Akhilagna IT Services Pvt Ltd",
    period: "Oct 2025 — Present",
    tag: "Full-time",
    bullets: [
      "Deliver full-stack features across three deployed client applications — Vasavi Ayurveda (e-commerce), a Matrimony platform, and Vasavi Astrology — spanning React/Next.js frontends, Node.js/Express REST APIs, and SQL databases.",
      "Build secure authentication and authorization with JWT, Google OAuth 2.0, RBAC, protected API routes, and password hashing.",
      "Develop admin dashboards and CRUD functionality for products, member profiles, orders, and content.",
      "Integrate Razorpay payments, third-party logistics APIs, and Cloudinary image uploads for the live Vasavi Ayurveda platform.",
      "Deploy and maintain apps on an Ubuntu Linux VPS with Nginx and PM2, resolving production issues — API 404s, database connectivity, reverse-proxy config — from server logs and API testing.",
    ],
    tech: ["React", "Next.js", "Node.js", "Express", "MySQL", "JWT", "OAuth 2.0", "Razorpay", "Nginx", "PM2"],
  },
  {
    title: "Full-Stack Developer (Freelance)",
    company: "Bagel Master — UK client",
    period: "May 2025 — Jul 2025",
    tag: "Freelance",
    bullets: [
      "Delivered a live cafe and food-ordering application for a UK-based client end to end — customer app, admin dashboard, and backend.",
      "Built the ordering flow and admin dashboard, and integrated the Stripe payment gateway and Cloudinary image handling.",
      "Connected React and Node.js APIs to a PostgreSQL database and implemented order-management features.",
      "Migrated the PostgreSQL database from Neon to a Hostinger VPS with pg_dump / pg_restore, preserving data and constraints, then reconnected the backend.",
    ],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "Cloudinary"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="border-t border-line pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="Experience"
                title="Engineering in production"
                description="Hands-on full-stack work building and shipping real client applications, end to end."
              />
            </div>

            <div className="lg:col-span-8 space-y-6">
              {ROLES.map((role, i) => (
                <Reveal key={role.company} delay={i * 0.05}>
                  <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-6 border-b border-line">
                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-brand" />
                          <h3 className="text-lg sm:text-xl font-semibold text-ink">
                            {role.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                          <span className="font-medium text-ink">{role.company}</span>
                          <span className="text-faint">•</span>
                          <span className="text-xs text-brand bg-brand-subtle px-2 py-0.5 rounded-md border border-brand/20">
                            {role.tag}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-faint bg-raised px-3 py-1.5 rounded-md border border-line self-start whitespace-nowrap">
                        {role.period}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {role.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-5 border-t border-line flex flex-wrap gap-2">
                      {role.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-raised border border-line text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
