export type MarketIndex = {
  name: string;
  value: number | null;
  change: number | null;
  changeRate: number | null;
  direction: "up" | "down" | "flat" | "unknown";
  baseDate: string;
};

type KrxIndexItem = {
  IDX_NM?: string;
  CLPR?: string;
  CMPPREVDD_PRC?: string;
  FLUC_RT?: string;
  FLUC_TP_CD?: string;
  TRD_DD?: string;
};

function getKrxApiKey() {
  const apiKey = process.env.KRX_API_KEY;

  if (!apiKey) {
    throw new Error("KRX_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function toNumber(value?: string): number | null {
  if (!value) return null;
  const n = Number(value.replace(/,/g, "").trim());
  return Number.isNaN(n) ? null : n;
}

function getDirection(flucTpCd?: string, change?: number | null): MarketIndex["direction"] {
  if (flucTpCd === "1") return "up";
  if (flucTpCd === "2") return "down";
  if (flucTpCd === "3") return "flat";
  if (change === null || change === undefined) return "unknown";
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

function getKoreaDateOffset(daysAgo: number): string {
  const now = new Date();
  now.setDate(now.getDate() - daysAgo);
  const korea = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const y = korea.getFullYear();
  const m = String(korea.getMonth() + 1).padStart(2, "0");
  const d = String(korea.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

async function fetchIndicesForDate(apiKey: string, trdDd: string): Promise<{
  items: KrxIndexItem[];
}> {
  const url = new URL(
    "https://openapi.krx.co.kr/contents/MDC/STAT/standard/MDCSTAT00601"
  );
  url.searchParams.set("idxIndMidclssCd", "02");
  url.searchParams.set("trdDd", trdDd);

  const response = await fetch(url.toString(), {
    headers: { AUTH_KEY: apiKey },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`KRX API HTTP 오류: ${response.status}`);
  }

  const data = (await response.json()) as { output?: KrxIndexItem[] };
  return { items: data.output ?? [] };
}

export async function fetchMarketIndices(): Promise<{
  kospi: MarketIndex | null;
  kosdaq: MarketIndex | null;
}> {
  const apiKey = getKrxApiKey();

  // 오늘부터 최대 7일 전까지 거래 데이터가 있는 날짜를 찾는다 (주말·공휴일 대응)
  let items: KrxIndexItem[] = [];
  let usedDate = getKoreaDateOffset(0);

  for (let daysAgo = 0; daysAgo <= 7; daysAgo++) {
    const trdDd = getKoreaDateOffset(daysAgo);
    const result = await fetchIndicesForDate(apiKey, trdDd);

    if (result.items.length > 0) {
      items = result.items;
      usedDate = trdDd;
      break;
    }
  }

  function parseItem(item: KrxIndexItem): MarketIndex {
    const change = toNumber(item.CMPPREVDD_PRC);
    return {
      name: item.IDX_NM ?? "",
      value: toNumber(item.CLPR),
      change,
      changeRate: toNumber(item.FLUC_RT),
      direction: getDirection(item.FLUC_TP_CD, change),
      baseDate: item.TRD_DD ?? usedDate
    };
  }

  const kospiItem = items.find((i) =>
    (i.IDX_NM ?? "").includes("코스피") && !(i.IDX_NM ?? "").includes("200")
  );
  const kosdaqItem = items.find((i) =>
    (i.IDX_NM ?? "").includes("코스닥") && !(i.IDX_NM ?? "").includes("150")
  );

  return {
    kospi: kospiItem ? parseItem(kospiItem) : null,
    kosdaq: kosdaqItem ? parseItem(kosdaqItem) : null
  };
}
