"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas text-ink flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-surface border border-line rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
      >
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-brand-subtle border border-brand/20 flex items-center justify-center text-brand mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Admin Portal
          </h1>
          <p className="text-xs font-mono text-faint">
            PRADEEP YANDRAPU — CONTROL PANEL
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-xs text-danger flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="password" className="block font-mono text-xs text-muted">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full min-h-[44px] pl-10 pr-4 rounded-lg bg-canvas border border-line text-sm text-ink placeholder-faint focus-ring"
              />
              <Lock className="w-4 h-4 text-faint absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-[11px] font-mono text-faint pt-1">
              Default password: <code className="text-brand">admin123</code> (Set <code className="text-brand">ADMIN_PASSWORD</code> in .env)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-lg bg-brand hover:bg-brand-hover text-brand-ink text-sm font-semibold transition-all focus-ring shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
