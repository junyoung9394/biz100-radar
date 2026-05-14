export type Company = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  country: "KR" | "US" | "JP";
  market: string;
  ticker: string;
  industry: string;
  businessSummary: string;
  keyBusinesses: string[];
  dartSearchUrl: string;
  officialWebsite?: string;
  irUrl?: string;
  identifiers: {
    ticker?: string;
    stockCode?: string;
    dartCorpCode?: string;
    isin?: string;
    cik?: string;
    edinetCode?: string;
  };
  apiStatus: {
    dartReady: boolean;
    financialReady: boolean;
    disclosureReady: boolean;
  };
  latestSignals: string[];
  sourceNote: string;
  updatedAt: string;
};

type RawCompany = [
  slug: string,
  name: string,
  initials: string,
  market: string,
  ticker: string,
  industry: string,
  businessSummary: string,
  keyBusinesses: string[]
];

function makeDartSearchUrl(companyName: string) {
  return `https://dart.fss.or.kr/dsab007/main.do?option=corp&textCrpNm=${encodeURIComponent(companyName)}`;
}

const companyDartCorpCodes: Record<string, string> = {
  "alteogen": "00989619",
  "amorepacific": "00583424",
  "asiana-airlines": "00138792",
  "celltrion": "00413046",
  "cj": "00148540",
  "cj-cheiljedang": "00635134",
  "cj-enm": "00265324",
  "cj-logistics": "00113410",
  "cosmo-advanced-materials": "00129989",
  "coway": "00170558",
  "daou-technology": "00176914",
  "db-hi-tek": "00160843",
  "db-insurance": "00159102",
  "dl-enc": "01524093",
  "dongjin-semiconductor": "00118804",
  "doosan-enerbility": "00159616",
  "ecopro": "00536541",
  "ecopro-bm": "01160363",
  "emart": "00872984",
  "fandf": "01568413",
  "green-cross": "00129679",
  "gs-engineering-construction": "00120030",
  "gs-holdings": "00500254",
  "hana-financial-group": "00547583",
  "hanmi-pharm": "00828497",
  "hanmi-semiconductor": "00161383",
  "hanwha": "00160588",
  "hanwha-aerospace": "00126566",
  "hanwha-ocean": "00111704",
  "hanwha-solutions": "00162461",
  "hd-hyundai": "01205709",
  "hd-korea-shipbuilding": "00164830",
  "hlb": "00199252",
  "hmm": "00164645",
  "hotel-shilla": "00165680",
  "hpsp": "01288827",
  "hybe": "01204056",
  "hyosung-advanced-materials": "01316254",
  "hyosung-heavy-industries": "01316245",
  "hyosung-t-and-c": "01316227",
  "hyundai-department-store": "00428251",
  "hyundai-engineering-construction": "00164478",
  "hyundai-glovis": "00360595",
  "hyundai-heavy-industries": "01390344",
  "hyundai-marine-fire": "00164973",
  "hyundai-mobis": "00164788",
  "hyundai-motor": "00164742",
  "jyp-entertainment": "00258689",
  "kakao": "00258801",
  "kakao-bank": "01133217",
  "kakao-pay": "01244601",
  "kb-financial-group": "00688996",
  "kepco": "00159193",
  "kia": "00106641",
  "kiwoom-securities": "00296290",
  "korea-aerospace-industries": "00309503",
  "korea-gas": "00261285",
  "korean-air": "00113526",
  "krafton": "00760971",
  "kt": "00190321",
  "ktng": "00244455",
  "l-and-f": "00398701",
  "leeno-industrial": "00369657",
  "lg-chem": "00356361",
  "lg-display": "00105873",
  "lg-electronics": "00401731",
  "lg-energy-solution": "01515323",
  "lg-household-healthcare": "00356370",
  "lg-innotek": "00105961",
  "lg-uplus": "00231363",
  "lig-nex1": "00503668",
  "lotte-chemical": "00165413",
  "lotte-energy-materials": "00113997",
  "lotte-holdings-korea": "00120562",
  "lotte-shopping": "00120526",
  "ls": "00105952",
  "ls-eco-energy": "01093007",
  "ls-electric": "00105855",
  "lx-international": "00120076",
  "meritz-financial": "00860332",
  "mirae-asset-securities": "00111722",
  "naver": "00266961",
  "ncsoft": "00261443",
  "netmarble": "00904672",
  "nexon-games": "01096341",
  "nh-investment-securities": "00120182",
  "orion": "01238169",
  "paradise": "00171265",
  "posco-future-m": "00155276",
  "posco-holdings": "00155319",
  "posco-international": "00124504",
  "s-oil": "00138279",
  "samsung-biologics": "00877059",
  "samsung-c-and-t": "00149655",
  "samsung-electronics": "00126380",
  "samsung-engineering": "00126308",
  "samsung-fire": "00139214",
  "samsung-heavy-industries": "00126478",
  "samsung-life": "00126256",
  "samsung-sdi": "00126362",
  "samsung-sds": "00126186",
  "samsung-securities": "00104856",
  "seegene": "00788773",
  "semco": "00126371",
  "shinhan-financial-group": "00382199",
  "shinsegye": "00136378",
  "sk": "00181712",
  "sk-biopharmaceuticals": "00878696",
  "sk-bioscience": "01319899",
  "sk-hynix": "00164779",
  "sk-innovation": "00631518",
  "sk-telecom": "00159023",
  "sm-entertainment": "00260930",
  "solum": "01159233",
  "soulbrain": "01489648",
  "wonik-ips": "01135941",
  "woori-financial-group": "01350869",
  "yuhan": "00145109"
};

const companyOfficialLinks: Record<
  string,
  {
    officialWebsite: string;
    irUrl: string;
  }
