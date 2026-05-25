"use client";

import { useEffect, useState } from "react";

type Direction = "up" | "down" | "flat" | "unknown";

type QuoteResult = {
  direction: Direction;
  changeRate: number | null;
};

function formatRate(value: number | null) {
  if (value === null) return null;
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

async function fetchKrQuote(stockCode: string): Promise<QuoteResult> {
  const res = await fetch(
    `/api/stock/quote?stockCode=${encodeURIComponent(stockCode)}`
  );
  const data = await res.json();
  if (data.ok && data.quote) {
    return { direction: data.quote.direction, changeRate: data.quote.changeRate };
  }
  return { direction: "unknown", changeRate: null };
}

async function fetchUsQuote(ticker: string): Promise<QuoteResult> {
  const res = await fetch(
    `/api/us-stock/quote?ticker=${encodeURIComponent(ticker)}`
  );
  const data = await res.json();
  if (data.ok && data.quote) {
    return {
      direction: data.quote.direction,
      changeRate: data.quote.changeRate
    };
  }
  return { direction: "unknown", changeRate: null };
}

type Props = {
  country: "KR" | "US" | "JP";
  ticker: string;
};

export default function WatchlistStockBadge({ country, ticker }: Props) {
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        let result: QuoteResult;
        if (country === "KR") {
          result = await fetchKrQuote(ticker);
        } else if (country === "US") {
          result = await fetchUsQuote(ticker);
        } else {
          return;
        }
        if (active) setQuote(result);
      } catch {
        // fail silently in watchlist context
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [country, ticker]);

  if (country === "JP") {
    return (
      <span className="watchlist-stock-badge watchlist-stock-flat">공시 확인</span>
    );
  }

  if (!quote) {
    return (
      <span className="watchlist-stock-badge watchlist-stock-loading">로딩 중</span>
    );
  }

  if (quote.direction === "unknown") {
    return (
      <span className="watchlist-stock-badge watchlist-stock-flat">확인 필요</span>
    );
  }

  const rateLabel = formatRate(quote.changeRate);

  return (
    <span
      className={`watchlist-stock-badge watchlist-stock-${quote.direction}`}
    >
      {quote.direction === "up" ? "▲" : quote.direction === "down" ? "▼" : "—"}
      {rateLabel ? ` ${rateLabel}` : ""}
    </span>
  );
}
