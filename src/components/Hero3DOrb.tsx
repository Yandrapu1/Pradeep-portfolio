"use client";

import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  label?: string;
}

export function Hero3DOrb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 380);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 380);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate 3D geodesic sphere points
    const nodes: Node3D[] = [];
    const numPoints = 44;
    const radius = Math.min(width, height) * 0.32;

    const labels = [
      "REACT",
      "NEXT.JS",
      "TYPESCRIPT",
      "NODE.JS",
      "EXPRESS",
      "PRISMA",
      "MYSQL",
      "REST API",
      "DOCKER",
      "NGINX",
      "STRIPE",
      "VERCEL",
    ];
    let labelIdx = 0;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const hasLabel = i % 4 === 0;
      const labelText = hasLabel ? labels[labelIdx++ % labels.length] : undefined;

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        label: labelText,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / (rect.width / 2);
      mouseY = (e.clientY - cy) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.006;
      targetRotX = mouseY * 0.45;
      targetRotY = mouseX * 0.45;

      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      const cosY = Math.cos(angle + rotY);
      const sinY = Math.sin(angle + rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedNodes: { x: number; y: number; z: number; label?: string }[] = [];

      nodes.forEach((node) => {
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseZ * cosY + node.baseX * sinY;

        let y1 = node.baseY * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.baseY * sinX;

        const fov = 380;
        const scale = fov / (fov + z2 + 190);

        projectedNodes.push({
          x: width / 2 + x1 * scale,
          y: height / 2 + y1 * scale,
          z: z2,
          label: node.label,
        });
      });

      // Connecting 3D Lattice Lines
      ctx.lineWidth = 0.8;
      const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

      const brandRgb = isDark ? "232, 164, 76" : "180, 83, 9";

      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.32;
            ctx.strokeStyle = `rgba(${brandRgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D Nodes & Labels
      projectedNodes.forEach((n) => {
        const opacity = Math.max(0.15, (n.z + radius) / (radius * 2));

        // Point glow
        ctx.fillStyle = `rgba(${brandRgb}, ${opacity * 0.95})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.6 * (opacity + 0.5), 0, Math.PI * 2);
        ctx.fill();

        if (n.label && opacity > 0.45) {
          ctx.font = "600 10px Geist Mono, ui-monospace, monospace";
          ctx.fillStyle = isDark
            ? `rgba(246, 243, 239, ${Math.min(1, opacity * 0.95)})`
            : `rgba(28, 25, 23, ${Math.min(1, opacity * 0.95)})`;
          ctx.fillText(n.label, n.x + 6, n.y + 3);
        }
      });

      // Pulse Core Radial Glow
      const pulseRadius = 15 + Math.sin(angle * 3.5) * 3;
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        pulseRadius * 2.2
      );
      gradient.addColorStop(0, `rgba(${brandRgb}, ${isDark ? 0.45 : 0.35})`);
      gradient.addColorStop(1, `rgba(${brandRgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, pulseRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto rounded-2xl bg-surface border border-line backdrop-blur-xs flex items-center justify-center shadow-xs hover:border-brand/40 transition-all overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-faint pointer-events-none border-t border-line pt-2">
        <span className="flex items-center gap-1.5 text-brand font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          3D SYSTEM LATTICE
        </span>
        <span className="text-muted font-medium">60 FPS REALTIME</span>
      </div>
    </div>
  );
}
