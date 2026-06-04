import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import CompanySeoSection from "@/components/CompanySeoSection";
import FinancialHighlights from "@/components/FinancialHighlights";
import RecentDisclosures from "@/components/RecentDisclosures";
import StockQuote from "@/components/StockQuote";
import { companies, getCompanyBySlug } from "@/data/companies";
import RelatedCompanies from "@/components/RelatedCompanies";
import WatchlistButton from "@/components/WatchlistButton";
import { getCategoryForIndustry } from "@/lib/industry-categories";

type CompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug
  }));
}

export async function generateMetadata({
  params
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    return {
      title: "기업정보 없음"
    };
  }

  const keyBizText = company.keyBusinesses.slice(0, 3).join("·");
  return {
    title: `${company.name}(${company.ticker}) 기업정보 — ${company.industry}`,
    description: `${company.name}(${company.ticker}) ${company.businessSummary} 주요 사업: ${keyBizText}. DART 공시·재무정보·공식자료 링크 제공.`.slice(0, 160),
    alternates: {
      canonical: `/kr/company/${company.slug}`
    },
    openGraph: {
      title: `${company.name}(${company.ticker}) | ${company.industry} | Biz100 Radar`,
      description: `${company.name} ${company.market} 상장. 주요 사업: ${keyBizText}. DART 공시·재무정보 한곳에서 확인.`,
      url: `https://biz100.luckygrampus.com/kr/company/${company.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `${company.name}(${company.ticker}) 기업정보 | Biz100 Radar`,
      description: `${company.name} ${company.industry}. 주요 사업: ${keyBizText}. DART 공시·재무정보 확인.`
    }
  };
}

export default async function CompanyDetailPage({
  params
}: CompanyPageProps) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const hasOfficialWebsite = Boolean(company.officialWebsite);
  const hasIrUrl = Boolean(company.irUrl);

  const pageUrl = `https://biz100.luckygrampus.com/kr/company/${company.slug}`;
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
          { "@type": "ListItem", "position": 2, "name": "한국 기업", "item": "https://biz100.luckygrampus.com/kr" },
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
            "name": `${company.name} 종목코드는 무엇입니까?`,
            "acceptedAnswer": { "@type": "Answer", "text": `${company.name}의 종목코드는 ${company.ticker}이며, ${company.market}에 상장되어 있습니다.` }
          },
          {
            "@type": "Question",
            "name": `${company.name} DART 공시는 어디서 확인할 수 있습니까?`,
            "acceptedAnswer": { "@type": "Answer", "text": `${company.name}의 DART 공시는 dart.fss.or.kr에서 기업명 또는 종목코드(${company.ticker})로 검색하거나, Biz100 Radar의 ${company.name} 페이지에서 최근 공시 링크를 확인할 수 있습니다.` }
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
        <Link href="/kr" style={{ color: "#2563eb", fontWeight: 950 }}>
          ← 한국 주요 기업 목록
        </Link>

        <div className="card detail-head" style={{ marginTop: 18 }}>
          <div className="detail-title">
            <div className="big-initial">{company.initials}</div>

            <div>
              <span className="badge">KR Company · 정보 제공 페이지</span>
              <h1>{company.name}</h1>

              <div className="meta">
                상장시장: {company.market} · 종목코드: {company.ticker} · 업종:{" "}
                {(() => {
                  const cat = getCategoryForIndustry(company.industry);
                  return cat ? (
                    <Link
                      href={`/kr/industry/${cat.slug}`}
                      style={{ color: "#2563eb" }}
                    >
                      {company.industry}
                    </Link>
                  ) : (
                    company.industry
                  );
                })()}
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
                  {business} 관련 공시와 실적은 DART에서 확인할 수 있습니다.
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

          <StockQuote stockCode={company.ticker} />

          <FinancialHighlights dartCorpCode={company.identifiers.dartCorpCode} />

          <RecentDisclosures
            companyName={company.name}
            stockCode={company.ticker}
            dartCorpCode={company.identifiers.dartCorpCode}
          />

          <CompanySeoSection company={company} />

<RelatedCompanies currentCompany={company} companies={companies} />

          <AdBanner slot="9393781074" />

          <section className="notice">
            이 페이지는 기업의 사업 개요와 공식자료 링크를 정리하는 정보성
            페이지입니다. 매수·매도 추천, 목표가, 수익률 전망을 제공하지
            않습니다. 중요한 의사결정 전에는 반드시 공식 공시, 거래소, 증권사
            원문 자료를 직접 확인하세요.
          </section>
        </article>

        <aside className="sidebar">
          <div className="card side-box">
            <h3>공식자료 링크</h3>

            <a
              className="side-link primary"
              href={company.dartSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>DART 공시 검색</span>
              <span>↗</span>
            </a>

            {hasOfficialWebsite ? (
              <a
                className="side-link"
                href={company.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>공식 홈페이지</span>
                <span>↗</span>
              </a>
            ) : (
              <div className="side-link">
                <span>공식 홈페이지</span>
                <span>검증 예정</span>
              </div>
            )}

            {hasIrUrl ? (
              <a
                className="side-link"
                href={company.irUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>IR 페이지</span>
                <span>↗</span>
              </a>
            ) : (
              <div className="side-link">
                <span>IR 페이지</span>
                <span>검증 예정</span>
              </div>
            )}
          </div>

          <AdBanner slot="9393781074" />

          <WatchlistButton
            slug={company.slug}
            name={company.name}
            initials={company.initials}
            country="KR"
            ticker={company.ticker}
            market={company.market}
            industry={company.industry}
            href={`/kr/company/${company.slug}`}
          />

          <div className="card side-box">
            <h3>기본 정보</h3>
            <p className="summary">국가: 대한민국</p>
            <p className="summary">상장시장: {company.market}</p>
            <p className="summary">종목코드: {company.ticker}</p>
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