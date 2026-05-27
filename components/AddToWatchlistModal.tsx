"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { companies } from "@/data/companies";
import { usCompanies } from "@/data/us-companies";
import { jpCompanies } from "@/data/jp-companies";
import type { WatchlistItem } from "./WatchlistButton";

const STORAGE_KEY = "biz100-watchlist";

type ModalCompany = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  country: "KR" | "US" | "JP";
  countryLabel: string;
  market: string;
  ticker: string;
  industry: string;
  href: string;
};

const countryColors: Record<ModalCompany["country"], string> = {
  KR: "#1d4ed8",
  US: "#7c3aed",
  JP: "#b45309"
};

const countryBgs: Record<ModalCompany["country"], string> = {
  KR: "#eff6ff",
  US: "#f5f3ff",
  JP: "#fffbeb"
};

function buildAllCompanies(): ModalCompany[] {
  return [
    ...companies.map((c) => ({
      slug: c.slug,
      name: c.name,
      shortName: c.shortName,
      initials: c.initials,
      country: "KR" as const,
      countryLabel: "한국",
      market: c.market,
      ticker: c.ticker,
      industry: c.industry,
      href: `/kr/company/${c.slug}`
    })),
    ...usCompanies.map((c) => ({
      slug: c.slug,
      name: c.name,
      shortName: c.shortName,
      initials: c.initials,
      country: "US" as const,
      countryLabel: "미국",
      market: c.market,
      ticker: c.ticker,
      industry: c.industry,
      href: `/us/company/${c.slug}`
    })),
    ...jpCompanies.map((c) => ({
      slug: c.slug,
      name: c.name,
      shortName: c.shortName,
      initials: c.initials,
      country: "JP" as const,
      countryLabel: "일본",
      market: c.market,
      ticker: c.ticker,
      industry: c.industry,
      href: `/jp/company/${c.slug}`
    }))
  ];
}

function loadWatchlist(): WatchlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WatchlistItem[]) : [];
  } catch {
    return [];
  }
}

function saveWatchlist(items: WatchlistItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {
    // storage quota exceeded
  }
}

type Props = {
  onClose: () => void;
};

export default function AddToWatchlistModal({ onClose }: Props) {
  const [keyword, setKeyword] = useState("");
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const allCompanies = useMemo(() => buildAllCompanies(), []);

  useEffect(() => {
    setWatchlist(loadWatchlist());
    inputRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const normalizedKeyword = keyword.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (normalizedKeyword.length === 0) return allCompanies.slice(0, 40);
    return allCompanies
      .filter((c) => {
        const text = [c.name, c.shortName, c.ticker, c.countryLabel, c.market, c.industry]
          .join(" ")
          .toLowerCase();
        return text.includes(normalizedKeyword);
      })
      .slice(0, 50);
  }, [allCompanies, normalizedKeyword]);

  function isSaved(company: ModalCompany) {
    return watchlist.some(
      (item) => item.slug === company.slug && item.country === company.country
    );
  }

  function toggle(company: ModalCompany) {
    const current = loadWatchlist();
    const alreadySaved = current.some(
      (item) => item.slug === company.slug && item.country === company.country
    );

    let next: WatchlistItem[];
    if (alreadySaved) {
      next = current.filter(
        (item) => !(item.slug === company.slug && item.country === company.country)
      );
    } else {
      next = [
        ...current,
        {
          slug: company.slug,
          name: company.name,
          initials: company.initials,
          country: company.country,
          ticker: company.ticker,
          market: company.market,
          industry: company.industry,
          href: company.href,
          savedAt: Date.now()
        }
      ];
    }
    saveWatchlist(next);
    setWatchlist(next);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">관심기업 추가</h2>
            <p className="modal-subtitle">기업명, 종목코드, 티커로 검색하세요</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="modal-search-wrap">
          <input
            ref={inputRef}
            className="modal-search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="삼성전자, 005930, Apple, AAPL, Toyota..."
          />
          {keyword && (
            <button className="modal-search-clear" onClick={() => setKeyword("")}>
              ×
            </button>
          )}
        </div>

        <div className="modal-company-list">
          {filtered.length === 0 && (
            <div className="modal-empty">검색 결과가 없습니다.</div>
          )}
          {filtered.map((company) => {
            const saved = isSaved(company);
            return (
              <div key={`${company.country}-${company.slug}`} className="modal-company-row">
                <div className="modal-company-initial">{company.initials}</div>
                <div className="modal-company-info">
                  <div className="modal-company-name-row">
                    <span className="modal-company-name">{company.name}</span>
                    <span
                      className="modal-country-badge"
                      style={{
                        color: countryColors[company.country],
                        background: countryBgs[company.country]
                      }}
                    >
                      {company.countryLabel}
                    </span>
                  </div>
                  <div className="modal-company-meta">
                    {company.market} · {company.ticker} · {company.industry}
                  </div>
                </div>
                <button
                  className={`modal-add-btn${saved ? " modal-add-btn-saved" : ""}`}
                  onClick={() => toggle(company)}
                >
                  {saved ? "저장됨" : "+ 추가"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          관심기업 {watchlist.length}개 저장됨 · ESC로 닫기
        </div>
      </div>
    </div>
  );
}
