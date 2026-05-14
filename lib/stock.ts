export type StockQuote = {
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

type StockApiItem = {
  basDt?: string;
  srtnCd?: string;
  itmsNm?: string;
  mrktCtg?: string;
  clpr?: string;
  vs?: string;
  fltRt?: string;
};

function getStockApiKey() {
  const apiKey = process.env.STOCK_API_KEY;

  if (!apiKey) {
    throw new Error("STOCK_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function toNumber(value?: string) {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/,/g, "").trim();
  const numberValue = Number(normalized);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function getDirection(changePrice: number | null): StockQuote["direction"] {
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

function normalizeItems(rawItems: unknown): StockApiItem[] {
  if (!rawItems) {
    return [];
  }

  if (Array.isArray(rawItems)) {
    return rawItems as StockApiItem[];
  }

  return [rawItems as StockApiItem];
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function fetchStockQuote({
  stockCode
}: {
  stockCode: string;
}): Promise<StockQuote> {
  const apiKey = getStockApiKey();

  const url = new URL(
    "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo"
  );

  url.searchParams.set("serviceKey", apiKey);
  url.searchParams.set("resultType", "json");
  url.searchParams.set("numOfRows", "10");
  url.searchParams.set("pageNo", "1");
  url.searchParams.set("likeSrtnCd", stockCode);

  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `주식시세 API HTTP 오류: ${response.status} / ${stripHtml(responseText).slice(0, 300)}`
    );
  }

  let data: unknown;

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(
      `주식시세 API가 JSON이 아닌 응답을 반환했습니다: ${stripHtml(responseText).slice(0, 300)}`
    );
  }

  const apiData = data as {
    response?: {
      header?: {
        resultCode?: string;
        resultMsg?: string;
      };
      body?: {
        items?: {
          item?: unknown;
        };
      };
    };
  };

  const resultCode = apiData.response?.header?.resultCode;
  const resultMsg = apiData.response?.header?.resultMsg;

  if (resultCode && resultCode !== "00") {
    throw new Error(`주식시세 API 응답 오류: ${resultCode} / ${resultMsg ?? "알 수 없는 오류"}`);
  }

  const rawItems = apiData.response?.body?.items?.item;
  const items = normalizeItems(rawItems);

  const item = items.find((stock) => stock.srtnCd === stockCode) ?? items[0];

  if (!item) {
    throw new Error(
      "주식시세 API 응답은 성공했지만 해당 종목의 시세 데이터가 없습니다. API 활용신청 승인 상태 또는 종목코드를 확인해야 합니다."
    );
  }

  const closePrice = toNumber(item.clpr);
  const changePrice = toNumber(item.vs);
  const changeRate = toNumber(item.fltRt);

  return {
    stockCode: item.srtnCd ?? stockCode,
    name: item.itmsNm ?? "",
    market: item.mrktCtg ?? "",
    baseDate: item.basDt ?? "",
    closePrice,
    changePrice,
    changeRate,
    direction: getDirection(changePrice),
    source: "금융위원회_주식시세정보 / KRX"
  };
}