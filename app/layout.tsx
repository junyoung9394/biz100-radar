import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const GTM_ID = "GTM-MCRCLL5R";

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Biz100 Radar",
    description: "공식자료 기반 기업정보 대시보드",
    url: "https://biz100.luckygrampus.com",
    siteName: "Biz100 Radar",
    locale: "ko_KR",
    type: "website"
  },
  alternates: {
    types: {
      "application/rss+xml": "https://biz100.luckygrampus.com/feed.xml"
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1014" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8518556382646891"
          crossOrigin="anonymous"
        />

        <Script src="/site-analytics.js" strategy="afterInteractive" />

        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="Biz100 Radar 홈">
              <div className="brand-mark" aria-hidden="true">B100</div>
              <div>
                <div className="brand-title">Biz100 Radar</div>
                <div className="brand-sub">공식자료 기반 기업정보</div>
              </div>
            </Link>

            <SiteNav />
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="brand-mark brand-mark-sm" aria-hidden="true">B100</div>
                <strong>Biz100 Radar</strong>
              </div>
              <nav className="footer-links" aria-label="사이트 정보">
                <Link href="/kr">한국 기업</Link>
                <Link href="/us">미국 기업</Link>
                <Link href="/jp">일본 기업</Link>
                <Link href="/ranking">재계순위</Link>
                <Link href="/disclaimer">면책문구</Link>
                <Link href="/privacy">개인정보처리방침</Link>
                <a href="/feed.xml">RSS</a>
              </nav>
            </div>
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