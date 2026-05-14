import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import CompanySearchList from "@/components/CompanySearchList";
import { companies } from "@/data/companies";

export const metadata: Metadata = {
  title: "한국 주요 기업",
  description:
    "한국 주요 기업의 사업 개요, 공식자료 링크, 최근 확인 포인트를 정리합니다."
};

export default function KoreaCompaniesPage() {
  return (
    <main className="container">
      <section className="page-title">
        <span className="badge">KR Companies</span>
        <h1>한국 주요 기업</h1>
        <p>
          한국 주요 기업을 대상으로 사업 개요, 공식자료 링크, 최근 확인 포인트를
          정리합니다. 향후 OpenDART API 연동을 통해 공시와 재무정보를 자동
          업데이트할 예정입니다.
        </p>
      </section>

      <AdBanner slot="4333026081" label="AdSense 상단 광고 영역" />

      <CompanySearchList companies={companies} />
    </main>
  );
}