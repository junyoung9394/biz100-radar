import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Biz100 Radar | 공식자료 기반 기업정보";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f2744 0%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "12px 24px",
            color: "#93c5fd",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 28,
            letterSpacing: "0.08em"
          }}
        >
          B100
        </div>
        <div
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 900,
            textAlign: "center",
            marginBottom: 20,
            letterSpacing: "-0.02em"
          }}
        >
          Biz100 Radar
        </div>
        <div
          style={{
            color: "#bfdbfe",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 32
          }}
        >
          공식자료 기반 기업정보 대시보드
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px"
          }}
        >
          {["한국 기업", "미국 기업", "일본 기업"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "999px",
                padding: "10px 24px",
                color: "white",
                fontSize: 20
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
