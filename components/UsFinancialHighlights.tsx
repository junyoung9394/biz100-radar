"use client";

import { useEffect, useState } from "react";

type UsFinancialHighlight = {
  label: string;
  value: string;
  description: string;
};

type UsFinancialHighlightsResponse = {
  ok: boolean;
  year: string;
  reportForm: string;
  message: string;
  highlights: UsFinancialHighlight[];
};

type Props = {
  cik?: string;
};

export default function UsFinancialHighlights({ cik }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<UsFinancialHighlightsResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (cik) params.set("cik", cik);
        const res = await fetch(`/api/sec/financials?${params.toString()}`);
        const data = (await res.json()) as UsFinancialHighlightsResponse;
        if (isMounted) setResult(data);
      } catch {
        if (isMounted) {
          setResult({
            ok: false,
            year: "",
            reportForm: "",
            message: "재무정보를 불러오는 중 오류가 발생했습니다.",
            highlights: []
          });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [cik]);

  return (
    <section className="card article-section">
      <h2>실적 변화 카드</h2>
      <p>
        SEC EDGAR 공식 재무정보를 기준으로 주요 실적 항목을 자동 확인합니다.
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
            기준: {result.year}년 {result.reportForm}
          </div>
          <div className="metric-grid">
            {result.highlights.map((h) => (
              <div key={h.label} className="metric">
                <div className="metric-label">{h.label}</div>
                <div className="metric-value">{h.value}</div>
                <div className="metric-desc">{h.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
