"use client";

import { useEffect, useState } from "react";

type EdinetDisclosure = {
  docId: string;
  filerName: string;
  documentTitle: string;
  submitDateTime: string;
  docTypeCode: string;
  secCode: string;
  url: string;
};

type RecentEdinetDisclosuresProps = {
  ticker: string;
};

type EdinetDisclosureResponse = {
  ok: boolean;
  message?: string;
  disclosures: EdinetDisclosure[];
};

function formatSubmitDate(value: string) {
  if (!value) {
    return "확인 필요";
  }

  const dateOnly = value.slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return value;
  }

  return dateOnly.replaceAll("-", ".");
}

export default function RecentEdinetDisclosures({
  ticker
}: RecentEdinetDisclosuresProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [disclosures, setDisclosures] = useState<EdinetDisclosure[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDisclosures() {
      try {
        setIsLoading(true);

        const params = new URLSearchParams({
          ticker
        });

        const response = await fetch(
          `/api/edinet/disclosures?${params.toString()}`
        );
        const data = (await response.json()) as EdinetDisclosureResponse;

        if (!isMounted) {
          return;
        }

        if (!data.ok) {
          setMessage(data.message ?? "EDINET 공시를 가져오지 못했습니다.");
          setDisclosures([]);
          return;
        }

        setMessage("");
        setDisclosures(data.disclosures ?? []);
      } catch {
        if (!isMounted) {
          return;
        }

        setMessage("EDINET 공시를 불러오는 중 오류가 발생했습니다.");
        setDisclosures([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDisclosures();

    return () => {
      isMounted = false;
    };
  }, [ticker]);

  return (
    <section className="card article-section">
      <h2>최근 EDINET 공시</h2>
      <p>
        일본 EDINET 기준으로 최근 공시 목록을 확인합니다. 공시 원문은 EDINET
        사이트에서 직접 확인할 수 있습니다.
      </p>

      {isLoading && (
        <div className="disclosure-state">
          EDINET 공시를 불러오는 중입니다. 첫 조회는 몇 초 정도 걸릴 수 있습니다.
        </div>
      )}

      {!isLoading && message && (
        <div className="disclosure-state">{message}</div>
      )}

      {!isLoading && !message && disclosures.length === 0 && (
        <div className="disclosure-state">
          최근 기간 내 표시할 EDINET 공시가 없습니다.
        </div>
      )}

      {!isLoading && disclosures.length > 0 && (
        <div className="disclosure-list">
          {disclosures.map((disclosure) => (
            <a
              key={disclosure.docId}
              className="disclosure-item"
              href={disclosure.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="disclosure-date">
                  {formatSubmitDate(disclosure.submitDateTime)}
                </div>
                <div className="disclosure-title">
                  {disclosure.documentTitle}
                </div>
                <div className="disclosure-meta">
                  제출자: {disclosure.filerName || "확인 필요"}
                </div>
              </div>

              <span>↗</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}