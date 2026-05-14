"use client";

import { useEffect, useState } from "react";

type JpStockQuoteData = {
  ticker: string;
  code: string;
  baseDate: string;
  closePrice: number | null;
  previousClosePrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
  direction: "up" | "down" | "flat" | "unknown";
  source: string;
};

type JpStockQuoteProps = {
  ticker: string;
};

type JpStockQuoteResponse = {
  ok: boolean;
  message?: string;
  quote: JpStockQuoteData | null;
};

function formatYen(value: number | null) {
  if (value === null) {
    return "확인 필요";
  }

  return `¥${value.toLocaleString("ja-JP", {
    maximumFractionDigits: 2
  })}`;
}

function formatChange(value: number | null) {
  if (value === null) {
    return "확인 필요";
  }

  const sign = value > 0 ? "+" : "";

  return `${sign}¥${value.toLocaleString("ja-JP", {
    maximumFractionDigits: 2
  })}`;
}

function formatRate(value: number | null) {
  if (value === null) {
    return "";
  }

  const sign = value > 0 ? "+" : "";

  return `${sign}${value.toFixed(2)}%`;
}

function formatDate(value: string) {
  if (!value) {
    return "확인 필요";
  }

  return value.replaceAll("-", ".");
}

function getDirectionLabel(direction: JpStockQuoteData["direction"]) {
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

export default function JpStockQuote({ ticker }: JpStockQuoteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<JpStockQuoteResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadQuote() {
      try {
        setIsLoading(true);

        const params = new URLSearchParams({
          ticker
        });

        const response = await fetch(`/api/jp-stock/quote?${params.toString()}`);
        const data = (await response.json()) as JpStockQuoteResponse;

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
          message: "일본 시장 데이터를 불러오는 중 오류가 발생했습니다.",
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
  }, [ticker]);

  return (
    <section className="card article-section">
      <h2>시장 데이터</h2>

      <p>
        일본 시장의 주가 정보를 확인합니다. Free 플랜에서는 최신 데이터가
        제한될 수 있으며, 이 정보는 투자 추천이 아닙니다.
      </p>

      {isLoading && (
        <div className="disclosure-state">
          일본 시장 데이터를 불러오는 중입니다. 첫 조회는 몇 초 정도 걸릴 수
          있습니다.
        </div>
      )}

      {!isLoading && result && !result.ok && (
        <div className="disclosure-state">
{result.message?.includes("429")
  ? "J-Quants Free 플랜 호출 제한에 도달했습니다. 잠시 후 다시 확인해주세요."
  : result.message || "일본 시장 데이터를 가져오지 못했습니다."}
        </div>
      )}

      {!isLoading && result?.ok && result.quote && (
        <>
          <div className="stock-summary">
            <div>
              <div className="stock-label">종가</div>
              <div className="stock-price">
                {formatYen(result.quote.closePrice)}
              </div>
            </div>

            <div className={`stock-change stock-${result.quote.direction}`}>
              <div className="stock-label">전일 대비</div>
              <div className="stock-change-value">
                {getDirectionLabel(result.quote.direction)}{" "}
                {formatChange(result.quote.changePrice)}{" "}
                {formatRate(result.quote.changeRate)}
              </div>
            </div>
          </div>

          <div className="stock-meta">
            기준일: {formatDate(result.quote.baseDate)} · 이전 종가:{" "}
            {formatYen(result.quote.previousClosePrice)} · 출처:{" "}
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