import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getMessages, deleteMessage } from "@/lib/storage";

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const messages = getMessages();
  return NextResponse.json({ messages }, { status: 200 });
}

export async function DELETE(request: Request) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    const success = deleteMessage(id);
    if (!success) {
      return NextResponse.json({ error: "Message not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[admin-messages] Error deleting message:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
