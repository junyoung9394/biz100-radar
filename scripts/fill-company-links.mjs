import fs from "fs";
import path from "path";

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
      stockCode: match[5].padStart(6, "0")
    });
  }

  if (companies.length === 0) {
    throw new Error("rawCompanies에서 기업 데이터를 읽지 못했습니다.");
  }

  return companies;
}

function extractDartCorpCodes(companiesText) {
  const blockMatch = companiesText.match(
    /const companyDartCorpCodes:\s*Record<string,\s*string>\s*=\s*\{([\s\S]*?)\};/
  );

  if (!blockMatch) {
    throw new Error("companyDartCorpCodes 블록을 찾지 못했습니다.");
  }

  const blockBody = blockMatch[1];
  const entryRegex = /"([^"]+)":\s*"([^"]+)"/g;

  const mapping = {};
  let match;

  while ((match = entryRegex.exec(blockBody)) !== null) {
    mapping[match[1]] = match[2];
  }

  return mapping;
}

function normalizeUrl(value) {
  const raw = String(value ?? "").trim();

  if (!raw || raw === "-") {
    return "";
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  return `https://${raw}`;
}

function buildOfficialLinksBlock(mapping) {
  const entries = Object.entries(mapping).sort(([a], [b]) => a.localeCompare(b));

  const lines = entries.map(([slug, links]) => {
    return `  "${slug}": {
    officialWebsite: "${links.officialWebsite}",
    irUrl: "${links.irUrl}"
  }`;
  });

  return `const companyOfficialLinks: Record<
  string,
  {
    officialWebsite: string;
    irUrl: string;
  }
> = {
${lines.join(",\n")}
};`;
}

function replaceOfficialLinksBlock(companiesText, newBlock) {
  const existingBlockRegex =
    /const companyOfficialLinks:\s*Record<[\s\S]*?\n>\s*=\s*\{[\s\S]*?\n\};/;

  if (existingBlockRegex.test(companiesText)) {
    return companiesText.replace(existingBlockRegex, newBlock);
  }

  throw new Error("companyOfficialLinks 블록을 찾지 못했습니다.");
}

async function fetchCompanyInfo({ apiKey, corpCode }) {
  const url = new URL("https://opendart.fss.or.kr/api/company.json");
  url.searchParams.set("crtfc_key", apiKey);
  url.searchParams.set("corp_code", corpCode.padStart(8, "0"));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`OpenDART 기업개황 API HTTP 오류: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== "000") {
    return {
      ok: false,
      message: `${data.status} / ${data.message}`,
      officialWebsite: "",
      irUrl: ""
    };
  }

  return {
    ok: true,
    message: "",
    officialWebsite: normalizeUrl(data.hm_url),
    irUrl: normalizeUrl(data.ir_url)
  };
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("OpenDART 공식 홈페이지 / IR 링크 자동 업데이트 시작");

  const apiKey = readEnvValue("DART_API_KEY");
  const companiesText = fs.readFileSync(companiesPath, "utf-8");
  const companies = extractRawCompanies(companiesText);
  const dartCorpCodes = extractDartCorpCodes(companiesText);

  const officialLinks = {};
  const failed = [];
  const empty = [];

  for (const [index, company] of companies.entries()) {
    const corpCode = dartCorpCodes[company.slug];

    if (!corpCode) {
      failed.push(`${company.name} / ${company.slug} / DART 고유번호 없음`);
      continue;
    }

    try {
      const info = await fetchCompanyInfo({
        apiKey,
        corpCode
      });

      if (!info.ok) {
        failed.push(`${company.name} / ${company.slug} / ${info.message}`);
        continue;
      }

      officialLinks[company.slug] = {
        officialWebsite: info.officialWebsite,
        irUrl: info.irUrl
      };

      if (!info.officialWebsite && !info.irUrl) {
        empty.push(`${company.name} / ${company.slug}`);
      }

      console.log(
        `[${index + 1}/${companies.length}] ${company.name} - 홈페이지: ${
          info.officialWebsite || "없음"
        } / IR: ${info.irUrl || "없음"}`
      );

      await sleep(120);
    } catch (error) {
      failed.push(
        `${company.name} / ${company.slug} / ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  }

  const newBlock = buildOfficialLinksBlock(officialLinks);
  const updatedText = replaceOfficialLinksBlock(companiesText, newBlock);

  fs.writeFileSync(companiesPath, updatedText, "utf-8");

  console.log("");
  console.log(`업데이트 완료: ${Object.keys(officialLinks).length}개`);
  console.log(`홈페이지/IR 둘 다 비어 있음: ${empty.length}개`);
  console.log(`실패: ${failed.length}개`);

  if (empty.length > 0) {
    console.log("");
    console.log("홈페이지/IR 둘 다 비어 있는 기업:");
    empty.forEach((item) => console.log(`- ${item}`));
  }

  if (failed.length > 0) {
    console.log("");
    console.log("실패 기업:");
    failed.forEach((item) => console.log(`- ${item}`));
  }

  console.log("");
  console.log("data/companies.ts의 companyOfficialLinks 업데이트 완료");
}

main().catch((error) => {
  console.error("");
  console.error("실패:", error.message);
  process.exit(1);
});