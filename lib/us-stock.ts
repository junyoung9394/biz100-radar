export type UsStockQuote = {
  ticker: string;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
  previousClose: number | null;
  direction: "up" | "down" | "flat" | "unknown";
  source: string;
};

type FinnhubQuoteResponse = {
  c?: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
  t?: number;
};

function getFinnhubApiKey() {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    throw new Error("FINNHUB_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function getDirection(changePrice: number | null): UsStockQuote["direction"] {
  if (changePrice === null) {
    return "unknown";
  }

  if (changePrice > 0) {
    return "up";
  }

  if (changePrice < 0) {
    return "down";
  }

  return "flat";
}

function normalizeNumber(value: unknown) {
  if (typeof value !== "number") {
    return null;
  }

  if (Number.isNaN(value)) {
    return null;
  }

  return value;
}

export async function fetchUsStockQuote({
  ticker
}: {
  ticker: string;
}): Promise<UsStockQuote> {
  const apiKey = getFinnhubApiKey();

  const url = new URL("https://finnhub.io/api/v1/quote");
  url.searchParams.set("symbol", ticker);
  url.searchParams.set("token", apiKey);

  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Finnhub API 오류: ${response.status} / ${responseText.slice(0, 200)}`
    );
  }

  let data: FinnhubQuoteResponse;

  try {
    data = JSON.parse(responseText) as FinnhubQuoteResponse;
  } catch {
    throw new Error(
      `Finnhub API가 JSON이 아닌 응답을 반환했습니다: ${responseText.slice(
        0,
        200
      )}`
    );
  }

  const currentPrice = normalizeNumber(data.c);
  const changePrice = normalizeNumber(data.d);
  const changeRate = normalizeNumber(data.dp);
  const previousClose = normalizeNumber(data.pc);

  if (currentPrice === null || currentPrice === 0) {
    throw new Error(
      "미국 시장 데이터를 찾지 못했습니다. 티커 또는 Finnhub API 키 상태를 확인해야 합니다."
    );
  }

  return {
    ticker,
    currentPrice,
    changePrice,
    changeRate,
    previousClose,
    direction: getDirection(changePrice),
    source: "Finnhub"
  };
}