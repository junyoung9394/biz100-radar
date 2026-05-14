export type UsCompany = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  country: "US";
  market: string;
  ticker: string;
cik?: string;
  industry: string;
  businessSummary: string;
  keyBusinesses: string[];
  officialWebsite: string;
  irUrl: string;
  secSearchUrl: string;
  sourceNote: string;
  updatedAt: string;
};

function makeSecSearchUrl(ticker: string) {
  return `https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(ticker)}`;
}

function createUsCompany(company: Omit<UsCompany, "country" | "secSearchUrl" | "sourceNote" | "updatedAt">): UsCompany {
  return {
    ...company,
    country: "US",
    secSearchUrl: makeSecSearchUrl(company.ticker),
    sourceNote:
      "초기 미국 기업 MVP 데이터입니다. SEC EDGAR 공시와 재무정보는 다음 단계에서 자동 연동할 예정입니다.",
    updatedAt: "2026-05-14"
  };
}

export const usCompanies: UsCompany[] = [
  createUsCompany({
    slug: "apple",
    name: "Apple",
    shortName: "Apple",
    initials: "AAPL",
    market: "NASDAQ",
    ticker: "AAPL",
    industry: "Consumer Electronics · Software",
    businessSummary:
      "Apple은 iPhone, Mac, iPad, Apple Watch, 서비스 사업을 중심으로 운영되는 글로벌 소비자 전자·소프트웨어 기업입니다.",
    keyBusinesses: ["iPhone", "Mac", "iPad", "Services", "Wearables"],
    officialWebsite: "https://www.apple.com/",
    irUrl: "https://investor.apple.com/"
  }),

  createUsCompany({
    slug: "microsoft",
    name: "Microsoft",
    shortName: "Microsoft",
    initials: "MSFT",
    market: "NASDAQ",
    ticker: "MSFT",
    industry: "Software · Cloud",
    businessSummary:
      "Microsoft는 Windows, Microsoft 365, Azure, LinkedIn, Xbox 등 소프트웨어와 클라우드 사업을 운영하는 글로벌 기술 기업입니다.",
    keyBusinesses: ["Cloud", "Software", "Productivity", "Gaming", "AI"],
    officialWebsite: "https://www.microsoft.com/",
    irUrl: "https://www.microsoft.com/en-us/investor"
  }),

  createUsCompany({
    slug: "nvidia",
    name: "NVIDIA",
    shortName: "NVIDIA",
    initials: "NVDA",
    market: "NASDAQ",
    ticker: "NVDA",
    industry: "Semiconductors · AI",
    businessSummary:
      "NVIDIA는 GPU, AI 가속기, 데이터센터, 게이밍, 전문 시각화, 자동차 컴퓨팅 사업을 운영하는 반도체 기업입니다.",
    keyBusinesses: ["GPU", "AI", "Data Center", "Gaming", "Automotive"],
    officialWebsite: "https://www.nvidia.com/",
    irUrl: "https://investor.nvidia.com/"
  }),

  createUsCompany({
    slug: "amazon",
    name: "Amazon",
    shortName: "Amazon",
    initials: "AMZN",
    market: "NASDAQ",
    ticker: "AMZN",
    industry: "E-commerce · Cloud",
    businessSummary:
      "Amazon은 전자상거래, AWS 클라우드, 광고, 구독 서비스, 물류 인프라를 중심으로 사업을 운영하는 글로벌 플랫폼 기업입니다.",
    keyBusinesses: ["E-commerce", "AWS", "Advertising", "Logistics", "Subscription"],
    officialWebsite: "https://www.amazon.com/",
    irUrl: "https://ir.aboutamazon.com/"
  }),

  createUsCompany({
    slug: "alphabet",
    name: "Alphabet",
    shortName: "Alphabet",
    initials: "GOOGL",
    market: "NASDAQ",
    ticker: "GOOGL",
    industry: "Internet · Advertising · Cloud",
    businessSummary:
      "Alphabet은 Google 검색, YouTube, 광고, Google Cloud, Android 등 인터넷·기술 플랫폼 사업을 운영하는 지주회사입니다.",
    keyBusinesses: ["Search", "YouTube", "Advertising", "Cloud", "Android"],
    officialWebsite: "https://abc.xyz/",
    irUrl: "https://abc.xyz/investor/"
  }),

  createUsCompany({
    slug: "meta-platforms",
    name: "Meta Platforms",
    shortName: "Meta",
    initials: "META",
    market: "NASDAQ",
    ticker: "META",
    industry: "Social Media · Advertising",
    businessSummary:
      "Meta Platforms는 Facebook, Instagram, WhatsApp, Threads, 광고 플랫폼, Reality Labs 사업을 운영하는 소셜 플랫폼 기업입니다.",
    keyBusinesses: ["Facebook", "Instagram", "WhatsApp", "Advertising", "Reality Labs"],
    officialWebsite: "https://about.meta.com/",
    irUrl: "https://investor.fb.com/"
  }),

  createUsCompany({
    slug: "tesla",
    name: "Tesla",
    shortName: "Tesla",
    initials: "TSLA",
    market: "NASDAQ",
    ticker: "TSLA",
    industry: "Electric Vehicles · Energy",
    businessSummary:
      "Tesla는 전기차, 에너지 저장장치, 태양광, 자율주행 소프트웨어 관련 사업을 운영하는 전기차·에너지 기업입니다.",
    keyBusinesses: ["Electric Vehicles", "Energy Storage", "Solar", "Autonomous Driving"],
    officialWebsite: "https://www.tesla.com/",
    irUrl: "https://ir.tesla.com/"
  }),

  createUsCompany({
    slug: "berkshire-hathaway",
    name: "Berkshire Hathaway",
    shortName: "Berkshire",
    initials: "BRK",
    market: "NYSE",
    ticker: "BRK.B",
    industry: "Holding Company · Insurance",
    businessSummary:
      "Berkshire Hathaway는 보험, 철도, 에너지, 제조, 유통, 투자 포트폴리오를 보유한 미국의 대표 지주회사입니다.",
    keyBusinesses: ["Insurance", "Railroad", "Energy", "Manufacturing", "Investments"],
    officialWebsite: "https://www.berkshirehathaway.com/",
    irUrl: "https://www.berkshirehathaway.com/reports.html"
  }),

  createUsCompany({
    slug: "jpmorgan-chase",
    name: "JPMorgan Chase",
    shortName: "JPMorgan",
    initials: "JPM",
    market: "NYSE",
    ticker: "JPM",
    industry: "Banking · Financial Services",
    businessSummary:
      "JPMorgan Chase는 소비자금융, 투자은행, 자산관리, 상업은행 서비스를 제공하는 글로벌 금융회사입니다.",
    keyBusinesses: ["Banking", "Investment Banking", "Asset Management", "Payments"],
    officialWebsite: "https://www.jpmorganchase.com/",
    irUrl: "https://www.jpmorganchase.com/ir"
  }),

  createUsCompany({
    slug: "visa",
    name: "Visa",
    shortName: "Visa",
    initials: "V",
    market: "NYSE",
    ticker: "V",
    industry: "Payments",
    businessSummary:
      "Visa는 글로벌 카드 결제 네트워크와 디지털 결제 인프라를 제공하는 결제 기술 기업입니다.",
    keyBusinesses: ["Payments", "Card Network", "Digital Payments", "Fintech"],
    officialWebsite: "https://www.visa.com/",
    irUrl: "https://investor.visa.com/"
  }),

  createUsCompany({
    slug: "mastercard",
    name: "Mastercard",
    shortName: "Mastercard",
    initials: "MA",
    market: "NYSE",
    ticker: "MA",
    industry: "Payments",
    businessSummary:
      "Mastercard는 글로벌 결제 네트워크, 카드 결제, 데이터·보안 솔루션을 제공하는 결제 기술 기업입니다.",
    keyBusinesses: ["Payments", "Card Network", "Data Services", "Cybersecurity"],
    officialWebsite: "https://www.mastercard.com/",
    irUrl: "https://investor.mastercard.com/"
  }),

  createUsCompany({
    slug: "broadcom",
    name: "Broadcom",
    shortName: "Broadcom",
    initials: "AVGO",
    market: "NASDAQ",
    ticker: "AVGO",
    industry: "Semiconductors · Infrastructure Software",
    businessSummary:
      "Broadcom은 반도체 솔루션과 인프라 소프트웨어 사업을 운영하는 글로벌 기술 기업입니다.",
    keyBusinesses: ["Semiconductors", "Networking", "Storage", "Infrastructure Software"],
    officialWebsite: "https://www.broadcom.com/",
    irUrl: "https://investors.broadcom.com/"
  }),

  createUsCompany({
    slug: "oracle",
    name: "Oracle",
    shortName: "Oracle",
    initials: "ORCL",
    market: "NYSE",
    ticker: "ORCL",
    industry: "Software · Cloud",
    businessSummary:
      "Oracle은 데이터베이스, 클라우드 인프라, 기업용 소프트웨어, ERP 솔루션을 제공하는 소프트웨어 기업입니다.",
    keyBusinesses: ["Database", "Cloud", "ERP", "Enterprise Software"],
    officialWebsite: "https://www.oracle.com/",
    irUrl: "https://investor.oracle.com/"
  }),

  createUsCompany({
    slug: "walmart",
    name: "Walmart",
    shortName: "Walmart",
    initials: "WMT",
    market: "NYSE",
    ticker: "WMT",
    industry: "Retail",
    businessSummary:
      "Walmart는 대형마트, 식료품, 전자상거래, 멤버십 서비스를 운영하는 글로벌 유통 기업입니다.",
    keyBusinesses: ["Retail", "Grocery", "E-commerce", "Membership"],
    officialWebsite: "https://www.walmart.com/",
    irUrl: "https://stock.walmart.com/"
  }),

  createUsCompany({
    slug: "eli-lilly",
    name: "Eli Lilly",
    shortName: "Eli Lilly",
    initials: "LLY",
    market: "NYSE",
    ticker: "LLY",
    industry: "Pharmaceuticals",
    businessSummary:
      "Eli Lilly는 당뇨, 비만, 항암, 면역질환, 신경계 치료제 등을 개발·판매하는 글로벌 제약 기업입니다.",
    keyBusinesses: ["Pharmaceuticals", "Diabetes", "Obesity", "Oncology", "Immunology"],
    officialWebsite: "https://www.lilly.com/",
    irUrl: "https://investor.lilly.com/"
  }),

  createUsCompany({
    slug: "unitedhealth-group",
    name: "UnitedHealth Group",
    shortName: "UnitedHealth",
    initials: "UNH",
    market: "NYSE",
    ticker: "UNH",
    industry: "Healthcare · Insurance",
    businessSummary:
      "UnitedHealth Group은 건강보험, 의료서비스, 약국관리, 헬스케어 데이터 사업을 운영하는 의료·보험 기업입니다.",
    keyBusinesses: ["Health Insurance", "Healthcare Services", "Optum", "Data"],
    officialWebsite: "https://www.unitedhealthgroup.com/",
    irUrl: "https://www.unitedhealthgroup.com/investors.html"
  }),

  createUsCompany({
    slug: "exxon-mobil",
    name: "Exxon Mobil",
    shortName: "ExxonMobil",
    initials: "XOM",
    market: "NYSE",
    ticker: "XOM",
    industry: "Energy · Oil & Gas",
    businessSummary:
      "Exxon Mobil은 원유·천연가스 탐사, 생산, 정유, 화학 사업을 운영하는 글로벌 에너지 기업입니다.",
    keyBusinesses: ["Oil", "Natural Gas", "Refining", "Chemicals"],
    officialWebsite: "https://corporate.exxonmobil.com/",
    irUrl: "https://investor.exxonmobil.com/"
  }),

  createUsCompany({
    slug: "chevron",
    name: "Chevron",
    shortName: "Chevron",
    initials: "CVX",
    market: "NYSE",
    ticker: "CVX",
    industry: "Energy · Oil & Gas",
    businessSummary:
      "Chevron은 석유·가스 탐사, 생산, 정제, 화학, 에너지 솔루션 사업을 운영하는 글로벌 에너지 기업입니다.",
    keyBusinesses: ["Oil", "Gas", "Refining", "Chemicals", "Energy"],
    officialWebsite: "https://www.chevron.com/",
    irUrl: "https://www.chevron.com/investors"
  }),

  createUsCompany({
    slug: "costco",
    name: "Costco",
    shortName: "Costco",
    initials: "COST",
    market: "NASDAQ",
    ticker: "COST",
    industry: "Retail · Membership",
    businessSummary:
      "Costco는 창고형 할인점과 멤버십 기반 유통 사업을 운영하는 글로벌 소매 기업입니다.",
    keyBusinesses: ["Retail", "Membership", "Warehouse Club", "Grocery"],
    officialWebsite: "https://www.costco.com/",
    irUrl: "https://investor.costco.com/"
  }),

  createUsCompany({
    slug: "netflix",
    name: "Netflix",
    shortName: "Netflix",
    initials: "NFLX",
    market: "NASDAQ",
    ticker: "NFLX",
    industry: "Streaming · Entertainment",
    businessSummary:
      "Netflix는 스트리밍 구독 서비스, 오리지널 콘텐츠 제작, 글로벌 엔터테인먼트 사업을 운영하는 기업입니다.",
    keyBusinesses: ["Streaming", "Subscription", "Original Content", "Entertainment"],
    officialWebsite: "https://www.netflix.com/",
    irUrl: "https://ir.netflix.net/"
  }),

  createUsCompany({
    slug: "adobe",
    name: "Adobe",
    shortName: "Adobe",
    initials: "ADBE",
    market: "NASDAQ",
    ticker: "ADBE",
    industry: "Software · Creative Tools",
    businessSummary:
      "Adobe는 Creative Cloud, Document Cloud, Experience Cloud 등 디자인·문서·마케팅 소프트웨어를 제공하는 기업입니다.",
    keyBusinesses: ["Creative Cloud", "Document Cloud", "Marketing Software", "AI"],
    officialWebsite: "https://www.adobe.com/",
    irUrl: "https://www.adobe.com/investor-relations.html"
  }),

  createUsCompany({
    slug: "salesforce",
    name: "Salesforce",
    shortName: "Salesforce",
    initials: "CRM",
    market: "NYSE",
    ticker: "CRM",
    industry: "Cloud Software · CRM",
    businessSummary:
      "Salesforce는 고객관계관리, 클라우드 소프트웨어, 데이터, AI 기반 기업용 솔루션을 제공하는 소프트웨어 기업입니다.",
    keyBusinesses: ["CRM", "Cloud Software", "Data", "AI", "Enterprise Solutions"],
    officialWebsite: "https://www.salesforce.com/",
    irUrl: "https://investor.salesforce.com/"
  }),

  createUsCompany({
    slug: "amd",
    name: "AMD",
    shortName: "AMD",
    initials: "AMD",
    market: "NASDAQ",
    ticker: "AMD",
    industry: "Semiconductors",
    businessSummary:
      "AMD는 CPU, GPU, 데이터센터 칩, 임베디드 반도체를 개발하는 글로벌 반도체 기업입니다.",
    keyBusinesses: ["CPU", "GPU", "Data Center", "Embedded Chips", "AI"],
    officialWebsite: "https://www.amd.com/",
    irUrl: "https://ir.amd.com/"
  }),

  createUsCompany({
    slug: "intel",
    name: "Intel",
    shortName: "Intel",
    initials: "INTC",
    market: "NASDAQ",
    ticker: "INTC",
    industry: "Semiconductors",
    businessSummary:
      "Intel은 CPU, 데이터센터 반도체, 파운드리, 네트워크·엣지 컴퓨팅 관련 사업을 운영하는 반도체 기업입니다.",
    keyBusinesses: ["CPU", "Data Center", "Foundry", "Network", "Edge Computing"],
    officialWebsite: "https://www.intel.com/",
    irUrl: "https://www.intc.com/"
  }),

  createUsCompany({
    slug: "coca-cola",
    name: "Coca-Cola",
    shortName: "Coca-Cola",
    initials: "KO",
    market: "NYSE",
    ticker: "KO",
    industry: "Beverages",
    businessSummary:
      "Coca-Cola는 탄산음료, 생수, 스포츠음료, 커피, 주스 등 글로벌 음료 브랜드를 운영하는 소비재 기업입니다.",
    keyBusinesses: ["Beverages", "Soft Drinks", "Water", "Coffee", "Global Brands"],
    officialWebsite: "https://www.coca-colacompany.com/",
    irUrl: "https://investors.coca-colacompany.com/"
  }),

  createUsCompany({
    slug: "pepsico",
    name: "PepsiCo",
    shortName: "PepsiCo",
    initials: "PEP",
    market: "NASDAQ",
    ticker: "PEP",
    industry: "Beverages · Snacks",
    businessSummary:
      "PepsiCo는 음료, 스낵, 식품 브랜드를 운영하는 글로벌 소비재 기업입니다.",
    keyBusinesses: ["Beverages", "Snacks", "Food", "Global Brands"],
    officialWebsite: "https://www.pepsico.com/",
    irUrl: "https://investors.pepsico.com/"
  }),

  createUsCompany({
    slug: "mcdonalds",
    name: "McDonald's",
    shortName: "McDonald's",
    initials: "MCD",
    market: "NYSE",
    ticker: "MCD",
    industry: "Restaurants · Franchise",
    businessSummary:
      "McDonald's는 글로벌 패스트푸드 레스토랑과 프랜차이즈 사업을 운영하는 외식 기업입니다.",
    keyBusinesses: ["Restaurants", "Franchise", "Fast Food", "Real Estate"],
    officialWebsite: "https://www.mcdonalds.com/",
    irUrl: "https://corporate.mcdonalds.com/corpmcd/investors.html"
  }),

  createUsCompany({
    slug: "disney",
    name: "The Walt Disney Company",
    shortName: "Disney",
    initials: "DIS",
    market: "NYSE",
    ticker: "DIS",
    industry: "Media · Entertainment",
    businessSummary:
      "Disney는 영화, TV, 스트리밍, 테마파크, 소비재 등 미디어·엔터테인먼트 사업을 운영하는 기업입니다.",
    keyBusinesses: ["Media", "Streaming", "Theme Parks", "Movies", "Consumer Products"],
    officialWebsite: "https://thewaltdisneycompany.com/",
    irUrl: "https://thewaltdisneycompany.com/investor-relations/"
  }),

  createUsCompany({
    slug: "nike",
    name: "Nike",
    shortName: "Nike",
    initials: "NKE",
    market: "NYSE",
    ticker: "NKE",
    industry: "Apparel · Footwear",
    businessSummary:
      "Nike는 스포츠 신발, 의류, 장비, 브랜드 마케팅을 중심으로 사업을 운영하는 글로벌 스포츠 소비재 기업입니다.",
    keyBusinesses: ["Footwear", "Apparel", "Sportswear", "Brand"],
    officialWebsite: "https://www.nike.com/",
    irUrl: "https://investors.nike.com/"
  }),

  createUsCompany({
    slug: "boeing",
    name: "Boeing",
    shortName: "Boeing",
    initials: "BA",
    market: "NYSE",
    ticker: "BA",
    industry: "Aerospace · Defense",
    businessSummary:
      "Boeing은 상업용 항공기, 방산, 우주, 항공 서비스 사업을 운영하는 항공우주 기업입니다.",
    keyBusinesses: ["Commercial Airplanes", "Defense", "Space", "Services"],
    officialWebsite: "https://www.boeing.com/",
    irUrl: "https://investors.boeing.com/"
  }),
  createUsCompany({
    slug: "qualcomm",
    name: "Qualcomm",
    shortName: "Qualcomm",
    initials: "QCOM",
    market: "NASDAQ",
    ticker: "QCOM",
    cik: "0000804328",
    industry: "Semiconductors · Wireless Technology",
    businessSummary:
      "Qualcomm은 모바일 AP, 통신 칩셋, 5G, 자동차 반도체, IoT 관련 기술을 제공하는 글로벌 반도체 기업입니다.",
    keyBusinesses: ["5G", "Mobile Chips", "Automotive", "IoT", "Licensing"],
    officialWebsite: "https://www.qualcomm.com/",
    irUrl: "https://investor.qualcomm.com/"
  }),

  createUsCompany({
    slug: "micron",
    name: "Micron Technology",
    shortName: "Micron",
    initials: "MU",
    market: "NASDAQ",
    ticker: "MU",
    cik: "0000723125",
    industry: "Semiconductors · Memory",
    businessSummary:
      "Micron Technology는 DRAM, NAND, SSD, 데이터센터 및 AI용 메모리 솔루션을 제공하는 미국 반도체 기업입니다.",
    keyBusinesses: ["DRAM", "NAND", "SSD", "Data Center", "AI Memory"],
    officialWebsite: "https://www.micron.com/",
    irUrl: "https://investors.micron.com/"
  }),

  createUsCompany({
    slug: "applied-materials",
    name: "Applied Materials",
    shortName: "Applied Materials",
    initials: "AMAT",
    market: "NASDAQ",
    ticker: "AMAT",
    cik: "0000006951",
    industry: "Semiconductor Equipment",
    businessSummary:
      "Applied Materials는 반도체와 디스플레이 제조 공정에 필요한 장비, 서비스, 소재 엔지니어링 솔루션을 제공하는 기업입니다.",
    keyBusinesses: ["Semiconductor Equipment", "Display Equipment", "Materials Engineering", "Services"],
    officialWebsite: "https://www.appliedmaterials.com/",
    irUrl: "https://ir.appliedmaterials.com/"
  }),

  createUsCompany({
    slug: "lam-research",
    name: "Lam Research",
    shortName: "Lam Research",
    initials: "LRCX",
    market: "NASDAQ",
    ticker: "LRCX",
    cik: "0000707549",
    industry: "Semiconductor Equipment",
    businessSummary:
      "Lam Research는 반도체 식각, 증착, 웨이퍼 공정 장비와 서비스를 제공하는 글로벌 반도체 장비 기업입니다.",
    keyBusinesses: ["Etch", "Deposition", "Wafer Processing", "Semiconductor Services"],
    officialWebsite: "https://www.lamresearch.com/",
    irUrl: "https://investor.lamresearch.com/"
  }),

  createUsCompany({
    slug: "servicenow",
    name: "ServiceNow",
    shortName: "ServiceNow",
    initials: "NOW",
    market: "NYSE",
    ticker: "NOW",
    cik: "0001373715",
    industry: "Cloud Software · Workflow Automation",
    businessSummary:
      "ServiceNow는 기업 업무 자동화, IT 서비스 관리, 워크플로우 플랫폼, AI 기반 업무 솔루션을 제공하는 클라우드 소프트웨어 기업입니다.",
    keyBusinesses: ["Workflow Automation", "ITSM", "Cloud Platform", "AI", "Enterprise Software"],
    officialWebsite: "https://www.servicenow.com/",
    irUrl: "https://investors.servicenow.com/"
  }),

  createUsCompany({
    slug: "intuit",
    name: "Intuit",
    shortName: "Intuit",
    initials: "INTU",
    market: "NASDAQ",
    ticker: "INTU",
    cik: "0000896878",
    industry: "Financial Software",
    businessSummary:
      "Intuit은 TurboTax, QuickBooks, Credit Karma, Mailchimp 등을 운영하는 개인·중소기업용 금융 소프트웨어 기업입니다.",
    keyBusinesses: ["Tax Software", "Accounting Software", "Credit Services", "Small Business", "Marketing Tools"],
    officialWebsite: "https://www.intuit.com/",
    irUrl: "https://investors.intuit.com/"
  }),

  createUsCompany({
    slug: "palantir",
    name: "Palantir Technologies",
    shortName: "Palantir",
    initials: "PLTR",
    market: "NASDAQ",
    ticker: "PLTR",
    cik: "0001321655",
    industry: "Data Analytics · AI Software",
    businessSummary:
      "Palantir Technologies는 정부와 기업을 대상으로 데이터 분석, AI 플랫폼, 운영 의사결정 소프트웨어를 제공하는 기업입니다.",
    keyBusinesses: ["Data Analytics", "AI Platform", "Government Software", "Enterprise Software"],
    officialWebsite: "https://www.palantir.com/",
    irUrl: "https://investors.palantir.com/"
  }),

  createUsCompany({
    slug: "shopify",
    name: "Shopify",
    shortName: "Shopify",
    initials: "SHOP",
    market: "NYSE",
    ticker: "SHOP",
    cik: "0001594805",
    industry: "E-commerce Software",
    businessSummary:
      "Shopify는 온라인 쇼핑몰 구축, 결제, 물류, 판매자 도구를 제공하는 글로벌 전자상거래 소프트웨어 플랫폼 기업입니다.",
    keyBusinesses: ["E-commerce Platform", "Payments", "Merchant Tools", "Logistics", "SaaS"],
    officialWebsite: "https://www.shopify.com/",
    irUrl: "https://investors.shopify.com/"
  }),

  createUsCompany({
    slug: "johnson-and-johnson",
    name: "Johnson & Johnson",
    shortName: "Johnson & Johnson",
    initials: "JNJ",
    market: "NYSE",
    ticker: "JNJ",
    cik: "0000200406",
    industry: "Healthcare · Pharmaceuticals",
    businessSummary:
      "Johnson & Johnson은 의약품, 의료기기, 헬스케어 솔루션을 제공하는 글로벌 헬스케어 기업입니다.",
    keyBusinesses: ["Pharmaceuticals", "Medical Devices", "Healthcare", "Immunology", "Oncology"],
    officialWebsite: "https://www.jnj.com/",
    irUrl: "https://www.investor.jnj.com/"
  }),

  createUsCompany({
    slug: "merck",
    name: "Merck & Co.",
    shortName: "Merck",
    initials: "MRK",
    market: "NYSE",
    ticker: "MRK",
    cik: "0000310158",
    industry: "Pharmaceuticals",
    businessSummary:
      "Merck & Co.는 항암제, 백신, 감염질환, 동물의약품 사업을 운영하는 글로벌 제약 기업입니다.",
    keyBusinesses: ["Pharmaceuticals", "Oncology", "Vaccines", "Animal Health"],
    officialWebsite: "https://www.merck.com/",
    irUrl: "https://www.merck.com/investor-relations/"
  }),

  createUsCompany({
    slug: "pfizer",
    name: "Pfizer",
    shortName: "Pfizer",
    initials: "PFE",
    market: "NYSE",
    ticker: "PFE",
    cik: "0000078003",
    industry: "Pharmaceuticals",
    businessSummary:
      "Pfizer는 백신, 항암제, 희귀질환, 감염질환, 내과질환 치료제를 개발·판매하는 글로벌 제약 기업입니다.",
    keyBusinesses: ["Vaccines", "Pharmaceuticals", "Oncology", "Rare Diseases", "Internal Medicine"],
    officialWebsite: "https://www.pfizer.com/",
    irUrl: "https://investors.pfizer.com/"
  }),

  createUsCompany({
    slug: "abbvie",
    name: "AbbVie",
    shortName: "AbbVie",
    initials: "ABBV",
    market: "NYSE",
    ticker: "ABBV",
    cik: "0001551152",
    industry: "Pharmaceuticals · Biotechnology",
    businessSummary:
      "AbbVie는 면역질환, 항암, 신경과학, 안과, 미용의학 분야 치료제를 개발·판매하는 글로벌 제약 기업입니다.",
    keyBusinesses: ["Immunology", "Oncology", "Neuroscience", "Eye Care", "Aesthetics"],
    officialWebsite: "https://www.abbvie.com/",
    irUrl: "https://investors.abbvie.com/"
  }),

  createUsCompany({
    slug: "abbott",
    name: "Abbott Laboratories",
    shortName: "Abbott",
    initials: "ABT",
    market: "NYSE",
    ticker: "ABT",
    cik: "0000001800",
    industry: "Healthcare · Medical Devices",
    businessSummary:
      "Abbott Laboratories는 의료기기, 진단, 영양, 의약품 사업을 운영하는 글로벌 헬스케어 기업입니다.",
    keyBusinesses: ["Medical Devices", "Diagnostics", "Nutrition", "Healthcare"],
    officialWebsite: "https://www.abbott.com/",
    irUrl: "https://www.abbottinvestor.com/"
  }),

  createUsCompany({
    slug: "bank-of-america",
    name: "Bank of America",
    shortName: "Bank of America",
    initials: "BAC",
    market: "NYSE",
    ticker: "BAC",
    cik: "0000070858",
    industry: "Banking · Financial Services",
    businessSummary:
      "Bank of America는 소비자금융, 기업금융, 투자은행, 자산관리 서비스를 제공하는 미국 대형 금융회사입니다.",
    keyBusinesses: ["Banking", "Consumer Finance", "Investment Banking", "Wealth Management"],
    officialWebsite: "https://www.bankofamerica.com/",
    irUrl: "https://investor.bankofamerica.com/"
  }),

  createUsCompany({
    slug: "morgan-stanley",
    name: "Morgan Stanley",
    shortName: "Morgan Stanley",
    initials: "MS",
    market: "NYSE",
    ticker: "MS",
    cik: "0000895421",
    industry: "Investment Banking · Wealth Management",
    businessSummary:
      "Morgan Stanley는 투자은행, 자산관리, 기관증권, 투자관리 서비스를 제공하는 글로벌 금융회사입니다.",
    keyBusinesses: ["Investment Banking", "Wealth Management", "Institutional Securities", "Asset Management"],
    officialWebsite: "https://www.morganstanley.com/",
    irUrl: "https://www.morganstanley.com/about-us-ir"
  }),

  createUsCompany({
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    shortName: "Goldman Sachs",
    initials: "GS",
    market: "NYSE",
    ticker: "GS",
    cik: "0000886982",
    industry: "Investment Banking · Financial Services",
    businessSummary:
      "Goldman Sachs는 투자은행, 자산관리, 트레이딩, 소비자금융 서비스를 제공하는 글로벌 금융회사입니다.",
    keyBusinesses: ["Investment Banking", "Trading", "Asset Management", "Financial Services"],
    officialWebsite: "https://www.goldmansachs.com/",
    irUrl: "https://www.goldmansachs.com/investor-relations/"
  }),

  createUsCompany({
    slug: "home-depot",
    name: "Home Depot",
    shortName: "Home Depot",
    initials: "HD",
    market: "NYSE",
    ticker: "HD",
    cik: "0000354950",
    industry: "Home Improvement Retail",
    businessSummary:
      "Home Depot은 건축자재, 주택개선용품, 공구, 정원용품을 판매하는 미국 대표 홈임프루브먼트 유통 기업입니다.",
    keyBusinesses: ["Home Improvement", "Retail", "Building Materials", "Tools", "Garden"],
    officialWebsite: "https://www.homedepot.com/",
    irUrl: "https://ir.homedepot.com/"
  }),

  createUsCompany({
    slug: "procter-and-gamble",
    name: "Procter & Gamble",
    shortName: "P&G",
    initials: "PG",
    market: "NYSE",
    ticker: "PG",
    cik: "0000080424",
    industry: "Consumer Goods",
    businessSummary:
      "Procter & Gamble은 생활용품, 세제, 위생용품, 뷰티, 헬스케어 브랜드를 운영하는 글로벌 소비재 기업입니다.",
    keyBusinesses: ["Consumer Goods", "Beauty", "Grooming", "Healthcare", "Home Care"],
    officialWebsite: "https://www.pg.com/",
    irUrl: "https://www.pginvestor.com/"
  }),

  createUsCompany({
    slug: "starbucks",
    name: "Starbucks",
    shortName: "Starbucks",
    initials: "SBUX",
    market: "NASDAQ",
    ticker: "SBUX",
    cik: "0000829224",
    industry: "Restaurants · Coffee",
    businessSummary:
      "Starbucks는 커피 전문점, 음료, 식품, 리워드 멤버십, 글로벌 매장 네트워크를 운영하는 외식 기업입니다.",
    keyBusinesses: ["Coffee", "Restaurants", "Beverages", "Membership", "Global Stores"],
    officialWebsite: "https://www.starbucks.com/",
    irUrl: "https://investor.starbucks.com/"
  }),

  createUsCompany({
    slug: "lockheed-martin",
    name: "Lockheed Martin",
    shortName: "Lockheed Martin",
    initials: "LMT",
    market: "NYSE",
    ticker: "LMT",
    cik: "0000936468",
    industry: "Aerospace · Defense",
    businessSummary:
      "Lockheed Martin은 항공우주, 방산, 미사일, 우주 시스템, 군용 항공기 사업을 운영하는 미국 대표 방산 기업입니다.",
    keyBusinesses: ["Aerospace", "Defense", "Missiles", "Space Systems", "Military Aircraft"],
    officialWebsite: "https://www.lockheedmartin.com/",
    irUrl: "https://investors.lockheedmartin.com/"
  })

];

export function getUsCompanyBySlug(slug: string) {
  return usCompanies.find((company) => company.slug === slug);
}