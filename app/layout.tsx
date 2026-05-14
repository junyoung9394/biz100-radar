import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://biz100.luckygrampus.com"),
  title: {
    default: "Biz100 Radar | 공식자료 기반 기업정보",
    template: "%s | Biz100 Radar"
  },
  description:
    "뉴스와 주가가 아닌 공식 공시와 공개자료를 기반으로 기업의 사업, 실적, 공시 정보를 정리합니다.",
  verification: {
    other: {
      "naver-site-verification": "7fca9af91a8defde8571a8f5b9cc7040646af9ab"
    }
  },
  openGraph: {
    title: "Biz100 Radar",
    description: "공식자료 기반 기업정보 대시보드",
    url: "https://biz100.luckygrampus.com",
    siteName: "Biz100 Radar",
    locale: "ko_KR",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8518556382646891"
          crossOrigin="anonymous"
        />

        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <div className="brand-mark">B100</div>
              <div>
                <div className="brand-title">Biz100 Radar</div>
                <div className="brand-sub">공식자료 기반 기업정보</div>
              </div>
            </Link>

<nav className="nav">
  <Link href="/kr">한국 기업</Link>
  <Link href="/us">미국 기업</Link>
  <Link href="/jp">일본 기업</Link>
  <Link href="/disclaimer">면책문구</Link>
  <Link href="/privacy">개인정보</Link>
</nav>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container footer-inner">
            <strong>Biz100 Radar</strong>
            <p>
              본 사이트는 투자 추천, 매수·매도 의견, 목표가 제시를 제공하지 않습니다.
              기업의 공식 공시, 공개자료, 공식 홈페이지 링크를 바탕으로 기업정보를 정리하는
              비공식 정보 서비스입니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}