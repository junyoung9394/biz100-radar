export type StockQuote = {
  stockCode: string;
  changeRate: number | null;
  direction: "up" | "down" | "flat" | "unknown";
};

type YahooChartMeta = {
  regularMarketPrice?: number | null;
  chartPreviousClose?: number | null;
};

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: YahooChartMeta;
    }>;
  };
};

async function fetchYahooStockQuote(symbol: string): Promise<{ price: number | null; prevClose: number | null }> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json"
    },
    cache: "no-store"
  });

  if (!res.ok) return { price: null, prevClose: null };

  const data = (await res.json()) as YahooChartResponse;
  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta) return { price: null, prevClose: null };

  return {
    price: meta.regularMarketPrice ?? null,
    prevClose: meta.chartPreviousClose ?? null
  };
}

function getDirection(change: number | null): StockQuote["direction"] {
  if (change === null) return "unknown";
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

export async function fetchStockQuote({
  stockCode
}: {
  stockCode: string;
}): Promise<StockQuote> {
  // Try KOSPI suffix first
  let { price, prevClose } = await fetchYahooStockQuote(`${stockCode}.KS`);

  // If no valid price, retry with KOSDAQ suffix
  if (price === null || price === 0) {
    ({ price, prevClose } = await fetchYahooStockQuote(`${stockCode}.KQ`));
  }

  if (price === null || prevClose === null || prevClose === 0) {
    return {
      stockCode,
      changeRate: null,
      direction: "unknown"
    };
  }

  const change = price - prevClose;
  const changeRate = (change / prevClose) * 100;

  return {
    stockCode,
    changeRate,
    direction: getDirection(change)
  };
}
