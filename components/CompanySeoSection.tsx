import Link from "next/link";
import { businessGroups } from "@/data/business-groups";
import { companies, type Company } from "@/data/companies";
import { getCategoryForIndustry } from "@/lib/industry-categories";
import { withTopicParticle } from "@/lib/korean";

type CompanySeoSectionProps = {
  company: Company;
};

const marketDescriptions: Record<string, string> = {
  KOSPI: "대형 상장기업 중심의 유가증권시장(KOSPI)",
  KOSDAQ: "기술·성장기업 중심의 코스닥 시장(KOSDAQ)"
};

function getPeerCompanies(company: Company) {
  const category = getCategoryForIndustry(company.industry);

  if (!category) {
    return { category, peers: [] as Company[] };
  }

  const peers = companies.filter(
    (other) =>
      other.slug !== company.slug &&
      category.industryKeywords.some(
        (keyword) => keyword.toLowerCase() === other.industry.toLowerCase()
      )
  );

  return { category, peers };
}

function getBusinessGroup(company: Company) {
  return businessGroups.find((group) =>
    group.majorCompanies.some(
      (member) =>
        member.href === `/kr/company/${company.slug}` ||
        member.name === company.name
    )
  );
}

export default function CompanySeoSection({ company }: CompanySeoSectionProps) {
  const keyBusinessText = company.keyBusinesses.join(", ");
  const subject = withTopicParticle(company.name);
  const marketText = marketDescriptions[company.market] ?? company.market;
  const { category, peers } = getPeerCompanies(company);
  const shownPeers = peers.slice(0, 6);
  const group = getBusinessGroup(company);
  const groupMates = group
    ? group.majorCompanies.filter((member) => member.name !== company.name)
    : [];

  return (
    <section className="card article-section seo-section">
      <h2>{subject} 어떤 회사인가요?</h2>

      <p>
        {subject} {marketText}에 상장된 {company.industry} 기업으로,
        종목코드는 {company.ticker}입니다. 주요 사업 키워드는 {keyBusinessText}
        입니다.
      </p>

      {group && (
        <>
          <h3>{group.displayName} 그룹 소속</h3>
          <p>
            {subject} 공정거래위원회가 지정한 {group.baseYear}년 공시대상
            기업집단 중 자산 기준 {group.rank}위인 {group.displayName} 그룹의
            계열사입니다. {group.displayName} 그룹은 계열사{" "}
            {group.affiliateCount}개, 공정자산 총액{" "}
            {(group.fairAssetTotalBillion / 1000).toFixed(1)}조 원 규모입니다.
            {groupMates.length > 0 && (
              <>
                {" "}같은 그룹의 주요 상장사로는{" "}
                {groupMates.map((member, index) => (
                  <span key={member.name}>
                    {index > 0 && ", "}
                    {member.href ? (
                      <Link href={member.href} style={{ color: "#2563eb" }}>
                        {member.name}
                      </Link>
                    ) : (
                      member.name
                    )}
                  </span>
                ))}
                {" "}등이 있습니다.
              </>
            )}
          </p>
        </>
      )}

      {category && shownPeers.length > 0 && (
        <>
          <h3>같은 업종의 상장 기업</h3>
          <p>
            Biz100 Radar가 정리한{" "}
            <Link href={`/kr/industry/${category.slug}`} style={{ color: "#2563eb" }}>
              {category.name}
            </Link>{" "}
            업종 기업은 {company.name} 포함 {peers.length + 1}곳입니다. 함께
            비교해볼 만한 기업으로는{" "}
            {shownPeers.map((peer, index) => (
              <span key={peer.slug}>
                {index > 0 && ", "}
                <Link href={`/kr/company/${peer.slug}`} style={{ color: "#2563eb" }}>
                  {peer.name}
                </Link>
              </span>
            ))}
            {peers.length > shownPeers.length ? " 등" : ""}이 있습니다.
          </p>
        </>
      )}

      <h3>공식자료로 확인하는 방법</h3>
      <p>
        {company.name}의 사업보고서, 분기보고서, 주요 공시는 금융감독원
        전자공시시스템(DART)에서 회사명이나 종목코드를 검색해 원문을 볼 수
        있습니다. 이 페이지의 실적 변화 카드와 최근 공시 목록도
        OpenDART 공식 API에서 바로 불러온 값입니다. 표시된 수치는 투자 판단의
        근거가 아니며, 최종 확인은 공시 원문을 기준으로 해야 합니다.
      </p>
    </section>
  );
}
