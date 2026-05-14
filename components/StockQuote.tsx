"use client";

import { useEffect, useState } from "react";

type StockQuoteData = {
  stockCode: string;
  name: string;
  market: string;
  baseDate: string;
  closePrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
  direction: "up" | "down" | "flat" | "unknown";
  source: string;
};

type StockQuoteProps = {
  stockCode: string;
};

type StockQuoteResponse = {
  ok: boolean;
  message?: string;
  quote: StockQuoteData | null;
};

function formatDate(value: string) {
  if (value.length !== 8) {
    return value || "확인 필요";
  }

  return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
}

function formatWon(value: number | null) {
  if (value === null) {
    return "확인 필요";
  }

  return `${value.toLocaleString("ko-KR")}원`;
}

function formatChange(value: number | null) {
  if (value === null) {
    return "확인 필요";
  }

  const sign = value > 0 ? "+" : "";

  return `${sign}${value.toLocaleString("ko-KR")}원`;
}

function formatRate(value: number | null) {
  if (value === null) {
    return "";
  }

  const sign = value > 0 ? "+" : "";

  return `${sign}${value.toFixed(2)}%`;
}

function getDirectionLabel(direction: StockQuoteData["direction"]) {
  if (direction === "up") {
    return "상승";
  }

  if (direction === "down") {
    return "하락";
  }

  if (direction === "flat") {
    return "보합";
  }

  return "확인 필요";
}

export default function StockQuote({ stockCode }: StockQuoteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<StockQuoteResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadQuote() {
      try {
        setIsLoading(true);

        const params = new URLSearchParams({
          stockCode
        });

        const response = await fetch(`/api/stock/quote?${params.toString()}`);
        const data = (await response.json()) as StockQuoteResponse;

        if (!isMounted) {
          return;
        }

        setResult(data);
      } catch {
        if (!isMounted) {
          return;
        }

        setResult({
          ok: false,
          message: "시장 데이터를 불러오는 중 오류가 발생했습니다.",
          quote: null
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadQuote();

    return () => {
      isMounted = false;
    };
  }, [stockCode]);

  return (
    <section className="card article-section">
      <h2>시장 데이터</h2>

      <p>
        장마감 기준 주가 정보를 확인합니다. 이 정보는 투자 추천이 아니며,
        실제 거래 정보와 차이가 있을 수 있습니다.
      </p>

      {isLoading && (
        <div className="disclosure-state">
          시장 데이터를 불러오는 중입니다. 첫 조회는 몇 초 정도 걸릴 수 있습니다.
        </div>
      )}

      {!isLoading && result && !result.ok && (
        <div className="disclosure-state">
          {result.message || "시장 데이터를 가져오지 못했습니다."}
        </div>
      )}

      {!isLoading && result?.ok && result.quote && (
        <>
          <div className="stock-summary">
            <div>
              <div className="stock-label">종가</div>
              <div className="stock-price">
                {formatWon(result.quote.closePrice)}
              </div>
            </div>

            <div
              className={`stock-change stock-${result.quote.direction}`}
            >
              <div className="stock-label">전일 대비</div>
              <div className="stock-change-value">
                {getDirectionLabel(result.quote.direction)}{" "}
                {formatChange(result.quote.changePrice)}{" "}
                {formatRate(result.quote.changeRate)}
              </div>
            </div>
          </div>

          <div className="stock-meta">
            기준일: {formatDate(result.quote.baseDate)} · 출처:{" "}
            {result.quote.source}
          </div>

          <div className="stock-notice">
            본 시장 데이터는 정보 제공 목적이며, 매수·매도 추천이나 투자 판단
            근거를 제공하지 않습니다. 정확한 시세는 거래소 또는 증권사 원문을
            확인하세요.
          </div>
        </>
      )}
    </section>
  );
}