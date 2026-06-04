import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import WatchlistButton from "@/components/WatchlistButton";
import { getUsCompanyBySlug, usCompanies } from "@/data/us-companies";
import UsStockQuote from "@/components/UsStockQuote";
import RecentSecFilings from "@/components/RecentSecFilings";
import RelatedUsCompanies from "@/components/RelatedUsCompanies";
import UsFinancialHighlights from "@/components/UsFinancialHighlights";

type UsCompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return usCompanies.map((company) => ({
    slug: company.slug
  }));
}

export async function generateMetadata({
  params
}: UsCompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getUsCompanyBySlug(slug);

  if (!company) {
    return {
      title: "미국 기업정보 없음"
    };
  }

  const keyBizText = company.keyBusinesses.slice(0, 3).join("·");
  return {
    title: `${company.name}(${company.ticker}) 기업정보 — ${company.industry}`,
    description: `${company.name}(${company.ticker}) ${company.businessSummary} 주요 사업: ${keyBizText}. SEC 공시·재무정보·공식자료 링크 제공.`.slice(0, 160),
    alternates: {
      canonical: `/us/company/${company.slug}`
    },
    openGraph: {
      title: `${company.name}(${company.ticker}) | ${company.industry} | Biz100 Radar`,
      description: `${company.name} ${company.market} 상장. 주요 사업: ${keyBizText}. SEC 공시·재무정보 한곳에서 확인.`,
      url: `https://biz100.luckygrampus.com/us/company/${company.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `${company.name}(${company.ticker}) 기업정보 | Biz100 Radar`,
      description: `${company.name} ${company.industry}. 주요 사업: ${keyBizText}. SEC 공시·재무정보 확인.`
    }
  };
}

export default async function UsCompanyDetailPage({
  params
}: UsCompanyPageProps) {
  const { slug } = await params;
  const company = getUsCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const pageUrl = `https://biz100.luckygrampus.com/us/company/${company.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Corporation",
        "name": company.name,
        "description": company.businessSummary,
        "tickerSymbol": company.ticker,
        "memberOf": { "@type": "StockExchange", "name": company.market },
        ...(company.officialWebsite && { url: company.officialWebsite }),
        ...(company.irUrl && { sameAs: company.irUrl })
      },
      {
        "@type": "WebPage",
        "url": pageUrl,
        "name": `${company.name}(${company.ticker}) 기업정보`,
        "description": company.businessSummary,
        "inLanguage": "ko",
        "isPartOf": { "@type": "WebSite", "url": "https://biz100.luckygrampus.com" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://biz100.luckygrampus.com" },
          { "@type": "ListItem", "position": 2, "name": "미국 기업", "item": "https://biz100.luckygrampus.com/us" },
          { "@type": "ListItem", "position": 3, "name": company.name, "item": pageUrl }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `${company.name}은 어떤 회사입니까?`,
            "acceptedAnswer": { "@type": "Answer", "text": company.businessSummary }
          },
          {
            "@type": "Question",
            "name": `${company.name}의 주요 사업 분야는 무엇입니까?`,
            "acceptedAnswer": { "@type": "Answer", "text": `${company.name}의 주요 사업은 ${company.keyBusinesses.join(', ')} 입니다.` }
          },
          {
            "@type": "Question",
            "name": `${company.name} 티커(ticker)는 무엇입니까?`,
            "acceptedAnswer": { "@type": "Answer", "text": `${company.name}의 티커는 ${company.ticker}이며, ${company.market}에 상장되어 있습니다.` }
          },
          {
            "@type": "Question",
            "name": `${company.name} SEC 공시는 어디서 확인할 수 있습니까?`,
            "acceptedAnswer": { "@type": "Answer", "text": `${company.name}의 SEC 공시는 SEC EDGAR(sec.gov)에서 티커 ${company.ticker}로 검색하거나, Biz100 Radar의 ${company.name} 페이지에서 최근 SEC 공시 링크를 바로 확인할 수 있습니다.` }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
      <section className="container detail-hero">
        <Link href="/us" style={{ color: "#2563eb", fontWeight: 950 }}>
          ← 미국 주요 기업 목록
        </Link>

        <div className="card detail-head" style={{ marginTop: 18 }}>
          <div className="detail-title">
            <div className="big-initial">{company.initials}</div>

            <div>
              <span className="badge">US Company · 정보 제공 페이지</span>
              <h1>{company.name}</h1>

              <div className="meta">
                Market: {company.market} · Ticker: {company.ticker} · Industry:{" "}
                {company.industry}
              </div>
            </div>
          </div>

          <p className="summary" style={{ marginTop: 24, fontSize: 16 }}>
            {company.businessSummary}
          </p>
        </div>
      </section>

      <section className="container detail-layout">
        <article>
          <section className="card article-section">
            <h2>주요 사업 상세</h2>

            <ul style={{ paddingLeft: "1.2em", lineHeight: 2 }}>
              {company.keyBusinesses.map((business) => (
                <li key={business}>
                  <strong>{business}</strong>: {company.name}의{" "}
                  {business} 관련 공시와 실적은 SEC EDGAR에서 티커{" "}
                  {company.ticker}로 검색해 확인할 수 있습니다.
                </li>
              ))}
            </ul>

            <div className="chips" style={{ marginTop: 16 }}>
              {company.keyBusinesses.map((business) => (
                <span key={business} className="chip">
                  {business}
                </span>
              ))}
            </div>
          </section>
<UsStockQuote ticker={company.ticker} />
<UsFinancialHighlights cik={company.cik} />
<RecentSecFilings cik={company.cik} />
          <section className="card article-section seo-section">
            <h2>{company.name} 기업정보 확인 가이드</h2>

            <p>
              {company.name}({company.ticker})은 {company.market}에 상장된{" "}
              {company.industry} 분야 기업입니다. 아래에서 주요 사업별 개요와
              SEC EDGAR 공시 접근 방법을 확인할 수 있습니다.
            </p>

            {company.keyBusinesses.map((business) => (
              <div key={business}>
                <h3>
                  {company.name}의 {business}
                </h3>
                <p>
                  {business}은(는) {company.name}의 핵심 사업 영역 중
                  하나입니다. {business} 관련 공시, 실적, 연간보고서(10-K)는
                  SEC EDGAR(sec.gov)에서 티커 {company.ticker}로 검색해 원문을
                  확인할 수 있습니다.
                </p>
              </div>
            ))}

            <h3>SEC EDGAR로 {company.name} 공시를 확인하는 방법</h3>
            <p>
              {company.name}의 10-K, 10-Q, 8-K 등 주요 보고서는 SEC
              EDGAR(sec.gov)에서 티커 {company.ticker}로 검색하면 원문을 확인할
              수 있습니다. Biz100 Radar는 매수·매도 추천이 아니라 공식자료 확인을
              돕기 위한 기업정보 페이지입니다.
            </p>
          </section>
<RelatedUsCompanies currentCompany={company} companies={usCompanies} />
          <AdBanner slot="9393781074" />

          <section className="notice">
            이 페이지는 미국 기업의 사업 개요와 공식자료 링크를 정리하는 정보성
            페이지입니다. 매수·매도 추천, 목표가, 수익률 전망을 제공하지
            않습니다. 중요한 의사결정 전에는 반드시 SEC EDGAR, 기업 공식 IR,
            거래소 또는 증권사 원문 자료를 직접 확인하세요.
          </section>
        </article>

        <aside className="sidebar">
          <div className="card side-box">
            <h3>공식자료 링크</h3>

            <a
              className="side-link primary"
              href={company.secSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>SEC EDGAR 검색</span>
              <span>↗</span>
            </a>

            <a
              className="side-link"
              href={company.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>공식 홈페이지</span>
              <span>↗</span>
            </a>

            <a
              className="side-link"
              href={company.irUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>IR 페이지</span>
              <span>↗</span>
            </a>
          </div>

          <AdBanner slot="9393781074" />

          <WatchlistButton
            slug={company.slug}
            name={company.name}
            initials={company.initials}
            country="US"
            ticker={company.ticker}
            market={company.market}
            industry={company.industry}
            href={`/us/company/${company.slug}`}
          />

          <div className="card side-box">
            <h3>기본 정보</h3>
            <p className="summary">국가: 미국</p>
            <p className="summary">거래소: {company.market}</p>
            <p className="summary">티커: {company.ticker}</p>
            <p className="summary">업종: {company.industry}</p>
          </div>

          <div className="card side-box">
            <h3>데이터 기준</h3>
            <p className="summary">{company.sourceNote}</p>
          </div>
        </aside>
      </section>
    </main>
    </>
  );
}