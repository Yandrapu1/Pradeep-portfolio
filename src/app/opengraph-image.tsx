import { ImageResponse } from "next/og";

export const alt = "Pradeep Yandrapu — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080b12",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#3b82f6",
            }}
          />
          <div style={{ fontSize: 26, color: "#94a3b8", letterSpacing: 1 }}>
            Full Stack Developer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.05,
            }}
          >
            Pradeep Yandrapu
          </div>
          <div style={{ fontSize: 34, color: "#94a3b8", maxWidth: 900 }}>
            Building products from idea to production.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#64748b" }}>
          <span>React</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>MySQL</span>
          <span>Prisma</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
