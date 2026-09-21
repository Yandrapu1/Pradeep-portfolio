import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export function getMessages(): ContactMessage[] {
  try {
    ensureDataDirectory();
    const data = fs.readFileSync(MESSAGES_FILE, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("[storage] Error reading messages:", error);
    return [];
  }
}

export function saveMessage(msg: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  ensureDataDirectory();
  const messages = getMessages();
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...msg,
    createdAt: new Date().toISOString(),
    read: false,
  };

  messages.unshift(newMessage); // Newest first
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf8");
  return newMessage;
}

export function deleteMessage(id: string): boolean {
  ensureDataDirectory();
  const messages = getMessages();
  const filtered = messages.filter((m) => m.id !== id);
  if (filtered.length !== messages.length) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(filtered, null, 2), "utf8");
    return true;
  }
  return false;
}
