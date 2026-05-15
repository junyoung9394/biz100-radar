"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { companies } from "@/data/companies";
import { jpCompanies } from "@/data/jp-companies";
import { usCompanies } from "@/data/us-companies";

type SearchCompany = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  countryLabel: string;
  market: string;
  ticker: string;
  industry: string;
  businessSummary: string;
  href: string;
};

function getAllSearchCompanies(): SearchCompany[] {
  const krSearchCompanies: SearchCompany[] = companies.map((company) => ({
    slug: company.slug,
    name: company.name,
    shortName: company.shortName,
    initials: company.initials,
    countryLabel: "한국",
    market: company.market,
    ticker: company.ticker,
    industry: company.industry,
    businessSummary: company.businessSummary,
    href: `/kr/company/${company.slug}`
  }));

  const usSearchCompanies: SearchCompany[] = usCompanies.map((company) => ({
    slug: company.slug,
    name: company.name,
    shortName: company.shortName,
    initials: company.initials,
    countryLabel: "미국",
    market: company.market,
    ticker: company.ticker,
    industry: company.industry,
    businessSummary: company.businessSummary,
    href: `/us/company/${company.slug}`
  }));

  const jpSearchCompanies: SearchCompany[] = jpCompanies.map((company) => ({
    slug: company.slug,
    name: company.name,
    shortName: company.shortName,
    initials: company.initials,
    countryLabel: "일본",
    market: company.market,
    ticker: company.ticker,
    industry: company.industry,
    businessSummary: company.businessSummary,
    href: `/jp/company/${company.slug}`
  }));

  return [...krSearchCompanies, ...usSearchCompanies, ...jpSearchCompanies];
}

export default function GlobalCompanySearch() {
  const [keyword, setKeyword] = useState("");

  const allCompanies = useMemo(() => getAllSearchCompanies(), []);

  const normalizedKeyword = keyword.trim().toLowerCase();

  const filteredCompanies = useMemo(() => {
    if (normalizedKeyword.length === 0) {
      return [];
    }

    return allCompanies
      .filter((company) => {
        const searchableText = [
          company.name,
          company.shortName,
          company.initials,
          company.countryLabel,
          company.market,
          company.ticker,
          company.industry,
          company.businessSummary
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedKeyword);
      })
      .slice(0, 6);
  }, [allCompanies, normalizedKeyword]);

  const hasKeyword = normalizedKeyword.length > 0;

  return (
    <section className="card global-search-section">
      <div className="global-search-head">
        <span className="badge">Global Search</span>
        <h2>기업 검색</h2>
        <p>
          기업명, 종목코드, 티커로 한국·미국·일본 주요 기업을 찾아볼 수
          있습니다.
        </p>
      </div>

      <div className="global-search-box">
        <input
          className="global-search-input"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="삼성전자, 005930, Apple, AAPL, Toyota, 7203"
        />

        {keyword && (
          <button
            type="button"
            className="global-search-clear"
            onClick={() => setKeyword("")}
            aria-label="검색어 지우기"
          >
            ×
          </button>
        )}
      </div>

      {hasKeyword && (
        <div className="global-search-results">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <Link
                key={`${company.countryLabel}-${company.slug}`}
                href={company.href}
                className="global-search-result"
              >
                <div className="initial">{company.initials}</div>

                <div>
                  <div className="company-title-row">
                    <h3>{company.name}</h3>
                    <span className="country-chip">{company.countryLabel}</span>
                  </div>

                  <div className="meta">
                    {company.market} · {company.ticker} · {company.industry}
                  </div>
                </div>

                <strong>→</strong>
              </Link>
            ))
          ) : (
            <div className="global-search-empty">
              검색 결과가 없습니다. 기업명, 종목코드, 티커를 다시 입력해보세요.
            </div>
          )}
        </div>
      )}
    </section>
  );
}