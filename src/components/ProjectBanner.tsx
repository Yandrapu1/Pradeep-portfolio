"use client";

import React, { useState } from "react";
import type { Project } from "@/data/projects";

/**
 * Project banner: shows the screenshot at /public/projects/<id>.jpg when it
 * exists, otherwise a designed gradient panel with the project name — so cards
 * look complete before real screenshots are added.
 */
export function ProjectBanner({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [from, to] = project.gradient;

  return (
    <div className={`relative overflow-hidden bg-raised ${className}`}>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      {/* Subtle depth + grid texture over the gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.18),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Fallback label (hidden once a real screenshot loads) */}
      {failed && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/70">
              {project.type}
            </div>
            <div className="text-lg sm:text-2xl font-semibold text-white drop-shadow-sm">
              {project.name}
            </div>
          </div>
        </div>
      )}

      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.name} preview`}
          ref={(node) => {
            if (node && node.complete && node.naturalWidth === 0) setFailed(true);
          }}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      )}
    </div>
  );
}
