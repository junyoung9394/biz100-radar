"use client";

import { useEffect, useState } from "react";

type NewsArticle = {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
  urlToImage: string | null;
};

type ApiResponse = {
  ok: boolean;
  articles: NewsArticle[];
  message?: string;
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function NewsCardSkeleton() {
  return (
    <div className="news-card news-card-skeleton">
      <div className="news-skeleton-source" />
      <div className="news-skeleton-title" />
      <div className="news-skeleton-title news-skeleton-title-short" />
      <div className="news-skeleton-desc" />
      <div className="news-skeleton-desc news-skeleton-desc-short" />
    </div>
  );
}

export default function EconomicNews() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: ApiResponse) => {
        if (data.ok && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && (error || articles.length === 0)) return null;

  return (
    <section className="container section">
      <div className="section-head">
        <div>
          <span className="badge">Economic News</span>
          <h2>오늘의 경제 뉴스</h2>
          <p className="section-description">
            글로벌·국내 경제 주요 뉴스를 매일 업데이트합니다. 투자 판단이 아닌 시장 이해를 위한 참고 자료입니다.
          </p>
        </div>
      </div>

      <div className="news-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
          : articles.map((article, i) => (
              <a
                key={`${article.url}-${i}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card news-card"
              >
                <div className="news-card-source">{article.source.name}</div>
                <h3 className="news-card-title">{article.title}</h3>
                {article.description && (
                  <p className="news-card-desc">{article.description}</p>
                )}
                <div className="news-card-footer">
                  <span className="news-card-date">{formatDate(article.publishedAt)}</span>
                  <span className="news-card-read">자세히 →</span>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}
