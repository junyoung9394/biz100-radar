"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdBannerProps = {
  slot: string;
  label?: string;
};

export default function AdBanner({ slot, label = "AdSense 광고 영역" }: AdBannerProps) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // 개발 환경 또는 광고 차단 환경에서는 무시합니다.
    }
  }, []);

  return (
    <div className="ad-box">
      <div className="ad-label">{label}</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8518556382646891"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
