export type EdinetDisclosure = {
  docId: string;
  filerName: string;
  documentTitle: string;
  submitDateTime: string;
  docTypeCode: string;
  secCode: string;
  url: string;
};

type EdinetDocumentItem = {
  seqNumber?: number;
  docID?: string;
  edinetCode?: string;
  secCode?: string;
  JCN?: string;
  filerName?: string;
  fundCode?: string;
  ordinanceCode?: string;
  formCode?: string;
  docTypeCode?: string;
  periodStart?: string;
  periodEnd?: string;
  submitDateTime?: string;
  docDescription?: string;
  issuerEdinetCode?: string;
  subjectEdinetCode?: string;
  subsidiaryEdinetCode?: string;
  currentReportReason?: string;
  parentDocID?: string;
  opeDateTime?: string;
  withdrawalStatus?: string;
  docInfoEditStatus?: string;
  disclosureStatus?: string;
  xbrlFlag?: string;
  pdfFlag?: string;
  attachDocFlag?: string;
  englishDocFlag?: string;
  csvFlag?: string;
  legalStatus?: string;
};

type EdinetDocumentsResponse = {
  metadata?: {
    title?: string;
    parameter?: {
      date?: string;
      type?: string;
    };
    resultset?: {
      count?: number;
    };
    processDateTime?: string;
    status?: string;
    message?: string;
  };
  results?: EdinetDocumentItem[];
};

function getEdinetApiKey() {
  const apiKey = process.env.EDINET_API_KEY;

  if (!apiKey) {
    throw new Error("EDINET_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function getJapanDateText(date: Date) {
  const japanDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
  );

  const year = japanDate.getFullYear();
  const month = String(japanDate.getMonth() + 1).padStart(2, "0");
  const day = String(japanDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getRecentDateList(days: number) {
  const dates: string[] = [];

  for (let index = 0; index < days; index += 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    dates.push(getJapanDateText(date));
  }

  return dates;
}

function normalizeSecCode(ticker: string) {
  const trimmedTicker = ticker.trim();

  if (trimmedTicker.length === 4) {
    return `${trimmedTicker}0`;
  }

  return trimmedTicker;
}

function makeEdinetDocumentUrl(docId: string) {
  return `https://disclosure2.edinet-fsa.go.jp/WEEK0010.aspx?docID=${encodeURIComponent(
    docId
  )}`;
}

function isUsefulDisclosure(item: EdinetDocumentItem) {
  const title = item.docDescription ?? "";

  if (!title) {
    return false;
  }

  const excludedWords = ["訂正", "変更", "取下げ"];

  return !excludedWords.some((word) => title.includes(word));
}

async function fetchEdinetDocumentsByDate(date: string) {
  const apiKey = getEdinetApiKey();

  const url = new URL("https://api.edinet-fsa.go.jp/api/v2/documents.json");
  url.searchParams.set("date", date);
  url.searchParams.set("type", "2");

  const response = await fetch(url.toString(), {
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey
    },
    cache: "no-store"
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `EDINET API HTTP 오류: ${response.status} / ${responseText.slice(0, 300)}`
    );
  }

  try {
    return JSON.parse(responseText) as EdinetDocumentsResponse;
  } catch {
    throw new Error(
      `EDINET API가 JSON이 아닌 응답을 반환했습니다: ${responseText.slice(
        0,
        300
      )}`
    );
  }
}

export async function fetchRecentEdinetDisclosures({
  ticker,
  days = 45
}: {
  ticker: string;
  days?: number;
}): Promise<EdinetDisclosure[]> {
  const targetSecCode = normalizeSecCode(ticker);
  const dates = getRecentDateList(days);
  const disclosures: EdinetDisclosure[] = [];

  for (const date of dates) {
    const data = await fetchEdinetDocumentsByDate(date);
    const results = data.results ?? [];

    const matchedItems = results.filter((item) => {
      const secCode = item.secCode ?? "";

      return secCode === targetSecCode && isUsefulDisclosure(item);
    });

    for (const item of matchedItems) {
      if (!item.docID) {
        continue;
      }

      disclosures.push({
        docId: item.docID,
        filerName: item.filerName ?? "",
        documentTitle: item.docDescription ?? "EDINET 공시",
        submitDateTime: item.submitDateTime ?? "",
        docTypeCode: item.docTypeCode ?? "",
        secCode: item.secCode ?? "",
        url: makeEdinetDocumentUrl(item.docID)
      });
    }

    if (disclosures.length >= 8) {
      break;
    }
  }

  return disclosures.slice(0, 8);
}