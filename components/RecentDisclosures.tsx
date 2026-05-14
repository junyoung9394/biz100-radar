"use client";

import { useEffect, useState } from "react";

type Disclosure = {
  corpName: string;
  stockCode: string;
  reportName: string;
  receiptNo: string;
  receiptDate: string;
  submitter: string;
  remark: string;
  url: string;
};

type RecentDisclosuresProps = {
  companyName: string;
  stockCode: string;
  dartCorpCode?: string;
};

function formatDate(dateText: string) {
  if (dateText.length !== 8) {
    return dateText;
  }

  return `${dateText.slice(0, 4)}.${dateText.slice(4, 6)}.${dateText.slice(6, 8)}`;
}

export default function RecentDisclosures({
  companyName,
  stockCode,
  dartCorpCode
}: RecentDisclosuresProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadDisclosures() {
      try {
        setIsLoading(true);

const params = new URLSearchParams({
  companyName,
  stockCode
});

if (dartCorpCode) {
  params.set("dartCorpCode", dartCorpCode);
}

        const response = await fetch(`/api/dart/disclosures?${params.toString()}`);
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (!data.ok) {
          setMessage(data.message ?? "최근 공시를 가져오지 못했습니다.");
          setDisclosures([]);
          return;
        }

        setDisclosures(data.disclosures ?? []);
        setMessage("");
      } catch {
        if (!isMounted) {
          return;
        }

        setMessage("최근 공시를 불러오는 중 오류가 발생했습니다.");
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
  }, [companyName, stockCode]);

  return (
    <section className="card article-section">
      <h2>최근 공식 공시</h2>
      <p>
        OpenDART에서 최근 공시 목록을 자동으로 확인합니다. 공시 원문은 DART
        사이트에서 직접 확인할 수 있습니다.
      </p>

      {isLoading && (
        <div className="disclosure-state">최근 공시를 불러오는 중입니다.</div>
      )}

      {!isLoading && message && (
        <div className="disclosure-state">{message}</div>
      )}

      {!isLoading && !message && disclosures.length === 0 && (
        <div className="disclosure-state">
          최근 기간 내 표시할 공시가 없습니다.
        </div>
      )}

      {!isLoading && disclosures.length > 0 && (
        <div className="disclosure-list">
          {disclosures.map((disclosure) => (
            <a
              key={disclosure.receiptNo}
              className="disclosure-item"
              href={disclosure.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="disclosure-date">
                  {formatDate(disclosure.receiptDate)}
                </div>
                <div className="disclosure-title">
                  {disclosure.reportName}
                </div>
                <div className="disclosure-meta">
                  제출인: {disclosure.submitter || disclosure.corpName}
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