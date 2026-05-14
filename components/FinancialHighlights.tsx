"use client";

import { useEffect, useState } from "react";

type FinancialHighlight = {
  label: string;
  value: string;
  description: string;
};

type FinancialHighlightsProps = {
  dartCorpCode?: string;
};

type FinancialHighlightsResponse = {
  ok: boolean;
  year: string;
  reportName: string;
  message: string;
  highlights: FinancialHighlight[];
};

export default function FinancialHighlights({
  dartCorpCode
}: FinancialHighlightsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<FinancialHighlightsResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadFinancials() {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();

        if (dartCorpCode) {
          params.set("dartCorpCode", dartCorpCode);
        }

        const response = await fetch(`/api/dart/financials?${params.toString()}`);
        const data = (await response.json()) as FinancialHighlightsResponse;

        if (!isMounted) {
          return;
        }

        setResult(data);
      } catch {
        if (!isMounted) {
          return;
        }

        setResult({
          ok: false,
          year: "",
          reportName: "사업보고서",
          message: "재무정보를 불러오는 중 오류가 발생했습니다.",
          highlights: []
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadFinancials();

    return () => {
      isMounted = false;
    };
  }, [dartCorpCode]);

  return (
    <section className="card article-section">
      <h2>실적 변화 카드</h2>

      <p>
        OpenDART 공식 재무정보를 기준으로 주요 실적 항목을 자동 확인합니다.
        표시값은 투자 판단이 아닌 기업정보 확인용입니다.
      </p>

      {isLoading && (
        <div className="disclosure-state">
          재무정보를 불러오는 중입니다. 첫 조회는 몇 초 정도 걸릴 수 있습니다.
        </div>
      )}

      {!isLoading && result && !result.ok && (
        <div className="disclosure-state">
          {result.message || "표시할 재무정보를 찾지 못했습니다."}
        </div>
      )}

      {!isLoading && result && result.ok && (
        <>
          <div className="financial-standard">
            기준: {result.year}년 {result.reportName}
          </div>

          <div className="metric-grid">
            {result.highlights.map((highlight) => (
              <div key={highlight.label} className="metric">
                <div className="metric-label">{highlight.label}</div>
                <div className="metric-value">{highlight.value}</div>
                <div className="metric-desc">{highlight.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}