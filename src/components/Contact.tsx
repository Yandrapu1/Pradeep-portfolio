"use client";

import React, { useState } from "react";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, EMAIL } from "@/data/site";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Mail,
  FileText,
} from "lucide-react";

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

const inputBase =
  "w-full min-h-[46px] px-3.5 py-2.5 rounded-lg bg-canvas border text-sm text-ink placeholder-faint transition-colors focus-ring";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email.trim()))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";

    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit message.");

      setDelivered(Boolean(data.delivered));
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="border-t border-line pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                eyebrow="Contact"
                title="Have something worth building?"
                description="Whether you're looking for a developer to join your team or someone to turn an idea into a working product, let's talk."
              />

              <div className="pt-4 border-t border-line space-y-4">
                <span className="text-xs uppercase tracking-[0.14em] text-faint">
                  Direct links
                </span>
                <div className="flex flex-wrap items-center gap-6">
                  {EMAIL && (
                    <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring">
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  )}
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring">
                    <GithubIcon className="w-4 h-4" /> GitHub
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring">
                    <LinkedinIcon className="w-4 h-4" /> LinkedIn
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[40px] text-sm text-muted hover:text-ink transition-colors focus-ring">
                    <FileText className="w-4 h-4" /> Résumé
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-xs">
                <span className="text-sm font-medium text-ink block border-b border-line pb-4">
                  Send a message
                </span>

                {isSuccess ? (
                  <div className="p-6 rounded-xl bg-canvas border border-success/40 space-y-4">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="w-5 h-5" />
                      <h3 className="font-medium text-ink">
                        {delivered ? "Message sent" : "Message received"}
                      </h3>
                    </div>
                    {delivered ? (
                      <p className="text-sm text-muted leading-relaxed">
                        Thanks for reaching out — I&apos;ll get back to you shortly.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-muted leading-relaxed">
                          Thanks — your message was received. Email delivery
                          isn&apos;t configured on this deployment yet, so the
                          fastest way to reach me directly is:
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline focus-ring">GitHub</a>
                          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline focus-ring">LinkedIn</a>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="min-h-[44px] px-4 py-2.5 rounded-lg bg-raised hover:bg-surface border border-line text-sm text-ink transition-colors focus-ring"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-sm text-danger flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-sm text-muted">
                        Name <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                        aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder="Your name or company"
                        className={`${inputBase} ${errors.name ? "border-danger" : "border-line focus:border-brand"}`}
                      />
                      {errors.name && <p id="name-error" className="text-xs text-danger">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-sm text-muted">
                        Email <span className="text-brand">*</span>
                      </label>
                      <input
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                        placeholder="you@example.com"
                        className={`${inputBase} ${errors.email ? "border-danger" : "border-line focus:border-brand"}`}
                      />
                      {errors.email && <p id="email-error" className="text-xs text-danger">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="block text-sm text-muted">
                        Subject <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                        aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined}
                        placeholder="Project inquiry / full-stack role"
                        className={`${inputBase} ${errors.subject ? "border-danger" : "border-line focus:border-brand"}`}
                      />
                      {errors.subject && <p id="subject-error" className="text-xs text-danger">{errors.subject}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-sm text-muted">
                        Message <span className="text-brand">*</span>
                      </label>
                      <textarea
                        id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
                        aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}
                        placeholder="Tell me about your product, timeline, or the role."
                        className={`${inputBase} min-h-[120px] resize-none ${errors.message ? "border-danger" : "border-line focus:border-brand"}`}
                      />
                      {errors.message && <p id="message-error" className="text-xs text-danger">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 rounded-lg bg-brand hover:bg-brand-hover disabled:opacity-60 text-brand-ink text-sm font-medium transition-colors focus-ring shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
