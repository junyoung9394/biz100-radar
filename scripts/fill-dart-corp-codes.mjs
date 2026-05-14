import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { XMLParser } from "fast-xml-parser";

const rootDir = process.cwd();
const envPath = path.join(rootDir, ".env.local");
const companiesPath = path.join(rootDir, "data", "companies.ts");

function readEnvValue(key) {
  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local 파일이 없습니다. DART_API_KEY를 먼저 넣어주세요.");
  }

  const envText = fs.readFileSync(envPath, "utf-8");
  const lines = envText.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const [rawKey, ...valueParts] = trimmed.split("=");

    if (rawKey.trim() === key) {
      return valueParts.join("=").trim().replace(/^["']|["']$/g, "");
    }
  }

  throw new Error(`${key} 값을 .env.local에서 찾지 못했습니다.`);
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function padStockCode(value) {
  return normalizeText(value).padStart(6, "0");
}

function padCorpCode(value) {
  return normalizeText(value).padStart(8, "0");
}

function extractRawCompanies(companiesText) {
  const rawCompaniesMatch = companiesText.match(
    /const rawCompanies:\s*RawCompany\[\]\s*=\s*\[([\s\S]*?)\];/
  );

  if (!rawCompaniesMatch) {
    throw new Error("data/companies.ts에서 rawCompanies 배열을 찾지 못했습니다.");
  }

  const rawCompaniesBody = rawCompaniesMatch[1];

  const rowRegex =
    /\[\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,/g;

  const companies = [];
  let match;

  while ((match = rowRegex.exec(rawCompaniesBody)) !== null) {
    companies.push({
      slug: match[1],
      name: match[2],
      initials: match[3],
      market: match[4],
      stockCode: padStockCode(match[5])
    });
  }

  if (companies.length === 0) {
    throw new Error("rawCompanies에서 기업 데이터를 읽지 못했습니다.");
  }

  return companies;
}

async function fetchDartCorpCodes(apiKey) {
  const url = `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OpenDART corpCode.xml 다운로드 실패: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const zip = new AdmZip(Buffer.from(arrayBuffer));
  const xmlEntry = zip.getEntry("CORPCODE.xml");

  if (!xmlEntry) {
    throw new Error("ZIP 안에서 CORPCODE.xml을 찾지 못했습니다.");
  }

  const xml = xmlEntry.getData().toString("utf-8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true
  });

  const parsed = parser.parse(xml);
  const rawList = parsed?.result?.list;

  const list = Array.isArray(rawList) ? rawList : rawList ? [rawList] : [];

  return list
    .map((item) => ({
      corpCode: padCorpCode(item.corp_code),
      corpName: normalizeText(item.corp_name),
      stockCode: padStockCode(item.stock_code),
      modifyDate: normalizeText(item.modify_date)
    }))
    .filter((item) => item.corpCode && item.corpName && item.stockCode);
}

function buildCompanyDartCorpCodesBlock(mapping) {
  const entries = Object.entries(mapping).sort(([a], [b]) => a.localeCompare(b));

  const lines = entries.map(
    ([slug, corpCode]) => `  "${slug}": "${corpCode}"`
  );

  return `const companyDartCorpCodes: Record<string, string> = {\n${lines.join(
    ",\n"
  )}\n};`;
}

function replaceCompanyDartCorpCodes(companiesText, newBlock) {
  const existingBlockRegex =
    /const companyDartCorpCodes:\s*Record<string,\s*string>\s*=\s*\{[\s\S]*?\};/;

  if (existingBlockRegex.test(companiesText)) {
    return companiesText.replace(existingBlockRegex, newBlock);
  }

  const insertAfterRegex =
    /(function makeDartSearchUrl\(companyName: string\) \{\s*return `https:\/\/dart\.fss\.or\.kr\/dsab007\/main\.do\?option=corp&textCrpNm=\$\{encodeURIComponent\(companyName\)\}`;\s*\}\s*)/;

  if (!insertAfterRegex.test(companiesText)) {
    throw new Error("companyDartCorpCodes를 삽입할 위치를 찾지 못했습니다.");
  }

  return companiesText.replace(insertAfterRegex, `$1\n${newBlock}\n`);
}

function ensureIdentifiersUseDartCorpCodes(companiesText) {
  const oldText = `identifiers: {
      ticker,
      stockCode: ticker
    },`;

  const newText = `identifiers: {
      ticker,
      stockCode: ticker,
      dartCorpCode: companyDartCorpCodes[slug]
    },`;

  if (companiesText.includes(newText)) {
    return companiesText;
  }

  if (!companiesText.includes(oldText)) {
    console.warn(
      "주의: identifiers 블록 자동 교체 위치를 찾지 못했습니다. 이미 수정되어 있을 수 있습니다."
    );
    return companiesText;
  }

  return companiesText.replace(oldText, newText);
}

async function main() {
  console.log("OpenDART 기업 고유번호 자동 매칭을 시작합니다.");

  const apiKey = readEnvValue("DART_API_KEY");
  const companiesText = fs.readFileSync(companiesPath, "utf-8");
  const companies = extractRawCompanies(companiesText);

  console.log(`현재 data/companies.ts 기업 수: ${companies.length}개`);
  console.log("OpenDART corpCode.xml 다운로드 중...");

  const dartCorpCodes = await fetchDartCorpCodes(apiKey);
  const dartByStockCode = new Map(
    dartCorpCodes.map((item) => [item.stockCode, item])
  );

  const mapping = {};
  const missing = [];

  for (const company of companies) {
    const matched = dartByStockCode.get(company.stockCode);

    if (matched) {
      mapping[company.slug] = matched.corpCode;
    } else {
      missing.push(company);
    }
  }

  const newBlock = buildCompanyDartCorpCodesBlock(mapping);

  let updatedText = replaceCompanyDartCorpCodes(companiesText, newBlock);
  updatedText = ensureIdentifiersUseDartCorpCodes(updatedText);

  fs.writeFileSync(companiesPath, updatedText, "utf-8");

  console.log("");
  console.log(`매칭 성공: ${Object.keys(mapping).length}개`);
  console.log(`매칭 실패: ${missing.length}개`);
  console.log("");

  if (missing.length > 0) {
    console.log("매칭 실패 기업:");
    for (const company of missing) {
      console.log(
        `- ${company.name} / ${company.slug} / ${company.stockCode} / ${company.market}`
      );
    }
    console.log("");
    console.log(
      "실패 기업은 상장폐지, 종목코드 변경, 이름 차이, OpenDART 미등록 등의 이유일 수 있습니다."
    );
  }

  console.log("data/companies.ts 업데이트 완료");
}

main().catch((error) => {
  console.error("");
  console.error("실패:", error.message);
  process.exit(1);
});