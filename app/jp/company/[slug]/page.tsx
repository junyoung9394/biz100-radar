import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import { getJpCompanyBySlug, jpCompanies } from "@/data/jp-companies";

type JpCompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return jpCompanies.map((company) => ({
    slug: company.slug
  }));
}

export async function generateMetadata({
  params
}: JpCompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getJpCompanyBySlug(slug);

  if (!company) {
    return {
      title: "일본 기업정보 없음"
    };
  }

  return {
    title: `${company.name} 기업정보`,
    description: `${company.name}의 사업 개요, 종목코드, 거래소, 공식 홈페이지, IR 페이지, EDINET 공시 확인 링크를 정리합니다.`,
    alternates: {
      canonical: `/jp/company/${company.slug}`
    }
  };
}

export default async function JpCompanyDetailPage({
  params
}: JpCompanyPageProps) {
  const { slug } = await params;
  const company = getJpCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  return (
    <main>
      <section className="container detail-hero">
        <Link href="/jp" style={{ color: "#2563eb", fontWeight: 950 }}>
          ← 일본 주요 기업 목록
        </Link>

        <div className="card detail-head" style={{ marginTop: 18 }}>
          <div className="detail-title">
            <div className="big-initial">{company.initials}</div>

            <div>
              <span className="badge">JP Company · 정보 제공 페이지</span>
              <h1>{company.name}</h1>

              <div className="meta">
                Market: {company.market} · Code: {company.ticker} · Industry:{" "}
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

          <section className="card article-section seo-section">
            <h2>{company.name}는 어떤 회사인가요?</h2>

            <p>
              {company.name}는 {company.industry} 분야에서 사업을 운영하는 일본
              상장 기업입니다. 이 페이지에서는 {company.name}의 주요 사업,
              공식 홈페이지, IR 자료, EDINET 공시 확인 링크를 한곳에서 확인할 수
              있도록 정리합니다.
            </p>

            <h3>{company.name}의 주요 사업</h3>
            <p>
              {company.name}의 주요 사업 키워드는{" "}
              {company.keyBusinesses.join(", ")}입니다. 기업을 볼 때는 단순한
              주가 흐름뿐 아니라 어떤 사업을 하고 있는지, 공식 공시와 IR 자료에서
              어떤 변화가 있었는지 함께 확인하는 것이 중요합니다.
            </p>

            <h3>EDINET으로 확인할 수 있는 정보</h3>
            <p>
              일본 상장기업의 유가증권보고서, 반기보고서, 임시보고서 등 주요
              공시는 EDINET에서 확인할 수 있습니다. Biz100 Radar는 매수·매도
              추천이 아니라 기업정보 확인을 돕기 위한 정보성 페이지입니다.
            </p>
          </section>

          <AdBanner slot="9393781074" label="AdSense 본문중간 광고 영역" />

          <section className="notice">
            이 페이지는 일본 기업의 사업 개요와 공식자료 링크를 정리하는 정보성
            페이지입니다. 매수·매도 추천, 목표가, 수익률 전망을 제공하지
            않습니다. 중요한 의사결정 전에는 반드시 EDINET, 기업 공식 IR,
            거래소 또는 증권사 원문 자료를 직접 확인하세요.
          </section>
        </article>

        <aside className="sidebar">
          <div className="card side-box">
            <h3>공식자료 링크</h3>

            <a
              className="side-link primary"
              href={company.edinetSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>EDINET 공시 확인</span>
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

          <div className="card side-box">
            <h3>기본 정보</h3>
            <p className="summary">국가: 일본</p>
            <p className="summary">거래소: {company.market}</p>
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