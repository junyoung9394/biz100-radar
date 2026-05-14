import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import CompanySearchList from "@/components/CompanySearchList";
import { companies } from "@/data/companies";

export const metadata: Metadata = {
  title: "한국 주요 기업",
  description:
    "한국 주요 상장기업의 사업 개요, 종목코드, 업종, 시장 데이터, 최근 공시, 실적 정보를 정리합니다."
};

export default function KoreaCompaniesPage() {
  return (
    <main className="container">
      <section className="page-title">
        <span className="badge">KR Companies</span>
        <h1>한국 주요 기업</h1>
        <p>
          한국 주요 기업을 대상으로 사업 개요, 공식자료 링크, 최근 확인 포인트를
          정리합니다. OpenDART 공시와 재무정보, 장마감 기준 시장 데이터를 함께
          확인할 수 있습니다.
        </p>
      </section>

      <section className="card kr-info-section">
        <h2>한국 주요 기업 정보 한눈에 보기</h2>

        <p>
          Biz100 Radar는 한국 주요 상장기업의 사업 개요, 종목코드, 업종, 시장
          데이터, 최근 공시, 실적 정보를 정리하는 기업정보 서비스입니다.
          KOSPI와 KOSDAQ 주요 기업을 검색하고, 기업별 상세 페이지에서 공식자료와
          OpenDART 공시를 확인할 수 있습니다.
        </p>

        <div className="kr-info-grid">
          <div>
            <strong>기업 기본정보</strong>
            <span>기업명, 종목코드, 업종, 주요 사업을 정리합니다.</span>
          </div>

          <div>
            <strong>시장 데이터</strong>
            <span>장마감 기준 주가와 전일 대비 상승·하락을 표시합니다.</span>
          </div>

          <div>
            <strong>공식 공시</strong>
            <span>DART 기준 최근 공시와 공식자료 링크를 제공합니다.</span>
          </div>
        </div>

        <p className="kr-info-notice">
          본 페이지는 투자 추천, 매수·매도 의견, 목표가 제시를 제공하지 않으며
          기업정보 확인을 돕기 위한 정보성 페이지입니다.
        </p>
      </section>

      <AdBanner slot="4333026081" label="AdSense 상단 광고 영역" />

      <CompanySearchList companies={companies} />
    </main>
  );
}