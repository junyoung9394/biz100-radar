import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const companiesPath = path.join(rootDir, "data", "companies.ts");

const newCompanies = [
  [
    "woori-financial-group",
    "우리금융지주",
    "WFG",
    "KOSPI",
    "316140",
    "금융지주",
    "우리금융지주는 은행, 카드, 증권, 자산운용 등 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주", "은행", "카드", "자산운용"]
  ],
  [
    "ibk",
    "기업은행",
    "IBK",
    "KOSPI",
    "024110",
    "은행",
    "기업은행은 중소기업 금융, 개인금융, 기업금융 서비스를 제공하는 국책은행입니다.",
    ["은행", "중소기업금융", "기업금융", "개인금융"]
  ],
  [
    "bnk-financial-group",
    "BNK금융지주",
    "BNK",
    "KOSPI",
    "138930",
    "금융지주",
    "BNK금융지주는 부산은행, 경남은행 등 지역 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주", "은행", "지역금융", "자산운용"]
  ],
  [
    "dgb-financial-group",
    "DGB금융지주",
    "DGB",
    "KOSPI",
    "139130",
    "금융지주",
    "DGB금융지주는 대구은행을 중심으로 은행, 증권, 보험 등 금융 사업을 운영하는 금융지주회사입니다.",
    ["금융지주", "은행", "증권", "보험"]
  ],
  [
    "jb-financial-group",
    "JB금융지주",
    "JB",
    "KOSPI",
    "175330",
    "금융지주",
    "JB금융지주는 전북은행, 광주은행 등 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주", "은행", "지역금융", "자산운용"]
  ],
  [
    "hanwha-life",
    "한화생명",
    "HWL",
    "KOSPI",
    "088350",
    "보험",
    "한화생명은 생명보험, 연금, 자산운용, 보장성 보험 사업을 운영하는 보험회사입니다.",
    ["생명보험", "연금", "자산운용", "보장성 보험"]
  ],
  [
    "lotte-non-life-insurance",
    "롯데손해보험",
    "LNI",
    "KOSPI",
    "000400",
    "보험",
    "롯데손해보험은 장기보험, 자동차보험, 일반보험 사업을 운영하는 손해보험사입니다.",
    ["손해보험", "장기보험", "자동차보험", "일반보험"]
  ],
  [
    "dongyang-life",
    "동양생명",
    "DYL",
    "KOSPI",
    "082640",
    "보험",
    "동양생명은 생명보험, 연금, 저축성 보험, 보장성 보험 사업을 운영하는 보험회사입니다.",
    ["생명보험", "연금", "저축성 보험", "보장성 보험"]
  ],
  [
    "hanwha-general-insurance",
    "한화손해보험",
    "HGI",
    "KOSPI",
    "000370",
    "보험",
    "한화손해보험은 자동차보험, 장기보험, 일반보험 등 손해보험 사업을 운영하는 보험회사입니다.",
    ["손해보험", "자동차보험", "장기보험", "일반보험"]
  ],
  [
    "korean-re",
    "코리안리",
    "KRE",
    "KOSPI",
    "003690",
    "재보험",
    "코리안리는 국내외 재보험, 손해보험 재보험, 생명보험 재보험 사업을 운영하는 재보험사입니다.",
    ["재보험", "손해보험", "생명보험", "글로벌 보험"]
  ],
  [
    "hanwha-systems",
    "한화시스템",
    "HWS",
    "KOSPI",
    "272210",
    "방산·ICT",
    "한화시스템은 방산 전자장비, 레이더, 위성통신, ICT 솔루션 사업을 운영하는 기업입니다.",
    ["방산", "레이더", "위성통신", "ICT"]
  ],
  [
    "hyundai-rotem",
    "현대로템",
    "HRT",
    "KOSPI",
    "064350",
    "철도·방산",
    "현대로템은 철도차량, 방산, 플랜트, 수소 인프라 사업을 운영하는 기업입니다.",
    ["철도차량", "방산", "플랜트", "수소"]
  ],
  [
    "snt-motiv",
    "SNT모티브",
    "SNTM",
    "KOSPI",
    "064960",
    "자동차부품·방산",
    "SNT모티브는 자동차 부품, 모터, 방산 부품 사업을 운영하는 제조 기업입니다.",
    ["자동차부품", "모터", "방산", "전장부품"]
  ],
  [
    "hl-mando",
    "HL만도",
    "HLM",
    "KOSPI",
    "204320",
    "자동차부품",
    "HL만도는 제동, 조향, 현가, 자율주행 관련 자동차 부품을 공급하는 기업입니다.",
    ["자동차부품", "제동", "조향", "자율주행"]
  ],
  [
    "sl-corp",
    "에스엘",
    "SL",
    "KOSPI",
    "005850",
    "자동차부품",
    "에스엘은 자동차 램프, 전장부품, 미러 등 자동차 부품을 제조하는 기업입니다.",
    ["자동차 램프", "전장부품", "자동차부품", "모듈"]
  ],
  [
    "hwashin",
    "화신",
    "HWSN",
    "KOSPI",
    "010690",
    "자동차부품",
    "화신은 자동차 샤시, 차체 부품, 전기차 부품을 제조하는 자동차 부품 기업입니다.",
    ["자동차부품", "샤시", "차체부품", "전기차 부품"]
  ],
  [
    "kumho-petrochemical",
    "금호석유화학",
    "KPC",
    "KOSPI",
    "011780",
    "화학",
    "금호석유화학은 합성고무, 합성수지, 정밀화학, 에너지 사업을 운영하는 화학 기업입니다.",
    ["합성고무", "합성수지", "정밀화학", "에너지"]
  ],
  [
    "daehan-synthetic-fiber",
    "대한유화",
    "DYH",
    "KOSPI",
    "006650",
    "화학",
    "대한유화는 기초유분, 합성수지, 석유화학 제품을 생산하는 화학 기업입니다.",
    ["석유화학", "합성수지", "기초유분", "화학소재"]
  ],
  [
    "hyosung-corp",
    "효성",
    "HSC",
    "KOSPI",
    "004800",
    "지주회사·소재",
    "효성은 섬유, 산업자재, 화학, 중공업 계열사를 보유한 지주회사 성격의 기업입니다.",
    ["지주회사", "섬유", "산업자재", "화학"]
  ],
  [
    "oci-holdings",
    "OCI홀딩스",
    "OCI",
    "KOSPI",
    "010060",
    "화학·지주",
    "OCI홀딩스는 화학, 에너지, 소재 계열 사업을 보유한 지주회사입니다.",
    ["화학", "에너지", "소재", "지주회사"]
  ],
  [
    "oci",
    "OCI",
    "OCI",
    "KOSPI",
    "456040",
    "화학·소재",
    "OCI는 반도체·태양광 소재, 화학 제품, 첨단소재 사업을 운영하는 기업입니다.",
    ["화학소재", "반도체 소재", "태양광 소재", "첨단소재"]
  ],
  [
    "kolon-industries",
    "코오롱인더",
    "KOLON",
    "KOSPI",
    "120110",
    "화학·소재",
    "코오롱인더는 산업자재, 화학소재, 필름, 패션 사업을 운영하는 소재 기업입니다.",
    ["산업자재", "화학소재", "필름", "패션"]
  ],
  [
    "pi-advanced-materials",
    "PI첨단소재",
    "PI",
    "KOSPI",
    "178920",
    "첨단소재",
    "PI첨단소재는 폴리이미드 필름과 전자소재를 생산하는 첨단소재 기업입니다.",
    ["폴리이미드", "전자소재", "첨단소재", "필름"]
  ],
  [
    "kcc",
    "KCC",
    "KCC",
    "KOSPI",
    "002380",
    "건자재·소재",
    "KCC는 건축자재, 도료, 실리콘, 소재 사업을 운영하는 기업입니다.",
    ["건축자재", "도료", "실리콘", "소재"]
  ],
  [
    "kcc-glass",
    "KCC글라스",
    "KCCG",
    "KOSPI",
    "344820",
    "유리·건자재",
    "KCC글라스는 건축용 유리, 자동차 유리, 인테리어 자재 사업을 운영하는 기업입니다.",
    ["유리", "건자재", "자동차 유리", "인테리어"]
  ],
  [
    "hansol-chemical",
    "한솔케미칼",
    "HSCHEM",
    "KOSPI",
    "014680",
    "화학·전자재료",
    "한솔케미칼은 반도체·디스플레이용 전자재료와 정밀화학 제품을 공급하는 기업입니다.",
    ["전자재료", "반도체 소재", "디스플레이 소재", "정밀화학"]
  ],
  [
    "hansol-paper",
    "한솔제지",
    "HSP",
    "KOSPI",
    "213500",
    "제지",
    "한솔제지는 인쇄용지, 산업용지, 특수지 등 제지 사업을 운영하는 기업입니다.",
    ["제지", "인쇄용지", "산업용지", "특수지"]
  ],
  [
    "moorim-pnp",
    "무림P&P",
    "MPNP",
    "KOSPI",
    "009580",
    "제지·펄프",
    "무림P&P는 펄프와 제지 제품을 생산하는 제지·펄프 기업입니다.",
    ["펄프", "제지", "인쇄용지", "산업용지"]
  ],
  [
    "s-oil",
    "S-Oil",
    "SOIL",
    "KOSPI",
    "010950",
    "정유",
    "S-Oil은 정유, 석유화학, 윤활기유 사업을 운영하는 에너지 기업입니다.",
    ["정유", "석유화학", "윤활기유", "에너지"]
  ],
  [
    "e1",
    "E1",
    "E1",
    "KOSPI",
    "017940",
    "가스·에너지",
    "E1은 LPG 수입, 저장, 유통과 에너지 관련 사업을 운영하는 기업입니다.",
    ["LPG", "가스", "에너지", "유통"]
  ],
  [
    "sk-gas",
    "SK가스",
    "SKG",
    "KOSPI",
    "018670",
    "가스·에너지",
    "SK가스는 LPG, 가스 발전, 수소·친환경 에너지 사업을 운영하는 에너지 기업입니다.",
    ["LPG", "가스", "수소", "에너지"]
  ],
  [
    "daesung-holdings",
    "대성홀딩스",
    "DSH",
    "KOSPI",
    "016710",
    "에너지·지주",
    "대성홀딩스는 도시가스와 에너지 계열사를 보유한 지주회사입니다.",
    ["도시가스", "에너지", "지주회사", "가스"]
  ],
  [
    "daesang",
    "대상",
    "DS",
    "KOSPI",
    "001680",
    "음식료",
    "대상은 장류, 조미료, 식품소재, 김치 등 식품 사업을 운영하는 음식료 기업입니다.",
    ["식품", "장류", "조미료", "식품소재"]
  ],
  [
    "ottogi",
    "오뚜기",
    "OTG",
    "KOSPI",
    "007310",
    "음식료",
    "오뚜기는 라면, 소스, 즉석식품, 조미식품 등을 제조·판매하는 음식료 기업입니다.",
    ["라면", "즉석식품", "소스", "조미식품"]
  ],
  [
    "hite-jinro",
    "하이트진로",
    "HJ",
    "KOSPI",
    "000080",
    "주류·음료",
    "하이트진로는 맥주, 소주, 음료 등 주류·음료 사업을 운영하는 기업입니다.",
    ["소주", "맥주", "주류", "음료"]
  ],
  [
    "dongwon-fnb",
    "동원F&B",
    "DWF",
    "KOSPI",
    "049770",
    "음식료",
    "동원F&B는 참치캔, 가공식품, 유제품, 식품 브랜드를 운영하는 음식료 기업입니다.",
    ["가공식품", "참치캔", "유제품", "식품"]
  ],
  [
    "dong-suh",
    "동서",
    "DSH",
    "KOSPI",
    "026960",
    "음식료·유통",
    "동서는 식품, 커피, 포장재, 유통 관련 사업을 운영하는 음식료 기업입니다.",
    ["커피", "식품", "포장재", "유통"]
  ],
  [
    "spc-samlip",
    "SPC삼립",
    "SPC",
    "KOSPI",
    "005610",
    "음식료",
    "SPC삼립은 제빵, 식품, 유통, 프랜차이즈 관련 사업을 운영하는 음식료 기업입니다.",
    ["제빵", "식품", "유통", "프랜차이즈"]
  ],
  [
    "binggrae",
    "빙그레",
    "BG",
    "KOSPI",
    "005180",
    "음식료",
    "빙그레는 아이스크림, 유제품, 음료 등 식품 사업을 운영하는 음식료 기업입니다.",
    ["아이스크림", "유제품", "음료", "식품"]
  ],
  [
    "pulmuone",
    "풀무원",
    "PM",
    "KOSPI",
    "017810",
    "음식료",
    "풀무원은 신선식품, 건강식품, 식자재, 푸드서비스 사업을 운영하는 식품 기업입니다.",
    ["신선식품", "건강식품", "푸드서비스", "식자재"]
  ],
  [
    "jw-pharmaceutical",
    "JW중외제약",
    "JW",
    "KOSPI",
    "001060",
    "제약",
    "JW중외제약은 수액, 전문의약품, 항암제, 의료기기 관련 사업을 운영하는 제약 기업입니다.",
    ["수액", "전문의약품", "항암제", "제약"]
  ],
  [
    "ildong-pharmaceutical",
    "일동제약",
    "ILD",
    "KOSPI",
    "249420",
    "제약",
    "일동제약은 전문의약품, 일반의약품, 건강기능식품, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품", "일반의약품", "건강기능식품", "신약 개발"]
  ],
  [
    "dong-a-st",
    "동아에스티",
    "DAST",
    "KOSPI",
    "170900",
    "제약",
    "동아에스티는 전문의약품, 해외 의약품, 바이오시밀러, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품", "신약 개발", "바이오시밀러", "제약"]
  ],
  [
    "ilyang-pharmaceutical",
    "일양약품",
    "IY",
    "KOSPI",
    "007570",
    "제약",
    "일양약품은 전문의약품, 백신, 항암제, 소화기 치료제 사업을 운영하는 제약 기업입니다.",
    ["전문의약품", "백신", "항암제", "제약"]
  ],
  [
    "bukwang-pharmaceutical",
    "부광약품",
    "BKP",
    "KOSPI",
    "003000",
    "제약",
    "부광약품은 전문의약품, 일반의약품, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품", "일반의약품", "신약 개발", "제약"]
  ],
  [
    "dl-holdings",
    "DL",
    "DL",
    "KOSPI",
    "000210",
    "지주회사",
    "DL은 화학, 건설, 에너지 관련 계열사를 보유한 지주회사입니다.",
    ["지주회사", "화학", "건설", "에너지"]
  ],
  [
    "kyeryong-construction",
    "계룡건설",
    "KRC",
    "KOSPI",
    "013580",
    "건설",
    "계룡건설은 주택, 토목, 건축, 공공공사 사업을 운영하는 종합건설사입니다.",
    ["건설", "주택", "토목", "건축"]
  ],
  [
    "hanshin-construction",
    "한신공영",
    "HSCON",
    "KOSPI",
    "004960",
    "건설",
    "한신공영은 주택, 토목, 건축, 개발 사업을 운영하는 종합건설사입니다.",
    ["건설", "주택", "토목", "개발"]
  ],
  [
    "is-dongseo",
    "아이에스동서",
    "ISD",
    "KOSPI",
    "010780",
    "건설·환경",
    "아이에스동서는 건설, 콘크리트, 환경, 폐기물 처리 사업을 운영하는 기업입니다.",
    ["건설", "콘크리트", "환경", "폐기물 처리"]
  ],
  [
    "hj-shipbuilding",
    "HJ중공업",
    "HJ",
    "KOSPI",
    "097230",
    "조선·건설",
    "HJ중공업은 조선, 건설, 플랜트 사업을 운영하는 제조·건설 기업입니다.",
    ["조선", "건설", "플랜트", "선박"]
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

  console.log(`KOSPI 2차 신규 기업 ${filteredCompanies.length}개 추가 완료`);

  return updatedSource;
}

const source = fs.readFileSync(companiesPath, "utf-8");
const updatedSource = insertCompanies(source, newCompanies);

fs.writeFileSync(companiesPath, updatedSource, "utf-8");