import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import StockDirectionBadge from "@/components/StockDirectionBadge";
import { companies } from "@/data/companies";
import {
  industryCategories,
  getCategoryBySlug
} from "@/lib/industry-categories";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return industryCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "업종 없음" };

  return {
    title: `${category.name} 기업 목록`,
    description: `${category.searchTitle} — ${category.description}. DART 공시, 재무정보, 종목코드 포함.`,
    alternates: {
      canonical: `/kr/industry/${slug}`
    },
    openGraph: {
      title: `${category.name} 기업 목록 | Biz100 Radar`,
      description: `${category.searchTitle}. ${category.description}.`,
      url: `https://biz100.luckygrampus.com/kr/industry/${slug}`
    }
  };
}

export default async function IndustryCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryCompanies = companies.filter((c) =>
    category.industryKeywords.some(
      (kw) => kw.toLowerCase() === c.industry.toLowerCase()
    )
  );

  const kospiCompanies = categoryCompanies.filter(
    (c) => c.market === "KOSPI"
  );
  const kosdaqCompanies = categoryCompanies.filter(
    (c) => c.market === "KOSDAQ"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://biz100.luckygrampus.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "한국 기업",
        item: "https://biz100.luckygrampus.com/kr"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "업종별 목록",
        item: "https://biz100.luckygrampus.com/kr/industry"
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${category.name} 기업`,
        item: `https://biz100.luckygrampus.com/kr/industry/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container">
        <section className="page-title">
          <Link
            href="/kr/industry"
            style={{ color: "#2563eb", fontWeight: 950 }}
          >
            ← 업종별 목록
          </Link>
          <span className="badge" style={{ marginTop: "12px" }}>
            {category.nameEn}
          </span>
          <h1>{category.name} 기업 목록</h1>
          <p>{category.description}</p>
        </section>

        <div className="industry-stats-row">
          <span className="industry-stat-item">
            전체 <strong>{categoryCompanies.length}개사</strong>
          </span>
          {kospiCompanies.length > 0 && (
            <span className="industry-stat-item">
              KOSPI <strong>{kospiCompanies.length}개</strong>
            </span>
          )}
          {kosdaqCompanies.length > 0 && (
            <span className="industry-stat-item">
              KOSDAQ <strong>{kosdaqCompanies.length}개</strong>
            </span>
          )}
        </div>

        {kospiCompanies.length > 0 && (
          <section className="section">
            <h2 className="industry-market-title">KOSPI</h2>
            <div className="company-list">
              {kospiCompanies.map((company) => (
                <Link
                  key={company.slug}
                  href={`/kr/company/${company.slug}`}
                  className="card company-list-card"
                >
                  <div className="company-row">
                    <div className="initial">{company.initials}</div>
                    <div>
                      <div className="company-title-row">
                        <h3>{company.name}</h3>
                        <StockDirectionBadge stockCode={company.ticker} />
                      </div>
                      <div className="meta">
                        {company.ticker} · {company.industry}
                      </div>
                      <div className="summary">{company.businessSummary}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {kosdaqCompanies.length > 0 && (
          <section className="section">
            <h2 className="industry-market-title">KOSDAQ</h2>
            <div className="company-list">
              {kosdaqCompanies.map((company) => (
                <Link
                  key={company.slug}
                  href={`/kr/company/${company.slug}`}
                  className="card company-list-card"
                >
                  <div className="company-row">
                    <div className="initial">{company.initials}</div>
                    <div>
                      <div className="company-title-row">
                        <h3>{company.name}</h3>
                        <StockDirectionBadge stockCode={company.ticker} />
                      </div>
                      <div className="meta">
                        {company.ticker} · {company.industry}
                      </div>
                      <div className="summary">{company.businessSummary}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AdBanner slot="9393781074" />

        <section className="card industry-related-section">
          <h2>다른 업종 보기</h2>
          <div className="industry-chip-group">
            {industryCategories
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/kr/industry/${c.slug}`}
                  className="industry-chip"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
