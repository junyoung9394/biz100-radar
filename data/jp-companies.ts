export type JpCompany = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  country: "JP";
  market: string;
  ticker: string;
  industry: string;
  businessSummary: string;
  keyBusinesses: string[];
  officialWebsite: string;
  irUrl: string;
  edinetSearchUrl: string;
  sourceNote: string;
  updatedAt: string;
};

function makeEdinetSearchUrl() {
  return "https://disclosure2.edinet-fsa.go.jp/WEEK0010.aspx";
}

function createJpCompany(
  company: Omit<
    JpCompany,
    "country" | "edinetSearchUrl" | "sourceNote" | "updatedAt"
  >
): JpCompany {
  return {
    ...company,
    country: "JP",
    edinetSearchUrl: makeEdinetSearchUrl(),
    sourceNote:
      "초기 일본 기업 MVP 데이터입니다. EDINET 공시와 재무정보는 다음 단계에서 자동 연동할 예정입니다.",
    updatedAt: "2026-05-14"
  };
}

export const jpCompanies: JpCompany[] = [
  createJpCompany({
    slug: "toyota",
    name: "Toyota Motor",
    shortName: "Toyota",
    initials: "TM",
    market: "TSE Prime",
    ticker: "7203",
    industry: "Automobiles",
    businessSummary:
      "Toyota Motor는 자동차, 하이브리드, 전기차, 수소차, 금융 서비스를 중심으로 사업을 운영하는 일본 대표 자동차 기업입니다.",
    keyBusinesses: ["Automobiles", "Hybrid Vehicles", "EV", "Hydrogen", "Financial Services"],
    officialWebsite: "https://global.toyota/",
    irUrl: "https://global.toyota/en/ir/"
  }),

  createJpCompany({
    slug: "sony-group",
    name: "Sony Group",
    shortName: "Sony",
    initials: "SONY",
    market: "TSE Prime",
    ticker: "6758",
    industry: "Electronics · Entertainment",
    businessSummary:
      "Sony Group은 게임, 음악, 영화, 이미지센서, 전자제품, 금융 사업을 운영하는 글로벌 엔터테인먼트·기술 기업입니다.",
    keyBusinesses: ["Gaming", "Music", "Pictures", "Image Sensors", "Electronics"],
    officialWebsite: "https://www.sony.com/",
    irUrl: "https://www.sony.com/en/SonyInfo/IR/"
  }),

  createJpCompany({
    slug: "nintendo",
    name: "Nintendo",
    shortName: "Nintendo",
    initials: "NTDOY",
    market: "TSE Prime",
    ticker: "7974",
    industry: "Gaming · Entertainment",
    businessSummary:
      "Nintendo는 콘솔 게임기, 게임 소프트웨어, 캐릭터 IP, 디지털 콘텐츠 사업을 운영하는 일본 대표 게임 기업입니다.",
    keyBusinesses: ["Game Consoles", "Game Software", "IP", "Digital Content"],
    officialWebsite: "https://www.nintendo.co.jp/",
    irUrl: "https://www.nintendo.co.jp/ir/en/"
  }),

  createJpCompany({
    slug: "softbank-group",
    name: "SoftBank Group",
    shortName: "SoftBank Group",
    initials: "SBG",
    market: "TSE Prime",
    ticker: "9984",
    industry: "Investment · Technology",
    businessSummary:
      "SoftBank Group은 통신, 기술 투자, 비전펀드, AI·반도체 관련 투자 포트폴리오를 보유한 일본의 대표 투자 지주회사입니다.",
    keyBusinesses: ["Investment", "Vision Fund", "Telecom", "AI", "Technology"],
    officialWebsite: "https://group.softbank/",
    irUrl: "https://group.softbank/en/ir/"
  }),

  createJpCompany({
    slug: "mitsubishi-ufj-financial-group",
    name: "Mitsubishi UFJ Financial Group",
    shortName: "MUFG",
    initials: "MUFG",
    market: "TSE Prime",
    ticker: "8306",
    industry: "Banking · Financial Services",
    businessSummary:
      "Mitsubishi UFJ Financial Group은 은행, 신탁, 증권, 카드, 자산관리 등 금융 서비스를 제공하는 일본 대표 금융그룹입니다.",
    keyBusinesses: ["Banking", "Trust Banking", "Securities", "Asset Management"],
    officialWebsite: "https://www.mufg.jp/english/",
    irUrl: "https://www.mufg.jp/english/ir/"
  }),

  createJpCompany({
    slug: "sumitomo-mitsui-financial-group",
    name: "Sumitomo Mitsui Financial Group",
    shortName: "SMFG",
    initials: "SMFG",
    market: "TSE Prime",
    ticker: "8316",
    industry: "Banking · Financial Services",
    businessSummary:
      "Sumitomo Mitsui Financial Group은 은행, 리스, 증권, 카드, 자산관리 사업을 운영하는 일본 대형 금융그룹입니다.",
    keyBusinesses: ["Banking", "Securities", "Leasing", "Cards", "Asset Management"],
    officialWebsite: "https://www.smfg.co.jp/english/",
    irUrl: "https://www.smfg.co.jp/english/investor/"
  }),

  createJpCompany({
    slug: "mizuho-financial-group",
    name: "Mizuho Financial Group",
    shortName: "Mizuho",
    initials: "MFG",
    market: "TSE Prime",
    ticker: "8411",
    industry: "Banking · Financial Services",
    businessSummary:
      "Mizuho Financial Group은 은행, 신탁, 증권, 자산관리 서비스를 제공하는 일본 주요 금융그룹입니다.",
    keyBusinesses: ["Banking", "Trust", "Securities", "Asset Management"],
    officialWebsite: "https://www.mizuho-fg.com/",
    irUrl: "https://www.mizuho-fg.com/investors/"
  }),

  createJpCompany({
    slug: "hitachi",
    name: "Hitachi",
    shortName: "Hitachi",
    initials: "HTCH",
    market: "TSE Prime",
    ticker: "6501",
    industry: "Industrial · IT Infrastructure",
    businessSummary:
      "Hitachi는 디지털 시스템, 에너지, 산업, 모빌리티, 사회 인프라 사업을 운영하는 일본 대형 산업·IT 기업입니다.",
    keyBusinesses: ["Digital Systems", "Energy", "Industry", "Mobility", "Infrastructure"],
    officialWebsite: "https://www.hitachi.com/",
    irUrl: "https://www.hitachi.com/IR-e/"
  }),

  createJpCompany({
    slug: "keyence",
    name: "Keyence",
    shortName: "Keyence",
    initials: "KEY",
    market: "TSE Prime",
    ticker: "6861",
    industry: "Factory Automation",
    businessSummary:
      "Keyence는 센서, 측정기, 머신비전, 자동화 장비 등 공장 자동화 솔루션을 제공하는 일본 기술 기업입니다.",
    keyBusinesses: ["Sensors", "Machine Vision", "Measurement", "Factory Automation"],
    officialWebsite: "https://www.keyence.com/",
    irUrl: "https://www.keyence.com/ir/"
  }),

  createJpCompany({
    slug: "tokyo-electron",
    name: "Tokyo Electron",
    shortName: "Tokyo Electron",
    initials: "TEL",
    market: "TSE Prime",
    ticker: "8035",
    industry: "Semiconductor Equipment",
    businessSummary:
      "Tokyo Electron은 반도체 제조 장비와 디스플레이 제조 장비를 공급하는 일본 대표 반도체 장비 기업입니다.",
    keyBusinesses: ["Semiconductor Equipment", "Display Equipment", "Wafer Processing"],
    officialWebsite: "https://www.tel.com/",
    irUrl: "https://www.tel.com/ir/"
  }),

  createJpCompany({
    slug: "shin-etsu-chemical",
    name: "Shin-Etsu Chemical",
    shortName: "Shin-Etsu",
    initials: "SEC",
    market: "TSE Prime",
    ticker: "4063",
    industry: "Chemicals · Semiconductor Materials",
    businessSummary:
      "Shin-Etsu Chemical은 PVC, 실리콘, 반도체 실리콘 웨이퍼 등 화학·소재 사업을 운영하는 일본 소재 기업입니다.",
    keyBusinesses: ["PVC", "Silicones", "Semiconductor Wafers", "Chemicals"],
    officialWebsite: "https://www.shinetsu.co.jp/en/",
    irUrl: "https://www.shinetsu.co.jp/en/ir/"
  }),

  createJpCompany({
    slug: "mitsubishi-corporation",
    name: "Mitsubishi Corporation",
    shortName: "Mitsubishi Corp",
    initials: "MC",
    market: "TSE Prime",
    ticker: "8058",
    industry: "Trading · Investment",
    businessSummary:
      "Mitsubishi Corporation은 에너지, 금속, 식품, 자동차, 인프라, 금융 등 다양한 사업을 운영하는 일본 종합상사입니다.",
    keyBusinesses: ["Trading", "Energy", "Metals", "Food", "Infrastructure"],
    officialWebsite: "https://www.mitsubishicorp.com/",
    irUrl: "https://www.mitsubishicorp.com/jp/en/ir/"
  }),

  createJpCompany({
    slug: "mitsui-and-co",
    name: "Mitsui & Co.",
    shortName: "Mitsui",
    initials: "MITS",
    market: "TSE Prime",
    ticker: "8031",
    industry: "Trading · Investment",
    businessSummary:
      "Mitsui & Co.는 에너지, 금속, 화학, 식품, 인프라, 헬스케어 등 글로벌 사업을 운영하는 일본 종합상사입니다.",
    keyBusinesses: ["Trading", "Energy", "Metals", "Chemicals", "Infrastructure"],
    officialWebsite: "https://www.mitsui.com/",
    irUrl: "https://www.mitsui.com/jp/en/ir/"
  }),

  createJpCompany({
    slug: "itochu",
    name: "ITOCHU",
    shortName: "ITOCHU",
    initials: "ITC",
    market: "TSE Prime",
    ticker: "8001",
    industry: "Trading · Consumer Business",
    businessSummary:
      "ITOCHU는 섬유, 식품, 금속, 에너지, 기계, ICT, 금융 등 다양한 사업을 운영하는 일본 종합상사입니다.",
    keyBusinesses: ["Trading", "Textiles", "Food", "ICT", "Finance"],
    officialWebsite: "https://www.itochu.co.jp/en/",
    irUrl: "https://www.itochu.co.jp/en/ir/"
  }),

  createJpCompany({
    slug: "honda",
    name: "Honda Motor",
    shortName: "Honda",
    initials: "HMC",
    market: "TSE Prime",
    ticker: "7267",
    industry: "Automobiles · Motorcycles",
    businessSummary:
      "Honda Motor는 자동차, 오토바이, 파워프로덕트, 항공기 관련 사업을 운영하는 일본 모빌리티 기업입니다.",
    keyBusinesses: ["Automobiles", "Motorcycles", "Power Products", "Aircraft"],
    officialWebsite: "https://global.honda/",
    irUrl: "https://global.honda/en/investors/"
  }),

  createJpCompany({
    slug: "nissan",
    name: "Nissan Motor",
    shortName: "Nissan",
    initials: "NSAN",
    market: "TSE Prime",
    ticker: "7201",
    industry: "Automobiles",
    businessSummary:
      "Nissan Motor는 승용차, 전기차, 상용차, 글로벌 자동차 판매 사업을 운영하는 일본 자동차 기업입니다.",
    keyBusinesses: ["Automobiles", "EV", "Commercial Vehicles", "Global Sales"],
    officialWebsite: "https://www.nissan-global.com/",
    irUrl: "https://www.nissan-global.com/EN/IR/"
  }),

  createJpCompany({
    slug: "denso",
    name: "Denso",
    shortName: "Denso",
    initials: "DENS",
    market: "TSE Prime",
    ticker: "6902",
    industry: "Auto Parts",
    businessSummary:
      "Denso는 자동차 전장, 열관리, 파워트레인, 모빌리티 전자부품을 공급하는 일본 자동차 부품 기업입니다.",
    keyBusinesses: ["Auto Parts", "Thermal Systems", "Electrification", "Mobility Electronics"],
    officialWebsite: "https://www.denso.com/global/en/",
    irUrl: "https://www.denso.com/global/en/about-us/investors/"
  }),

  createJpCompany({
    slug: "fast-retailing",
    name: "Fast Retailing",
    shortName: "Fast Retailing",
    initials: "FR",
    market: "TSE Prime",
    ticker: "9983",
    industry: "Apparel · Retail",
    businessSummary:
      "Fast Retailing은 UNIQLO, GU 등 의류 브랜드를 운영하는 일본 대표 패션·유통 기업입니다.",
    keyBusinesses: ["UNIQLO", "GU", "Apparel", "Retail", "Global Brands"],
    officialWebsite: "https://www.fastretailing.com/",
    irUrl: "https://www.fastretailing.com/eng/ir/"
  }),

  createJpCompany({
    slug: "seven-and-i",
    name: "Seven & i Holdings",
    shortName: "Seven & i",
    initials: "7I",
    market: "TSE Prime",
    ticker: "3382",
    industry: "Retail · Convenience Stores",
    businessSummary:
      "Seven & i Holdings는 편의점, 슈퍼마켓, 전문점, 금융 서비스를 운영하는 일본 유통 기업입니다.",
    keyBusinesses: ["Convenience Stores", "Supermarkets", "Retail", "Financial Services"],
    officialWebsite: "https://www.7andi.com/en/",
    irUrl: "https://www.7andi.com/en/ir.html"
  }),

  createJpCompany({
    slug: "recruit-holdings",
    name: "Recruit Holdings",
    shortName: "Recruit",
    initials: "RCT",
    market: "TSE Prime",
    ticker: "6098",
    industry: "HR Technology · Media",
    businessSummary:
      "Recruit Holdings는 HR 기술, 채용 플랫폼, 마케팅 솔루션, 인재 서비스 사업을 운영하는 일본 플랫폼 기업입니다.",
    keyBusinesses: ["HR Technology", "Recruiting", "Marketing Solutions", "Staffing"],
    officialWebsite: "https://recruit-holdings.com/en/",
    irUrl: "https://recruit-holdings.com/en/ir/"
  }),

  createJpCompany({
    slug: "takeda",
    name: "Takeda Pharmaceutical",
    shortName: "Takeda",
    initials: "TAK",
    market: "TSE Prime",
    ticker: "4502",
    industry: "Pharmaceuticals",
    businessSummary:
      "Takeda Pharmaceutical은 전문의약품, 희귀질환, 항암, 소화기, 백신 관련 사업을 운영하는 일본 제약 기업입니다.",
    keyBusinesses: ["Pharmaceuticals", "Oncology", "Rare Diseases", "Vaccines"],
    officialWebsite: "https://www.takeda.com/",
    irUrl: "https://www.takeda.com/investors/"
  }),

  createJpCompany({
    slug: "daiichi-sankyo",
    name: "Daiichi Sankyo",
    shortName: "Daiichi Sankyo",
    initials: "DS",
    market: "TSE Prime",
    ticker: "4568",
    industry: "Pharmaceuticals",
    businessSummary:
      "Daiichi Sankyo는 항암제, 전문의약품, 백신, 글로벌 제약 연구개발 사업을 운영하는 일본 제약 기업입니다.",
    keyBusinesses: ["Pharmaceuticals", "Oncology", "R&D", "Vaccines"],
    officialWebsite: "https://www.daiichisankyo.com/",
    irUrl: "https://www.daiichisankyo.com/investors/"
  }),

  createJpCompany({
    slug: "murata-manufacturing",
    name: "Murata Manufacturing",
    shortName: "Murata",
    initials: "MUR",
    market: "TSE Prime",
    ticker: "6981",
    industry: "Electronic Components",
    businessSummary:
      "Murata Manufacturing은 MLCC, 센서, 통신모듈, 전자부품을 공급하는 일본 대표 전자부품 기업입니다.",
    keyBusinesses: ["MLCC", "Sensors", "Communication Modules", "Electronic Components"],
    officialWebsite: "https://www.murata.com/",
    irUrl: "https://corporate.murata.com/en-global/ir"
  }),

  createJpCompany({
    slug: "tdk",
    name: "TDK",
    shortName: "TDK",
    initials: "TDK",
    market: "TSE Prime",
    ticker: "6762",
    industry: "Electronic Components",
    businessSummary:
      "TDK는 전자부품, 센서, 배터리, 자기소재 관련 사업을 운영하는 일본 전자부품 기업입니다.",
    keyBusinesses: ["Electronic Components", "Sensors", "Batteries", "Magnetic Materials"],
    officialWebsite: "https://www.tdk.com/en/",
    irUrl: "https://www.tdk.com/en/ir/"
  }),

  createJpCompany({
    slug: "daikin",
    name: "Daikin Industries",
    shortName: "Daikin",
    initials: "DKN",
    market: "TSE Prime",
    ticker: "6367",
    industry: "Air Conditioning · Chemicals",
    businessSummary:
      "Daikin Industries는 에어컨, 공조시스템, 냉동, 화학 사업을 운영하는 일본 공조·소재 기업입니다.",
    keyBusinesses: ["Air Conditioning", "HVAC", "Refrigeration", "Chemicals"],
    officialWebsite: "https://www.daikin.com/",
    irUrl: "https://www.daikin.com/investor"
  }),

  createJpCompany({
    slug: "fanuc",
    name: "FANUC",
    shortName: "FANUC",
    initials: "FNC",
    market: "TSE Prime",
    ticker: "6954",
    industry: "Robotics · Factory Automation",
    businessSummary:
      "FANUC은 산업용 로봇, CNC, 공장 자동화 장비를 공급하는 일본 자동화·로봇 기업입니다.",
    keyBusinesses: ["Robotics", "CNC", "Factory Automation", "Industrial Machinery"],
    officialWebsite: "https://www.fanuc.co.jp/en/",
    irUrl: "https://www.fanuc.co.jp/en/ir/"
  }),

  createJpCompany({
    slug: "komatsu",
    name: "Komatsu",
    shortName: "Komatsu",
    initials: "KMT",
    market: "TSE Prime",
    ticker: "6301",
    industry: "Construction Machinery",
    businessSummary:
      "Komatsu는 건설기계, 광산장비, 산업기계, 스마트 건설 솔루션을 제공하는 일본 기계 기업입니다.",
    keyBusinesses: ["Construction Machinery", "Mining Equipment", "Industrial Machinery"],
    officialWebsite: "https://www.komatsu.jp/en/",
    irUrl: "https://www.komatsu.jp/en/ir/"
  }),

  createJpCompany({
    slug: "canon",
    name: "Canon",
    shortName: "Canon",
    initials: "CAJ",
    market: "TSE Prime",
    ticker: "7751",
    industry: "Imaging · Office Equipment",
    businessSummary:
      "Canon은 카메라, 프린터, 의료기기, 산업장비, 이미징 솔루션 사업을 운영하는 일본 전자 기업입니다.",
    keyBusinesses: ["Cameras", "Printers", "Medical Systems", "Imaging", "Industrial Equipment"],
    officialWebsite: "https://global.canon/",
    irUrl: "https://global.canon/en/ir/"
  }),

  createJpCompany({
    slug: "panasonic",
    name: "Panasonic Holdings",
    shortName: "Panasonic",
    initials: "PCRFY",
    market: "TSE Prime",
    ticker: "6752",
    industry: "Electronics · Batteries",
    businessSummary:
      "Panasonic Holdings는 가전, 전장, 배터리, 주거·에너지 솔루션 사업을 운영하는 일본 전자 기업입니다.",
    keyBusinesses: ["Electronics", "Batteries", "Automotive", "Energy", "Housing"],
    officialWebsite: "https://holdings.panasonic/global/",
    irUrl: "https://holdings.panasonic/global/corporate/investors.html"
  }),

  createJpCompany({
    slug: "nec",
    name: "NEC",
    shortName: "NEC",
    initials: "NEC",
    market: "TSE Prime",
    ticker: "6701",
    industry: "IT Services · Infrastructure",
    businessSummary:
      "NEC는 IT 서비스, 네트워크, 공공 인프라, 보안, 디지털 정부 솔루션을 제공하는 일본 IT 기업입니다.",
    keyBusinesses: ["IT Services", "Networks", "Security", "Public Infrastructure"],
    officialWebsite: "https://www.nec.com/",
    irUrl: "https://www.nec.com/en/global/ir/"
  }),

  createJpCompany({
    slug: "fujitsu",
    name: "Fujitsu",
    shortName: "Fujitsu",
    initials: "FJTSY",
    market: "TSE Prime",
    ticker: "6702",
    industry: "IT Services",
    businessSummary:
      "Fujitsu는 IT 서비스, 클라우드, 디지털 전환, 시스템 통합 사업을 운영하는 일본 대표 IT 서비스 기업입니다.",
    keyBusinesses: ["IT Services", "Cloud", "DX", "System Integration"],
    officialWebsite: "https://www.fujitsu.com/global/",
    irUrl: "https://www.fujitsu.com/global/about/ir/"
  })
];

export function getJpCompanyBySlug(slug: string) {
  return jpCompanies.find((company) => company.slug === slug);
}