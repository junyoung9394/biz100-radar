import { NextResponse } from "next/server";
import { fetchRecentSecFilings, type SecFiling } from "@/lib/sec";

type CachedSecFilings = {
  filings: SecFiling[];
  cachedAt: number;
};

const cache = new Map<string, CachedSecFilings>();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function getCachedFilings(cik: string) {
  const cached = cache.get(cik);

  if (!cached) {
    return null;
  }

  if (Date.now() - cached.cachedAt > CACHE_TTL_MS) {
    cache.delete(cik);
    return null;
  }

  return cached.filings;
}

function setCachedFilings(cik: string, filings: SecFiling[]) {
  cache.set(cik, {
    filings,
    cachedAt: Date.now()
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cik = searchParams.get("cik") ?? "";

  if (!cik) {
    return NextResponse.json(
      {
        ok: false,
        message: "cik가 필요합니다.",
        filings: [],
        cached: false
      },
      { status: 400 }
    );
  }

  const cachedFilings = getCachedFilings(cik);

  if (cachedFilings) {
    return NextResponse.json({
      ok: true,
      filings: cachedFilings,
      cached: true
    });
  }

  try {
    const filings = await fetchRecentSecFilings({ cik });

    setCachedFilings(cik, filings);

    return NextResponse.json({
      ok: true,
      filings,
      cached: false
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "SEC 공시를 가져오지 못했습니다.";

    console.error("[SEC_FILINGS_ERROR]", {
      cik,
      message
    });

    return NextResponse.json(
      {
        ok: false,
        message,
        filings: [],
        cached: false
      },
      { status: 200 }
    );
  }
}