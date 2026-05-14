"use client";

import { useEffect, useState } from "react";

type SecFiling = {
  accessionNumber: string;
  filingDate: string;
  reportDate: string;
  form: string;
  primaryDocument: string;
  primaryDocDescription: string;
  url: string;
};

type RecentSecFilingsProps = {
  cik?: string;
};

type SecFilingsResponse = {
  ok: boolean;
  message?: string;
  filings: SecFiling[];
  cached?: boolean;
};

function formatDate(value: string) {
  if (!value) {
    return "확인 필요";
  }

  return value.replaceAll("-", ".");
}

export default function RecentSecFilings({ cik }: RecentSecFilingsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filings, setFilings] = useState<SecFiling[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadFilings() {
      try {
        setIsLoading(true);

        if (!cik) {
          setMessage("SEC CIK가 아직 연결되지 않았습니다.");
          setFilings([]);
          return;
        }

        const params = new URLSearchParams({
          cik
        });

        const response = await fetch(`/api/sec/filings?${params.toString()}`);
        const data = (await response.json()) as SecFilingsResponse;

        if (!isMounted) {
          return;
        }

        if (!data.ok) {
          setMessage(data.message ?? "SEC 공시를 가져오지 못했습니다.");
          setFilings([]);
          return;
        }

        setMessage("");
        setFilings(data.filings ?? []);
      } catch {
        if (!isMounted) {
          return;
        }

        setMessage("SEC 공시를 불러오는 중 오류가 발생했습니다.");
        setFilings([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadFilings();

    return () => {
      isMounted = false;
    };
  }, [cik]);

  return (
    <section className="card article-section">
      <h2>최근 SEC 공시</h2>

      <p>
        SEC EDGAR 기준으로 최근 주요 공시를 확인합니다. 공시 원문은 SEC
        사이트에서 직접 확인할 수 있습니다.
      </p>

      {isLoading && (
        <div className="disclosure-state">
          SEC 공시를 불러오는 중입니다. 첫 조회는 몇 초 정도 걸릴 수 있습니다.
        </div>
      )}

      {!isLoading && message && (
        <div className="disclosure-state">{message}</div>
      )}

      {!isLoading && !message && filings.length === 0 && (
        <div className="disclosure-state">
          최근 기간 내 표시할 SEC 공시가 없습니다.
        </div>
      )}

      {!isLoading && filings.length > 0 && (
        <div className="disclosure-list">
          {filings.map((filing) => (
            <a
              key={filing.accessionNumber}
              className="disclosure-item"
              href={filing.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="disclosure-date">
                  {formatDate(filing.filingDate)} · {filing.form}
                </div>

                <div className="disclosure-title">
                  {filing.primaryDocDescription || filing.primaryDocument}
                </div>

                <div className="disclosure-meta">
                  Report date: {formatDate(filing.reportDate)}
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