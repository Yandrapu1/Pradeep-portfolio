import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No PDF resume file uploaded." }, { status: 400 });
    }

    if (!file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
      return NextResponse.json({ error: "Uploaded file must be a PDF." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const resumePath = path.join(publicDir, "resume.pdf");
    fs.writeFileSync(resumePath, buffer);

    return NextResponse.json(
      {
        success: true,
        message: "Resume PDF updated successfully!",
        url: "/resume.pdf",
        updatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[admin-resume] Error saving resume:", error);
    return NextResponse.json(
      { error: "Failed to save PDF resume." },
      { status: 500 }
    );
  }
}
