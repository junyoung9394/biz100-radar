import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지가 존재하지 않습니다."
};

export default function NotFound() {
  return (
    <main className="container not-found">
      <div className="card not-found-card">
        <div className="not-found-code">
          404
        </div>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="actions actions-center">
          <Link href="/" className="btn btn-primary">홈으로 돌아가기</Link>
          <Link href="/kr" className="btn btn-secondary">한국 기업 보기</Link>
          <Link href="/us" className="btn btn-secondary">미국 기업 보기</Link>
          <Link href="/ranking" className="btn btn-secondary">재계순위</Link>
        </div>
      </div>

      <AdBanner slot="9393781074" />
    </main>
  );
}
