export type JpCompany = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  country: "JP";
  market: string;
  ticker: string;
  cik?: string;
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
      "일본 기업 데이터입니다. SEC 20-F 제출 기업은 재무정보가 자동 연동됩니다.",
    updatedAt: "2026-05-23"
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
    cik: "0000096831",
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
    cik: "0000313838",
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
    cik: "0001276747",
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
    cik: "0001301236",
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
    cik: "0001276520",
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
    cik: "0000799641",
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
    cik: "0000091902",
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
    cik: "0000080548",
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
    cik: "0001673514",
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
    cik: "0000098002",
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
    cik: "0000055529",
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
    cik: "0000205527",
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
    cik: "0000075388",
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
  }),

  createJpCompany({
    slug: "ntt",
    name: "Nippon Telegraph and Telephone",
    shortName: "NTT",
    initials: "NTT",
    market: "TSE Prime",
    ticker: "9432",
    cik: "0001025771",
    industry: "Telecommunications · IT Services",
    businessSummary:
      "NTT(Nippon Telegraph and Telephone)는 유무선 통신, 데이터센터, 클라우드, IT 서비스 사업을 운영하는 일본 최대 통신 그룹입니다.",
    keyBusinesses: ["Telecom", "Data Centers", "Cloud", "IT Services", "5G"],
    officialWebsite: "https://www.ntt.com/en/",
    irUrl: "https://www.ntt.com/en/ir.html"
  }),

  createJpCompany({
    slug: "kddi",
    name: "KDDI",
    shortName: "KDDI",
    initials: "KDDI",
    market: "TSE Prime",
    ticker: "9433",
    industry: "Telecommunications",
    businessSummary:
      "KDDI는 이동통신(au), 광대역, 법인 솔루션, 금융, 에너지 등 복합 통신 서비스를 제공하는 일본 이동통신 기업입니다.",
    keyBusinesses: ["Mobile (au)", "Broadband", "Enterprise Solutions", "Financial Services"],
    officialWebsite: "https://www.kddi.com/english/",
    irUrl: "https://www.kddi.com/english/corporate/ir/"
  }),

  createJpCompany({
    slug: "softbank-corp",
    name: "SoftBank Corp.",
    shortName: "SoftBank",
    initials: "SBC",
    market: "TSE Prime",
    ticker: "9434",
    industry: "Telecommunications",
    businessSummary:
      "SoftBank Corp.는 이동통신, 인터넷, 기업 솔루션, AI 관련 서비스를 제공하는 일본 이동통신 기업입니다.",
    keyBusinesses: ["Mobile", "Internet", "Enterprise", "AI Services"],
    officialWebsite: "https://www.softbank.jp/en/",
    irUrl: "https://www.softbank.jp/en/ir/"
  }),

  createJpCompany({
    slug: "nomura-holdings",
    name: "Nomura Holdings",
    shortName: "Nomura",
    initials: "NMR",
    market: "TSE Prime",
    ticker: "8604",
    cik: "0001163389",
    industry: "Securities · Investment Banking",
    businessSummary:
      "Nomura Holdings는 증권중개, 투자은행, 자산관리, 리서치 서비스를 제공하는 일본 최대 종합 증권 금융그룹입니다.",
    keyBusinesses: ["Securities", "Investment Banking", "Asset Management", "Research"],
    officialWebsite: "https://www.nomura.com/",
    irUrl: "https://www.nomura.com/investors/"
  }),

  createJpCompany({
    slug: "japan-exchange-group",
    name: "Japan Exchange Group",
    shortName: "JPX",
    initials: "JPX",
    market: "TSE Prime",
    ticker: "8697",
    industry: "Stock Exchange · Financial Infrastructure",
    businessSummary:
      "Japan Exchange Group은 도쿄증권거래소, 오사카거래소 등을 운영하는 일본 대표 금융 거래소 그룹입니다.",
    keyBusinesses: ["Stock Exchange", "Derivatives Market", "Clearing", "Financial Infrastructure"],
    officialWebsite: "https://www.jpx.co.jp/english/",
    irUrl: "https://www.jpx.co.jp/english/corporate/ir/"
  }),

  createJpCompany({
    slug: "tokio-marine",
    name: "Tokio Marine Holdings",
    shortName: "Tokio Marine",
    initials: "TMH",
    market: "TSE Prime",
    ticker: "8766",
    industry: "Insurance",
    businessSummary:
      "Tokio Marine Holdings는 손해보험, 생명보험, 국제보험 사업을 운영하는 일본 최대 보험그룹입니다.",
    keyBusinesses: ["Non-life Insurance", "Life Insurance", "International Insurance"],
    officialWebsite: "https://www.tokiomarinehd.com/en/",
    irUrl: "https://www.tokiomarinehd.com/en/ir/"
  }),

  createJpCompany({
    slug: "ms-and-ad",
    name: "MS&AD Insurance Group",
    shortName: "MS&AD",
    initials: "MSAD",
    market: "TSE Prime",
    ticker: "8725",
    industry: "Insurance",
    businessSummary:
      "MS&AD Insurance Group은 손해보험, 생명보험, 해외 보험 사업을 운영하는 일본 대형 보험그룹입니다.",
    keyBusinesses: ["Non-life Insurance", "Life Insurance", "International"],
    officialWebsite: "https://www.ms-ad-hd.com/en/",
    irUrl: "https://www.ms-ad-hd.com/en/ir/"
  }),

  createJpCompany({
    slug: "aeon",
    name: "Aeon",
    shortName: "Aeon",
    initials: "AON",
    market: "TSE Prime",
    ticker: "8267",
    industry: "Retail · Shopping Malls",
    businessSummary:
      "Aeon은 슈퍼마켓, 쇼핑몰, 편의점, 금융, 부동산 사업을 운영하는 일본 최대 종합 유통 기업입니다.",
    keyBusinesses: ["Supermarkets", "Shopping Malls", "Financial Services", "Convenience Stores"],
    officialWebsite: "https://www.aeon.info/en/",
    irUrl: "https://www.aeon.info/en/ir/"
  }),

  createJpCompany({
    slug: "ryohin-keikaku",
    name: "Ryohin Keikaku",
    shortName: "MUJI",
    initials: "MUJI",
    market: "TSE Prime",
    ticker: "7453",
    industry: "Retail · Lifestyle",
    businessSummary:
      "Ryohin Keikaku는 MUJI 브랜드로 의류, 생활용품, 식품, 인테리어 제품을 국내외에서 운영하는 라이프스타일 유통 기업입니다.",
    keyBusinesses: ["MUJI", "Apparel", "Household Goods", "Food", "Furniture"],
    officialWebsite: "https://ryohin-keikaku.jp/eng/",
    irUrl: "https://ryohin-keikaku.jp/eng/ir/"
  }),

  createJpCompany({
    slug: "asahi-group",
    name: "Asahi Group Holdings",
    shortName: "Asahi",
    initials: "ASH",
    market: "TSE Prime",
    ticker: "2502",
    industry: "Beverages",
    businessSummary:
      "Asahi Group Holdings는 맥주, 청량음료, 주류, 식품 브랜드를 국내외에서 운영하는 일본 대표 음료 기업입니다.",
    keyBusinesses: ["Beer", "Soft Drinks", "Alcoholic Beverages", "Food"],
    officialWebsite: "https://www.asahigroup-holdings.com/en/",
    irUrl: "https://www.asahigroup-holdings.com/en/ir/"
  }),

  createJpCompany({
    slug: "kirin-holdings",
    name: "Kirin Holdings",
    shortName: "Kirin",
    initials: "KIRI",
    market: "TSE Prime",
    ticker: "2503",
    industry: "Beverages · Pharmaceuticals",
    businessSummary:
      "Kirin Holdings는 맥주, 음료, 건강식품, 바이오제약 사업을 운영하는 일본 종합 음료·헬스사이언스 기업입니다.",
    keyBusinesses: ["Beer", "Beverages", "Health Science", "Pharmaceuticals"],
    officialWebsite: "https://www.kirinholdings.com/en/",
    irUrl: "https://www.kirinholdings.com/en/ir/"
  }),

  createJpCompany({
    slug: "ajinomoto",
    name: "Ajinomoto",
    shortName: "Ajinomoto",
    initials: "AJI",
    market: "TSE Prime",
    ticker: "2802",
    industry: "Food · Amino Acids",
    businessSummary:
      "Ajinomoto는 조미료, 가공식품, 냉동식품, 아미노산, 의약품 원료 사업을 운영하는 일본 식품·바이오 기업입니다.",
    keyBusinesses: ["Seasonings", "Frozen Foods", "Amino Acids", "Pharmaceuticals"],
    officialWebsite: "https://www.ajinomoto.com/",
    irUrl: "https://www.ajinomoto.com/ir/"
  }),

  createJpCompany({
    slug: "nissin-foods",
    name: "Nissin Foods Holdings",
    shortName: "Nissin Foods",
    initials: "NSN",
    market: "TSE Prime",
    ticker: "2897",
    industry: "Food",
    businessSummary:
      "Nissin Foods Holdings는 인스턴트 라면, 냉동식품, 스낵 등 식품 브랜드를 글로벌로 운영하는 일본 식품 기업입니다.",
    keyBusinesses: ["Instant Noodles", "Frozen Foods", "Snacks", "Global Brands"],
    officialWebsite: "https://www.nissin.com/en_jp/",
    irUrl: "https://www.nissin.com/en_jp/ir/"
  }),

  createJpCompany({
    slug: "sumitomo-corporation",
    name: "Sumitomo Corporation",
    shortName: "Sumitomo Corp",
    initials: "SCC",
    market: "TSE Prime",
    ticker: "8053",
    industry: "Trading · Investment",
    businessSummary:
      "Sumitomo Corporation은 금속, 교통, 인프라, 미디어, 리테일, 에너지, 화학, 식품 등 다양한 사업을 운영하는 일본 종합상사입니다.",
    keyBusinesses: ["Trading", "Metals", "Infrastructure", "Energy", "Retail"],
    officialWebsite: "https://www.sumitomocorp.com/en/",
    irUrl: "https://www.sumitomocorp.com/en/ir/"
  }),

  createJpCompany({
    slug: "marubeni",
    name: "Marubeni Corporation",
    shortName: "Marubeni",
    initials: "MRB",
    market: "TSE Prime",
    ticker: "8002",
    industry: "Trading · Investment",
    businessSummary:
      "Marubeni Corporation은 곡물, 에너지, 화학, 인프라, 금융, 섬유 등 다양한 사업을 운영하는 일본 종합상사입니다.",
    keyBusinesses: ["Trading", "Grains", "Energy", "Infrastructure", "Textiles"],
    officialWebsite: "https://www.marubeni.com/en/",
    irUrl: "https://www.marubeni.com/en/ir/"
  }),

  createJpCompany({
    slug: "mazda",
    name: "Mazda Motor",
    shortName: "Mazda",
    initials: "MZDA",
    market: "TSE Prime",
    ticker: "7261",
    cik: "0000096831",
    industry: "Automobiles",
    businessSummary:
      "Mazda Motor는 승용차, SUV, 전기차, 고효율 엔진 기술을 중심으로 글로벌 자동차 사업을 운영하는 일본 자동차 기업입니다.",
    keyBusinesses: ["Automobiles", "SUV", "EV", "Engine Technology"],
    officialWebsite: "https://www.mazda.com/en/",
    irUrl: "https://www.mazda.com/en/investors/"
  }),

  createJpCompany({
    slug: "subaru",
    name: "Subaru Corporation",
    shortName: "Subaru",
    initials: "SBRU",
    market: "TSE Prime",
    ticker: "7270",
    industry: "Automobiles",
    businessSummary:
      "Subaru Corporation은 사륜구동 SUV, 승용차, 항공우주, 방산 관련 사업을 운영하는 일본 자동차·항공우주 기업입니다.",
    keyBusinesses: ["Automobiles", "AWD", "SUV", "Aerospace"],
    officialWebsite: "https://www.subaru.co.jp/en/",
    irUrl: "https://www.subaru.co.jp/en/ir/"
  }),

  createJpCompany({
    slug: "nidec",
    name: "Nidec Corporation",
    shortName: "Nidec",
    initials: "NIDC",
    market: "TSE Prime",
    ticker: "6594",
    cik: "0000906709",
    industry: "Motors · Precision Components",
    businessSummary:
      "Nidec Corporation은 소형 모터, 전기차용 구동 시스템, 산업용 로봇, 정밀 부품을 공급하는 일본 전자부품 기업입니다.",
    keyBusinesses: ["Small Motors", "EV Drives", "Industrial Robots", "Precision Components"],
    officialWebsite: "https://www.nidec.com/en-global/",
    irUrl: "https://www.nidec.com/en-global/ir/"
  }),

  createJpCompany({
    slug: "renesas-electronics",
    name: "Renesas Electronics",
    shortName: "Renesas",
    initials: "RNS",
    market: "TSE Prime",
    ticker: "6723",
    industry: "Semiconductors · Microcontrollers",
    businessSummary:
      "Renesas Electronics는 자동차용 마이크로컨트롤러, 산업·IoT용 반도체를 개발·판매하는 일본 반도체 기업입니다.",
    keyBusinesses: ["Automotive MCU", "Industrial", "IoT", "Microcontrollers"],
    officialWebsite: "https://www.renesas.com/",
    irUrl: "https://www.renesas.com/us/en/about/investor-relations"
  }),

  createJpCompany({
    slug: "kyocera",
    name: "Kyocera Corporation",
    shortName: "Kyocera",
    initials: "KYO",
    market: "TSE Prime",
    ticker: "6971",
    cik: "0000055529",
    industry: "Electronic Components · Ceramics",
    businessSummary:
      "Kyocera Corporation은 세라믹 부품, 전자부품, 태양광, 통신 기기, 프린터, 의료기기 사업을 운영하는 일본 기술 기업입니다.",
    keyBusinesses: ["Ceramic Components", "Electronic Parts", "Solar", "Printers"],
    officialWebsite: "https://global.kyocera.com/",
    irUrl: "https://global.kyocera.com/ir/"
  }),

  createJpCompany({
    slug: "toray-industries",
    name: "Toray Industries",
    shortName: "Toray",
    initials: "TRY",
    market: "TSE Prime",
    ticker: "3402",
    industry: "Advanced Materials · Textiles",
    businessSummary:
      "Toray Industries는 탄소섬유, 합성섬유, 수지, 화학, 환경·엔지니어링 관련 첨단소재 사업을 운영하는 일본 소재 기업입니다.",
    keyBusinesses: ["Carbon Fiber", "Synthetic Fiber", "Resins", "Chemicals", "Advanced Materials"],
    officialWebsite: "https://www.toray.com/",
    irUrl: "https://www.toray.com/ir/"
  }),

  createJpCompany({
    slug: "asahi-kasei",
    name: "Asahi Kasei",
    shortName: "Asahi Kasei",
    initials: "AKS",
    market: "TSE Prime",
    ticker: "3407",
    industry: "Chemicals · Healthcare · Housing",
    businessSummary:
      "Asahi Kasei는 화학, 주택, 헬스케어, 배터리 분리막 등 다양한 소재·생활 사업을 운영하는 일본 종합 화학 기업입니다.",
    keyBusinesses: ["Chemicals", "Housing", "Healthcare", "Battery Separators"],
    officialWebsite: "https://www.asahi-kasei.com/en/",
    irUrl: "https://www.asahi-kasei.com/en/ir/"
  }),

  createJpCompany({
    slug: "nitto-denko",
    name: "Nitto Denko",
    shortName: "Nitto",
    initials: "NIT",
    market: "TSE Prime",
    ticker: "6988",
    industry: "Specialty Materials",
    businessSummary:
      "Nitto Denko는 광학필름, 반도체 소재, 수처리막, 전자부품 관련 기능성 소재를 공급하는 일본 특수소재 기업입니다.",
    keyBusinesses: ["Optical Films", "Semiconductor Materials", "Water Treatment", "Electronic Materials"],
    officialWebsite: "https://www.nitto.com/",
    irUrl: "https://www.nitto.com/jp/en/ir/"
  }),

  createJpCompany({
    slug: "astellas-pharma",
    name: "Astellas Pharma",
    shortName: "Astellas",
    initials: "AST",
    market: "TSE Prime",
    ticker: "4503",
    cik: "0001382840",
    industry: "Pharmaceuticals",
    businessSummary:
      "Astellas Pharma는 비뇨기, 항암, 이식·면역, 신경계 분야 전문의약품을 개발·판매하는 일본 제약 기업입니다.",
    keyBusinesses: ["Pharmaceuticals", "Oncology", "Urology", "Transplant", "Neuroscience"],
    officialWebsite: "https://www.astellas.com/en/",
    irUrl: "https://www.astellas.com/en/ir/"
  }),

  createJpCompany({
    slug: "chugai-pharmaceutical",
    name: "Chugai Pharmaceutical",
    shortName: "Chugai",
    initials: "CGI",
    market: "TSE Prime",
    ticker: "4519",
    industry: "Pharmaceuticals · Biotechnology",
    businessSummary:
      "Chugai Pharmaceutical은 항암, 희귀질환, 면역질환 분야 바이오의약품을 개발하는 일본 제약·바이오 기업입니다. Roche 그룹 계열사입니다.",
    keyBusinesses: ["Oncology", "Rare Diseases", "Immunology", "Biopharmaceuticals"],
    officialWebsite: "https://www.chugai-pharm.co.jp/english/",
    irUrl: "https://www.chugai-pharm.co.jp/english/ir/"
  }),

  createJpCompany({
    slug: "eisai",
    name: "Eisai",
    shortName: "Eisai",
    initials: "ESAI",
    market: "TSE Prime",
    ticker: "4523",
    industry: "Pharmaceuticals",
    businessSummary:
      "Eisai는 신경계, 항암, 소화기 분야 의약품을 개발·판매하는 일본 제약 기업으로, 알츠하이머 치료제 연구로 주목받고 있습니다.",
    keyBusinesses: ["Neurology", "Oncology", "Gastrointestinal", "Alzheimer's"],
    officialWebsite: "https://www.eisai.com/",
    irUrl: "https://www.eisai.com/ir/"
  }),

  createJpCompany({
    slug: "olympus",
    name: "Olympus Corporation",
    shortName: "Olympus",
    initials: "OLY",
    market: "TSE Prime",
    ticker: "7733",
    cik: "0000074564",
    industry: "Medical Devices · Optics",
    businessSummary:
      "Olympus Corporation은 내시경, 수술기기, 치료기기 등 의료기기 사업을 중심으로 운영하는 일본 정밀 기술 기업입니다.",
    keyBusinesses: ["Endoscopes", "Surgical Devices", "Therapeutic Devices", "Medical Imaging"],
    officialWebsite: "https://www.olympus-global.com/",
    irUrl: "https://www.olympus-global.com/ir/"
  }),

  createJpCompany({
    slug: "shimadzu",
    name: "Shimadzu Corporation",
    shortName: "Shimadzu",
    initials: "SHMD",
    market: "TSE Prime",
    ticker: "7701",
    industry: "Analytical Instruments · Medical Equipment",
    businessSummary:
      "Shimadzu Corporation은 분석계측기, 의료기기, 항공·산업기기, 환경측정장비를 공급하는 일본 정밀기기 기업입니다.",
    keyBusinesses: ["Analytical Instruments", "Medical Devices", "Industrial Machinery"],
    officialWebsite: "https://www.shimadzu.com/",
    irUrl: "https://www.shimadzu.com/ir/"
  }),

  createJpCompany({
    slug: "hoya",
    name: "Hoya Corporation",
    shortName: "Hoya",
    initials: "HOYA",
    market: "TSE Prime",
    ticker: "7741",
    industry: "Optics · Medical Devices",
    businessSummary:
      "Hoya Corporation은 광학유리, 반도체 포토마스크, 의료용 안경렌즈, 내시경 사업을 운영하는 일본 광학·의료 기업입니다.",
    keyBusinesses: ["Optical Glass", "Photomasks", "Eyeglass Lenses", "Medical Optics"],
    officialWebsite: "https://www.hoya.com/",
    irUrl: "https://www.hoya.com/en/ir/"
  }),

  createJpCompany({
    slug: "shiseido",
    name: "Shiseido",
    shortName: "Shiseido",
    initials: "SHSD",
    market: "TSE Prime",
    ticker: "4911",
    industry: "Cosmetics · Beauty",
    businessSummary:
      "Shiseido는 스킨케어, 메이크업, 프레스티지 뷰티 브랜드를 글로벌로 운영하는 일본 대표 화장품 기업입니다.",
    keyBusinesses: ["Skincare", "Makeup", "Fragrance", "Prestige Beauty"],
    officialWebsite: "https://corp.shiseido.com/en/",
    irUrl: "https://corp.shiseido.com/en/ir/"
  }),

  createJpCompany({
    slug: "disco",
    name: "Disco Corporation",
    shortName: "Disco",
    initials: "DISC",
    market: "TSE Prime",
    ticker: "6146",
    industry: "Semiconductor Equipment",
    businessSummary:
      "Disco Corporation은 반도체 웨이퍼 절삭·연삭·연마 장비를 공급하는 일본 반도체 가공 장비 전문 기업입니다.",
    keyBusinesses: ["Dicing Equipment", "Grinding", "Polishing", "Semiconductor Equipment"],
    officialWebsite: "https://www.disco.co.jp/eg/",
    irUrl: "https://www.disco.co.jp/eg/ir/"
  }),

  createJpCompany({
    slug: "advantest",
    name: "Advantest",
    shortName: "Advantest",
    initials: "ADTS",
    market: "TSE Prime",
    ticker: "6857",
    industry: "Semiconductor Testing Equipment",
    businessSummary:
      "Advantest는 반도체 테스트 장비, 메모리 테스터, SoC 테스터를 공급하는 일본 반도체 검사 장비 기업입니다.",
    keyBusinesses: ["Semiconductor Test", "Memory Testers", "SoC Testers", "AI Chip Testing"],
    officialWebsite: "https://www.advantest.com/",
    irUrl: "https://www.advantest.com/investors/"
  }),

  createJpCompany({
    slug: "ntt-data",
    name: "NTT DATA Group",
    shortName: "NTT DATA",
    initials: "NTTD",
    market: "TSE Prime",
    ticker: "9613",
    industry: "IT Services · Systems Integration",
    businessSummary:
      "NTT DATA Group은 시스템 통합, 클라우드, 디지털 전환, 컨설팅 서비스를 글로벌로 제공하는 IT 서비스 기업입니다.",
    keyBusinesses: ["System Integration", "Cloud", "DX", "Consulting"],
    officialWebsite: "https://www.nttdata.com/global/en/",
    irUrl: "https://www.nttdata.com/global/en/ir/"
  })
];

export function getJpCompanyBySlug(slug: string) {
  return jpCompanies.find((company) => company.slug === slug);
}