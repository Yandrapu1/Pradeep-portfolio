"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Mail,
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  LogOut,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  Inbox,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "resume" | "notifications">("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [authError, setAuthError] = useState(false);

  // Resume Upload state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeStatus, setResumeStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (res.status === 401) {
        setAuthError(true);
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("[admin] Error fetching messages:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete message.");
      }
    } catch (err) {
      console.error("[admin] Delete error:", err);
    }
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;

    setIsUploadingResume(true);
    setResumeStatus(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const res = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setResumeStatus({ type: "success", text: "Resume PDF updated successfully!" });
      setResumeFile(null);
    } catch (err: any) {
      setResumeStatus({ type: "error", text: err.message || "Failed to upload resume." });
    } finally {
      setIsUploadingResume(false);
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authError) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-canvas text-ink py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface border border-line shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-subtle border border-brand/20 flex items-center justify-center text-brand">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-ink">
                  Admin Dashboard
                </h1>
                <span className="text-[10px] font-mono text-brand bg-brand-subtle px-2 py-0.5 rounded border border-brand/20">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-xs font-mono text-faint">
                PRADEEP YANDRAPU — PORTFOLIO CONTROL CENTER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-raised border border-line text-xs font-mono text-muted hover:text-ink transition-colors min-h-[40px]"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-danger/10 border border-danger/20 text-xs font-mono text-danger hover:bg-danger/20 transition-colors min-h-[40px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* TAB CONTROLS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2 transition-all min-h-[44px] ${
              activeTab === "messages"
                ? "bg-brand text-brand-ink font-semibold shadow-xs"
                : "bg-surface text-muted hover:text-ink border border-line"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Contact Messages</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/10 text-current">
              {messages.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2 transition-all min-h-[44px] ${
              activeTab === "resume"
                ? "bg-brand text-brand-ink font-semibold shadow-xs"
                : "bg-surface text-muted hover:text-ink border border-line"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume Manager</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2 transition-all min-h-[44px] ${
              activeTab === "notifications"
                ? "bg-brand text-brand-ink font-semibold shadow-xs"
                : "bg-surface text-muted hover:text-ink border border-line"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Email Notifications</span>
          </button>
        </div>

        {/* TAB 1: CONTACT MESSAGES INBOX */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages by name, email, or content..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface border border-line text-xs text-ink placeholder-faint focus-ring min-h-[40px]"
                />
              </div>

              <button
                type="button"
                onClick={fetchMessages}
                disabled={isLoadingMessages}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-line text-xs font-mono text-muted hover:text-ink transition-colors shrink-0 min-h-[40px]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? "animate-spin" : ""}`} />
                <span>Refresh Inbox</span>
              </button>
            </div>

            {isLoadingMessages ? (
              <div className="p-12 text-center bg-surface border border-line rounded-2xl">
                <Loader2 className="w-6 h-6 animate-spin text-brand mx-auto mb-2" />
                <p className="text-xs font-mono text-faint">Loading contact messages...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-12 text-center bg-surface border border-line rounded-2xl space-y-2 font-mono text-xs text-faint">
                <Mail className="w-8 h-8 text-faint mx-auto mb-2 opacity-50" />
                <p className="text-ink font-semibold">No messages found</p>
                <p>When visitors fill out your contact form, submissions will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 sm:p-6 rounded-2xl bg-surface border border-line hover:border-line-strong transition-all space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-ink">{msg.name}</h3>
                          <span className="text-xs text-brand font-mono">&lt;{msg.email}&gt;</span>
                        </div>
                        <div className="text-xs font-mono text-faint pt-0.5">
                          Subject: <span className="text-ink font-medium">{msg.subject}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <span className="text-[11px] font-mono text-faint">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>

                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="px-2.5 py-1 rounded bg-brand-subtle border border-brand/20 text-brand text-xs font-mono hover:bg-brand hover:text-white transition-colors"
                        >
                          Reply
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded hover:bg-danger/10 text-faint hover:text-danger transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESUME MANAGER */}
        {activeTab === "resume" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-ink">Resume PDF Manager</h2>
              <p className="text-xs text-muted">
                Upload a new PDF resume. It will overwrite <code className="text-brand">/public/resume.pdf</code> and update all site download links immediately.
              </p>
            </div>

            <form onSubmit={handleResumeUpload} className="space-y-4">
              {resumeStatus && (
                <div
                  className={`p-4 rounded-lg text-xs font-mono flex items-center gap-2 ${
                    resumeStatus.type === "success"
                      ? "bg-success/10 border border-success/30 text-success"
                      : "bg-danger/10 border border-danger/30 text-danger"
                  }`}
                >
                  {resumeStatus.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{resumeStatus.text}</span>
                </div>
              )}

              <div className="border-2 border-dashed border-line hover:border-brand/50 rounded-xl p-8 text-center space-y-3 transition-colors bg-canvas">
                <Upload className="w-8 h-8 text-brand mx-auto opacity-75" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-ink">
                    Select your updated Resume PDF file
                  </p>
                  <p className="text-[11px] font-mono text-faint">Must be a valid .pdf file</p>
                </div>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="block mx-auto text-xs text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-mono file:bg-brand file:text-brand-ink hover:file:bg-brand-hover cursor-pointer"
                />

                {resumeFile && (
                  <p className="text-xs font-mono text-brand pt-2">
                    Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-brand hover:underline"
                >
                  <span>Preview Current Resume (/resume.pdf)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="submit"
                  disabled={!resumeFile || isUploadingResume}
                  className="px-6 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-brand-ink text-xs font-mono font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50 min-h-[42px]"
                >
                  {isUploadingResume ? "Uploading PDF..." : "Upload & Overwrite Resume"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: EMAIL NOTIFICATIONS SETTINGS */}
        {activeTab === "notifications" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-ink">Instant Inbox Email Dispatch</h2>
              <p className="text-xs text-muted">
                Receive instant email alerts on your phone whenever a recruiter or client submits the contact form.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-canvas border border-line space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-brand font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>RESEND EMAIL INTEGRATION INSTRUCTIONS</span>
              </div>

              <ol className="list-decimal pl-5 space-y-2 text-muted leading-relaxed">
                <li>
                  Sign up for a free account at <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-brand underline">Resend.com</a> (Free tier includes 3,000 emails/month).
                </li>
                <li>Generate an API Key inside your Resend Dashboard.</li>
                <li>
                  Add the following environment variables to your <code className="text-brand">.env.local</code> file:
                </li>
              </ol>

              <pre className="p-3 rounded-lg bg-black/80 text-emerald-400 text-[11px] overflow-x-auto leading-relaxed">
                <code>{`RESEND_API_KEY=re_123456789_your_key_here\nADMIN_EMAIL=your-personal-email@gmail.com\nADMIN_PASSWORD=your_secret_admin_password`}</code>
              </pre>

              <p className="text-[11px] text-faint">
                Once set, every new message will be stored in your Admin Inbox <strong>and</strong> emailed directly to your inbox!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
