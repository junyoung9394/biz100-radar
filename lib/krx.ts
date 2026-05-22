export type MarketIndex = {
  name: string;
  value: number | null;
  change: number | null;
  changeRate: number | null;
  direction: "up" | "down" | "flat" | "unknown";
  baseDate: string;
};

function getDirection(change: number | null): MarketIndex["direction"] {
  if (change === null) return "unknown";
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

function getKoreaToday(): string {
  const now = new Date();
  const korea = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const y = korea.getFullYear();
  const m = String(korea.getMonth() + 1).padStart(2, "0");
  const d = String(korea.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

type YahooQuote = {
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketTime?: number;
};

async function fetchYahooQuote(symbol: string): Promise<YahooQuote | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json"
    },
    next: { revalidate: 1800 }
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    chart?: {
      result?: Array<{
        meta?: {
          regularMarketPrice?: number;
          chartPreviousClose?: number;
          regularMarketTime?: number;
        };
      }>;
    };
  };

  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta) return null;

  const price = meta.regularMarketPrice ?? null;
  const prevClose = meta.chartPreviousClose ?? null;
  const change = price !== null && prevClose !== null ? price - prevClose : null;
  const changePercent = change !== null && prevClose ? (change / prevClose) * 100 : null;

  return {
    regularMarketPrice: price ?? undefined,
    regularMarketChange: change ?? undefined,
    regularMarketChangePercent: changePercent ?? undefined,
    regularMarketTime: meta.regularMarketTime
  };
}

function quoteToIndex(name: string, quote: YahooQuote | null): MarketIndex | null {
  if (!quote || quote.regularMarketPrice == null) return null;

  const value = quote.regularMarketPrice;
  const change = quote.regularMarketChange ?? null;
  const changeRate = quote.regularMarketChangePercent ?? null;

  const ts = quote.regularMarketTime;
  let baseDate = getKoreaToday();
  if (ts) {
    const d = new Date(ts * 1000);
    const kd = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    baseDate = `${kd.getFullYear()}${String(kd.getMonth() + 1).padStart(2, "0")}${String(kd.getDate()).padStart(2, "0")}`;
  }

  return { name, value, change, changeRate, direction: getDirection(change), baseDate };
}

export async function fetchMarketIndices(): Promise<{
  kospi: MarketIndex | null;
  kosdaq: MarketIndex | null;
  sp500: MarketIndex | null;
  nasdaq: MarketIndex | null;
  nikkei: MarketIndex | null;
}> {
  const [kospiQuote, kosdaqQuote, sp500Quote, nasdaqQuote, nikkeiQuote] = await Promise.all([
    fetchYahooQuote("^KS11"),
    fetchYahooQuote("^KQ11"),
    fetchYahooQuote("^GSPC"),
    fetchYahooQuote("^IXIC"),
    fetchYahooQuote("^N225")
  ]);

  return {
    kospi: quoteToIndex("코스피", kospiQuote),
    kosdaq: quoteToIndex("코스닥", kosdaqQuote),
    sp500: quoteToIndex("S&P500", sp500Quote),
    nasdaq: quoteToIndex("NASDAQ", nasdaqQuote),
    nikkei: quoteToIndex("닛케이225", nikkeiQuote)
  };
}
