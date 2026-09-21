import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/storage";

const MAX = { name: 120, email: 200, subject: 160, message: 4000 };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // Field validation
    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Subject is required." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Guard against oversized payloads
    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      subject.length > MAX.subject ||
      message.length > MAX.message
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 413 }
      );
    }

    // Save message locally to admin inbox data store
    const saved = saveMessage({ name, email, subject, message });

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact Form <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL || "contact@pradeep.dev",
            subject: `[Portfolio Inquiry] ${subject}`,
            html: `<h2>New Portfolio Message from ${name}</h2><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><blockquote style="padding:12px;background:#f4f4f5;border-left:4px solid #b45309;">${message}</blockquote>`,
          }),
        });
      } catch (emailErr) {
        console.error("[contact] Email dispatch error:", emailErr);
      }
      return NextResponse.json({ success: true, delivered: true, id: saved.id }, { status: 200 });
    }

    return NextResponse.json({ success: true, delivered: false, id: saved.id }, { status: 200 });
  } catch (error) {
    console.error("[contact] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
