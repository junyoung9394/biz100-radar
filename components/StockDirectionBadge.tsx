"use client";

import { useEffect, useRef, useState } from "react";

type StockDirection = "up" | "down" | "flat" | "unknown";

type StockQuoteResponse = {
  ok: boolean;
  quote: {
    changeRate: number | null;
    direction: StockDirection;
  } | null;
};

type StockDirectionBadgeProps = {
  stockCode: string;
};

function getDirectionLabel(direction: StockDirection) {
  if (direction === "up") {
    return "상승";
  }

  if (direction === "down") {
    return "하락";
  }

  if (direction === "flat") {
    return "보합";
  }

  return "확인중";
}

function formatRate(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "";
  }

  const sign = value > 0 ? "+" : "";

  return `${sign}${value.toFixed(2)}%`;
}

export default function StockDirectionBadge({
  stockCode
}: StockDirectionBadgeProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [direction, setDirection] = useState<StockDirection>("unknown");
  const [changeRate, setChangeRate] = useState<number | null>(null);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "160px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasEnteredView) {
      return;
    }

    let isMounted = true;

    async function loadQuote() {
      try {
        const params = new URLSearchParams({
          stockCode
        });

        const response = await fetch(`/api/stock/quote?${params.toString()}`);
        const data = (await response.json()) as StockQuoteResponse;

        if (!isMounted) {
          return;
        }

        if (data.ok && data.quote) {
          setDirection(data.quote.direction);
          setChangeRate(data.quote.changeRate);
        }
      } catch {
        if (isMounted) {
          setDirection("unknown");
          setChangeRate(null);
        }
      }
    }

    loadQuote();

    return () => {
      isMounted = false;
    };
  }, [hasEnteredView, stockCode]);

  return (
    <span
      ref={wrapperRef}
      className={`stock-direction-badge stock-direction-${direction}`}
    >
      {getDirectionLabel(direction)}
      {direction !== "unknown" && changeRate !== null ? (
        <span className="stock-direction-rate">{formatRate(changeRate)}</span>
      ) : null}
    </span>
  );
}