import Link from "next/link";
import { withAndParticle } from "@/lib/korean";
import type { Company } from "@/data/companies";
import { getCategoryForIndustry } from "@/lib/industry-categories";

type RelatedCompaniesProps = {
  currentCompany: Company;
  companies: Company[];
};

function getRelatedCompanies({
  currentCompany,
  companies
}: RelatedCompaniesProps) {
  const category = getCategoryForIndustry(currentCompany.industry);
  const isSameIndustry = (company: Company) =>
    company.industry === currentCompany.industry ||
    (category !== undefined &&
      getCategoryForIndustry(company.industry)?.slug === category.slug);

  const sameIndustryCompanies = companies.filter(
    (company) => company.slug !== currentCompany.slug && isSameIndustry(company)
  );

  const sameMarketCompanies = companies.filter(
    (company) =>
      company.slug !== currentCompany.slug &&
      !isSameIndustry(company) &&
      company.market === currentCompany.market
  );

  const otherCompanies = companies.filter(
    (company) =>
      company.slug !== currentCompany.slug &&
      !isSameIndustry(company) &&
      company.market !== currentCompany.market
  );

  return [
    ...sameIndustryCompanies,
    ...sameMarketCompanies,
    ...otherCompanies
  ].slice(0, 4);
}

export default function RelatedCompanies({
  currentCompany,
  companies
}: RelatedCompaniesProps) {
  const relatedCompanies = getRelatedCompanies({
    currentCompany,
    companies
  });

  if (relatedCompanies.length === 0) {
    return null;
  }

  return (
    <section className="card article-section related-section">
      <div className="related-head">
        <div>
          <h2>같이 확인할 기업</h2>
          <p>
            {withAndParticle(currentCompany.name)} 업종 또는 시장 기준이 가까운 기업을 함께
            확인할 수 있습니다.
          </p>
        </div>

        <Link href="/kr" className="related-more">
          전체 기업 보기 →
        </Link>
      </div>

      <div className="related-grid">
        {relatedCompanies.map((company) => (
          <Link
            key={company.slug}
            href={`/kr/company/${company.slug}`}
            className="related-card"
          >
            <div className="initial">{company.initials}</div>

            <div>
              <h3>{company.name}</h3>
              <div className="meta">
                {company.market} · {company.ticker} · {company.industry}
              </div>
              <p>{company.businessSummary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}