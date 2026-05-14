import AdmZip from "adm-zip";
import { XMLParser } from "fast-xml-parser";

export type DartDisclosure = {
  corpName: string;
  stockCode: string;
  reportName: string;
  receiptNo: string;
  receiptDate: string;
  submitter: string;
  remark: string;
  url: string;
};

type DartCorpCodeItem = {
  corp_code?: string | number;
  corp_name?: string;
  stock_code?: string | number;
  modify_date?: string | number;
};

type DartCorpCodeMapItem = {
  corpCode: string;
  corpName: string;
  stockCode: string;
  modifyDate: string;
};

type DartDisclosureApiItem = {
  corp_cls?: string;
  corp_name?: string;
  corp_code?: string;
  stock_code?: string;
  report_nm?: string;
  rcept_no?: string;
  flr_nm?: string;
  rcept_dt?: string;
  rm?: string;
};

type DartListApiResponse = {
  status: string;
  message: string;
  list?: DartDisclosureApiItem[];
};

let cachedCorpCodes: DartCorpCodeMapItem[] | null = null;
let cachedAt = 0;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getDartApiKey() {
  const apiKey = process.env.DART_API_KEY;

  if (!apiKey) {
    throw new Error("DART_API_KEY 환경변수가 설정되지 않았습니다.");
  }

  return apiKey;
}

function normalize(value: string) {
  return value.replace(/\s/g, "").toLowerCase();
}

function toText(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function toDateText(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function getDateRange(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  return {
    bgnDe: toDateText(start),
    endDe: toDateText(end)
  };
}

async function fetchCorpCodes(): Promise<DartCorpCodeMapItem[]> {
  const now = Date.now();

  if (cachedCorpCodes && now - cachedAt < ONE_DAY_MS) {
    return cachedCorpCodes;
  }

  const apiKey = getDartApiKey();
  const response = await fetch(
    `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${apiKey}`,
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("OpenDART 기업 고유번호 파일을 가져오지 못했습니다.");
  }

  const arrayBuffer = await response.arrayBuffer();
  const zip = new AdmZip(Buffer.from(arrayBuffer));
  const xmlEntry = zip.getEntry("CORPCODE.xml");

  if (!xmlEntry) {
    throw new Error("OpenDART 기업 고유번호 XML 파일을 찾지 못했습니다.");
  }

  const xml = xmlEntry.getData().toString("utf-8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true
  });

  const parsed = parser.parse(xml);
  const rawList = parsed?.result?.list;

  const list: DartCorpCodeItem[] = Array.isArray(rawList)
    ? rawList
    : rawList
      ? [rawList]
      : [];

cachedCorpCodes = list
  .map((item) => ({
    corpCode: toText(item.corp_code).padStart(8, "0"),
    corpName: toText(item.corp_name),
    stockCode: toText(item.stock_code).padStart(6, "0"),
    modifyDate: toText(item.modify_date)
  }))
  .filter((item) => item.corpCode && item.corpName);

  cachedAt = now;

  return cachedCorpCodes;
}

export async function findDartCorpCode({
  stockCode,
  companyName
}: {
  stockCode: string;
  companyName: string;
}) {
  const corpCodes = await fetchCorpCodes();
  const normalizedStockCode = stockCode.trim().padStart(6, "0");
  const normalizedCompanyName = normalize(companyName);

  const stockMatched = corpCodes.find(
    (item) => item.stockCode === normalizedStockCode
  );

  if (stockMatched) {
    return stockMatched;
  }

  return corpCodes.find(
    (item) => normalize(item.corpName) === normalizedCompanyName
  );
}

export async function fetchRecentDisclosures({
  stockCode,
  companyName,
  dartCorpCode,
  days = 730
}: {
  stockCode: string;
  companyName: string;
  dartCorpCode?: string;
  days?: number;
}): Promise<DartDisclosure[]> {
  const apiKey = getDartApiKey();

  const corpCode =
    dartCorpCode && dartCorpCode.trim().length > 0
      ? dartCorpCode.trim().padStart(8, "0")
      : (await findDartCorpCode({ stockCode, companyName }))?.corpCode;

  if (!corpCode) {
    return [];
  }

  const { bgnDe, endDe } = getDateRange(days);

  const url = new URL("https://opendart.fss.or.kr/api/list.json");
  url.searchParams.set("crtfc_key", apiKey);
  url.searchParams.set("corp_code", corpCode);
  url.searchParams.set("bgn_de", bgnDe);
  url.searchParams.set("end_de", endDe);
  url.searchParams.set("page_no", "1");
  url.searchParams.set("page_count", "10");

  const response = await fetch(url.toString(), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("OpenDART 공시 목록을 가져오지 못했습니다.");
  }

  const data = (await response.json()) as DartListApiResponse;

  if (data.status !== "000") {
    throw new Error(`OpenDART 응답 오류: ${data.status} / ${data.message}`);
  }

  return (data.list ?? []).slice(0, 6).map((item) => ({
    corpName: item.corp_name ?? companyName,
    stockCode: item.stock_code ?? stockCode,
    reportName: item.report_nm ?? "공시",
    receiptNo: item.rcept_no ?? "",
    receiptDate: item.rcept_dt ?? "",
    submitter: item.flr_nm ?? "",
    remark: item.rm ?? "",
    url: item.rcept_no
      ? `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${item.rcept_no}`
      : "https://dart.fss.or.kr/"
  }));
}