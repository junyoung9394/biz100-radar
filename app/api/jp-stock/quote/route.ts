import { NextResponse } from "next/server";
import { fetchJpStockQuote, type JpStockQuote } from "@/lib/jp-stock";

type CachedJpStockQuote = {
  quote: JpStockQuote;
  cachedAt: number;
};

const cache = new Map<string, CachedJpStockQuote>();

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

function getCachedQuote(ticker: string) {
  const cached = cache.get(ticker);

  if (!cached) {
    return null;
  }

  const now = Date.now();
  const isFresh = now - cached.cachedAt < CACHE_TTL_MS;

  if (!isFresh) {
    cache.delete(ticker);
    return null;
  }

  return cached.quote;
}

function setCachedQuote(ticker: string, quote: JpStockQuote) {
  cache.set(ticker, {
    quote,
    cachedAt: Date.now()
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") ?? "";

  if (!ticker) {
    return NextResponse.json(
      {
        ok: false,
        message: "ticker가 필요합니다.",
        quote: null,
        cached: false
      },
      { status: 400 }
    );
  }

  const cachedQuote = getCachedQuote(ticker);

  if (cachedQuote) {
    return NextResponse.json({
      ok: true,
      quote: cachedQuote,
      cached: true
    });
  }

  try {
    const quote = await fetchJpStockQuote({ ticker });

    setCachedQuote(ticker, quote);

    return NextResponse.json({
      ok: true,
      quote,
      cached: false
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "일본 시장 데이터를 가져오지 못했습니다.";

    console.error("[JP_STOCK_QUOTE_ERROR]", {
      ticker,
      message
    });

    return NextResponse.json(
      {
        ok: false,
        message,
        quote: null,
        cached: false
      },
      { status: 200 }
    );
  }
}