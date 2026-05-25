import type { Metadata } from "next";
import Link from "next/link";
import { industryCategories } from "@/lib/industry-categories";
import { companies } from "@/data/companies";

export const metadata: Metadata = {
  title: "한국 기업 업종별 목록",
  description:
    "반도체, 2차전지, 자동차, 제약·바이오, 금융, 방산, 조선 등 업종별로 한국 주요 기업을 정리합니다.",
  alternates: {
    canonical: "/kr/industry"
  },
  openGraph: {
    title: "업종별 한국 기업 | Biz100 Radar",
    description:
      "반도체·배터리·자동차·바이오 등 업종별 한국 주요 상장기업 목록을 확인하세요."
  }
};

function getCompanyCount(industryKeywords: string[]) {
  return companies.filter((c) =>
    industryKeywords.some(
      (kw) => kw.toLowerCase() === c.industry.toLowerCase()
    )
  ).length;
}

export default function IndustryIndexPage() {
  return (
    <main className="container">
      <section className="page-title">
        <Link href="/kr" style={{ color: "#2563eb", fontWeight: 950 }}>
          ← 한국 기업 전체 목록
        </Link>
        <span className="badge" style={{ marginTop: "12px" }}>Industry Index</span>
        <h1>업종별 기업 목록</h1>
        <p>
          반도체, 2차전지, 자동차, 제약·바이오, 방산, 조선 등 주요 업종별로
          한국 상장기업을 분류해 정리합니다.
        </p>
      </section>

      <div className="industry-index-grid">
        {industryCategories.map((category) => {
          const count = getCompanyCount(category.industryKeywords);
          if (count === 0) return null;
          return (
            <Link
              key={category.slug}
              href={`/kr/industry/${category.slug}`}
              className="card industry-index-card"
            >
              <div className="industry-index-card-head">
                <h2>{category.name}</h2>
                <span className="industry-count-badge">{count}개사</span>
              </div>
              <p>{category.description}</p>
              <div className="industry-index-card-footer">
                <span>{category.nameEn}</span>
                <strong>→</strong>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
