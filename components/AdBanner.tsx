"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdVariant = "banner" | "sidebar" | "infeed";

type AdBannerProps = {
  slot: string;
  format?: string;
  layout?: string;
  variant?: AdVariant;
};

const MIN_HEIGHTS: Record<AdVariant, number> = {
  banner:  250,
  sidebar: 600,
  infeed:  200,
};

const IS_DEV = process.env.NODE_ENV === "development";

export default function AdBanner({
  slot,
  format = "auto",
  layout,
  variant = "banner",
}: AdBannerProps) {
  const minHeight = MIN_HEIGHTS[variant];

  useEffect(() => {
    if (IS_DEV) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // 광고 차단 환경에서 조용히 무시
    }
  }, []);

  if (IS_DEV) {
    return (
      <div
        className="ad-box"
        style={{
          minHeight,
          background: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          fontSize: 13,
          borderRadius: 8,
        }}
      >
        광고 영역 ({variant} / slot: {slot})
      </div>
    );
  }

  return (
    <div
      className="ad-box"
      style={{ minHeight, overflow: "hidden", maxWidth: "100%" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8518556382646891"
        data-ad-slot={slot}
        data-ad-format={format}
        {...(layout ? { "data-ad-layout": layout } : {})}
        data-full-width-responsive="true"
      />
    </div>
  );
}
