import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import JpCompanySearchList from "@/components/JpCompanySearchList";
import { jpCompanies } from "@/data/jp-companies";

export const metadata: Metadata = {
  title: "일본 주요 기업",
  description:
    "일본 주요 상장기업의 사업 개요, 종목코드, 거래소, 공식 홈페이지, IR 페이지, EDINET 공시 확인 링크를 정리합니다."
};

export default function JpCompaniesPage() {
  return (
    <main className="container">
      <section className="page-title">
        <span className="badge">JP Companies</span>
        <h1>일본 주요 기업</h1>
        <p>
          일본 주요 상장기업의 사업 개요, 종목코드, 거래소, 공식 홈페이지, IR
          페이지, EDINET 공시 확인 링크를 정리합니다. 이 페이지는 투자 추천이
          아닌 기업정보 확인용 페이지입니다.
        </p>
      </section>

      <section className="card kr-info-section">
        <h2>일본 주요 기업 정보 한눈에 보기</h2>

        <p>
          Toyota, Sony, Nintendo, SoftBank Group 등 일본 대표 기업의 사업 구조와
          공식자료 링크를 확인할 수 있습니다. EDINET API를 통해 최근 공시와
          재무정보 자동 연동을 확장할 수 있는 구조로 정리합니다.
        </p>

        <div className="kr-info-grid">
          <div>
            <strong>기업 기본정보</strong>
            <span>기업명, 종목코드, 거래소, 업종, 주요 사업을 정리합니다.</span>
          </div>

          <div>
            <strong>공식자료 링크</strong>
            <span>공식 홈페이지, IR 페이지, EDINET 공시 확인 링크를 제공합니다.</span>
          </div>

          <div>
            <strong>EDINET 공시</strong>
            <span>일본 기업의 최근 공시 확인 기능을 단계적으로 연결합니다.</span>
          </div>
        </div>

        <p className="kr-info-notice">
          본 페이지는 투자 추천, 매수·매도 의견, 목표가 제시를 제공하지 않으며
          기업정보 확인을 돕기 위한 정보성 페이지입니다.
        </p>
      </section>

      <AdBanner slot="4333026081" label="AdSense 상단 광고 영역" />

      <JpCompanySearchList companies={jpCompanies} />
    </main>
  );
}