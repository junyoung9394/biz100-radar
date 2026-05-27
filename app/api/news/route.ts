import { NextResponse } from "next/server";

type NewsArticle = {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage: string | null;
};

type NewsApiResponse = {
  status: string;
  articles?: NewsArticle[];
  message?: string;
};

const cache = {
  articles: null as NewsArticle[] | null,
  cachedAt: 0
};

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function isArticleValid(article: NewsArticle) {
  return (
    article.title &&
    article.title !== "[Removed]" &&
    article.url &&
    article.url !== "[Removed]"
  );
}

export async function GET() {
  const now = Date.now();

  if (cache.articles && now - cache.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json({ ok: true, articles: cache.articles, cached: true });
  }

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "NEWS_API_KEY가 설정되지 않았습니다.", articles: [] },
      { status: 200 }
    );
  }

  try {
    const [enRes, krRes] = await Promise.allSettled([
      fetch(
        `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=10&apiKey=${apiKey}`,
        { next: { revalidate: 0 } }
      ),
      fetch(
        `https://newsapi.org/v2/everything?q=%EA%B2%BD%EC%A0%9C+%EC%A3%BC%EC%8B%9D+%EC%8B%9C%EC%9E%A5&language=ko&sortBy=publishedAt&pageSize=8&apiKey=${apiKey}`,
        { next: { revalidate: 0 } }
      )
    ]);

    const enData: NewsApiResponse =
      enRes.status === "fulfilled" && enRes.value.ok
        ? await enRes.value.json()
        : { status: "error", articles: [] };

    const krData: NewsApiResponse =
      krRes.status === "fulfilled" && krRes.value.ok
        ? await krRes.value.json()
        : { status: "error", articles: [] };

    const combined: NewsArticle[] = [
      ...(krData.articles ?? []).filter(isArticleValid).slice(0, 6),
      ...(enData.articles ?? []).filter(isArticleValid).slice(0, 9)
    ];

    cache.articles = combined;
    cache.cachedAt = now;

    return NextResponse.json({ ok: true, articles: combined, cached: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "뉴스를 가져오지 못했습니다.";
    console.error("[NEWS_API_ERROR]", message);

    return NextResponse.json({ ok: false, message, articles: [] }, { status: 200 });
  }
}
