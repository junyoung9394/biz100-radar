"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdBannerProps = {
  slot: string;
  label?: string;
};

export default function AdBanner({ slot, label }: AdBannerProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const box = boxRef.current;

    if (!box) {
      return;
    }

    let isPushed = false;

    function pushAd() {
      if (isPushed) {
        return;
      }

      isPushed = true;

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch {
        // 광고 차단 환경이나 개발 환경에서는 조용히 무시합니다.
      }
    }

    // 너비가 0인 상태(숨겨진 칸, 레이아웃 계산 전)에서 광고를 요청하면
    // "No slot size for availableWidth=0" 오류가 나므로, 너비가 생길 때까지 기다립니다.
    if (box.offsetWidth > 0) {
      pushAd();
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (entries[0]?.contentRect.width > 0) {
        observer.disconnect();
        pushAd();
      }
    });

    observer.observe(box);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={boxRef} className="ad-box">
      {label && <p className="ad-label">{label}</p>}
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
