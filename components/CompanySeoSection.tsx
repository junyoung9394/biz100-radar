import type { Company } from "@/data/companies";

type CompanySeoSectionProps = {
  company: Company;
};

export default function CompanySeoSection({ company }: CompanySeoSectionProps) {
  return (
    <section className="card article-section seo-section">
      <h2>{company.name} 기업정보 확인 가이드</h2>

      <p>
        {company.name}({company.ticker})은 {company.market}에 상장된{" "}
        {company.industry} 분야 기업입니다. 아래에서 주요 사업별 개요와 공식자료
        접근 방법을 확인할 수 있습니다.
      </p>

      {company.keyBusinesses.map((business) => (
        <div key={business}>
          <h3>
            {company.name}의 {business}
          </h3>
          <p>
            {business}은(는) {company.name}의 핵심 사업 영역 중 하나입니다.{" "}
            {business} 관련 공시, 실적, 사업보고서는 금융감독원 전자공시시스템
            DART에서 종목코드 {company.ticker} 또는 기업명{" "}
            {company.name}으로 검색해 원문을 확인할 수 있습니다.
          </p>
        </div>
      ))}

      <h3>DART 공시로 {company.name} 정보를 확인하는 방법</h3>
      <p>
        {company.name}의 사업보고서, 분기보고서, 임시공시 등은 DART
        (dart.fss.or.kr)에서 종목코드 {company.ticker}로 검색하면 원문을 확인할
        수 있습니다. Biz100 Radar는 매수·매도 추천이 아니라 공식자료 확인을 돕기
        위한 기업정보 페이지입니다.
      </p>
    </section>
  );
}
