"use client";

import { useEffect, useState } from "react";

export type WatchlistItem = {
  slug: string;
  name: string;
  initials: string;
  country: "KR" | "US" | "JP";
  ticker: string;
  market: string;
  industry: string;
  href: string;
  savedAt: number;
};

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

type Props = {
  slug: string;
  name: string;
  initials: string;
  country: "KR" | "US" | "JP";
  ticker: string;
  market: string;
  industry: string;
  href: string;
};

export default function WatchlistButton({
  slug,
  name,
  initials,
  country,
  ticker,
  market,
  industry,
  href
}: Props) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const list = loadWatchlist();
    setSaved(list.some((item) => item.slug === slug && item.country === country));
    setMounted(true);
  }, [slug, country]);

  function toggle() {
    const list = loadWatchlist();
    const alreadySaved = list.some(
      (item) => item.slug === slug && item.country === country
    );

    if (alreadySaved) {
      const next = list.filter(
        (item) => !(item.slug === slug && item.country === country)
      );
      saveWatchlist(next);
      setSaved(false);
    } else {
      const next: WatchlistItem[] = [
        ...list,
        { slug, name, initials, country, ticker, market, industry, href, savedAt: Date.now() }
      ];
      saveWatchlist(next);
      setSaved(true);
    }
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className={`watchlist-btn${saved ? " watchlist-btn-saved" : ""}`}
      aria-label={saved ? "관심기업에서 제거" : "관심기업으로 저장"}
    >
      <span className="watchlist-btn-icon">{saved ? "★" : "☆"}</span>
      <span>{saved ? "관심기업 저장됨" : "관심기업 저장"}</span>
    </button>
  );
}
