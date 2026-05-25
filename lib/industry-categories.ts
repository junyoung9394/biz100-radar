export type IndustryCategory = {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  searchTitle: string;
  industryKeywords: string[];
};

export const industryCategories: IndustryCategory[] = [
  {
    slug: "semiconductor",
    name: "반도체",
    nameEn: "Semiconductor",
    description: "반도체 설계·제조·장비·부품·소재 기업",
    searchTitle: "반도체 기업 목록",
    industryKeywords: [
      "전자 · 반도체",
      "반도체",
      "반도체 장비",
      "반도체 부품",
      "반도체 파운드리",
      "반도체 소재",
      "반도체 · 디스플레이 소재"
    ]
  },
  {
    slug: "battery",
    name: "2차전지 · 배터리",
    nameEn: "Battery",
    description: "배터리 셀·소재·장비 및 전기차 부품 기업",
    searchTitle: "2차전지 배터리 기업 목록",
    industryKeywords: [
      "2차전지",
      "2차전지 · 전자재료",
      "2차전지 소재",
      "2차전지 · 지주회사",
      "2차전지 소재 · 필름",
      "에너지 · 배터리"
    ]
  },
  {
    slug: "auto",
    name: "자동차",
    nameEn: "Automotive",
    description: "완성차·자동차 부품·모빌리티 기업",
    searchTitle: "자동차 기업 목록",
    industryKeywords: ["자동차", "자동차 부품"]
  },
  {
    slug: "pharma-bio",
    name: "제약 · 바이오",
    nameEn: "Pharma & Bio",
    description: "신약개발·바이오시밀러·CDMO·진단·백신 기업",
    searchTitle: "제약 바이오 기업 목록",
    industryKeywords: [
      "제약",
      "제약 · 백신",
      "바이오 · 제약",
      "바이오 · 의약품 위탁생산",
      "바이오 · 백신",
      "바이오 · 신약",
      "바이오 · 플랫폼 기술",
      "바이오 · 헬스케어",
      "진단 · 바이오"
    ]
  },
  {
    slug: "finance",
    name: "금융",
    nameEn: "Finance",
    description: "은행·증권·보험·핀테크·인터넷은행 기업",
    searchTitle: "금융 기업 목록",
    industryKeywords: [
      "금융지주",
      "보험",
      "증권",
      "인터넷은행",
      "핀테크"
    ]
  },
  {
    slug: "energy",
    name: "에너지 · 정유",
    nameEn: "Energy",
    description: "정유·가스·전력·신재생에너지 기업",
    searchTitle: "에너지 정유 기업 목록",
    industryKeywords: [
      "에너지 · 플랜트",
      "전력 · 유틸리티",
      "가스 · 에너지",
      "정유 · 화학",
      "지주회사 · 에너지",
      "지주회사 · 조선 · 에너지",
      "상사 · 에너지"
    ]
  },
  {
    slug: "it-platform",
    name: "IT · 플랫폼",
    nameEn: "IT & Platform",
    description: "인터넷·플랫폼·클라우드·IT서비스·통신 기업",
    searchTitle: "IT 플랫폼 기업 목록",
    industryKeywords: [
      "인터넷 · 플랫폼",
      "IT 서비스",
      "IT 서비스 · 물류",
      "통신"
    ]
  },
  {
    slug: "shipbuilding",
    name: "조선 · 해양",
    nameEn: "Shipbuilding",
    description: "선박·해양플랜트·특수선 건조 기업",
    searchTitle: "조선 기업 목록",
    industryKeywords: ["조선", "조선 · 해양", "조선 · 방산"]
  },
  {
    slug: "defense",
    name: "방산 · 항공우주",
    nameEn: "Defense & Aerospace",
    description: "방위산업·항공기·무기체계·우주 기업",
    searchTitle: "방산 항공우주 기업 목록",
    industryKeywords: ["방산", "방산 · 항공우주", "항공 · 방산", "항공 · 방산", "철도·방산"]
  },
  {
    slug: "chemical-material",
    name: "화학 · 소재",
    nameEn: "Chemical & Material",
    description: "석유화학·첨단소재·철강·섬유 기업",
    searchTitle: "화학 소재 기업 목록",
    industryKeywords: [
      "화학",
      "화학 · 소재",
      "화학 · 태양광",
      "철강 · 소재",
      "첨단소재",
      "섬유 · 화학",
      "전자부품"
    ]
  },
  {
    slug: "construction",
    name: "건설 · 엔지니어링",
    nameEn: "Construction",
    description: "종합건설·플랜트·엔지니어링 기업",
    searchTitle: "건설 기업 목록",
    industryKeywords: ["건설", "건설 · 상사 · 패션", "플랜트 · 엔지니어링"]
  },
  {
    slug: "entertainment",
    name: "엔터 · 게임 · 미디어",
    nameEn: "Entertainment & Game",
    description: "K-pop·게임·방송·콘텐츠 기업",
    searchTitle: "엔터테인먼트 게임 기업 목록",
    industryKeywords: ["엔터테인먼트", "게임", "미디어 · 콘텐츠"]
  },
  {
    slug: "retail-consumer",
    name: "유통 · 소비재",
    nameEn: "Retail & Consumer",
    description: "백화점·대형마트·화장품·식품·패션 기업",
    searchTitle: "유통 소비재 기업 목록",
    industryKeywords: [
      "유통",
      "유통 · 백화점",
      "유통 · 대형마트",
      "식품",
      "식품 · 바이오",
      "화장품 · 소비재",
      "화장품 · 생활용품",
      "렌탈 · 생활가전",
      "패션",
      "담배 · 건강기능식품",
      "음식료",
      "음식료·유통"
    ]
  },
  {
    slug: "logistics-transport",
    name: "물류 · 운송",
    nameEn: "Logistics & Transport",
    description: "택배·해운·항공·여행·호텔 기업",
    searchTitle: "물류 운송 기업 목록",
    industryKeywords: [
      "물류 · 해운",
      "물류 · 택배",
      "해운",
      "항공",
      "호텔 · 면세점",
      "카지노 · 관광"
    ]
  },
  {
    slug: "power-infra",
    name: "전력 · 인프라",
    nameEn: "Power & Infrastructure",
    description: "전력기기·전선·변압기·에너지 인프라 기업",
    searchTitle: "전력 인프라 기업 목록",
    industryKeywords: [
      "전력기기 · 자동화",
      "전선 · 전력 인프라",
      "전력기기 · 건설",
      "지주회사 · 전선 · 전력",
      "전력 · 엔지니어링"
    ]
  }
];

export function getCategoryBySlug(slug: string): IndustryCategory | undefined {
  return industryCategories.find((c) => c.slug === slug);
}

export function getCategoryForIndustry(industry: string): IndustryCategory | undefined {
  return industryCategories.find((c) =>
    c.industryKeywords.some(
      (kw) => kw.toLowerCase() === industry.toLowerCase()
    )
  );
}
