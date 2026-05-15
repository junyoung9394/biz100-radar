import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const companiesPath = path.join(rootDir, "data", "companies.ts");

const newCompanies = [
  [
    "posco-holdings",
    "POSCO홀딩스",
    "POSCO",
    "KOSPI",
    "005490",
    "철강·지주",
    "POSCO홀딩스는 철강, 2차전지 소재, 친환경 인프라, 에너지 관련 사업을 보유한 지주회사입니다.",
    ["철강", "2차전지 소재", "에너지", "친환경 인프라"]
  ],
  [
    "sk-telecom",
    "SK텔레콤",
    "SKT",
    "KOSPI",
    "017670",
    "통신",
    "SK텔레콤은 이동통신, 5G, AI, 데이터센터, 구독 서비스 사업을 운영하는 통신 기업입니다.",
    ["이동통신", "5G", "AI", "데이터센터"]
  ],
  [
    "kt-corporation",
    "KT",
    "KT",
    "KOSPI",
    "030200",
    "통신",
    "KT는 유무선 통신, 인터넷, IPTV, 클라우드, AI·DX 서비스를 제공하는 통신 기업입니다.",
    ["유무선 통신", "IPTV", "클라우드", "AI·DX"]
  ],
  [
    "lg-corp",
    "LG",
    "LG",
    "KOSPI",
    "003550",
    "지주회사",
    "LG는 전자, 화학, 통신, 생활건강 등 계열사를 보유한 지주회사입니다.",
    ["지주회사", "전자", "화학", "통신"]
  ],
  [
    "sk-inc",
    "SK",
    "SK",
    "KOSPI",
    "034730",
    "지주회사",
    "SK는 에너지, 반도체, 통신, 바이오, 소재 계열사를 보유한 지주회사입니다.",
    ["지주회사", "에너지", "반도체", "바이오"]
  ],
  [
    "ls-corp",
    "LS",
    "LS",
    "KOSPI",
    "006260",
    "지주회사·전력인프라",
    "LS는 전선, 전력기기, 소재, 에너지 인프라 계열사를 보유한 지주회사입니다.",
    ["전선", "전력기기", "에너지 인프라", "소재"]
  ],
  [
    "ls-electric",
    "LS ELECTRIC",
    "LSE",
    "KOSPI",
    "010120",
    "전력기기",
    "LS ELECTRIC은 전력기기, 자동화, 스마트그리드, 에너지 솔루션을 제공하는 기업입니다.",
    ["전력기기", "자동화", "스마트그리드", "에너지 솔루션"]
  ],
  [
    "samsung-cnt",
    "삼성물산",
    "SCNT",
    "KOSPI",
    "028260",
    "상사·건설·패션",
    "삼성물산은 건설, 상사, 패션, 리조트, 바이오 투자 사업을 운영하는 복합 기업입니다.",
    ["건설", "상사", "패션", "리조트"]
  ],
  [
    "samsung-life",
    "삼성생명",
    "SLI",
    "KOSPI",
    "032830",
    "보험",
    "삼성생명은 생명보험, 자산운용, 연금, 보장성 보험 사업을 운영하는 보험회사입니다.",
    ["생명보험", "자산운용", "연금", "보장성 보험"]
  ],
  [
    "samsung-fire-marine",
    "삼성화재",
    "SFM",
    "KOSPI",
    "000810",
    "보험",
    "삼성화재는 자동차보험, 장기보험, 일반보험, 자산운용 사업을 운영하는 손해보험사입니다.",
    ["손해보험", "자동차보험", "장기보험", "자산운용"]
  ],
  [
    "samsung-sds",
    "삼성SDS",
    "SDS",
    "KOSPI",
    "018260",
    "IT서비스",
    "삼성SDS는 클라우드, 물류IT, 시스템통합, AI·데이터 기반 IT 서비스를 제공하는 기업입니다.",
    ["클라우드", "IT서비스", "물류IT", "AI"]
  ],
  [
    "samsung-electro-mechanics",
    "삼성전기",
    "SEM",
    "KOSPI",
    "009150",
    "전자부품",
    "삼성전기는 MLCC, 카메라모듈, 반도체 패키지기판 등 전자부품을 제조하는 기업입니다.",
    ["MLCC", "카메라모듈", "패키지기판", "전자부품"]
  ],
  [
    "skc",
    "SKC",
    "SKC",
    "KOSPI",
    "011790",
    "소재",
    "SKC는 2차전지 소재, 반도체 소재, 화학 소재 사업을 운영하는 소재 기업입니다.",
    ["2차전지 소재", "반도체 소재", "화학 소재", "동박"]
  ],
  [
    "sk-biopharmaceuticals",
    "SK바이오팜",
    "SKBP",
    "KOSPI",
    "326030",
    "제약·바이오",
    "SK바이오팜은 중추신경계 질환 치료제와 신약 개발 사업을 운영하는 제약·바이오 기업입니다.",
    ["신약 개발", "중추신경계", "제약", "바이오"]
  ],
  [
    "sk-iet",
    "SK아이이테크놀로지",
    "SKIET",
    "KOSPI",
    "361610",
    "2차전지 소재",
    "SK아이이테크놀로지는 2차전지 분리막과 정보전자 소재 사업을 운영하는 소재 기업입니다.",
    ["분리막", "2차전지 소재", "정보전자소재", "배터리"]
  ],
  [
    "hyundai-steel",
    "현대제철",
    "HYS",
    "KOSPI",
    "004020",
    "철강",
    "현대제철은 자동차강판, 봉형강, 후판, 특수강 등 철강 제품을 생산하는 기업입니다.",
    ["자동차강판", "봉형강", "후판", "특수강"]
  ],
  [
    "korea-zinc",
    "고려아연",
    "KZ",
    "KOSPI",
    "010130",
    "비철금속",
    "고려아연은 아연, 연, 금, 은 등 비철금속 제련과 소재 사업을 운영하는 기업입니다.",
    ["아연", "비철금속", "제련", "소재"]
  ],
  [
    "poongsan",
    "풍산",
    "PS",
    "KOSPI",
    "103140",
    "비철금속·방산",
    "풍산은 동 제품, 신동 소재, 방산 탄약 사업을 운영하는 소재·방산 기업입니다.",
    ["동 소재", "비철금속", "방산", "탄약"]
  ],
  [
    "seah-beststeel",
    "세아베스틸지주",
    "SEAH",
    "KOSPI",
    "001430",
    "철강",
    "세아베스틸지주는 특수강, 자동차·기계용 철강 소재 계열사를 보유한 철강 지주회사입니다.",
    ["특수강", "철강 소재", "지주회사", "자동차 소재"]
  ],
  [
    "mirae-asset-securities",
    "미래에셋증권",
    "MAS",
    "KOSPI",
    "006800",
    "증권",
    "미래에셋증권은 주식중개, 자산관리, 투자은행, 글로벌 브로커리지 사업을 운영하는 증권사입니다.",
    ["증권", "자산관리", "투자은행", "글로벌 브로커리지"]
  ],
  [
    "korea-investment-holdings",
    "한국금융지주",
    "KIH",
    "KOSPI",
    "071050",
    "금융지주",
    "한국금융지주는 증권, 자산운용, 저축은행 등 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주", "증권", "자산운용", "저축은행"]
  ],
  [
    "meritz-financial",
    "메리츠금융지주",
    "MF",
    "KOSPI",
    "138040",
    "금융지주",
    "메리츠금융지주는 보험, 증권 등 메리츠 계열 금융사를 보유한 금융지주회사입니다.",
    ["금융지주", "보험", "증권", "자산운용"]
  ],
  [
    "samsung-securities",
    "삼성증권",
    "SS",
    "KOSPI",
    "016360",
    "증권",
    "삼성증권은 자산관리, 브로커리지, 투자은행, 금융상품 판매 사업을 운영하는 증권사입니다.",
    ["증권", "자산관리", "투자은행", "금융상품"]
  ],
  [
    "nh-investment-securities",
    "NH투자증권",
    "NHI",
    "KOSPI",
    "005940",
    "증권",
    "NH투자증권은 주식중개, 자산관리, 투자은행, 기관영업 사업을 운영하는 증권사입니다.",
    ["증권", "자산관리", "투자은행", "기관영업"]
  ],
  [
    "daishin-securities",
    "대신증권",
    "DS",
    "KOSPI",
    "003540",
    "증권",
    "대신증권은 브로커리지, 자산관리, 투자은행, 금융상품 서비스를 제공하는 증권사입니다.",
    ["증권", "브로커리지", "자산관리", "투자은행"]
  ],
  [
    "lotte-holdings",
    "롯데지주",
    "LOTTE",
    "KOSPI",
    "004990",
    "지주회사",
    "롯데지주는 식품, 유통, 화학, 호텔 등 롯데 계열사를 보유한 지주회사입니다.",
    ["지주회사", "식품", "유통", "화학"]
  ],
  [
    "lotte-shopping",
    "롯데쇼핑",
    "LSH",
    "KOSPI",
    "023530",
    "유통",
    "롯데쇼핑은 백화점, 마트, 슈퍼, 이커머스 등 유통 사업을 운영하는 기업입니다.",
    ["백화점", "마트", "유통", "이커머스"]
  ],
  [
    "lotte-wellfood",
    "롯데웰푸드",
    "LWF",
    "KOSPI",
    "280360",
    "음식료",
    "롯데웰푸드는 제과, 빙과, 식품, 간편식 등 식품 사업을 운영하는 기업입니다.",
    ["제과", "빙과", "식품", "간편식"]
  ],
  [
    "lotte-chilsung",
    "롯데칠성",
    "LCS",
    "KOSPI",
    "005300",
    "음료",
    "롯데칠성은 음료, 생수, 커피, 주류 등 식음료 사업을 운영하는 기업입니다.",
    ["음료", "생수", "커피", "주류"]
  ],
  [
    "orion",
    "오리온",
    "ORION",
    "KOSPI",
    "271560",
    "음식료",
    "오리온은 과자, 스낵, 식품 브랜드를 국내외에서 운영하는 음식료 기업입니다.",
    ["제과", "스낵", "식품", "글로벌 브랜드"]
  ],
  [
    "nongshim",
    "농심",
    "NS",
    "KOSPI",
    "004370",
    "음식료",
    "농심은 라면, 스낵, 음료 등 식품 브랜드를 제조·판매하는 음식료 기업입니다.",
    ["라면", "스낵", "식품", "음료"]
  ],
  [
    "samyang-foods",
    "삼양식품",
    "SYF",
    "KOSPI",
    "003230",
    "음식료",
    "삼양식품은 라면, 스낵, 소스 등 식품을 제조·판매하는 음식료 기업입니다.",
    ["라면", "불닭 브랜드", "스낵", "식품"]
  ],
  [
    "bgf-retail",
    "BGF리테일",
    "BGF",
    "KOSPI",
    "282330",
    "편의점·유통",
    "BGF리테일은 CU 편의점 프랜차이즈와 유통 사업을 운영하는 기업입니다.",
    ["편의점", "CU", "유통", "프랜차이즈"]
  ],
  [
    "gs-retail",
    "GS리테일",
    "GSR",
    "KOSPI",
    "007070",
    "유통",
    "GS리테일은 편의점, 슈퍼마켓, 홈쇼핑, 온라인 유통 사업을 운영하는 유통 기업입니다.",
    ["편의점", "슈퍼마켓", "홈쇼핑", "온라인 유통"]
  ],
  [
    "shinsegae",
    "신세계",
    "SSG",
    "KOSPI",
    "004170",
    "유통",
    "신세계는 백화점, 면세점, 유통·소비재 사업을 운영하는 기업입니다.",
    ["백화점", "면세점", "유통", "소비재"]
  ],
  [
    "yuhan",
    "유한양행",
    "YH",
    "KOSPI",
    "000100",
    "제약",
    "유한양행은 전문의약품, 일반의약품, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품", "일반의약품", "신약 개발", "제약"]
  ],
  [
    "chongkundang",
    "종근당",
    "CKD",
    "KOSPI",
    "185750",
    "제약",
    "종근당은 전문의약품, 개량신약, 바이오의약품 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품", "개량신약", "제약", "바이오의약품"]
  ],
  [
    "daewoong-pharmaceutical",
    "대웅제약",
    "DWP",
    "KOSPI",
    "069620",
    "제약",
    "대웅제약은 전문의약품, 보툴리눔 톡신, 헬스케어 제품을 개발·판매하는 제약 기업입니다.",
    ["전문의약품", "보툴리눔 톡신", "헬스케어", "제약"]
  ],
  [
    "daewoong",
    "대웅",
    "DW",
    "KOSPI",
    "003090",
    "지주회사·제약",
    "대웅은 제약과 헬스케어 계열사를 보유한 지주회사 성격의 기업입니다.",
    ["지주회사", "제약", "헬스케어", "바이오"]
  ],
  [
    "boryung",
    "보령",
    "BR",
    "KOSPI",
    "003850",
    "제약",
    "보령은 전문의약품, 항암제, 고혈압 치료제 등 제약 사업을 운영하는 기업입니다.",
    ["전문의약품", "항암제", "고혈압 치료제", "제약"]
  ],
  [
    "hanall-biopharma",
    "한올바이오파마",
    "HBP",
    "KOSPI",
    "009420",
    "제약·바이오",
    "한올바이오파마는 자가면역질환, 안구질환 등 바이오 신약을 개발하는 제약·바이오 기업입니다.",
    ["바이오신약", "자가면역질환", "안구질환", "제약"]
  ],
  [
    "daewoo-engineering-construction",
    "대우건설",
    "DWEC",
    "KOSPI",
    "047040",
    "건설",
    "대우건설은 주택, 토목, 플랜트, 해외 건설 사업을 운영하는 종합건설사입니다.",
    ["건설", "주택", "토목", "플랜트"]
  ],
  [
    "hdc-hyundai-development",
    "HDC현대산업개발",
    "HDC",
    "KOSPI",
    "294870",
    "건설",
    "HDC현대산업개발은 주택 개발, 도시개발, 건축, 인프라 사업을 운영하는 건설사입니다.",
    ["주택개발", "건설", "도시개발", "인프라"]
  ],
  [
    "hanmi-global",
    "한미글로벌",
    "HMG",
    "KOSPI",
    "053690",
    "건설관리",
    "한미글로벌은 건설사업관리, 프로젝트 관리, 부동산 개발관리 서비스를 제공하는 기업입니다.",
    ["건설사업관리", "프로젝트 관리", "부동산 개발", "CM"]
  ],
  [
    "kepco-plant-service",
    "한전KPS",
    "KPS",
    "KOSPI",
    "051600",
    "발전정비",
    "한전KPS는 발전설비 정비, 플랜트 유지보수, 에너지 설비 서비스를 제공하는 기업입니다.",
    ["발전정비", "플랜트 유지보수", "에너지 설비", "정비 서비스"]
  ],
  [
    "kepco-engineering-construction",
    "한전기술",
    "KEPCOEC",
    "KOSPI",
    "052690",
    "전력·엔지니어링",
    "한전기술은 발전소 설계, 원전·화력 엔지니어링, 에너지 설비 기술 서비스를 제공하는 기업입니다.",
    ["발전소 설계", "원전 엔지니어링", "전력 기술", "에너지 설비"]
  ],
  [
    "korea-district-heating",
    "지역난방공사",
    "KDHC",
    "KOSPI",
    "071320",
    "에너지",
    "지역난방공사는 집단에너지, 지역난방, 전력 판매 사업을 운영하는 에너지 공기업입니다.",
    ["지역난방", "집단에너지", "전력", "에너지"]
  ],
  [
    "jeju-air",
    "제주항공",
    "JJA",
    "KOSPI",
    "089590",
    "항공",
    "제주항공은 국내외 여객 운송과 저비용 항공 서비스를 제공하는 항공사입니다.",
    ["항공", "저비용항공", "여객 운송", "여행"]
  ],
  [
    "jin-air",
    "진에어",
    "JIN",
    "KOSPI",
    "272450",
    "항공",
    "진에어는 국내외 여객 노선을 운영하는 저비용 항공사입니다.",
    ["항공", "저비용항공", "여객 운송", "여행"]
  ],
  [
    "youngone",
    "영원무역",
    "YNG",
    "KOSPI",
    "111770",
    "의류·OEM",
    "영원무역은 아웃도어·스포츠 의류 OEM과 글로벌 생산 사업을 운영하는 의류 기업입니다.",
    ["의류 OEM", "스포츠 의류", "글로벌 생산", "아웃도어"]
  ],
  [
    "handsome",
    "한섬",
    "HANS",
    "KOSPI",
    "020000",
    "패션",
    "한섬은 패션 브랜드, 의류 유통, 라이프스타일 사업을 운영하는 패션 기업입니다.",
    ["패션", "의류 브랜드", "유통", "라이프스타일"]
  ]
];

