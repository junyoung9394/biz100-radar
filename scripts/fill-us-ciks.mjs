import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const filePath = path.join(rootDir, "data", "us-companies.ts");

const SEC_USER_AGENT =
  process.env.SEC_USER_AGENT || "Biz100 Radar contact@luckygrampus.com";

function padCik(cik) {
  return String(cik).padStart(10, "0");
}

async function fetchSecTickerMap() {
  const response = await fetch("https://www.sec.gov/files/company_tickers.json", {
    headers: {
      "User-Agent": SEC_USER_AGENT,
      "Accept-Encoding": "gzip, deflate"
    }
  });

  if (!response.ok) {
    throw new Error(`SEC company_tickers.json 다운로드 실패: ${response.status}`);
  }

  const data = await response.json();
  const map = new Map();

  for (const item of Object.values(data)) {
    const ticker = String(item.ticker ?? "").toUpperCase();
    const cik = padCik(item.cik_str);

    if (ticker && cik) {
      map.set(ticker, cik);
    }
  }

  return map;
}

function updateCompanyBlock(block, tickerMap) {
  const tickerMatch = block.match(/ticker:\s*"([^"]+)"/);

  if (!tickerMatch) {
    return block;
  }

  const ticker = tickerMatch[1].toUpperCase();
  const cik = tickerMap.get(ticker);

  if (!cik) {
    console.log(`CIK 없음: ${ticker}`);
    return block;
  }

  if (/cik:\s*"[^"]+"/.test(block)) {
    return block.replace(/cik:\s*"[^"]+"/, `cik: "${cik}"`);
  }

  return block.replace(
    /(ticker:\s*"[^"]+",)/,
    `$1\n    cik: "${cik}",`
  );
}

async function main() {
  const tickerMap = await fetchSecTickerMap();
  const source = fs.readFileSync(filePath, "utf-8");

  const updated = source.replace(
    /createUsCompany\(\{[\s\S]*?\n  \}\)/g,
    (block) => updateCompanyBlock(block, tickerMap)
  );

  fs.writeFileSync(filePath, updated, "utf-8");

  console.log("data/us-companies.ts CIK 업데이트 완료");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});