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
      "Ship full-stack features across three live client platforms — Vasavi Ayurveda (e-commerce), a Matrimony matchmaking app, and Vasavi Astrology — owning work end to end across React/Next.js frontends, Node.js/Express REST APIs, and SQL databases.",
      "Engineer secure auth shared across all three apps: JWT sessions, Google OAuth 2.0, role-based access control (RBAC), protected API routes, and bcrypt password hashing.",
      "Build admin dashboards with full CRUD over products, member profiles, orders, and content — giving non-technical clients direct, self-serve control of their platforms.",
      "Integrate Razorpay payments, third-party logistics APIs, and Cloudinary media uploads into the live Vasavi Ayurveda storefront, with server-verified order totals and webhook-confirmed payment states.",
      "Own deployment and uptime on an Ubuntu Linux VPS with Nginx and PM2 — diagnosing and resolving production incidents (API 404s, database connectivity, reverse-proxy misconfig) directly from server logs and live API testing.",
    ],
    tech: ["React", "Next.js", "Node.js", "Express", "MySQL", "JWT", "OAuth 2.0", "Razorpay", "Nginx", "PM2"],
  },
  {
    title: "Full-Stack Developer (Freelance)",
    company: "Bagel Master — UK client",
    period: "May 2025 — Jul 2025",
    tag: "Freelance",
    bullets: [
      "Delivered a live café and food-ordering platform for a UK-based client end to end as the sole developer — customer app, admin dashboard, and backend.",
      "Built the full ordering flow and admin order-management dashboard, integrating Stripe payments with webhook-confirmed status and Cloudinary image handling.",
      "Connected a React/Node.js stack to PostgreSQL and implemented the live order lifecycle from checkout through fulfilment.",
      "Migrated the production PostgreSQL database from Neon to a Hostinger VPS using pg_dump / pg_restore with zero data loss — preserving all constraints — then reconnected and verified the backend.",
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
