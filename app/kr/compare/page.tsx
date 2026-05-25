"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { companies } from "@/data/companies";

type MatchedCompany = (typeof companies)[0];

function searchCompanies(query: string): MatchedCompany[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return companies
    .filter((c) => {
      const text = [c.name, c.shortName, c.ticker, c.industry].join(" ").toLowerCase();
      return text.includes(q);
    })
    .slice(0, 8);
}

function CompanyPicker({
  label,
  selected,
  onSelect,
  excludeSlug
}: {
  label: string;
  selected: MatchedCompany | null;
  onSelect: (c: MatchedCompany) => void;
  excludeSlug?: string;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => searchCompanies(query).filter((c) => c.slug !== excludeSlug),
    [query, excludeSlug]
  );

  if (selected) {
    return (
      <div className="compare-picker compare-picker-selected">
        <div className="compare-picker-selected-top">
          <div className="initial">{selected.initials}</div>
          <div>
            <div className="company-title-row">
              <strong>{selected.name}</strong>
            </div>
            <div className="meta">
              {selected.market} · {selected.ticker} · {selected.industry}
            </div>
          </div>
        </div>
        <button
          className="compare-change-btn"
          onClick={() => setQuery("")}
          type="button"
        >
          기업 변경
        </button>
      </div>
    );
  }

  return (
    <div className="compare-picker">
      <label className="compare-picker-label">{label}</label>
      <input
        className="search-input"
        placeholder="기업명 또는 종목코드 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="compare-picker-results">
          {results.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                className="compare-picker-result-btn"
                onClick={() => {
                  onSelect(c);
                  setQuery("");
                }}
              >
                <span className="initial compare-result-initial">{c.initials}</span>
                <span>
                  <strong>{c.name}</strong>
                  <span className="meta"> {c.market} · {c.ticker}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type CompareRowProps = {
  label: string;
  a: string | string[];
  b: string | string[];
};

function CompareRow({ label, a, b }: CompareRowProps) {
  const aStr = Array.isArray(a) ? a.join(", ") : a;
  const bStr = Array.isArray(b) ? b.join(", ") : b;
  const same = aStr === bStr;
  return (
    <div className={`compare-row${same ? " compare-row-same" : ""}`}>
      <div className="compare-row-label">{label}</div>
      <div className="compare-row-a">{aStr}</div>
      <div className="compare-row-b">{bStr}</div>
    </div>
  );
}

export default function ComparePage() {
  const [companyA, setCompanyA] = useState<MatchedCompany | null>(null);
  const [companyB, setCompanyB] = useState<MatchedCompany | null>(null);

  const canCompare = companyA && companyB;

  return (
    <main className="container">
      <section className="page-title">
        <Link href="/kr" style={{ color: "#2563eb", fontWeight: 950 }}>
          ← 한국 기업 목록
        </Link>
        <span className="badge" style={{ marginTop: "12px" }}>Compare</span>
        <h1>기업 비교</h1>
        <p>
          두 기업의 업종, 시장, 주요 사업, 키워드를 나란히 비교합니다.
          투자 추천이 아닌 기업정보 확인용 비교입니다.
        </p>
      </section>

      <div className="compare-picker-row">
        <CompanyPicker
          label="기업 A 선택"
          selected={companyA}
          onSelect={setCompanyA}
          excludeSlug={companyB?.slug}
        />
        <div className="compare-vs-divider">VS</div>
        <CompanyPicker
          label="기업 B 선택"
          selected={companyB}
          onSelect={setCompanyB}
          excludeSlug={companyA?.slug}
        />
      </div>

      {canCompare && (
        <section className="compare-table card">
          <div className="compare-table-header">
            <div className="compare-row-label" />
            <div className="compare-col-head">
              <div className="initial">{companyA.initials}</div>
              <strong>{companyA.name}</strong>
            </div>
            <div className="compare-col-head">
              <div className="initial">{companyB.initials}</div>
              <strong>{companyB.name}</strong>
            </div>
          </div>

          <CompareRow label="시장" a={companyA.market} b={companyB.market} />
          <CompareRow label="종목코드" a={companyA.ticker} b={companyB.ticker} />
          <CompareRow label="업종" a={companyA.industry} b={companyB.industry} />
          <CompareRow
            label="주요 사업"
            a={companyA.keyBusinesses}
            b={companyB.keyBusinesses}
          />
          <div className="compare-row compare-row-summary">
            <div className="compare-row-label">사업 개요</div>
            <div className="compare-row-a">{companyA.businessSummary}</div>
            <div className="compare-row-b">{companyB.businessSummary}</div>
          </div>

          <div className="compare-actions">
            <Link
              href={`/kr/company/${companyA.slug}`}
              className="btn btn-primary"
            >
              {companyA.name} 상세 보기
            </Link>
            <Link
              href={`/kr/company/${companyB.slug}`}
              className="btn btn-primary"
            >
              {companyB.name} 상세 보기
            </Link>
          </div>
        </section>
      )}

      {!canCompare && (
        <div className="compare-empty card">
          <p>두 기업을 선택하면 비교 정보가 표시됩니다.</p>
          <p className="compare-empty-hint">
            예시: 삼성전자 vs SK하이닉스 / LG에너지솔루션 vs 삼성SDI
          </p>
        </div>
      )}
    </main>
  );
}