> = {
  "alteogen": {
    officialWebsite: "https://www.alteogen.com",
    irUrl: ""
  },
  "amorepacific": {
    officialWebsite: "https://www.apgroup.com",
    irUrl: ""
  },
  "asiana-airlines": {
    officialWebsite: "https://www.flyasiana.com",
    irUrl: ""
  },
  "celltrion": {
    officialWebsite: "https://www.celltrion.com",
    irUrl: "https://www.celltrion.com/ko-kr/investment/ir/"
  },
  "cj": {
    officialWebsite: "https://www.cj.net",
    irUrl: ""
  },
  "cj-cheiljedang": {
    officialWebsite: "https://www.cj.co.kr",
    irUrl: ""
  },
  "cj-enm": {
    officialWebsite: "https://www.cjmall.com",
    irUrl: ""
  },
  "cj-logistics": {
    officialWebsite: "https://www.cjlogistics.com",
    irUrl: "https://www.cjlogistics.com"
  },
  "cosmo-advanced-materials": {
    officialWebsite: "https://www.cosmoamt.com",
    irUrl: ""
  },
  "coway": {
    officialWebsite: "https://company.coway.com",
    irUrl: "https://www.cowayir.co.kr"
  },
  "daou-technology": {
    officialWebsite: "https://www.daou.co.kr",
    irUrl: ""
  },
  "db-hi-tek": {
    officialWebsite: "https://www.dbhitek.co.kr",
    irUrl: ""
  },
  "db-insurance": {
    officialWebsite: "https://www.idbins.com",
    irUrl: ""
  },
  "dl-enc": {
    officialWebsite: "https://www.dlenc.co.kr",
    irUrl: ""
  },
  "dongjin-semiconductor": {
    officialWebsite: "https://www.dongjin.com",
    irUrl: ""
  },
  "doosan-enerbility": {
    officialWebsite: "https://www.doosanenerbility.com/kr",
    irUrl: "https://www.doosanenerbility.com/kr/investment/ir_data"
  },
  "ecopro": {
    officialWebsite: "https://www.ecopro.co.kr",
    irUrl: "https://ecopro.co.kr/sub020403"
  },
  "ecopro-bm": {
    officialWebsite: "https://www.ecoprobm.co.kr",
    irUrl: ""
  },
  "emart": {
    officialWebsite: "https://emartcompany.com/ko/main.do",
    irUrl: "http://emartcompany.com/ko/investor/governance_01.do"
  },
  "fandf": {
    officialWebsite: "https://www.fnf.co.kr",
    irUrl: ""
  },
  "green-cross": {
    officialWebsite: "https://www.gcbiopharma.com",
    irUrl: ""
  },
  "gs-engineering-construction": {
    officialWebsite: "https://www.gsenc.com",
    irUrl: "https://www.gsenc.com/IR/Data/Schedule.aspx"
  },
  "gs-holdings": {
    officialWebsite: "",
    irUrl: ""
  },
  "hana-financial-group": {
    officialWebsite: "https://www.hanafn.com",
    irUrl: "https://www.hanafn.com"
  },
  "hanmi-pharm": {
    officialWebsite: "",
    irUrl: "https://www.hanmi.co.kr/main.hm"
  },
  "hanmi-semiconductor": {
    officialWebsite: "https://www.hanmisemi.com",
    irUrl: ""
  },
  "hanwha": {
    officialWebsite: "https://www.hanwhacorp.co.kr",
    irUrl: "https://www.hanwhacorp.co.kr"
  },
  "hanwha-aerospace": {
    officialWebsite: "https://www.hanwhaaerospace.com",
    irUrl: ""
  },
  "hanwha-ocean": {
    officialWebsite: "https://www.hanwhaocean.com/pub/main/index.do",
    irUrl: "https://www.hanwhaocean.com/"
  },
  "hanwha-solutions": {
    officialWebsite: "https://hcc.hanwha.co.kr",
    irUrl: ""
  },
  "hd-hyundai": {
    officialWebsite: "https://www.hd.com",
    irUrl: "https://www.hd.com"
  },
  "hd-korea-shipbuilding": {
    officialWebsite: "https://www.ksoe.co.kr",
    irUrl: ""
  },
  "hlb": {
    officialWebsite: "https://hlbbio.co.kr",
    irUrl: "https://www.hlbbio.co.kr"
  },
  "hmm": {
    officialWebsite: "https://www.hmm21.com",
    irUrl: ""
  },
  "hotel-shilla": {
    officialWebsite: "https://www.hotelshilla.net",
    irUrl: "http://www.hotelshilla.net/kr/ir/public_info.jsp"
  },
  "hpsp": {
    officialWebsite: "https://www.thehpsp.com/",
    irUrl: ""
  },
  "hybe": {
    officialWebsite: "https://hybecorp.com",
    irUrl: "https://hybecorp.com/"
  },
  "hyosung-advanced-materials": {
    officialWebsite: "https://www.hyosungadvancedmaterials.com",
    irUrl: ""
  },
  "hyosung-heavy-industries": {
    officialWebsite: "https://www.hyosungheavyindustries.com",
    irUrl: ""
  },
  "hyosung-t-and-c": {
    officialWebsite: "https://www.hyosungtnc.com",
    irUrl: ""
  },
  "hyundai-department-store": {
    officialWebsite: "https://home.e-hyundai.com",
    irUrl: ""
  },
  "hyundai-engineering-construction": {
    officialWebsite: "https://www.hdec.kr",
    irUrl: "https://www.hdec.kr/kr/invest/irpt.aspx"
  },
  "hyundai-glovis": {
    officialWebsite: "https://www.glovis.net",
    irUrl: ""
  },
  "hyundai-heavy-industries": {
    officialWebsite: "https://www.hhi.co.kr",
    irUrl: ""
  },
  "hyundai-marine-fire": {
    officialWebsite: "https://www.hi.co.kr",
    irUrl: ""
  },
  "hyundai-mobis": {
    officialWebsite: "https://www.mobis.com",
    irUrl: "https://www.mobis.com"
  },
  "hyundai-motor": {
    officialWebsite: "https://www.hyundai.com",
    irUrl: ""
  },
  "jyp-entertainment": {
    officialWebsite: "https://www.jype.com",
    irUrl: ""
  },
  "kakao": {
    officialWebsite: "https://www.kakaocorp.com",
    irUrl: "https://www.kakaocorp.com/ir/main"
  },
  "kakao-bank": {
    officialWebsite: "",
    irUrl: "https://www.kakaobank.com/"
  },
  "kakao-pay": {
    officialWebsite: "https://www.kakaopay.com",
    irUrl: ""
  },
  "kb-financial-group": {
    officialWebsite: "https://www.kbfg.com",
    irUrl: ""
  },
  "kepco": {
    officialWebsite: "https://www.kepco.co.kr",
    irUrl: ""
  },
  "kia": {
    officialWebsite: "https://www.kia.co.kr",
    irUrl: ""
  },
  "kiwoom-securities": {
    officialWebsite: "https://www.kiwoom.com",
    irUrl: "https://www.kiwoom.com/h/ir/"
  },
  "korea-aerospace-industries": {
    officialWebsite: "https://www.koreaaero.com",
    irUrl: ""
  },
  "korea-gas": {
    officialWebsite: "https://www.kogas.or.kr",
    irUrl: ""
  },
  "korean-air": {
    officialWebsite: "https://www.koreanair.com",
    irUrl: ""
  },
  "krafton": {
    officialWebsite: "https://www.krafton.com",
    irUrl: "https://www.krafton.com"
  },
  "kt": {
    officialWebsite: "https://www.kt.com",
    irUrl: ""
  },
  "ktng": {
    officialWebsite: "https://www.ktng.com",
    irUrl: ""
  },
  "l-and-f": {
    officialWebsite: "https://www.landf.co.kr/",
    irUrl: ""
  },
  "leeno-industrial": {
    officialWebsite: "https://leeno.com/kr",
    irUrl: ""
  },
  "lg-chem": {
    officialWebsite: "https://www.lgchem.com",
    irUrl: ""
  },
  "lg-display": {
    officialWebsite: "https://www.lgdisplay.com",
    irUrl: ""
  },
  "lg-electronics": {
    officialWebsite: "https://www.lge.co.kr",
    irUrl: "https://www.lge.co.kr/company/investor/presentation#com-tabs01"
  },
  "lg-energy-solution": {
    officialWebsite: "https://www.lgensol.com",
    irUrl: "https://www.lgensol.com/kr/earnings-announcement"
  },
  "lg-household-healthcare": {
    officialWebsite: "https://www.lghnh.com",
    irUrl: ""
  },
  "lg-innotek": {
    officialWebsite: "https://www.lginnotek.co.kr",
    irUrl: ""
  },
  "lg-uplus": {
    officialWebsite: "https://www.uplus.co.kr",
    irUrl: ""
  },
  "lig-nex1": {
    officialWebsite: "https://www.lignex1.com",
    irUrl: ""
  },
  "lotte-chemical": {
    officialWebsite: "https://www.lottechem.com",
    irUrl: "https://www.lottechem.com/ko/ir/ir_activity.do"
  },
  "lotte-energy-materials": {
    officialWebsite: "https://www.lotteenergymaterials.com",
    irUrl: ""
  },
  "lotte-holdings-korea": {
    officialWebsite: "https://www.lotte.co.kr",
    irUrl: "https://www.lotte.co.kr"
  },
  "lotte-shopping": {
    officialWebsite: "https://www.lotteshoppingir.com/",
    irUrl: "http://www.lotteshoppingir.com/"
  },
  "ls": {
    officialWebsite: "https://www.lsholdings.co.kr",
    irUrl: ""
  },
  "ls-eco-energy": {
    officialWebsite: "https://www.lsecoenergy.com",
    irUrl: ""
  },
  "ls-electric": {
    officialWebsite: "https://www.ls-electric.com",
    irUrl: ""
  },
  "lx-international": {
    officialWebsite: "https://www.lxinternational.com",
    irUrl: "https://www.lxinternational.com/kr/investment/result_data"
  },
  "meritz-financial": {
    officialWebsite: "https://www.meritzgroup.com",
    irUrl: ""
  },
  "mirae-asset-securities": {
    officialWebsite: "https://securities.miraeasset.com",
    irUrl: "https://ci.securities.miraeasset.com"
  },
  "naver": {
    officialWebsite: "https://www.navercorp.com",
    irUrl: "https://www.navercorp.com/investment/investors"
  },
  "ncsoft": {
    officialWebsite: "https://www.nc.com",
    irUrl: ""
  },
  "netmarble": {
    officialWebsite: "https://company.netmarble.com",
    irUrl: ""
  },
  "nexon-games": {
    officialWebsite: "https://nexongames.co.kr",
    irUrl: ""
  },
  "nh-investment-securities": {
    officialWebsite: "https://www.nhqv.com",
    irUrl: ""
  },
  "orion": {
    officialWebsite: "https://www.orionworld.com",
    irUrl: "https://www.orionworld.com"
  },
  "paradise": {
    officialWebsite: "https://www.paradise.co.kr/ko/main",
    irUrl: "https://www.paradise.co.kr/ko/invest/ir/reference"
  },
  "posco-future-m": {
    officialWebsite: "https://www.poscofuturem.com",
    irUrl: ""
  },
  "posco-holdings": {
    officialWebsite: "https://www.posco-inc.com",
    irUrl: ""
  },
  "posco-international": {
    officialWebsite: "https://www.poscointl.com",
    irUrl: ""
  },
  "s-oil": {
    officialWebsite: "https://www.s-oil.com",
    irUrl: ""
  },
  "samsung-biologics": {
    officialWebsite: "https://www.samsungbiologics.com",
    irUrl: ""
  },
  "samsung-c-and-t": {
    officialWebsite: "https://www.samsungcnt.com",
    irUrl: ""
  },
  "samsung-electronics": {
    officialWebsite: "https://www.samsung.com/sec",
    irUrl: ""
  },
  "samsung-engineering": {
    officialWebsite: "https://www.samsungena.com",
    irUrl: ""
  },
  "samsung-fire": {
    officialWebsite: "https://www.samsungfire.com",
    irUrl: ""
  },
  "samsung-heavy-industries": {
    officialWebsite: "https://www.samsungshi.com",
    irUrl: ""
  },
  "samsung-life": {
    officialWebsite: "https://www.samsunglife.com",
    irUrl: ""
  },
  "samsung-sdi": {
    officialWebsite: "https://www.samsungsdi.co.kr",
    irUrl: "https://www.samsungsdi.co.kr"
  },
  "samsung-sds": {
    officialWebsite: "https://www.samsungsds.com",
    irUrl: ""
  },
  "samsung-securities": {
    officialWebsite: "https://www.samsungpop.com",
    irUrl: ""
  },
  "seegene": {
    officialWebsite: "https://www.seegene.co.kr",
    irUrl: "https://www.seegene.co.kr/ir_event"
  },
  "semco": {
    officialWebsite: "https://www.sem.samsung.co.kr",
    irUrl: ""
  },
  "shinhan-financial-group": {
    officialWebsite: "https://www.shinhangroup.com",
    irUrl: ""
  },
  "shinsegye": {
    officialWebsite: "https://www.shinsegae.com",
    irUrl: "https://www.shinsegae.com/company/ir-ko/corporate-governance.do#direct_move"
  },
  "sk": {
    officialWebsite: "https://www.sk-inc.com/",
    irUrl: ""
  },
  "sk-biopharmaceuticals": {
    officialWebsite: "https://www.skbp.com",
    irUrl: ""
  },
  "sk-bioscience": {
    officialWebsite: "https://www.skbioscience.com",
    irUrl: ""
  },
  "sk-hynix": {
    officialWebsite: "https://www.skhynix.com",
    irUrl: ""
  },
  "sk-innovation": {
    officialWebsite: "https://www.SKinnovation.com",
    irUrl: ""
  },
  "sk-telecom": {
    officialWebsite: "https://www.sktelecom.com",
    irUrl: ""
  },
  "sm-entertainment": {
    officialWebsite: "https://smentertainment.com",
    irUrl: "https://smentertainment.com"
  },
  "solum": {
    officialWebsite: "https://www.solum-group.co.kr",
    irUrl: "http://www.solum-group.com"
  },
  "soulbrain": {
    officialWebsite: "https://www.soulbrain.co.kr",
    irUrl: ""
  },
  "wonik-ips": {
    officialWebsite: "https://www.ips.co.kr",
    irUrl: ""
  },
  "woori-financial-group": {
    officialWebsite: "https://www.woorifg.com/",
    irUrl: ""
  },
  "yuhan": {
    officialWebsite: "https://www.yuhan.co.kr",
    irUrl: ""
  }
};