function toTuple(company) {
  const [
    slug,
    name,
    initials,
    market,
    ticker,
    industry,
    businessSummary,
    keyBusinesses
  ] = company;

  return `  [
    "${slug}",
    "${name}",
    "${initials}",
    "${market}",
    "${ticker}",
    "${industry}",
    "${businessSummary}",
    ${JSON.stringify(keyBusinesses)}
  ]`;
}

function getExistingSlugs(source) {
  const rawBlockMatch = source.match(
    /const rawCompanies:\s*RawCompany\[\]\s*=\s*\[([\s\S]*?)\];/
  );

  if (!rawBlockMatch) {
    throw new Error("rawCompanies 배열을 찾지 못했습니다.");
  }

  const blockBody = rawBlockMatch[1];
  const slugRegex = /\[\s*"([^"]+)"/g;
  const slugs = new Set();
  let match;

  while ((match = slugRegex.exec(blockBody)) !== null) {
    slugs.add(match[1]);
  }

  return slugs;
}

function insertCompanies(source, companiesToInsert) {
  const rawBlockRegex =
    /const rawCompanies:\s*RawCompany\[\]\s*=\s*\[([\s\S]*?)\];/;
  const match = source.match(rawBlockRegex);

  if (!match) {
    throw new Error("rawCompanies 배열을 찾지 못했습니다.");
  }

  const existingSlugs = getExistingSlugs(source);
  const filteredCompanies = companiesToInsert.filter(
    (company) => !existingSlugs.has(company[0])
  );

  if (filteredCompanies.length === 0) {
    console.log("추가할 신규 기업이 없습니다. 모두 이미 존재합니다.");
    return source;
  }

  const insertText = filteredCompanies.map(toTuple).join(",\n");

  const updatedSource = source.replace(rawBlockRegex, (fullMatch, body) => {
    const trimmedBody = body.trimEnd();
    const needsComma =
      trimmedBody.trim().length > 0 && !trimmedBody.trim().endsWith(",");

    return `const rawCompanies: RawCompany[] = [
${trimmedBody}${needsComma ? "," : ""}
${insertText}
];`;
  });

  console.log(`KOSPI 1차 신규 기업 ${filteredCompanies.length}개 추가 완료`);

  return updatedSource;
}

const source = fs.readFileSync(companiesPath, "utf-8");
const updatedSource = insertCompanies(source, newCompanies);

fs.writeFileSync(companiesPath, updatedSource, "utf-8");