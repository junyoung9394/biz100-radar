import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import StockDirectionBadge from "@/components/StockDirectionBadge";
import { companies } from "@/data/companies";

export default function HomePage() {
  const featuredCompanies = companies.slice(0, 10);

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <span className="badge">공식자료 기반 기업정보 서비스</span>
          <h1>
            뉴스보다 실적,
            <br />
            주가보다 기업 체급 변화.
          </h1>
          <p>
            Biz100 Radar는 공시, 실적, 공식자료를 기반으로 기업이 어떤 일을
            하는지와 최근 확인해야 할 정보를 정리합니다. 투자 추천이 아닌
            기업정보 제공 서비스입니다.
          </p>

          <div className="actions">
            <Link href="/kr" className="btn btn-primary">
              한국 주요 기업 보기
            </Link>
            <Link href="/disclaimer" className="btn btn-secondary">
              서비스 기준 확인
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <AdBanner slot="4333026081" label="AdSense 상단 광고 영역" />
      </div>

      <section className="container section">
        <div className="feature-grid">
          <div className="card feature-card">
            <span>01</span>
            <h2>공식자료 중심</h2>
            <p>
              DART 공시, 회사 공식 홈페이지, IR 자료 링크를 중심으로 정보를
              정리합니다.
            </p>
          </div>

          <div className="card feature-card">
            <span>02</span>
            <h2>투자 의견 제외</h2>
            <p>매수·매도 추천, 목표가, 수익률 전망을 제공하지 않습니다.</p>
          </div>

          <div className="card feature-card">
            <span>03</span>
            <h2>기업별 페이지</h2>
            <p>
              기업의 주요 사업, 공식자료 링크, 최근 확인 포인트를 한 페이지에
              정리합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <h2>한국 주요 기업</h2>
          </div>

          <Link href="/kr" style={{ color: "#2563eb", fontWeight: 950 }}>
            전체 보기 →
          </Link>
        </div>

        <div className="company-grid">
          {featuredCompanies.map((company) => (
            <Link
              key={company.slug}
              href={`/kr/company/${company.slug}`}
              className="card company-card"
            >
              <div className="company-row">
                <div className="initial">{company.initials}</div>

                <div>
                  <div className="company-title-row">
                    <h3>{company.name}</h3>
                    <StockDirectionBadge stockCode={company.ticker} />
                  </div>

                  <div className="meta">
                    {company.market} · 종목코드 {company.ticker} ·{" "}
                    {company.industry}
                  </div>

                  <div className="summary">{company.businessSummary}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}