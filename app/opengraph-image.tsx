import { ImageResponse } from "next/og";

export const alt = "Servey - control your Mac from your iPhone and iPad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 500px at 50% -10%, rgba(34,220,110,0.28), transparent 60%), #0a0b0d",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(34,220,110,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "#22dc6e",
              }}
            />
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#f4f6f8" }}>Servey</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 700,
              color: "#f4f6f8",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>Your Mac.</span>
            <span style={{ color: "#22dc6e" }}>In your pocket.</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#9ba1a8", maxWidth: 900, lineHeight: 1.3 }}>
            Mirror your Mac to iPhone &amp; iPad - full mouse, keyboard, and a real
            terminal. Crystal-clear on your network, private P2P anywhere.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: "#9ba1a8" }}>servey.in</div>
          <div
            style={{
              fontSize: 24,
              color: "#22dc6e",
              border: "1px solid rgba(34,220,110,0.4)",
              borderRadius: 999,
              padding: "10px 24px",
            }}
          >
            Join the waitlist
          </div>
        </div>
      </div>
    ),
    size,
  );
}
