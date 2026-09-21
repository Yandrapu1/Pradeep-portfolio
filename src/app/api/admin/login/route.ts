import { NextResponse } from "next/server";
import { verifyAdminPassword, setAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body?.password ?? "").trim();

    if (!password) {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[admin-login] Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
