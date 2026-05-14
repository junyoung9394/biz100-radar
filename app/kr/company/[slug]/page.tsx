import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import FinancialHighlights from "@/components/FinancialHighlights";
import { companies, getCompanyBySlug } from "@/data/companies";
import StockQuote from "@/components/StockQuote";
import CompanySeoSection from "@/components/CompanySeoSection";
import RecentDisclosures from "@/components/RecentDisclosures";

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

  return {
    title: `${company.name} 기업정보`,
    description: `${company.name}의 주요 사업, 공식자료 링크, DART 공시 검색, 최근 확인 포인트를 정리합니다.`,
    alternates: {
      canonical: `/kr/company/${company.slug}`
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

  return (
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
                {company.industry}
              </div>
            </div>
          </div>

          <p className="summary" style={{ marginTop: 24, fontSize: 16 }}>
            {company.businessSummary}
          </p>
        </div>
      </section>

      <div className="container">
        <AdBanner slot="4333026081" label="AdSense 상단 광고 영역" />
      </div>

      <section className="container detail-layout">
        <article>
          <section className="card article-section">
            <h2>기업 개요</h2>
            <p>{company.businessSummary}</p>

            <div className="chips">
              {company.keyBusinesses.map((business) => (
                <span key={business} className="chip">
                  {business}
                </span>
              ))}
            </div>
          </section>

<FinancialHighlights dartCorpCode={company.identifiers.dartCorpCode} />

<StockQuote stockCode={company.ticker} />

<RecentDisclosures
  companyName={company.name}
  stockCode={company.ticker}
  dartCorpCode={company.identifiers.dartCorpCode}
/>
<CompanySeoSection company={company} />

          <AdBanner slot="9393781074" label="AdSense 본문중간 광고 영역" />

          <section className="card article-section">
            <h2>최근 확인 포인트</h2>
            {company.latestSignals.map((signal) => (
              <p key={signal}>{signal}</p>
            ))}
          </section>

          <section className="notice">
            이 페이지는 기업의 사업 개요와 공식자료 링크를 정리하는 정보성
            페이지입니다. 매수·매도 추천, 목표가, 수익률 전망을 제공하지
            않습니다.
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
  );
}