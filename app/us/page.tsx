import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import UsCompanySearchList from "@/components/UsCompanySearchList";
import { usCompanies } from "@/data/us-companies";

export const metadata: Metadata = {
  title: "미국 주요 기업",
  description:
    "미국 주요 상장기업의 사업 개요, 티커, 거래소, 공식 홈페이지, IR 페이지, SEC 공시 검색 링크와 시장 데이터를 정리합니다."
};

export default function UsCompaniesPage() {
  return (
    <main className="container">
      <section className="page-title">
        <span className="badge">US Companies</span>
        <h1>미국 주요 기업</h1>
        <p>
          미국 주요 상장기업의 사업 개요, 티커, 거래소, 공식 홈페이지, IR 페이지,
          SEC EDGAR 공시 검색 링크와 시장 데이터를 정리합니다. 이 페이지는 투자
          추천이 아닌 기업정보 확인용 페이지입니다.
        </p>
      </section>

      <section className="card kr-info-section">
        <h2>미국 주요 기업 정보 한눈에 보기</h2>

        <p>
          Apple, Microsoft, NVIDIA, Amazon, Alphabet 등 미국 대표 기업의 사업
          구조와 공식자료 링크를 확인할 수 있습니다. 주요 기업의 티커, 거래소,
          업종, 시장 데이터와 SEC EDGAR 검색 링크를 함께 정리합니다.
        </p>

        <div className="kr-info-grid">
          <div>
            <strong>기업 기본정보</strong>
            <span>기업명, 티커, 거래소, 업종, 주요 사업을 정리합니다.</span>
          </div>

          <div>
            <strong>시장 데이터</strong>
            <span>미국 주식의 상승·하락과 등락률을 표시합니다.</span>
          </div>

          <div>
            <strong>공식자료 링크</strong>
            <span>공식 홈페이지, IR 페이지, SEC EDGAR 검색 링크를 제공합니다.</span>
          </div>
        </div>

        <p className="kr-info-notice">
          본 페이지는 투자 추천, 매수·매도 의견, 목표가 제시를 제공하지 않으며
          기업정보 확인을 돕기 위한 정보성 페이지입니다.
        </p>
      </section>

      <AdBanner slot="4333026081" label="AdSense 상단 광고 영역" />

      <UsCompanySearchList companies={usCompanies} />
    </main>
  );
}