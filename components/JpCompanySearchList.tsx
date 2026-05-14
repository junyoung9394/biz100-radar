"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { JpCompany } from "@/data/jp-companies";

type JpCompanySearchListProps = {
  companies: JpCompany[];
};

const ALL_INDUSTRY = "전체";

export default function JpCompanySearchList({
  companies
}: JpCompanySearchListProps) {
  const [keyword, setKeyword] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(ALL_INDUSTRY);

  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(
      new Set(companies.map((company) => company.industry))
    ).sort();

    return [ALL_INDUSTRY, ...uniqueIndustries];
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return companies.filter((company) => {
      const matchesIndustry =
        selectedIndustry === ALL_INDUSTRY ||
        company.industry === selectedIndustry;

      const searchableText = [
        company.name,
        company.shortName,
        company.initials,
        company.market,
        company.ticker,
        company.industry,
        company.businessSummary,
        ...company.keyBusinesses
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        normalizedKeyword.length === 0 ||
        searchableText.includes(normalizedKeyword);

      return matchesIndustry && matchesKeyword;
    });
  }, [companies, keyword, selectedIndustry]);

  return (
    <>
      <section className="card filter-box">
        <label className="search-label" htmlFor="jp-company-search">
          기업명, 종목코드, 업종으로 검색
        </label>

        <input
          id="jp-company-search"
          className="search-input"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="예: Toyota, 7203, Gaming, Semiconductors"
        />

        <div className="filter-actions">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              className={
                selectedIndustry === industry
                  ? "industry-chip active"
                  : "industry-chip"
              }
              onClick={() => setSelectedIndustry(industry)}
            >
              {industry}
            </button>
          ))}
        </div>

        <div className="filter-result">
          검색 결과: <strong>{filteredCompanies.length}</strong>개 기업
        </div>
      </section>

      <section className="company-list">
        {filteredCompanies.map((company, index) => (
          <Link
            key={company.slug}
            href={`/jp/company/${company.slug}`}
            className="card company-list-card"
          >
            <div className="company-list-card-inner">
              <div className="company-row">
                <div className="initial">{company.initials}</div>

                <div>
                  <div className="meta">
                    JP Company {String(index + 1).padStart(3, "0")}
                  </div>

<div className="company-title-row">
  <h3>{company.name}</h3>
</div>

                  <div className="meta">
                    Market: {company.market} · Code: {company.ticker} ·
                    Industry: {company.industry}
                  </div>

                  <div className="summary">{company.businessSummary}</div>
                </div>
              </div>

              <strong style={{ color: "#2563eb", whiteSpace: "nowrap" }}>
                기업정보 보기 →
              </strong>
            </div>
          </Link>
        ))}

        {filteredCompanies.length === 0 && (
          <div className="card empty-state">
            <h2>검색 결과가 없습니다</h2>
            <p>
              기업명, 종목코드, 업종 키워드를 다시 입력해보세요. 예: Toyota,
              7203, Gaming, Electronics
            </p>
          </div>
        )}
      </section>
    </>
  );
}