"use client";

import { useEffect, useState } from "react";

type MarketIndexData = {
  name: string;
  value: number | null;
  change: number | null;
  changeRate: number | null;
  direction: "up" | "down" | "flat" | "unknown";
  baseDate: string;
};

type ApiResponse = {
  ok: boolean;
  message?: string;
  indices: {
    kospi: MarketIndexData | null;
    kosdaq: MarketIndexData | null;
    sp500: MarketIndexData | null;
    nasdaq: MarketIndexData | null;
    nikkei: MarketIndexData | null;
  } | null;
};

function formatValue(v: number | null) {
  if (v === null) return "—";
  return v.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
}

function formatChange(v: number | null) {
  if (v === null) return "";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}`;
}

function formatRate(v: number | null) {
  if (v === null) return "";
  const sign = v > 0 ? "+" : "";
  return `(${sign}${v.toFixed(2)}%)`;
}

function formatDate(s: string) {
  if (s.length === 8) return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
  return s;
}

function IndexCard({
  label,
  description,
  data,
  loading
}: {
  label: string;
  description: string;
  data: MarketIndexData | null;
  loading: boolean;
}) {
  return (
    <div className="market-index-card">
      <div className="market-index-label">{label}</div>
      <h3>{description}</h3>

      {loading && (
        <div className="market-index-status">지수 데이터를 불러오는 중...</div>
      )}

      {!loading && !data && (
        <div className="market-index-status">지수 데이터를 가져오지 못했습니다.</div>
      )}

      {!loading && data && (
        <>
          <div className={`market-index-value market-index-${data.direction}`}>
            <span className="market-index-number">{formatValue(data.value)}</span>
            <span className="market-index-change">
              {formatChange(data.change)} {formatRate(data.changeRate)}
            </span>
          </div>
          <div className="market-index-date">
            기준일: {formatDate(data.baseDate)} · 출처: Yahoo Finance (15분 지연)
          </div>
        </>
      )}
    </div>
  );
}

export default function MarketIndex() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch("/api/krx/index")
      .then((r) => r.json())
      .then((json) => setData(json as ApiResponse))
      .catch(() => setData({ ok: false, message: "네트워크 오류", indices: null }))
      .finally(() => setLoading(false));
  }, []);

  const kospi = data?.indices?.kospi ?? null;
  const kosdaq = data?.indices?.kosdaq ?? null;
  const sp500 = data?.indices?.sp500 ?? null;
  const nasdaq = data?.indices?.nasdaq ?? null;
  const nikkei = data?.indices?.nikkei ?? null;

  return (
    <div>
      <div className="market-index-group">
        <div className="market-index-group-label">한국</div>
        <div className="market-index-grid">
          <IndexCard
            label="KOSPI"
            description="대형 상장기업 중심의 대표 시장"
            data={kospi}
            loading={loading}
          />
          <IndexCard
            label="KOSDAQ"
            description="기술·바이오·성장기업 중심 시장"
            data={kosdaq}
            loading={loading}
          />
        </div>
      </div>

      <div className="market-index-group">
        <div className="market-index-group-label">미국</div>
        <div className="market-index-grid">
          <IndexCard
            label="S&P500"
            description="미국 대형주 500개 종합 지수"
            data={sp500}
            loading={loading}
          />
          <IndexCard
            label="NASDAQ"
            description="기술주 중심 미국 전자거래 시장"
            data={nasdaq}
            loading={loading}
          />
        </div>
      </div>

      <div className="market-index-group">
        <div className="market-index-group-label">일본</div>
        <div className="market-index-grid">
          <IndexCard
            label="닛케이225"
            description="일본 주요 225개 종목 대표 지수"
            data={nikkei}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
