import Link from "next/link";
import type { UsCompany } from "@/data/us-companies";

type RelatedUsCompaniesProps = {
  currentCompany: UsCompany;
  companies: UsCompany[];
};

function getRelatedUsCompanies({
  currentCompany,
  companies
}: RelatedUsCompaniesProps) {
  const sameIndustryCompanies = companies.filter(
    (company) =>
      company.slug !== currentCompany.slug &&
      company.industry === currentCompany.industry
  );

  const sameMarketCompanies = companies.filter(
    (company) =>
      company.slug !== currentCompany.slug &&
      company.industry !== currentCompany.industry &&
      company.market === currentCompany.market
  );

  const otherCompanies = companies.filter(
    (company) =>
      company.slug !== currentCompany.slug &&
      company.industry !== currentCompany.industry &&
      company.market !== currentCompany.market
  );

  return [
    ...sameIndustryCompanies,
    ...sameMarketCompanies,
    ...otherCompanies
  ].slice(0, 4);
}

export default function RelatedUsCompanies({
  currentCompany,
  companies
}: RelatedUsCompaniesProps) {
  const relatedCompanies = getRelatedUsCompanies({
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
          <h2>같이 확인할 미국 기업</h2>
          <p>
            {currentCompany.name}와 업종 또는 거래소 기준이 가까운 미국 기업을
            함께 확인할 수 있습니다.
          </p>
        </div>

        <Link href="/us" className="related-more">
          미국 기업 전체 보기 →
        </Link>
      </div>

      <div className="related-grid">
        {relatedCompanies.map((company) => (
          <Link
            key={company.slug}
            href={`/us/company/${company.slug}`}
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