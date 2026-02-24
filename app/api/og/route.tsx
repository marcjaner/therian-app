import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animal = (searchParams.get("animal") || "WOLF").toUpperCase();
  const score = searchParams.get("score") || "94";
  const emoji = searchParams.get("emoji") || "🐺";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          background: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
        }}
      >
        {/* Top: branding */}
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: 800,
            color: "#FFAA00",
            letterSpacing: "0.15em",
          }}
        >
          THERIAN.
        </div>

        {/* Center: result */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontSize: "120px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {animal}
            </span>
            <span style={{ fontSize: "80px" }}>{emoji}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "48px",
              fontWeight: 800,
              color: "#FFAA00",
              letterSpacing: "0.1em",
            }}
          >
            {score}% MATCH
          </div>

          {/* Score bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "12px",
              background: "#111",
              border: "2px solid #FFAA00",
            }}
          >
            <div
              style={{
                width: `${score}%`,
                height: "100%",
                background: "#FFAA00",
              }}
            />
          </div>
        </div>

        {/* Bottom: CTA */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#888888",
            letterSpacing: "0.08em",
          }}
        >
          therian-app-iota.vercel.app — find your animal.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
