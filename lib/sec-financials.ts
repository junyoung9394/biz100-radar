export type UsFinancialHighlight = {
  label: string;
  value: string;
  description: string;
};

export type UsFinancialHighlightsResult = {
  ok: boolean;
  year: string;
  reportForm: string;
  message: string;
  highlights: UsFinancialHighlight[];
};

type XbrlFact = {
  end: string;
  val: number;
  fp?: string;
  form: string;
  filed: string;
};

type XbrlConceptEntry = {
  units: {
    USD?: XbrlFact[];
  };
};

type XbrlCompanyFacts = {
  facts: {
    "us-gaap"?: Record<string, XbrlConceptEntry>;
    "ifrs-full"?: Record<string, XbrlConceptEntry>;
  };
};

const ANNUAL_FORMS = new Set(["10-K", "10-K/A", "20-F", "20-F/A"]);
const ANNUAL_FP = new Set(["FY", "CY"]);

function getMostRecentAnnualFact(
  namespace: Record<string, XbrlConceptEntry> | undefined,
  concepts: string[]
): { val: number; end: string; form: string } | null {
  if (!namespace) return null;

  for (const concept of concepts) {
    const entry = namespace[concept];
    if (!entry?.units?.USD) continue;

    const annualFacts = entry.units.USD
      .filter(
        (f) =>
          ANNUAL_FORMS.has(f.form) && (!f.fp || ANNUAL_FP.has(f.fp))
      )
      .sort(
        (a, b) =>
          b.end.localeCompare(a.end) || b.filed.localeCompare(a.filed)
      );

    if (annualFacts.length > 0) {
      return annualFacts[0];
    }
  }

  return null;
}

function formatUsd(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000_000) {
    return `${sign}$${(abs / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (abs >= 1_000_000_000) {
    return `${sign}$${(abs / 1_000_000_000).toFixed(1)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}$${(abs / 1_000_000).toFixed(0)}M`;
  }
  return `${sign}$${abs.toLocaleString()}`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function getSecUserAgent() {
  return process.env.SEC_USER_AGENT ?? "Biz100 Radar contact@luckygrampus.com";
}

function normalizeCik(cik: string): string {
  return cik.trim().padStart(10, "0");
}

export async function fetchUsFinancialHighlights({
  cik
}: {
  cik?: string;
}): Promise<UsFinancialHighlightsResult> {
  if (!cik) {
    return {
      ok: false,
      year: "",
      reportForm: "",
      message: "CIK가 연결되지 않은 기업입니다.",
      highlights: []
    };
  }

  const paddedCik = normalizeCik(cik);

  const response = await fetch(
    `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCik}.json`,
    {
      headers: {
        "User-Agent": getSecUserAgent(),
        "Accept-Encoding": "gzip, deflate"
      },
      next: { revalidate: 86400 }
    }
  );

  if (!response.ok) {
    throw new Error(`SEC XBRL API 오류: ${response.status}`);
  }

  const data = (await response.json()) as XbrlCompanyFacts;
  const namespace = data.facts["us-gaap"] ?? data.facts["ifrs-full"];

  if (!namespace) {
    return {
      ok: false,
      year: "",
      reportForm: "",
      message: "SEC XBRL 재무정보를 찾지 못했습니다.",
      highlights: []
    };
  }

  const revenue = getMostRecentAnnualFact(namespace, [
    "RevenueFromContractWithCustomerExcludingAssessedTax",
    "Revenues",
    "SalesRevenueNet",
    "RevenueFromContractWithCustomerIncludingAssessedTax",
    "Revenue"
  ]);

  const operatingIncome = getMostRecentAnnualFact(namespace, [
    "OperatingIncomeLoss",
    "ProfitLossFromOperatingActivities"
  ]);

  const netIncome = getMostRecentAnnualFact(namespace, [
    "NetIncomeLoss",
    "NetIncomeLossAvailableToCommonStockholdersBasic",
    "ProfitLoss"
  ]);

  const liabilities = getMostRecentAnnualFact(namespace, ["Liabilities"]);

  const equity = getMostRecentAnnualFact(namespace, [
    "StockholdersEquity",
    "StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest",
    "Equity"
  ]);

  const anchor = revenue ?? netIncome ?? equity;
  if (!anchor) {
    return {
      ok: false,
      year: "",
      reportForm: "",
      message: "재무정보를 찾지 못했습니다.",
      highlights: []
    };
  }

  const year = anchor.end.slice(0, 4);
  const reportForm = anchor.form;

  const debtRatio =
    liabilities && equity && equity.val !== 0
      ? (liabilities.val / equity.val) * 100
      : null;

  return {
    ok: true,
    year,
    reportForm,
    message: "",
    highlights: [
      {
        label: "Revenue",
        value: revenue ? formatUsd(revenue.val) : "확인 필요",
        description: `${year} ${reportForm} 기준`
      },
      {
        label: "Operating Income",
        value: operatingIncome ? formatUsd(operatingIncome.val) : "확인 필요",
        description: `${year} ${reportForm} 기준`
      },
      {
        label: "Net Income",
        value: netIncome ? formatUsd(netIncome.val) : "확인 필요",
        description: `${year} ${reportForm} 기준`
      },
      {
        label: "부채비율",
        value: debtRatio !== null ? formatPercent(debtRatio) : "확인 필요",
        description: "부채총계 ÷ 자본총계 기준"
      }
    ]
  };
}
