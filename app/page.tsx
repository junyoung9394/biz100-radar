import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import GlobalCompanySearch from "@/components/GlobalCompanySearch";
import StockDirectionBadge from "@/components/StockDirectionBadge";
import UsStockDirectionBadge from "@/components/UsStockDirectionBadge";
import { companies } from "@/data/companies";
import { usCompanies } from "@/data/us-companies";
import { jpCompanies } from "@/data/jp-companies";

type WatchCompany = {
  slug: string;
  name: string;
  initials: string;
  country: "KR" | "US" | "JP";
  countryLabel: string;
  market: string;
  ticker: string;
  industry: string;
  businessSummary: string;
  href: string;
  reason: string;
  reasonDetail: string;
};

function getTodaySeed() {
  const now = new Date();
  const koreaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const year = koreaTime.getFullYear();
  const month = koreaTime.getMonth() + 1;
  const date = koreaTime.getDate();

  return year * 10000 + month * 100 + date;
}

function getWatchCandidates(): WatchCompany[] {
  const krCandidates: WatchCompany[] = companies.slice(0, 40).map((company) => ({
    slug: company.slug,
    name: company.name,
    initials: company.initials,
    country: "KR",
    countryLabel: "한국",
    market: company.market,
    ticker: company.ticker,
    industry: company.industry,
    businessSummary: company.businessSummary,
    href: `/kr/company/${company.slug}`,
    reason: "시장 데이터 확인",
    reasonDetail: "주가, DART 공시, 실적 변화 확인 가능"
  }));

  const usCandidates: WatchCompany[] = usCompanies
    .slice(0, 40)
    .map((company) => ({
      slug: company.slug,
      name: company.name,
      initials: company.initials,
      country: "US",
      countryLabel: "미국",
      market: company.market,
      ticker: company.ticker,
      industry: company.industry,
      businessSummary: company.businessSummary,
      href: `/us/company/${company.slug}`,
      reason: "SEC 공시 확인",
      reasonDetail: "미국 시장 데이터와 최근 SEC 공시 확인 가능"
    }));

  const jpCandidates: WatchCompany[] = jpCompanies
    .slice(0, 20)
    .map((company) => ({
      slug: company.slug,
      name: company.name,
      initials: company.initials,
      country: "JP",
      countryLabel: "일본",
      market: company.market,
      ticker: company.ticker,
      industry: company.industry,
      businessSummary: company.businessSummary,
      href: `/jp/company/${company.slug}`,
      reason: "EDINET 공시 확인",
      reasonDetail: "일본 EDINET 공시와 공식자료 확인 가능"
    }));

  return [...krCandidates, ...usCandidates, ...jpCandidates];
}

function getDailyWatchCompanies() {
  const candidates = getWatchCandidates();
  const seed = getTodaySeed();
  const startIndex = seed % candidates.length;
  const selectedCompanies: WatchCompany[] = [];
  const usedCountries = new Set<string>();

  for (
    let index = 0;
    selectedCompanies.length < 5 && index < candidates.length;
    index += 1
  ) {
    const companyIndex = (startIndex + index * 11) % candidates.length;
    const company = candidates[companyIndex];

    if (selectedCompanies.some((selected) => selected.href === company.href)) {
      continue;
    }

    selectedCompanies.push(company);
    usedCountries.add(company.country);
  }

  const requiredCountries: WatchCompany["country"][] = ["KR", "US", "JP"];

  for (const country of requiredCountries) {
    if (usedCountries.has(country)) {
      continue;
    }

    const fallbackCompany = candidates.find(
      (company) =>
        company.country === country &&
        !selectedCompanies.some((selected) => selected.href === company.href)
    );

    if (fallbackCompany && selectedCompanies.length > 0) {
      selectedCompanies[selectedCompanies.length - 1] = fallbackCompany;
      usedCountries.add(country);
    }
  }

  return selectedCompanies.slice(0, 5);
}

function renderMarketBadge(company: WatchCompany) {
  if (company.country === "KR") {
    return <StockDirectionBadge stockCode={company.ticker} />;
  }

  if (company.country === "US") {
    return <UsStockDirectionBadge ticker={company.ticker} />;
  }

  return (
    <span className="stock-direction-badge stock-direction-flat">
      공시 확인
    </span>
  );
}

export default function HomePage() {
  const watchCompanies = getDailyWatchCompanies();
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

      <section className="container section compact-section">
        <GlobalCompanySearch />
      </section>

<section className="container section compact-section">
  <section className="card market-index-guide">
    <div className="market-index-head">
      <div>
        <span className="badge">Market Guide</span>
        <h2>오늘의 시장 지수</h2>
        <p>
          KOSPI와 KOSDAQ은 한국 주식시장의 전체 흐름을 확인할 때 자주 보는
          대표 지수입니다. 이 정보는 투자 추천이 아닌 시장 이해를 돕기 위한
          참고용 설명입니다.
        </p>
      </div>
    </div>

    <div className="market-index-grid">
      <div className="market-index-card">
        <div className="market-index-label">KOSPI</div>
        <h3>대형 상장기업 중심의 대표 시장</h3>
        <p>
          KOSPI는 삼성전자, 현대차, SK하이닉스처럼 규모가 큰 대형 상장기업이
          많이 포함된 한국 대표 주식시장입니다.
        </p>
        <div className="market-index-status">지수 데이터 연결 예정</div>
      </div>

      <div className="market-index-card">
        <div className="market-index-label">KOSDAQ</div>
        <h3>기술·바이오·성장기업 중심 시장</h3>
        <p>
          KOSDAQ은 바이오, 게임, 반도체 장비, 소프트웨어, 성장기업이 많이
          포함된 시장입니다. 중소·벤처기업 비중이 비교적 높습니다.
        </p>
        <div className="market-index-status">지수 데이터 연결 예정</div>
      </div>
    </div>
  </section>
</section>

<section className="container section">
  <div className="section-head">
          <div>
            <span className="badge">Daily Watch</span>
            <h2>오늘 확인할 기업</h2>
            <p className="section-description">
              시장 데이터, 공시, 실적·사업 정보를 기준으로 오늘 확인해볼 만한
              기업을 보여줍니다. 투자 추천이 아닌 정보 확인용 목록입니다.
            </p>
          </div>

          <Link href="/kr" style={{ color: "#2563eb", fontWeight: 950 }}>
            전체 기업 보기 →
          </Link>
        </div>

        <div className="watch-grid">
          {watchCompanies.map((company) => (
            <Link
              key={`${company.country}-${company.slug}`}
              href={company.href}
              className="card watch-card"
            >
              <div className="watch-card-top">
                <div className="initial">{company.initials}</div>

                <div>
                  <div className="company-title-row">
                    <h3>{company.name}</h3>
                    {renderMarketBadge(company)}
                  </div>

                  <div className="meta">
                    {company.countryLabel} · {company.market} · {company.ticker}
                  </div>
                </div>
              </div>

              <div className="watch-card-footer">
                <span>기업정보 보기</span>
                <strong>→</strong>
              </div>
            </Link>
          ))}
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