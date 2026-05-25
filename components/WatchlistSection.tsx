"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { WatchlistItem } from "./WatchlistButton";
import WatchlistStockBadge from "./WatchlistStockBadge";

const STORAGE_KEY = "biz100-watchlist";

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
  } catch {
    // storage quota exceeded — silently ignore
  }
}

const countryLabels: Record<WatchlistItem["country"], string> = {
  KR: "한국",
  US: "미국",
  JP: "일본"
};

export default function WatchlistSection() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function refresh() {
      setItems(loadWatchlist().sort((a, b) => b.savedAt - a.savedAt));
    }

    refresh();
    setMounted(true);

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) refresh();
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function remove(slug: string, country: WatchlistItem["country"]) {
    const next = loadWatchlist().filter(
      (item) => !(item.slug === slug && item.country === country)
    );
    saveWatchlist(next);
    setItems(next.sort((a, b) => b.savedAt - a.savedAt));
  }

  if (!mounted || items.length === 0) return null;

  return (
    <section id="watchlist" className="container section">
      <div className="section-head">
        <div>
          <span className="badge">My Watchlist</span>
          <h2>관심기업</h2>
          <p className="section-description">
            저장한 기업 목록입니다. 각 기업 페이지에서 별표(☆)를 눌러 추가하거나
            제거할 수 있습니다.
          </p>
        </div>
        <span className="watchlist-count-label">{items.length}개 저장됨</span>
      </div>

      <div className="watch-grid">
        {items.map((item) => (
          <div
            key={`${item.country}-${item.slug}`}
            className="card watch-card watchlist-card"
          >
            <Link href={item.href} className="watchlist-card-link">
              <div className="watch-card-top">
                <div className="initial">{item.initials}</div>
                <div>
                  <div className="company-title-row">
                    <h3>{item.name}</h3>
                    <span className="watchlist-country-badge">
                      {countryLabels[item.country]}
                    </span>
                  </div>
                  <div className="meta">
                    {item.market} · {item.ticker} · {item.industry}
                  </div>
                  <div className="watchlist-quote-row">
                    <WatchlistStockBadge
                      country={item.country}
                      ticker={item.ticker}
                    />
                  </div>
                </div>
              </div>
              <div className="watch-card-footer">
                <span>기업정보 보기</span>
                <strong>→</strong>
              </div>
            </Link>
            <button
              className="watchlist-remove-btn"
              onClick={() => remove(item.slug, item.country)}
              aria-label="관심기업에서 제거"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
