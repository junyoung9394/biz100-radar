import type { Metadata } from "next";
import Link from "next/link";
import { businessGroups, formatFairAssetTotal } from "@/data/business-groups";

export const metadata: Metadata = {
  title: "재계순위",
  description:
    "2025년 공정거래위원회 공시대상기업집단 기준 국내 주요 기업집단 92개의 재계순위, 대표자명, 계열회사 수, 공정자산총액을 정리합니다."
};

function formatRankChange(rankChange: string) {
  if (rankChange === "0") {
    return "전년 동일";
  }

  if (rankChange === "신규") {
    return "신규 지정";
  }

  return `전년 대비 ${rankChange}`;
}

export default function RankingPage() {
  return (
    <main className="container">
      <section className="page-title">
        <span className="badge">Business Group Ranking</span>
        <h1>재계순위</h1>
        <p>
          2025년 공정거래위원회 공시대상기업집단 기준으로 국내 주요 기업집단
          92개의 순위, 대표자명, 계열회사 수, 공정자산총액을 정리합니다. 이
          순위는 개별 회사 순위가 아니라 기업집단 기준의 자산총액 순위입니다.
        </p>
      </section>

      <section className="card ranking-guide">
        <h2>재계순위란?</h2>
        <p>
          재계순위는 보통 공정거래위원회가 매년 발표하는 공시대상기업집단의
          자산총액 순위를 기준으로 이야기합니다. 예를 들어 삼성전자는 개별
          회사이고, 삼성은 여러 계열사를 포함한 기업집단입니다.
        </p>

        <div className="ranking-guide-grid">
          <div>
            <strong>기준</strong>
            <span>2025년 공정거래위원회 공시대상기업집단</span>
          </div>

          <div>
            <strong>순위 단위</strong>
            <span>개별 회사가 아니라 기업집단 기준</span>
          </div>

          <div>
            <strong>표시 항목</strong>
            <span>순위, 전년 순위, 대표자명, 계열회사 수, 공정자산총액</span>
          </div>
        </div>

        <p className="ranking-notice">
          본 페이지는 투자 추천, 매수·매도 의견, 목표가 제시를 제공하지 않으며
          기업집단 정보를 이해하기 위한 정보성 페이지입니다.
        </p>
      </section>

      <section className="ranking-list">
        {businessGroups.map((group) => (
          <article
            key={`${group.rank}-${group.groupName}`}
            className="card ranking-card"
          >
            <div className="ranking-rank">
              <span>{group.rank}</span>
              <strong>위</strong>
            </div>

            <div className="ranking-content">
              <div className="ranking-card-head">
                <div>
                  <div className="meta">
                    {group.baseYear}년 기준 · {formatRankChange(group.rankChange)}
                  </div>

                  <h2>{group.displayName}</h2>
                </div>

                <span className="ranking-badge">공시대상기업집단</span>
              </div>

              <div className="ranking-stats">
                <div>
                  <span>대표자명</span>
                  <strong>{group.controller}</strong>
                </div>

                <div>
                  <span>계열회사 수</span>
                  <strong>
                    {group.affiliateCount.toLocaleString("ko-KR")}개
                  </strong>
                </div>

                <div>
                  <span>공정자산총액</span>
                  <strong>{formatFairAssetTotal(group.fairAssetTotalBillion)}</strong>
                </div>

                <div>
                  <span>전년 순위</span>
                  <strong>
                    {group.previousRank ? `${group.previousRank}위` : "신규"}
                  </strong>
                </div>
              </div>

              {group.majorCompanies.length > 0 && (
                <div className="ranking-company-links">
                  {group.majorCompanies.map((company) =>
                    company.href ? (
                      <Link key={company.name} href={company.href}>
                        {company.name}
                      </Link>
                    ) : (
                      <span key={company.name}>{company.name}</span>
                    )
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}