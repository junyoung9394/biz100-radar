export type FinancialHighlight = {
  label: string;
  value: string;
  description: string;
};

export type FinancialHighlightsResult = {
  ok: boolean;
  year: string;
  reportName: string;
  message: string;
  highlights: FinancialHighlight[];
};

type DartFinancialItem = {
  account_nm?: string;
  thstrm_amount?: string;
  frmtrm_amount?: string;
  fs_div?: string;
  fs_nm?: string;
  sj_div?: string;
  sj_nm?: string;
};

type DartFinancialResponse = {
  status: string;
  message: string;
  list?: DartFinancialItem[];
};

function getDartApiKey() {
  const apiKey = process.env.DART_API_KEY;

  if (!apiKey) {
    throw new Error("DART_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function toNumber(amount?: string) {
  if (!amount) {
    return null;
  }

  const normalized = amount.replace(/,/g, "").trim();
  const value = Number(normalized);

  if (Number.isNaN(value)) {
    return null;
  }

  return value;
}

function formatKoreanMoney(value: number | null) {
  if (value === null) {
    return "확인 필요";
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  const trillion = 1_000_000_000_000;
  const hundredMillion = 100_000_000;

  if (absValue >= trillion) {
    const number = absValue / trillion;
    return `${sign}${number.toFixed(1)}조원`;
  }

  if (absValue >= hundredMillion) {
    const number = Math.round(absValue / hundredMillion).toLocaleString("ko-KR");
    return `${sign}${number}억원`;
  }

  return `${sign}${absValue.toLocaleString("ko-KR")}원`;
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "확인 필요";
  }

  return `${value.toFixed(1)}%`;
}

function findAmount(list: DartFinancialItem[], accountNames: string[]) {
  const matched = list.find((item) => {
    const accountName = item.account_nm ?? "";

    return accountNames.some((targetName) => accountName === targetName);
  });

  return toNumber(matched?.thstrm_amount);
}

function getCandidateYears() {
  const currentYear = new Date().getFullYear();

  return [
    String(currentYear - 1),
    String(currentYear - 2),
    String(currentYear - 3)
  ];
}

async function fetchFinancialList({
  corpCode,
  year
}: {
  corpCode: string;
  year: string;
}) {
  const apiKey = getDartApiKey();

  const url = new URL("https://opendart.fss.or.kr/api/fnlttSinglAcnt.json");
  url.searchParams.set("crtfc_key", apiKey);
  url.searchParams.set("corp_code", corpCode.padStart(8, "0"));
  url.searchParams.set("bsns_year", year);
  url.searchParams.set("reprt_code", "11011");

  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("OpenDART 재무정보를 가져오지 못했습니다.");
  }

  const data = (await response.json()) as DartFinancialResponse;

  if (data.status !== "000") {
    return {
      ok: false,
      message: `${data.status} / ${data.message}`,
      list: []
    };
  }

  return {
    ok: true,
    message: data.message,
    list: data.list ?? []
  };
}

export async function fetchFinancialHighlights({
  dartCorpCode
}: {
  dartCorpCode?: string;
}): Promise<FinancialHighlightsResult> {
  if (!dartCorpCode) {
    return {
      ok: false,
      year: "",
      reportName: "사업보고서",
      message: "DART 고유번호가 아직 연결되지 않았습니다.",
      highlights: []
    };
  }

  const years = getCandidateYears();
  let lastMessage = "";

  for (const year of years) {
    const result = await fetchFinancialList({
      corpCode: dartCorpCode,
      year
    });

    if (!result.ok) {
      lastMessage = result.message;
      continue;
    }

    const list = result.list;

    const revenue = findAmount(list, ["매출액", "영업수익", "수익(매출액)"]);
    const operatingProfit = findAmount(list, ["영업이익"]);
    const netIncome = findAmount(list, ["당기순이익", "당기순이익(손실)"]);
    const liabilities = findAmount(list, ["부채총계"]);
    const equity = findAmount(list, ["자본총계"]);

    const debtRatio =
      liabilities !== null && equity !== null && equity !== 0
        ? (liabilities / equity) * 100
        : null;

    return {
      ok: true,
      year,
      reportName: "사업보고서",
      message: "",
      highlights: [
        {
          label: "매출액",
          value: formatKoreanMoney(revenue),
          description: `${year}년 사업보고서 기준`
        },
        {
          label: "영업이익",
          value: formatKoreanMoney(operatingProfit),
          description: `${year}년 사업보고서 기준`
        },
        {
          label: "순이익",
          value: formatKoreanMoney(netIncome),
          description: `${year}년 사업보고서 기준`
        },
        {
          label: "부채비율",
          value: formatPercent(debtRatio),
          description: "부채총계 ÷ 자본총계 기준"
        }
      ]
    };
  }

  return {
    ok: false,
    year: "",
    reportName: "사업보고서",
    message: lastMessage || "표시할 재무정보를 찾지 못했습니다.",
    highlights: []
  };
}