export type SecFiling = {
  accessionNumber: string;
  filingDate: string;
  reportDate: string;
  form: string;
  primaryDocument: string;
  primaryDocDescription: string;
  url: string;
};

type SecSubmissionResponse = {
  cik?: string;
  name?: string;
  filings?: {
    recent?: {
      accessionNumber?: string[];
      filingDate?: string[];
      reportDate?: string[];
      form?: string[];
      primaryDocument?: string[];
      primaryDocDescription?: string[];
    };
  };
};

function getSecUserAgent() {
  return process.env.SEC_USER_AGENT || "Biz100 Radar contact@luckygrampus.com";
}

function normalizeCik(cik: string) {
  return cik.trim().padStart(10, "0");
}

function cikForArchives(cik: string) {
  return String(Number(cik));
}

function makeSecFilingUrl({
  cik,
  accessionNumber,
  primaryDocument
}: {
  cik: string;
  accessionNumber: string;
  primaryDocument: string;
}) {
  const cikPath = cikForArchives(cik);
  const accessionPath = accessionNumber.replaceAll("-", "");

  if (primaryDocument) {
    return `https://www.sec.gov/Archives/edgar/data/${cikPath}/${accessionPath}/${primaryDocument}`;
  }

  return `https://www.sec.gov/Archives/edgar/data/${cikPath}/${accessionPath}/${accessionNumber}-index.html`;
}

function isUsefulForm(form: string) {
  const usefulForms = new Set([
    "10-K",
    "10-Q",
    "8-K",
    "20-F",
    "6-K",
    "DEF 14A",
    "S-1",
    "424B5",
    "SC 13G",
    "SC 13D",
    "4"
  ]);

  return usefulForms.has(form);
}

export async function fetchRecentSecFilings({
  cik
}: {
  cik?: string;
}): Promise<SecFiling[]> {
  if (!cik) {
    return [];
  }

  const normalizedCik = normalizeCik(cik);

  const response = await fetch(
    `https://data.sec.gov/submissions/CIK${normalizedCik}.json`,
    {
      headers: {
        "User-Agent": getSecUserAgent(),
        "Accept-Encoding": "gzip, deflate"
      },
      cache: "no-store"
    }
  );

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `SEC API 오류: ${response.status} / ${responseText.slice(0, 300)}`
    );
  }

  let data: SecSubmissionResponse;

  try {
    data = JSON.parse(responseText) as SecSubmissionResponse;
  } catch {
    throw new Error(
      `SEC API가 JSON이 아닌 응답을 반환했습니다: ${responseText.slice(
        0,
        300
      )}`
    );
  }

  const recent = data.filings?.recent;

  if (!recent) {
    return [];
  }

  const accessionNumbers = recent.accessionNumber ?? [];
  const filingDates = recent.filingDate ?? [];
  const reportDates = recent.reportDate ?? [];
  const forms = recent.form ?? [];
  const primaryDocuments = recent.primaryDocument ?? [];
  const primaryDocDescriptions = recent.primaryDocDescription ?? [];

  const filings: SecFiling[] = [];

  for (let index = 0; index < accessionNumbers.length; index += 1) {
    const form = forms[index] ?? "";

    if (!isUsefulForm(form)) {
      continue;
    }

    const accessionNumber = accessionNumbers[index] ?? "";
    const primaryDocument = primaryDocuments[index] ?? "";

    if (!accessionNumber) {
      continue;
    }

    filings.push({
      accessionNumber,
      filingDate: filingDates[index] ?? "",
      reportDate: reportDates[index] ?? "",
      form,
      primaryDocument,
      primaryDocDescription: primaryDocDescriptions[index] ?? "",
      url: makeSecFilingUrl({
        cik: normalizedCik,
        accessionNumber,
        primaryDocument
      })
    });

    if (filings.length >= 8) {
      break;
    }
  }

  return filings;
}