import { companies } from "@/data/companies";
import { usCompanies } from "@/data/us-companies";
import { jpCompanies } from "@/data/jp-companies";

const BASE_URL = "https://biz100.luckygrampus.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssItem(params: {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
}): string {
  return `
    <item>
      <title>${escapeXml(params.title)}</title>
      <link>${params.link}</link>
      <description>${escapeXml(params.description)}</description>
      <pubDate>${params.pubDate}</pubDate>
      <category>${escapeXml(params.category)}</category>
      <guid isPermaLink="true">${params.link}</guid>
    </item>`;
}

export async function GET(): Promise<Response> {
  const now = new Date().toUTCString();

  const krItems = companies.map((c) =>
    buildRssItem({
      title: `${c.name}(${c.ticker}) 기업정보 — ${c.industry}`,
      link: `${BASE_URL}/kr/company/${c.slug}`,
      description: `${c.businessSummary} DART 공시, 재무정보, 공식자료 링크 제공.`,
      pubDate: new Date(c.updatedAt).toUTCString(),
      category: c.industry
    })
  );

  const usItems = usCompanies.map((c) =>
    buildRssItem({
      title: `${c.name}(${c.ticker}) 미국 기업정보 — ${c.industry}`,
      link: `${BASE_URL}/us/company/${c.slug}`,
      description: `${c.businessSummary} SEC EDGAR 공시, 재무정보 링크 제공.`,
      pubDate: new Date(c.updatedAt).toUTCString(),
      category: c.industry
    })
  );

  const jpItems = jpCompanies.map((c) =>
    buildRssItem({
      title: `${c.name}(${c.ticker}) 일본 기업정보 — ${c.industry}`,
      link: `${BASE_URL}/jp/company/${c.slug}`,
      description: `${c.businessSummary} EDINET 공시, 공식자료 링크 제공.`,
      pubDate: new Date(c.updatedAt).toUTCString(),
      category: c.industry
    })
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Biz100 Radar — 공식자료 기반 기업정보</title>
    <link>${BASE_URL}</link>
    <description>한국·미국·일본 주요 기업의 공식 공시, 재무정보, DART·SEC·EDINET 링크를 정리합니다.</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${[...krItems, ...usItems, ...jpItems].join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
