import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type NewsArticle = {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
};

const cache = {
  articles: null as NewsArticle[] | null,
  cachedAt: 0
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6시간

const RSS_FEEDS = [
  { url: "https://feeds.bbci.co.uk/news/business/rss.xml", source: "BBC Business" },
  { url: "https://www.theguardian.com/business/rss", source: "The Guardian" },
  { url: "https://news.google.com/rss/search?q=economy+stock+market&hl=en-US&gl=US&ceid=US:en", source: "Google News" }
];

function parseRssItems(xml: string, sourceName: string): NewsArticle[] {
  const items: NewsArticle[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const item = match[1];

    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      ?? item.match(/<title>(.*?)<\/title>/)?.[1]
      ?? "";

    const link = item.match(/<link>(.*?)<\/link>/)?.[1]
      ?? item.match(/<link\s[^>]*href="([^"]+)"/)?.[1]
      ?? "";

    const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
      ?? item.match(/<description>(.*?)<\/description>/)?.[1]
      ?? "";

    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

    const cleanTitle = title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim();
    const cleanDesc = desc.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim().slice(0, 200);
    const cleanLink = link.trim();

    if (!cleanTitle || !cleanLink || cleanTitle === "Reuters") continue;

    items.push({
      title: cleanTitle,
      description: cleanDesc || null,
      url: cleanLink,
      source: sourceName,
      publishedAt: pubDate
    });
  }

  return items;
}

export async function GET() {
  const now = Date.now();

  if (cache.articles && now - cache.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json({ ok: true, articles: cache.articles, cached: true });
  }

  try {
    const results = await Promise.allSettled(
      RSS_FEEDS.map(({ url, source }) =>
        fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; Biz100Radar/1.0)" },
          signal: AbortSignal.timeout(8000)
        })
          .then((r) => (r.ok ? r.text() : ""))
          .then((xml) => parseRssItems(xml, source))
      )
    );

    const articles: NewsArticle[] = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .slice(0, 15);

    if (articles.length > 0) {
      cache.articles = articles;
      cache.cachedAt = now;
    }

    return NextResponse.json({ ok: true, articles, cached: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "뉴스를 가져오지 못했습니다.";
    console.error("[NEWS_RSS_ERROR]", message);
    return NextResponse.json({ ok: false, message, articles: [] }, { status: 200 });
  }
}
