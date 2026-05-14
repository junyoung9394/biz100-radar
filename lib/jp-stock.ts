export type JpStockQuote = {
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

type JQuantsBarItem = {
  Date?: string;
  Code?: string;
  Open?: number | null;
  High?: number | null;
  Low?: number | null;
  Close?: number | null;
  UpperLimit?: string;
  LowerLimit?: string;
  Volume?: number | null;
  TurnoverValue?: number | null;
  AdjustmentFactor?: number | null;
  AdjustmentOpen?: number | null;
  AdjustmentHigh?: number | null;
  AdjustmentLow?: number | null;
  AdjustmentClose?: number | null;
  AdjustmentVolume?: number | null;
};

type JQuantsDailyBarsResponse = {
  daily_quotes?: JQuantsBarItem[];
  bars?: JQuantsBarItem[];
  data?: JQuantsBarItem[];
  message?: string;
};

function getJQuantsApiKey() {
  const apiKey = process.env.JQUANTS_API_KEY;

  if (!apiKey) {
    throw new Error("JQUANTS_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function normalizeCode(ticker: string) {
  const trimmed = ticker.trim();

  if (trimmed.length === 4) {
    return `${trimmed}0`;
  }

  return trimmed;
}

function getDirection(changePrice: number | null): JpStockQuote["direction"] {
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

function toDateText(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateRange(days: number) {
  const end = new Date();
  const start = new Date();

  // J-Quants Free 플랜은 최신 데이터 접근이 제한될 수 있으므로
  // 현재 날짜가 아니라 약 90일 전을 조회 종료일로 사용합니다.
  end.setDate(end.getDate() - 90);
  start.setDate(end.getDate() - days);

  return {
    from: toDateText(start),
    to: toDateText(end)
  };
}

function getBarsFromResponse(data: JQuantsDailyBarsResponse) {
  return data.daily_quotes ?? data.bars ?? data.data ?? [];
}

function getClosePrice(item: JQuantsBarItem) {
  return item.AdjustmentClose ?? item.Close ?? null;
}

export async function fetchJpStockQuote({
  ticker
}: {
  ticker: string;
}): Promise<JpStockQuote> {
  const apiKey = getJQuantsApiKey();
  const code = normalizeCode(ticker);
  const { from, to } = getDateRange(220);

  const url = new URL("https://api.jquants.com/v2/equities/bars/daily");
  url.searchParams.set("code", code);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const response = await fetch(url.toString(), {
    headers: {
      "x-api-key": apiKey
    },
    cache: "no-store"
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `J-Quants API 오류: ${response.status} / ${responseText.slice(0, 300)}`
    );
  }

  let data: JQuantsDailyBarsResponse;

  try {
    data = JSON.parse(responseText) as JQuantsDailyBarsResponse;
  } catch {
    throw new Error(
      `J-Quants API가 JSON이 아닌 응답을 반환했습니다: ${responseText.slice(
        0,
        300
      )}`
    );
  }

  const bars = getBarsFromResponse(data)
    .filter((item) => item.Code === code || !item.Code)
    .filter((item) => item.Date && getClosePrice(item) !== null)
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));

  if (bars.length === 0) {
    throw new Error(
      "J-Quants에서 표시할 일본 주가 데이터를 찾지 못했습니다. Free 플랜은 최신 데이터 접근이 제한될 수 있습니다."
    );
  }

  const latest = bars[bars.length - 1];
  const previous = bars.length >= 2 ? bars[bars.length - 2] : null;

  const closePrice = getClosePrice(latest);
  const previousClosePrice = previous ? getClosePrice(previous) : null;

  const changePrice =
    closePrice !== null && previousClosePrice !== null
      ? closePrice - previousClosePrice
      : null;

  const changeRate =
    changePrice !== null &&
    previousClosePrice !== null &&
    previousClosePrice !== 0
      ? (changePrice / previousClosePrice) * 100
      : null;

  return {
    ticker,
    code,
    baseDate: latest.Date ?? "",
    closePrice,
    previousClosePrice,
    changePrice,
    changeRate,
    direction: getDirection(changePrice),
    source: "J-Quants"
  };
}