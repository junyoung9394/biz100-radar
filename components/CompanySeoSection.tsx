import type { Company } from "@/data/companies";

type CompanySeoSectionProps = {
  company: Company;
};

export default function CompanySeoSection({ company }: CompanySeoSectionProps) {
  const keyBusinessText = company.keyBusinesses.join(", ");

  return (
    <section className="card article-section seo-section">
      <h2>{company.name}는 어떤 회사인가요?</h2>

      <p>
        {company.name}는 {company.industry} 분야에서 사업을 운영하는
        {company.market} 상장 기업입니다. 이 페이지에서는 {company.name}의
        주요 사업, 공식자료 링크, 최근 공시, 실적 변화, 시장 데이터를 한눈에
        확인할 수 있도록 정리합니다.
      </p>

      <h3>{company.name}의 주요 사업</h3>
      <p>
        {company.name}의 주요 사업 키워드는 {keyBusinessText}입니다.{" "}
        {company.businessSummary} 기업을 볼 때는 단순한 주가 흐름뿐 아니라
        어떤 사업을 하고 있는지, 최근 공시에서 어떤 변화가 있었는지, 실적
        항목이 어떻게 움직이는지를 함께 확인하는 것이 중요합니다.
      </p>

      <h3>공식자료로 확인할 수 있는 정보</h3>
      <p>
        이 페이지의 DART 공시 검색, 공식 홈페이지, IR 페이지 링크를 통해{" "}
        {company.name}의 사업보고서, 분기보고서, 주요 공시, 투자자 대상 자료를
        직접 확인할 수 있습니다. Biz100 Radar는 매수·매도 추천이 아니라
        기업정보 확인을 돕기 위한 정보성 페이지입니다.
      </p>

      <h3>최근 공시와 실적을 보는 방법</h3>
      <p>
        최근 공식 공시 영역에서는 OpenDART 기준으로 확인 가능한 공시를
        정리합니다. 실적 변화 카드는 매출액, 영업이익, 순이익, 부채비율 같은
        주요 항목을 중심으로 기업의 체급 변화를 확인하기 위한 참고 정보입니다.
        표시된 수치와 시장 데이터는 투자 판단의 근거가 아니며, 최종 확인은
        공식 공시와 거래소 또는 증권사 원문을 기준으로 해야 합니다.
      </p>
    </section>
  );
}