function createCompany(raw: RawCompany): Company {
  const [slug, name, initials, market, ticker, industry, businessSummary, keyBusinesses] = raw;

  return {
    slug,
    name,
    shortName: name,
    initials,
    country: "KR",
    market,
    ticker,
    industry,
    businessSummary,
    keyBusinesses,
    dartSearchUrl: makeDartSearchUrl(name),
    officialWebsite: companyOfficialLinks[slug]?.officialWebsite ?? "",
    irUrl: companyOfficialLinks[slug]?.irUrl ?? "",
identifiers: {
  ticker,
  stockCode: ticker,
  dartCorpCode: companyDartCorpCodes[slug]
},
    apiStatus: {
      dartReady: false,
      financialReady: false,
      disclosureReady: false
    },
    latestSignals: [
      "공식 공시와 사업보고서를 통해 최근 사업과 실적 변화를 확인할 수 있습니다.",
      "이 페이지는 투자 추천이 아니라 기업정보 확인을 돕는 정보 페이지입니다."
    ],
    sourceNote:
      "초기 MVP 데이터입니다. 실적, 공시, 재무정보는 추후 OpenDART 및 공식자료 API 연동 후 자동 업데이트할 예정입니다.",
    updatedAt: "2026-05-14"
  };
}

const rawCompanies: RawCompany[] = [
  ["samsung-electronics", "삼성전자", "SE", "KOSPI", "005930", "전자 · 반도체", "반도체, 모바일, 디스플레이, 가전 등 다양한 전자·IT 사업을 영위하는 한국의 대표 기업입니다.", ["반도체", "모바일", "디스플레이", "가전"]],
  ["hyundai-motor", "현대자동차", "HM", "KOSPI", "005380", "자동차", "승용차, 상용차, 전기차, 수소차, 모빌리티 서비스를 중심으로 사업을 운영하는 자동차 기업입니다.", ["완성차", "전기차", "수소차", "모빌리티"]],
  ["sk-hynix", "SK하이닉스", "SK", "KOSPI", "000660", "반도체", "DRAM, NAND Flash 등 메모리 반도체 제품을 중심으로 사업을 운영하는 반도체 기업입니다.", ["DRAM", "NAND Flash", "메모리 반도체", "AI 서버 수요"]],
  ["lg-energy-solution", "LG에너지솔루션", "LG", "KOSPI", "373220", "2차전지", "전기차 배터리, 에너지저장장치, 소형전지 등을 중심으로 사업을 운영하는 배터리 기업입니다.", ["전기차 배터리", "ESS", "소형전지", "배터리 공정"]],
  ["kia", "기아", "KA", "KOSPI", "000270", "자동차", "승용차, RV, 전기차 등 다양한 완성차를 생산·판매하는 자동차 기업입니다.", ["완성차", "RV", "전기차", "글로벌 판매"]],
  ["naver", "NAVER", "N", "KOSPI", "035420", "인터넷 · 플랫폼", "검색, 커머스, 콘텐츠, 핀테크, 클라우드 등 다양한 인터넷 플랫폼 사업을 운영하는 기업입니다.", ["검색", "커머스", "콘텐츠", "핀테크", "클라우드"]],
  ["kakao", "카카오", "K", "KOSPI", "035720", "인터넷 · 플랫폼", "메신저, 광고, 커머스, 콘텐츠, 모빌리티, 페이 등 플랫폼 기반 사업을 운영하는 기업입니다.", ["메신저", "광고", "커머스", "콘텐츠", "모빌리티"]],
  ["posco-holdings", "POSCO홀딩스", "PH", "KOSPI", "005490", "철강 · 소재", "철강, 이차전지 소재, 친환경 인프라 등 다양한 사업 포트폴리오를 보유한 지주회사입니다.", ["철강", "이차전지 소재", "친환경 인프라", "지주회사"]],
  ["hanwha-aerospace", "한화에어로스페이스", "HA", "KOSPI", "012450", "방산 · 항공우주", "방산, 항공엔진, 우주·항공 관련 사업을 영위하는 기업입니다.", ["방산", "항공엔진", "우주·항공", "수출"]],
  ["hyundai-mobis", "현대모비스", "MB", "KOSPI", "012330", "자동차 부품", "자동차 핵심 부품, 모듈, 전동화 부품, A/S 부품 등을 공급하는 자동차 부품 기업입니다.", ["자동차 부품", "모듈", "전동화 부품", "A/S 부품"]],

  ["lg-chem", "LG화학", "LC", "KOSPI", "051910", "화학 · 소재", "석유화학, 첨단소재, 생명과학 등 다양한 화학·소재 사업을 영위하는 기업입니다.", ["석유화학", "첨단소재", "생명과학", "배터리 소재"]],
  ["samsung-sdi", "삼성SDI", "SD", "KOSPI", "006400", "2차전지 · 전자재료", "전기차 배터리, 소형전지, 에너지저장장치, 전자재료 사업을 운영하는 기업입니다.", ["전기차 배터리", "소형전지", "ESS", "전자재료"]],
  ["samsung-biologics", "삼성바이오로직스", "SB", "KOSPI", "207940", "바이오 · 의약품 위탁생산", "바이오의약품 위탁개발생산을 중심으로 사업을 운영하는 바이오 기업입니다.", ["바이오의약품", "CDMO", "위탁생산", "바이오 공정"]],
  ["celltrion", "셀트리온", "CT", "KOSPI", "068270", "바이오 · 제약", "바이오시밀러와 바이오의약품 개발·생산·판매를 중심으로 사업을 운영하는 제약·바이오 기업입니다.", ["바이오시밀러", "바이오의약품", "제약", "글로벌 판매"]],
  ["samsung-c-and-t", "삼성물산", "SC", "KOSPI", "028260", "건설 · 상사 · 패션", "건설, 상사, 패션, 리조트 등 다양한 사업을 운영하는 복합 기업입니다.", ["건설", "상사", "패션", "리조트"]],
  ["hd-hyundai", "HD현대", "HD", "KOSPI", "267250", "지주회사 · 조선 · 에너지", "조선, 에너지, 산업기계 등 계열 사업을 보유한 지주회사입니다.", ["지주회사", "조선", "에너지", "산업기계"]],
  ["hd-korea-shipbuilding", "HD한국조선해양", "KS", "KOSPI", "009540", "조선", "조선 계열사를 보유하고 선박, 해양플랜트, 엔진 관련 사업을 운영하는 조선 기업입니다.", ["조선", "선박", "해양플랜트", "엔진"]],
  ["hyundai-heavy-industries", "HD현대중공업", "HH", "KOSPI", "329180", "조선 · 해양", "선박 건조, 해양플랜트, 엔진기계 등을 중심으로 사업을 운영하는 조선 기업입니다.", ["선박 건조", "해양", "엔진기계", "조선"]],
  ["doosan-enerbility", "두산에너빌리티", "DE", "KOSPI", "034020", "에너지 · 플랜트", "발전설비, 플랜트, 원전, 가스터빈 등 에너지 인프라 관련 사업을 운영하는 기업입니다.", ["발전설비", "원전", "가스터빈", "플랜트"]],
  ["lg-electronics", "LG전자", "LE", "KOSPI", "066570", "전자 · 가전", "생활가전, TV, 전장, B2B 솔루션 등을 중심으로 사업을 운영하는 전자 기업입니다.", ["생활가전", "TV", "전장", "B2B 솔루션"]],

  ["lg-display", "LG디스플레이", "LD", "KOSPI", "034220", "디스플레이", "TV, IT, 모바일, 차량용 디스플레이 패널을 생산하는 디스플레이 기업입니다.", ["OLED", "LCD", "IT 패널", "차량용 디스플레이"]],
  ["sk-innovation", "SK이노베이션", "SI", "KOSPI", "096770", "에너지 · 배터리", "에너지, 화학, 윤활유, 배터리 관련 사업을 운영하는 기업입니다.", ["에너지", "화학", "윤활유", "배터리"]],
  ["sk", "SK", "SK", "KOSPI", "034730", "지주회사", "에너지, 반도체, 통신, 바이오 등 계열 사업을 보유한 지주회사입니다.", ["지주회사", "에너지", "반도체", "통신", "바이오"]],
  ["sk-telecom", "SK텔레콤", "ST", "KOSPI", "017670", "통신", "이동통신, 유선통신, AI, 데이터센터 등 통신·디지털 인프라 사업을 운영하는 기업입니다.", ["이동통신", "AI", "데이터센터", "디지털 인프라"]],
  ["kt", "KT", "KT", "KOSPI", "030200", "통신", "유무선 통신, 인터넷, 미디어, 클라우드, 기업 솔루션 사업을 운영하는 통신 기업입니다.", ["유무선 통신", "미디어", "클라우드", "기업 솔루션"]],
  ["lg-uplus", "LG유플러스", "LU", "KOSPI", "032640", "통신", "이동통신, 인터넷, IPTV, 기업통신 등 통신 서비스를 제공하는 기업입니다.", ["이동통신", "인터넷", "IPTV", "기업통신"]],
  ["kb-financial-group", "KB금융", "KB", "KOSPI", "105560", "금융지주", "은행, 증권, 보험, 카드 등 금융 계열사를 보유한 금융지주회사입니다.", ["은행", "증권", "보험", "카드", "금융지주"]],
  ["shinhan-financial-group", "신한지주", "SH", "KOSPI", "055550", "금융지주", "은행, 카드, 증권, 보험 등 금융 계열사를 보유한 금융지주회사입니다.", ["은행", "카드", "증권", "보험", "금융지주"]],
  ["hana-financial-group", "하나금융지주", "HF", "KOSPI", "086790", "금융지주", "은행, 증권, 카드, 보험 등 금융 계열사를 보유한 금융지주회사입니다.", ["은행", "증권", "카드", "보험", "금융지주"]],
  ["woori-financial-group", "우리금융지주", "WF", "KOSPI", "316140", "금융지주", "은행, 카드, 캐피탈 등 금융 계열사를 보유한 금융지주회사입니다.", ["은행", "카드", "캐피탈", "금융지주"]],

  ["samsung-life", "삼성생명", "SL", "KOSPI", "032830", "보험", "생명보험, 자산운용, 금융 서비스 등을 제공하는 보험 기업입니다.", ["생명보험", "자산운용", "금융 서비스"]],
  ["samsung-fire", "삼성화재", "SF", "KOSPI", "000810", "보험", "자동차보험, 장기보험, 일반보험 등을 제공하는 손해보험 기업입니다.", ["자동차보험", "장기보험", "일반보험", "손해보험"]],
  ["samsung-securities", "삼성증권", "SS", "KOSPI", "016360", "증권", "위탁매매, 자산관리, 투자금융 등 증권 서비스를 제공하는 금융투자회사입니다.", ["증권", "자산관리", "투자금융", "위탁매매"]],
  ["mirae-asset-securities", "미래에셋증권", "MA", "KOSPI", "006800", "증권", "증권중개, 자산관리, 투자금융, 해외투자 서비스를 제공하는 금융투자회사입니다.", ["증권", "자산관리", "투자금융", "해외투자"]],
  ["lotte-chemical", "롯데케미칼", "LK", "KOSPI", "011170", "화학", "기초화학, 첨단소재, 합성수지 등 석유화학 제품을 생산하는 기업입니다.", ["기초화학", "첨단소재", "합성수지", "석유화학"]],
  ["hanwha-solutions", "한화솔루션", "HS", "KOSPI", "009830", "화학 · 태양광", "케미칼, 태양광, 첨단소재 등 에너지·소재 사업을 운영하는 기업입니다.", ["케미칼", "태양광", "첨단소재", "에너지"]],
  ["s-oil", "S-Oil", "SO", "KOSPI", "010950", "정유 · 화학", "정유, 석유화학, 윤활기유 사업을 운영하는 에너지 기업입니다.", ["정유", "석유화학", "윤활기유", "에너지"]],
  ["gs-holdings", "GS", "GS", "KOSPI", "078930", "지주회사 · 에너지", "에너지, 유통, 발전 등 계열 사업을 보유한 지주회사입니다.", ["지주회사", "에너지", "유통", "발전"]],
  ["cj-cheiljedang", "CJ제일제당", "CJ", "KOSPI", "097950", "식품 · 바이오", "식품, 바이오, 사료·축산 관련 사업을 운영하는 종합 식품·바이오 기업입니다.", ["식품", "바이오", "사료", "글로벌 식품"]],
  ["orion", "오리온", "OR", "KOSPI", "271560", "식품", "과자, 스낵, 제과 제품을 국내외에서 생산·판매하는 식품 기업입니다.", ["제과", "스낵", "글로벌 식품", "소비재"]],

  ["amorepacific", "아모레퍼시픽", "AP", "KOSPI", "090430", "화장품 · 소비재", "화장품, 스킨케어, 뷰티 브랜드를 국내외에서 운영하는 소비재 기업입니다.", ["화장품", "스킨케어", "뷰티 브랜드", "글로벌 소비재"]],
  ["lg-household-healthcare", "LG생활건강", "LH", "KOSPI", "051900", "화장품 · 생활용품", "화장품, 생활용품, 음료 사업을 운영하는 소비재 기업입니다.", ["화장품", "생활용품", "음료", "소비재"]],
  ["shinsegye", "신세계", "SG", "KOSPI", "004170", "유통 · 백화점", "백화점, 면세점, 유통 관련 사업을 운영하는 유통 기업입니다.", ["백화점", "면세점", "유통", "소비재"]],
  ["lotte-shopping", "롯데쇼핑", "LS", "KOSPI", "023530", "유통", "백화점, 마트, 슈퍼, e커머스 등 다양한 유통 사업을 운영하는 기업입니다.", ["백화점", "마트", "슈퍼", "e커머스"]],
  ["emart", "이마트", "EM", "KOSPI", "139480", "유통 · 대형마트", "대형마트, 창고형 할인점, 온라인 유통 등 소매 유통 사업을 운영하는 기업입니다.", ["대형마트", "트레이더스", "온라인 유통", "소매"]],
  ["hyundai-department-store", "현대백화점", "HDS", "KOSPI", "069960", "유통 · 백화점", "백화점, 아울렛, 면세점 등 유통 관련 사업을 운영하는 기업입니다.", ["백화점", "아울렛", "면세점", "유통"]],
  ["cj-enm", "CJ ENM", "CE", "KOSDAQ", "035760", "미디어 · 콘텐츠", "방송, 콘텐츠 제작, 음악, 커머스 등 미디어·엔터테인먼트 사업을 운영하는 기업입니다.", ["방송", "콘텐츠", "음악", "커머스"]],
  ["hybe", "하이브", "HY", "KOSPI", "352820", "엔터테인먼트", "아티스트 매니지먼트, 음악 제작, 공연, 팬 플랫폼 등 엔터테인먼트 사업을 운영하는 기업입니다.", ["음악", "아티스트", "공연", "팬 플랫폼"]],
  ["jyp-entertainment", "JYP Ent.", "JY", "KOSDAQ", "035900", "엔터테인먼트", "아티스트 매니지먼트, 음반, 공연, 콘텐츠 사업을 운영하는 엔터테인먼트 기업입니다.", ["아티스트", "음반", "공연", "콘텐츠"]],
  ["sm-entertainment", "에스엠", "SM", "KOSDAQ", "041510", "엔터테인먼트", "음악 제작, 아티스트 매니지먼트, 공연, 콘텐츠 사업을 운영하는 엔터테인먼트 기업입니다.", ["음악", "아티스트", "공연", "콘텐츠"]],

  ["ncsoft", "엔씨소프트", "NC", "KOSPI", "036570", "게임", "온라인·모바일 게임 개발 및 서비스를 중심으로 사업을 운영하는 게임 기업입니다.", ["온라인 게임", "모바일 게임", "게임 IP", "글로벌 서비스"]],
  ["krafton", "크래프톤", "KF", "KOSPI", "259960", "게임", "게임 개발과 글로벌 퍼블리싱을 중심으로 사업을 운영하는 게임 기업입니다.", ["게임 개발", "글로벌 퍼블리싱", "게임 IP", "모바일 게임"]],
  ["netmarble", "넷마블", "NM", "KOSPI", "251270", "게임", "모바일 게임 개발과 퍼블리싱을 중심으로 사업을 운영하는 게임 기업입니다.", ["모바일 게임", "퍼블리싱", "게임 IP", "글로벌 서비스"]],
  ["nexon-games", "넥슨게임즈", "NG", "KOSDAQ", "225570", "게임", "온라인·모바일 게임 개발을 중심으로 사업을 운영하는 게임 개발 기업입니다.", ["게임 개발", "온라인 게임", "모바일 게임", "게임 IP"]],
  ["korea-aerospace-industries", "한국항공우주", "KAI", "KOSPI", "047810", "항공 · 방산", "항공기 개발, 방산, 항공정비, 우주 관련 사업을 운영하는 기업입니다.", ["항공기", "방산", "항공정비", "우주"]],
  ["lig-nex1", "LIG넥스원", "LN", "KOSPI", "079550", "방산", "유도무기, 감시정찰, 통신전자 등 방산 전자장비를 개발·생산하는 기업입니다.", ["유도무기", "감시정찰", "통신전자", "방산"]],
  ["hyundai-engineering-construction", "현대건설", "HC", "KOSPI", "000720", "건설", "토목, 건축, 플랜트, 주택 등 건설 사업을 운영하는 종합 건설 기업입니다.", ["토목", "건축", "플랜트", "주택"]],
  ["gs-engineering-construction", "GS건설", "GC", "KOSPI", "006360", "건설", "주택, 건축, 토목, 플랜트 등 건설 사업을 운영하는 종합 건설 기업입니다.", ["주택", "건축", "토목", "플랜트"]],
  ["dl-enc", "DL이앤씨", "DL", "KOSPI", "375500", "건설", "주택, 토목, 플랜트 등 건설 사업을 운영하는 종합 건설 기업입니다.", ["주택", "토목", "플랜트", "건설"]],
  ["kakao-bank", "카카오뱅크", "KBK", "KOSPI", "323410", "인터넷은행", "모바일 기반 예금, 대출, 카드, 금융 플랫폼 서비스를 제공하는 인터넷전문은행입니다.", ["인터넷은행", "모바일 금융", "대출", "예금"]],

  ["kakao-pay", "카카오페이", "KP", "KOSPI", "377300", "핀테크", "간편결제, 송금, 금융서비스, 보험·증권 연계 서비스를 제공하는 핀테크 기업입니다.", ["간편결제", "송금", "금융 플랫폼", "핀테크"]],
  ["ktng", "KT&G", "KTG", "KOSPI", "033780", "담배 · 건강기능식품", "담배, 전자담배, 건강기능식품, 부동산 관련 사업을 운영하는 소비재 기업입니다.", ["담배", "전자담배", "건강기능식품", "소비재"]],
  ["kepco", "한국전력", "KE", "KOSPI", "015760", "전력 · 유틸리티", "전력 판매, 송배전, 전력 인프라 관련 사업을 운영하는 공기업 성격의 전력 기업입니다.", ["전력 판매", "송배전", "전력 인프라", "유틸리티"]],
  ["korea-gas", "한국가스공사", "KG", "KOSPI", "036460", "가스 · 에너지", "천연가스 도입, 저장, 공급을 중심으로 사업을 운영하는 에너지 공기업입니다.", ["천연가스", "에너지", "가스 공급", "인프라"]],
  ["hanwha", "한화", "HW", "KOSPI", "000880", "지주회사 · 화약 · 방산", "화약, 방산, 에너지, 금융 등 다양한 계열 사업을 보유한 기업입니다.", ["지주회사", "화약", "방산", "에너지"]],
  ["hanwha-ocean", "한화오션", "HO", "KOSPI", "042660", "조선 · 방산", "선박 건조, 해양플랜트, 특수선 등 조선·방산 관련 사업을 운영하는 기업입니다.", ["조선", "특수선", "해양플랜트", "방산"]],
  ["samsung-heavy-industries", "삼성중공업", "SHI", "KOSPI", "010140", "조선 · 해양", "선박, 해양플랜트, LNG 운반선 등 조선·해양 사업을 운영하는 기업입니다.", ["조선", "LNG 운반선", "해양플랜트", "선박 건조"]],
  ["hanmi-semiconductor", "한미반도체", "HS", "KOSPI", "042700", "반도체 장비", "반도체 후공정 장비를 중심으로 사업을 운영하는 반도체 장비 기업입니다.", ["반도체 장비", "후공정", "패키징", "AI 반도체 관련 장비"]],
  ["hpsp", "HPSP", "HP", "KOSDAQ", "403870", "반도체 장비", "반도체 공정 장비를 개발·공급하는 반도체 장비 기업입니다.", ["반도체 장비", "공정 장비", "장비 공급"]],
  ["leeno-industrial", "리노공업", "LI", "KOSDAQ", "058470", "반도체 부품", "반도체 테스트 소켓과 관련 부품을 생산하는 반도체 부품 기업입니다.", ["반도체 테스트", "소켓", "부품", "검사용 장비 부품"]],

  ["db-hi-tek", "DB하이텍", "DB", "KOSPI", "000990", "반도체 파운드리", "시스템반도체 위탁생산을 중심으로 사업을 운영하는 파운드리 기업입니다.", ["파운드리", "시스템반도체", "웨이퍼 생산", "반도체 제조"]],
  ["solum", "솔루엠", "SLM", "KOSPI", "248070", "전자부품", "전자부품, 전원 모듈, 전자가격표시기 등 전자 솔루션 사업을 운영하는 기업입니다.", ["전자부품", "전원 모듈", "ESL", "전자 솔루션"]],
  ["ecopro", "에코프로", "EC", "KOSDAQ", "086520", "2차전지 · 지주회사", "2차전지 소재와 환경 관련 계열 사업을 보유한 기업입니다.", ["2차전지 소재", "지주회사", "환경", "양극재"]],
  ["ecopro-bm", "에코프로비엠", "EB", "KOSDAQ", "247540", "2차전지 소재", "전기차 배터리용 양극재를 중심으로 사업을 운영하는 2차전지 소재 기업입니다.", ["양극재", "2차전지 소재", "전기차 배터리", "배터리 소재"]],
  ["posco-future-m", "포스코퓨처엠", "PF", "KOSPI", "003670", "2차전지 소재", "양극재, 음극재 등 배터리 소재와 기초소재 사업을 운영하는 소재 기업입니다.", ["양극재", "음극재", "배터리 소재", "기초소재"]],
  ["l-and-f", "엘앤에프", "LF", "KOSDAQ", "066970", "2차전지 소재", "전기차 배터리용 양극재를 중심으로 사업을 운영하는 2차전지 소재 기업입니다.", ["양극재", "배터리 소재", "전기차 배터리", "소재"]],
  ["cosmo-advanced-materials", "코스모신소재", "CM", "KOSPI", "005070", "2차전지 소재 · 필름", "2차전지 소재와 기능성 필름 관련 사업을 운영하는 소재 기업입니다.", ["2차전지 소재", "기능성 필름", "소재"]],
  ["lotte-energy-materials", "롯데에너지머티리얼즈", "LEM", "KOSPI", "020150", "2차전지 소재", "배터리용 동박 등 2차전지 소재 사업을 운영하는 기업입니다.", ["동박", "2차전지 소재", "배터리 소재", "소재"]],
  ["hyundai-glovis", "현대글로비스", "HG", "KOSPI", "086280", "물류 · 해운", "자동차 물류, 해운, 유통, 완성차 운송 등을 운영하는 물류 기업입니다.", ["물류", "해운", "완성차 운송", "유통"]],
  ["cj-logistics", "CJ대한통운", "CL", "KOSPI", "000120", "물류 · 택배", "택배, 계약물류, 글로벌 물류 사업을 운영하는 종합 물류 기업입니다.", ["택배", "계약물류", "글로벌 물류", "물류 자동화"]],

  ["hmm", "HMM", "HM", "KOSPI", "011200", "해운", "컨테이너선과 벌크선 운송을 중심으로 사업을 운영하는 해운 기업입니다.", ["컨테이너선", "벌크선", "해운", "글로벌 운송"]],
  ["korean-air", "대한항공", "KA", "KOSPI", "003490", "항공", "여객, 화물, 항공정비 등 항공 운송 사업을 운영하는 항공사입니다.", ["여객", "항공화물", "항공정비", "항공 운송"]],
  ["asiana-airlines", "아시아나항공", "AA", "KOSPI", "020560", "항공", "여객, 화물 등 항공 운송 사업을 운영하는 항공사입니다.", ["여객", "항공화물", "항공 운송", "항공 서비스"]],
  ["hotel-shilla", "호텔신라", "HS", "KOSPI", "008770", "호텔 · 면세점", "호텔, 면세점, 레저 관련 사업을 운영하는 서비스 기업입니다.", ["호텔", "면세점", "레저", "관광"]],
  ["paradise", "파라다이스", "PD", "KOSDAQ", "034230", "카지노 · 관광", "카지노, 호텔, 복합리조트 등 관광·레저 사업을 운영하는 기업입니다.", ["카지노", "호텔", "복합리조트", "관광"]],
  ["yuhan", "유한양행", "YH", "KOSPI", "000100", "제약", "의약품 개발, 생산, 판매를 중심으로 사업을 운영하는 제약 기업입니다.", ["의약품", "신약개발", "제약", "헬스케어"]],
  ["hanmi-pharm", "한미약품", "HP", "KOSPI", "128940", "제약", "전문의약품, 신약개발, 글로벌 기술수출 등을 중심으로 사업을 운영하는 제약 기업입니다.", ["전문의약품", "신약개발", "기술수출", "제약"]],
  ["green-cross", "녹십자", "GC", "KOSPI", "006280", "제약 · 백신", "백신, 혈액제제, 전문의약품 등을 중심으로 사업을 운영하는 제약 기업입니다.", ["백신", "혈액제제", "전문의약품", "제약"]],
  ["sk-bioscience", "SK바이오사이언스", "SBS", "KOSPI", "302440", "바이오 · 백신", "백신 개발, 생산, 위탁생산 관련 사업을 운영하는 바이오 기업입니다.", ["백신", "바이오", "위탁생산", "연구개발"]],
  ["sk-biopharmaceuticals", "SK바이오팜", "SBP", "KOSPI", "326030", "바이오 · 신약", "신약 개발과 글로벌 의약품 판매를 중심으로 사업을 운영하는 바이오 기업입니다.", ["신약개발", "중추신경계", "글로벌 판매", "바이오"]],

  ["seegene", "씨젠", "SG", "KOSDAQ", "096530", "진단 · 바이오", "분자진단 제품과 진단시약을 개발·판매하는 바이오 진단 기업입니다.", ["분자진단", "진단시약", "바이오", "진단기기"]],
  ["alteogen", "알테오젠", "AT", "KOSDAQ", "196170", "바이오 · 플랫폼 기술", "바이오의약품 플랫폼 기술과 바이오시밀러 관련 연구개발을 진행하는 바이오 기업입니다.", ["바이오 플랫폼", "바이오시밀러", "신약개발", "기술수출"]],
  ["hlb", "HLB", "HLB", "KOSDAQ", "028300", "바이오 · 헬스케어", "바이오, 헬스케어, 신약개발 관련 사업을 운영하는 기업입니다.", ["바이오", "신약개발", "헬스케어", "의약품"]],
  ["samsung-engineering", "삼성E&A", "SEA", "KOSPI", "028050", "플랜트 · 엔지니어링", "화공, 산업, 환경 등 플랜트 엔지니어링 사업을 운영하는 기업입니다.", ["플랜트", "엔지니어링", "화공", "환경"]],
  ["ls-electric", "LS ELECTRIC", "LS", "KOSPI", "010120", "전력기기 · 자동화", "전력기기, 자동화, 스마트에너지 관련 사업을 운영하는 기업입니다.", ["전력기기", "자동화", "스마트에너지", "전력 인프라"]],
  ["ls", "LS", "LS", "KOSPI", "006260", "지주회사 · 전선 · 전력", "전선, 전력기기, 소재 등 계열 사업을 보유한 지주회사입니다.", ["지주회사", "전선", "전력기기", "소재"]],
  ["ls-eco-energy", "LS에코에너지", "LE", "KOSPI", "229640", "전선 · 전력 인프라", "전선과 전력 인프라 관련 사업을 운영하는 기업입니다.", ["전선", "전력 인프라", "케이블", "에너지 인프라"]],
  ["hyosung-heavy-industries", "효성중공업", "HI", "KOSPI", "298040", "전력기기 · 건설", "변압기, 차단기 등 전력기기와 건설 관련 사업을 운영하는 기업입니다.", ["전력기기", "변압기", "차단기", "건설"]],
  ["hyosung-t-and-c", "효성티앤씨", "HT", "KOSPI", "298020", "섬유 · 화학", "스판덱스, 섬유, 무역 관련 사업을 운영하는 소재 기업입니다.", ["스판덱스", "섬유", "무역", "소재"]],
  ["hyosung-advanced-materials", "효성첨단소재", "HA", "KOSPI", "298050", "첨단소재", "타이어보강재, 탄소섬유, 산업용 소재 등을 생산하는 첨단소재 기업입니다.", ["타이어보강재", "탄소섬유", "산업용 소재", "첨단소재"]],

  ["cj", "CJ", "CJ", "KOSPI", "001040", "지주회사 · 식품 · 콘텐츠", "식품, 물류, 바이오, 콘텐츠 등 계열 사업을 보유한 지주회사입니다.", ["지주회사", "식품", "물류", "콘텐츠", "바이오"]],
  ["lotte-holdings-korea", "롯데지주", "LJ", "KOSPI", "004990", "지주회사 · 유통 · 식품", "유통, 식품, 화학 등 롯데 계열 사업을 보유한 지주회사입니다.", ["지주회사", "유통", "식품", "화학"]],
  ["db-insurance", "DB손해보험", "DI", "KOSPI", "005830", "보험", "자동차보험, 장기보험, 일반보험 등 손해보험 서비스를 제공하는 보험 기업입니다.", ["손해보험", "자동차보험", "장기보험", "일반보험"]],
  ["hyundai-marine-fire", "현대해상", "HI", "KOSPI", "001450", "보험", "자동차보험, 장기보험, 일반보험 등 손해보험 사업을 운영하는 보험 기업입니다.", ["손해보험", "자동차보험", "장기보험", "일반보험"]],
  ["meritz-financial", "메리츠금융지주", "MF", "KOSPI", "138040", "금융지주", "증권, 보험 등 금융 계열사를 보유한 금융지주회사입니다.", ["금융지주", "증권", "보험", "자본시장"]],
  ["kiwoom-securities", "키움증권", "KW", "KOSPI", "039490", "증권", "온라인 증권중개, 자산관리, 투자금융 서비스를 제공하는 증권사입니다.", ["온라인 증권", "위탁매매", "자산관리", "투자금융"]],
  ["nh-investment-securities", "NH투자증권", "NH", "KOSPI", "005940", "증권", "증권중개, 자산관리, 투자금융, 기관영업을 운영하는 금융투자회사입니다.", ["증권", "자산관리", "투자금융", "기관영업"]],
  ["daou-technology", "다우기술", "DT", "KOSPI", "023590", "IT 서비스", "IT 서비스, 솔루션, 금융 IT 관련 사업을 운영하는 기업입니다.", ["IT 서비스", "솔루션", "금융 IT", "플랫폼"]],
  ["samsung-sds", "삼성SDS", "SDS", "KOSPI", "018260", "IT 서비스 · 물류", "IT 서비스, 클라우드, 물류 IT, 디지털 전환 솔루션을 제공하는 기업입니다.", ["IT 서비스", "클라우드", "물류 IT", "디지털 전환"]],
  ["posco-international", "포스코인터내셔널", "PI", "KOSPI", "047050", "상사 · 에너지", "무역, 에너지, 식량, 소재 등 글로벌 상사 사업을 운영하는 기업입니다.", ["상사", "에너지", "식량", "소재"]],

  ["lx-international", "LX인터내셔널", "LX", "KOSPI", "001120", "상사 · 자원", "자원, 물류, 트레이딩 등 글로벌 상사 사업을 운영하는 기업입니다.", ["상사", "자원", "물류", "트레이딩"]],
  ["coway", "코웨이", "CW", "KOSPI", "021240", "렌탈 · 생활가전", "정수기, 공기청정기, 비데 등 생활가전 렌탈 서비스를 제공하는 기업입니다.", ["정수기", "공기청정기", "렌탈", "생활가전"]],
  ["fandf", "F&F", "FF", "KOSPI", "383220", "패션", "의류 브랜드와 라이선스 브랜드를 운영하는 패션 기업입니다.", ["패션", "의류", "브랜드", "글로벌 소비재"]],
  ["soulbrain", "솔브레인", "SB", "KOSDAQ", "357780", "반도체 소재", "반도체, 디스플레이, 2차전지 관련 소재를 공급하는 소재 기업입니다.", ["반도체 소재", "디스플레이 소재", "2차전지 소재", "화학소재"]],
  ["dongjin-semiconductor", "동진쎄미켐", "DJ", "KOSDAQ", "005290", "반도체 · 디스플레이 소재", "반도체와 디스플레이 공정용 화학소재를 공급하는 소재 기업입니다.", ["반도체 소재", "디스플레이 소재", "감광액", "전자재료"]],
  ["wonik-ips", "원익IPS", "WI", "KOSDAQ", "240810", "반도체 장비", "반도체, 디스플레이 장비를 개발·공급하는 장비 기업입니다.", ["반도체 장비", "디스플레이 장비", "공정 장비", "장비 공급"]],
  ["semco", "삼성전기", "SEM", "KOSPI", "009150", "전자부품", "MLCC, 카메라모듈, 반도체 패키지 기판 등 전자부품을 생산하는 기업입니다.", ["MLCC", "카메라모듈", "패키지 기판", "전자부품"]],
  ["lg-innotek", "LG이노텍", "LI", "KOSPI", "011070", "전자부품", "카메라모듈, 기판소재, 전장부품 등 전자부품 사업을 운영하는 기업입니다.", ["카메라모듈", "기판소재", "전장부품", "전자부품"]]
];

export const companies: Company[] = rawCompanies.map(createCompany);

export const industries = Array.from(new Set(companies.map((company) => company.industry))).sort();

export function getCompanyBySlug(slug: string) {
  return companies.find((company) => company.slug === slug);
}
