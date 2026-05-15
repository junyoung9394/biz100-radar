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
  "abl-bio": "01256864",
  "afreecatv": "00399694",
  "ahnlab": "00298270",
  "alteogen": "00989619",
  "amorepacific": "00583424",
  "ap-system": "01203808",
  "asiana-airlines": "00138792",
  "avaco": "00442145",
  "bgf-retail": "01263022",
  "binex": "00216027",
  "binggrae": "00124726",
  "bioinfra": "01110058",
  "bnk-financial-group": "00858364",
  "boryung": "00123143",
  "bukwang-pharmaceutical": "00123718",
  "cafe24": "00260879",
  "caregen": "00549891",
  "celltrion": "00413046",
  "cha-biotech": "00525679",
  "chongkundang": "00992871",
  "chunbo": "00897752",
  "cis": "01090471",
  "cj": "00148540",
  "cj-cheiljedang": "00635134",
  "cj-enm": "00265324",
  "cj-logistics": "00113410",
  "classys": "01061327",
  "com2us": "00476498",
  "cosmo-advanced-materials": "00129989",
  "coway": "00170558",
  "daehan-synthetic-fiber": "00260383",
  "daejoo-electronic-materials": "00177816",
  "daesang": "00121941",
  "daesung-holdings": "00108940",
  "daewoo-engineering-construction": "00124540",
  "daewoong": "00111810",
  "daewoong-pharmaceutical": "00427483",
  "daishin-securities": "00110893",
  "danal": "00389970",
  "daou-technology": "00176914",
  "db-hi-tek": "00160843",
  "db-insurance": "00159102",
  "deepnoid": "01344831",
  "dent": "00445160",
  "deoksan-neolux": "01061558",
  "dexter-studios": "01021949",
  "dgb-financial-group": "00878915",
  "dl-enc": "01524093",
  "dl-holdings": "00109693",
  "dong-a-st": "00956930",
  "dong-suh": "00144395",
  "dongjin-semiconductor": "00118804",
  "dongkook-pharmaceutical": "00114808",
  "dongwon-fnb": "00340917",
  "dongyang-life": "00117267",
  "doosan-enerbility": "00159616",
  "doosan-tesna": "00563545",
  "dreamus-company": "00364467",
  "e1": "00165583",
  "ecopro": "00536541",
  "ecopro-bm": "01160363",
  "emart": "00872984",
  "enkem": "01011526",
  "eugene-technology": "00531014",
  "fandf": "01568413",
  "fasoo": "00638487",
  "flitto": "01237434",
  "gc-cell": "01010642",
  "genexine": "00545929",
  "genians": "00962223",
  "green-cross": "00129679",
  "gs-engineering-construction": "00120030",
  "gs-holdings": "00500254",
  "gs-retail": "00140177",
  "hana-financial-group": "00547583",
  "hana-materials": "00660750",
  "hana-micron": "00445054",
  "hanall-biopharma": "00162586",
  "handsome": "00188089",
  "hanmi-global": "00413523",
  "hanmi-pharm": "00828497",
  "hanmi-semiconductor": "00161383",
  "hanshin-construction": "00162063",
  "hansol-chemical": "00140955",
  "hansol-paper": "01060744",
  "hanwha": "00160588",
  "hanwha-aerospace": "00126566",
  "hanwha-general-insurance": "00135917",
  "hanwha-life": "00113058",
  "hanwha-ocean": "00111704",
  "hanwha-solutions": "00162461",
  "hanwha-systems": "00339391",
  "hd-hyundai": "01205709",
  "hd-korea-shipbuilding": "00164830",
  "hdc-hyundai-development": "01310269",
  "hite-jinro": "00150244",
  "hj-shipbuilding": "00633835",
  "hl-mando": "01042775",
  "hlb": "00199252",
  "hlb-life-science": "00365590",
  "hlb-pharmaceutical": "00336817",
  "hmm": "00164645",
  "hotel-shilla": "00165680",
  "hpsp": "01288827",
  "hugel": "00888347",
  "humedix": "00614478",
  "hwashin": "00166315",
  "hybe": "01204056",
  "hyosung-advanced-materials": "01316254",
  "hyosung-corp": "00117188",
  "hyosung-heavy-industries": "01316245",
  "hyosung-t-and-c": "01316227",
  "hyundai-department-store": "00428251",
  "hyundai-engineering-construction": "00164478",
  "hyundai-glovis": "00360595",
  "hyundai-heavy-industries": "01390344",
  "hyundai-marine-fire": "00164973",
  "hyundai-mobis": "00164788",
  "hyundai-motor": "00164742",
  "hyundai-rotem": "00302926",
  "hyundai-steel": "00145880",
  "ibk": "00149646",
  "ildong-pharmaceutical": "01168383",
  "ilyang-pharmaceutical": "00146454",
  "inbody": "00269922",
  "inox-advanced-materials": "01237540",
  "intellian-technologies": "00664181",
  "is-dongseo": "00115977",
  "isc": "00572905",
  "isupetasys": "00107613",
  "itm-semiconductor": "00579980",
  "jb-financial-group": "00980122",
  "jeju-air": "00555874",
  "jin-air": "00653024",
  "jusung-engineering": "00252135",
  "jw-pharmaceutical": "00149947",
  "jyp-entertainment": "00258689",
  "kakao": "00258801",
  "kakao-bank": "01133217",
  "kakao-pay": "01244601",
  "kb-financial-group": "00688996",
  "kcc": "00105271",
  "kcc-glass": "01428203",
  "kepco": "00159193",
  "kepco-engineering-construction": "00159209",
  "kepco-plant-service": "00159218",
  "kg-innocis": "00264547",
  "kg-mobility": "00138242",
  "kia": "00106641",
  "kiwoom-securities": "00296290",
  "koh-young": "00579999",
  "kolon-industries": "00795135",
  "konan-technology": "00601988",
  "korea-aerospace-industries": "00309503",
  "korea-district-heating": "00159698",
  "korea-gas": "00261285",
  "korea-investment-holdings": "00432102",
  "korea-zinc": "00102858",
  "korean-air": "00113526",
  "korean-re": "00113191",
  "krafton": "00760971",
  "kt": "00190321",
  "kt-corporation": "00190321",
  "ktng": "00244455",
  "kumho-petrochemical": "00106368",
  "kyeryong-construction": "00102432",
  "l-and-f": "00398701",
  "leeno-industrial": "00369657",
  "lg-chem": "00356361",
  "lg-corp": "00120021",
  "lg-display": "00105873",
  "lg-electronics": "00401731",
  "lg-energy-solution": "01515323",
  "lg-household-healthcare": "00356370",
  "lg-innotek": "00105961",
  "lg-uplus": "00231363",
  "lig-nex1": "00503668",
  "liga-chem-biosciences": "00842619",
  "lotte-chemical": "00165413",
  "lotte-chilsung": "00120571",
  "lotte-energy-materials": "00113997",
  "lotte-holdings": "00120562",
  "lotte-holdings-korea": "00120562",
  "lotte-non-life-insurance": "00113562",
  "lotte-shopping": "00120526",
  "lotte-wellfood": "01258507",
  "ls": "00105952",
  "ls-corp": "00105952",
  "ls-eco-energy": "01093007",
  "ls-electric": "00105855",
  "lunit": "01397620",
  "lx-international": "00120076",
  "maum-ai": "01297898",
  "medytox": "00580199",
  "megastudyedu": "01074862",
  "meritz-financial": "00860332",
  "mirae-asset-securities": "00111722",
  "moorim-pnp": "00119007",
  "nano-new-material": "00439965",
  "nature-cell": "00117276",
  "naver": "00266961",
  "ncsoft": "00261443",
  "neowiz": "00628860",
  "nepes": "00227333",
  "netmarble": "00904672",
  "neuromeka": "01336461",
  "nexon-games": "01096341",
  "nh-investment-securities": "00120182",
  "nhn-kcp": "00357740",
  "nongshim": "00108241",
  "oci": "01760738",
  "oci-holdings": "00148896",
  "orion": "01238169",
  "osstem-implant": "00341916",
  "ottogi": "00141529",
  "paradise": "00171265",
  "park-systems": "00244747",
  "pearl-abyss": "01152470",
  "peptron": "00415868",
  "pharmaresearch": "00970453",
  "pi-advanced-materials": "00767460",
  "pnt": "00612294",
  "polaris-office": "00269852",
  "poongsan": "00684714",
  "posco-future-m": "00155276",
  "posco-holdings": "00155319",
  "posco-international": "00124504",
  "psk": "01365825",
  "pulmuone": "00155355",
  "rainbow-robotics": "01261644",
  "robostar": "00536523",
  "robotis": "00946030",
  "s-oil": "00138279",
  "saltlux": "01050738",
  "samchundang-pharm": "00128546",
  "samhwa-networks": "00301112",
  "samsung-biologics": "00877059",
  "samsung-c-and-t": "00149655",
  "samsung-cnt": "00149655",
  "samsung-electro-mechanics": "00126371",
  "samsung-electronics": "00126380",
  "samsung-engineering": "00126308",
  "samsung-fire": "00139214",
  "samsung-fire-marine": "00139214",
  "samsung-heavy-industries": "00126478",
  "samsung-life": "00126256",
  "samsung-sdi": "00126362",
  "samsung-sds": "00126186",
  "samsung-securities": "00104856",
  "samyang-foods": "00126955",
  "sdi-biosensor": "00854997",
  "seah-beststeel": "00106669",
  "seegene": "00788773",
  "semco": "00126371",
  "sfa-engineering": "00358271",
  "sfa-semicon": "00301246",
  "shinhan-financial-group": "00382199",
  "shinsegae": "00136378",
  "shinsegye": "00136378",
  "silicon2": "00982023",
  "sillajen": "00919966",
  "simtech": "01095722",
  "sk": "00181712",
  "sk-biopharmaceuticals": "00878696",
  "sk-bioscience": "01319899",
  "sk-gas": "00144164",
  "sk-hynix": "00164779",
  "sk-iet": "01386916",
  "sk-inc": "00181712",
  "sk-innovation": "00631518",
  "sk-telecom": "00159023",
  "skc": "00139889",
  "sl-corp": "00125521",
  "sm-entertainment": "00260930",
  "snt-motiv": "00398792",
  "solum": "01159233",
  "soulbrain": "01489648",
  "spc-samlip": "00125530",
  "spg": "00220686",
  "st-pharm": "00871833",
  "studio-dragon": "01168684",
  "t-robotics": "00867098",
  "tck": "00245472",
  "tes": "00524421",
  "vieworks": "00609324",
  "viol": "01406618",
  "vuno": "01344202",
  "wcp": "01291317",
  "webzen": "00405320",
  "wemade": "00444329",
  "wonik-ips": "01135941",
  "wonik-qnc": "00468374",
  "wonjun": "01459212",
  "woori-financial-group": "01350869",
  "wtech": "01407909",
  "yduqs-korea": "00307222",
  "youngone": "00776820",
  "yuhan": "00145109",
  "yuil-robotics": "01152586",
  "yunsung-fnc": "00925374"
};

const companyOfficialLinks: Record<
  string,
  {
    officialWebsite: string;
    irUrl: string;
  }
> = {
  "abl-bio": {
    officialWebsite: "https://www.ablbio.com",
    irUrl: "https://www.ablbio.com"
  },
  "afreecatv": {
    officialWebsite: "https://corp.afreecatv.com",
    irUrl: "https://corp.afreecatv.com/ir.php"
  },
  "ahnlab": {
    officialWebsite: "https://www.ahnlab.com",
    irUrl: ""
  },
  "alteogen": {
    officialWebsite: "https://www.alteogen.com",
    irUrl: ""
  },
  "amorepacific": {
    officialWebsite: "https://www.apgroup.com",
    irUrl: ""
  },
  "ap-system": {
    officialWebsite: "https://www.apsystems.co.kr",
    irUrl: ""
  },
  "asiana-airlines": {
    officialWebsite: "https://www.flyasiana.com",
    irUrl: ""
  },
  "avaco": {
    officialWebsite: "https://www.avaco.co.kr",
    irUrl: ""
  },
  "bgf-retail": {
    officialWebsite: "https://www.bgfretail.com",
    irUrl: ""
  },
  "binex": {
    officialWebsite: "https://www.bi-nex.co.kr",
    irUrl: ""
  },
  "binggrae": {
    officialWebsite: "https://www.bing.co.kr",
    irUrl: ""
  },
  "bioinfra": {
    officialWebsite: "https://bioinfrakorea.co.kr",
    irUrl: ""
  },
  "bnk-financial-group": {
    officialWebsite: "https://www.bnkfg.com",
    irUrl: ""
  },
  "boryung": {
    officialWebsite: "https://www.boryung.co.kr",
    irUrl: "https://pharm.boryung.co.kr/ir/resource.do"
  },
  "bukwang-pharmaceutical": {
    officialWebsite: "https://www.bukwang.co.kr",
    irUrl: ""
  },
  "cafe24": {
    officialWebsite: "https://www.cafe24.com",
    irUrl: ""
  },
  "caregen": {
    officialWebsite: "https://caregen.co.kr",
    irUrl: ""
  },
  "celltrion": {
    officialWebsite: "https://www.celltrion.com",
    irUrl: "https://www.celltrion.com/ko-kr/investment/ir/"
  },
  "cha-biotech": {
    officialWebsite: "https://www.chabio.com",
    irUrl: "https://www.chabio.com"
  },
  "chongkundang": {
    officialWebsite: "https://www.ckdpharm.com",
    irUrl: ""
  },
  "chunbo": {
    officialWebsite: "https://www.chunbochem.com/",
    irUrl: ""
  },
  "cis": {
    officialWebsite: "https://www.cisro.co.kr",
    irUrl: ""
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
  "classys": {
    officialWebsite: "https://classys.co.kr",
    irUrl: ""
  },
  "com2us": {
    officialWebsite: "https://com2us.com/corporation",
    irUrl: ""
  },
  "cosmo-advanced-materials": {
    officialWebsite: "https://www.cosmoamt.com",
    irUrl: "https://www.cosmoamt.com/?page_id=11082"
  },
  "coway": {
    officialWebsite: "https://company.coway.com",
    irUrl: "https://www.cowayir.co.kr"
  },
  "daehan-synthetic-fiber": {
    officialWebsite: "https://www.kpic.co.kr",
    irUrl: ""
  },
  "daejoo-electronic-materials": {
    officialWebsite: "https://www.daejoo.co.kr",
    irUrl: ""
  },
  "daesang": {
    officialWebsite: "https://www.daesang.co.kr",
    irUrl: ""
  },
  "daesung-holdings": {
    officialWebsite: "http://www.daesung-holdings.com",
    irUrl: ""
  },
  "daewoo-engineering-construction": {
    officialWebsite: "https://daewooenc.com",
    irUrl: ""
  },
  "daewoong": {
    officialWebsite: "https://www.daewoong.com/",
    irUrl: ""
  },
  "daewoong-pharmaceutical": {
    officialWebsite: "https://www.daewoong.co.kr",
    irUrl: ""
  },
  "daishin-securities": {
    officialWebsite: "https://www.daishin.com",
    irUrl: ""
  },
  "danal": {
    officialWebsite: "https://www.danal.co.kr",
    irUrl: ""
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
  "deepnoid": {
    officialWebsite: "https://www.deepnoid.com",
    irUrl: ""
  },
  "dent": {
    officialWebsite: "https://www.i-det.com",
    irUrl: ""
  },
  "deoksan-neolux": {
    officialWebsite: "https://www.dsneolux.co.kr",
    irUrl: ""
  },
  "dexter-studios": {
    officialWebsite: "https://www.dexterstudios.com",
    irUrl: ""
  },
  "dgb-financial-group": {
    officialWebsite: "https://www.imfngroup.com",
    irUrl: ""
  },
  "dl-enc": {
    officialWebsite: "https://www.dlenc.co.kr",
    irUrl: ""
  },
  "dl-holdings": {
    officialWebsite: "https://www.dlholdings.co.kr",
    irUrl: ""
  },
  "dong-a-st": {
    officialWebsite: "https://www.donga.co.kr",
    irUrl: ""
  },
  "dong-suh": {
    officialWebsite: "https://www.dongsuh.com",
    irUrl: ""
  },
  "dongjin-semiconductor": {
    officialWebsite: "https://www.dongjin.com",
    irUrl: ""
  },
  "dongkook-pharmaceutical": {
    officialWebsite: "https://www.dkpharm.co.kr",
    irUrl: ""
  },
  "dongwon-fnb": {
    officialWebsite: "https://www.dongwonfnb.com",
    irUrl: ""
  },
  "dongyang-life": {
    officialWebsite: "https://www.myangel.co.kr",
    irUrl: ""
  },
  "doosan-enerbility": {
    officialWebsite: "https://www.doosanenerbility.com/kr",
    irUrl: "https://www.doosanenerbility.com/kr/investment/ir_data"
  },
  "doosan-tesna": {
    officialWebsite: "https://www.tesna.co.kr",
    irUrl: ""
  },
  "dreamus-company": {
    officialWebsite: "https://dreamuscompany.com",
    irUrl: ""
  },
  "e1": {
    officialWebsite: "https://www.e1.co.kr",
    irUrl: ""
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
  "enkem": {
    officialWebsite: "https://www.enchem.net",
    irUrl: ""
  },
  "eugene-technology": {
    officialWebsite: "https://www.eugenetech.co.kr",
    irUrl: ""
  },
  "fandf": {
    officialWebsite: "https://www.fnf.co.kr",
    irUrl: ""
  },
  "fasoo": {
    officialWebsite: "https://www.fasoo.com",
    irUrl: ""
  },
  "flitto": {
    officialWebsite: "https://www.flitto.com",
    irUrl: "https://www.flitto.com/ir/notices"
  },
  "gc-cell": {
    officialWebsite: "https://www.gclabcell.com",
    irUrl: ""
  },
  "genexine": {
    officialWebsite: "https://genexine.com",
    irUrl: "https://www.genexine.com"
  },
  "genians": {
    officialWebsite: "https://www.genians.co.kr/",
    irUrl: "https://www.genians.co.kr/"
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
  "gs-retail": {
    officialWebsite: "https://www.gsretail.com",
    irUrl: ""
  },
  "hana-financial-group": {
    officialWebsite: "https://www.hanafn.com",
    irUrl: "https://www.hanafn.com"
  },
  "hana-materials": {
    officialWebsite: "https://hanamts.com",
    irUrl: ""
  },
  "hana-micron": {
    officialWebsite: "https://www.hanamicron.co.kr",
    irUrl: ""
  },
  "hanall-biopharma": {
    officialWebsite: "https://www.hanall.co.kr",
    irUrl: ""
  },
  "handsome": {
    officialWebsite: "https://www.handsome.co.kr",
    irUrl: ""
  },
  "hanmi-global": {
    officialWebsite: "https://www.hanmiparsons.com",
    irUrl: ""
  },
  "hanmi-pharm": {
    officialWebsite: "",
    irUrl: "https://www.hanmi.co.kr/main.hm"
  },
  "hanmi-semiconductor": {
    officialWebsite: "https://www.hanmisemi.com",
    irUrl: ""
  },
  "hanshin-construction": {
    officialWebsite: "https://www.hanshinc.com",
    irUrl: ""
  },
  "hansol-chemical": {
    officialWebsite: "https://www.hansolchemical.com",
    irUrl: ""
  },
  "hansol-paper": {
    officialWebsite: "https://www.hansolpaper.co.kr",
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
  "hanwha-general-insurance": {
    officialWebsite: "https://www.hwgeneralins.com/",
    irUrl: ""
  },
  "hanwha-life": {
    officialWebsite: "https://www.hanwhalife.com",
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
  "hanwha-systems": {
    officialWebsite: "https://hanwhasystems.com",
    irUrl: "https://www.hanwhasystems.com"
  },
  "hd-hyundai": {
    officialWebsite: "https://www.hd.com",
    irUrl: "https://www.hd.com"
  },
  "hd-korea-shipbuilding": {
    officialWebsite: "https://www.ksoe.co.kr",
    irUrl: ""
  },
  "hdc-hyundai-development": {
    officialWebsite: "https://www.ipark-dvp.com",
    irUrl: ""
  },
  "hite-jinro": {
    officialWebsite: "https://www.hitejinro.com",
    irUrl: ""
  },
  "hj-shipbuilding": {
    officialWebsite: "https://www.hjsc.co.kr",
    irUrl: ""
  },
  "hl-mando": {
    officialWebsite: "https://www.mando.com",
    irUrl: ""
  },
  "hlb": {
    officialWebsite: "https://hlbbio.co.kr",
    irUrl: "https://www.hlbbio.co.kr"
  },
  "hlb-life-science": {
    officialWebsite: "https://www.hlb-ls.com",
    irUrl: ""
  },
  "hlb-pharmaceutical": {
    officialWebsite: "https://www.hlbpharma.co.kr",
    irUrl: ""
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
  "hugel": {
    officialWebsite: "https://www.hugel.co.kr",
    irUrl: ""
  },
  "humedix": {
    officialWebsite: "https://www.humedix.com",
    irUrl: ""
  },
  "hwashin": {
    officialWebsite: "https://www.hwashin.co.kr",
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
  "hyosung-corp": {
    officialWebsite: "https://www.hyosung.com",
    irUrl: "http://www.hyosung.co.kr/kr/ir/info/list.do"
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
  "hyundai-rotem": {
    officialWebsite: "https://www.hyundai-rotem.co.kr",
    irUrl: ""
  },
  "hyundai-steel": {
    officialWebsite: "https://www.hyundai-steel.com",
    irUrl: ""
  },
  "ibk": {
    officialWebsite: "https://www.ibk.co.kr",
    irUrl: "https://www.ibk.co.kr"
  },
  "ildong-pharmaceutical": {
    officialWebsite: "https://www.ildong.com",
    irUrl: ""
  },
  "ilyang-pharmaceutical": {
    officialWebsite: "https://www.ilyang.co.kr",
    irUrl: ""
  },
  "inbody": {
    officialWebsite: "https://www.inbody.com",
    irUrl: ""
  },
  "inox-advanced-materials": {
    officialWebsite: "https://www.innoxamc.com",
    irUrl: "http://www.innoxamc.com/invest/message01"
  },
  "intellian-technologies": {
    officialWebsite: "https://www.intelliantech.com",
    irUrl: ""
  },
  "is-dongseo": {
    officialWebsite: "https://www.isdongseo.co.kr",
    irUrl: ""
  },
  "isc": {
    officialWebsite: "https://isc21.kr",
    irUrl: "https://www.isc21.kr"
  },
  "isupetasys": {
    officialWebsite: "https://www.petasys.com",
    irUrl: ""
  },
  "itm-semiconductor": {
    officialWebsite: "https://www.it-m.co.kr",
    irUrl: ""
  },
  "jb-financial-group": {
    officialWebsite: "https://www.jbfg.com",
    irUrl: ""
  },
  "jeju-air": {
    officialWebsite: "https://www.jejuair.net",
    irUrl: "https://www.jejuair.net"
  },
  "jin-air": {
    officialWebsite: "https://www.jinair.com",
    irUrl: ""
  },
  "jusung-engineering": {
    officialWebsite: "https://www.jseng.com",
    irUrl: ""
  },
  "jw-pharmaceutical": {
    officialWebsite: "https://www.jw-pharma.co.kr",
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
  "kcc": {
    officialWebsite: "https://www.kccworld.co.kr",
    irUrl: "https://kccworld.irpage.co.kr"
  },
  "kcc-glass": {
    officialWebsite: "https://www.kccglass.co.kr",
    irUrl: "https://www.kccglass.co.kr/investmentInfo/disclosure.do"
  },
  "kepco": {
    officialWebsite: "https://www.kepco.co.kr",
    irUrl: ""
  },
  "kepco-engineering-construction": {
    officialWebsite: "https://www.kepco-enc.com",
    irUrl: ""
  },
  "kepco-plant-service": {
    officialWebsite: "https://www.kps.co.kr",
    irUrl: ""
  },
  "kg-innocis": {
    officialWebsite: "https://www.inicis.com",
    irUrl: ""
  },
  "kg-mobility": {
    officialWebsite: "https://www.kg-mobility.com",
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
  "koh-young": {
    officialWebsite: "https://www.kohyoung.com",
    irUrl: ""
  },
  "kolon-industries": {
    officialWebsite: "https://www.kolonindustries.com/",
    irUrl: "http://www.kolonindustries.com/"
  },
  "konan-technology": {
    officialWebsite: "https://konantech.com",
    irUrl: ""
  },
  "korea-aerospace-industries": {
    officialWebsite: "https://www.koreaaero.com",
    irUrl: ""
  },
  "korea-district-heating": {
    officialWebsite: "https://www.kdhc.co.kr",
    irUrl: ""
  },
  "korea-gas": {
    officialWebsite: "https://www.kogas.or.kr",
    irUrl: ""
  },
  "korea-investment-holdings": {
    officialWebsite: "https://www.koreaholdings.com",
    irUrl: ""
  },
  "korea-zinc": {
    officialWebsite: "https://www.koreazinc.co.kr",
    irUrl: ""
  },
  "korean-air": {
    officialWebsite: "https://www.koreanair.com",
    irUrl: ""
  },
  "korean-re": {
    officialWebsite: "https://www.koreanre.co.kr",
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
  "kt-corporation": {
    officialWebsite: "https://www.kt.com",
    irUrl: ""
  },
  "ktng": {
    officialWebsite: "https://www.ktng.com",
    irUrl: ""
  },
  "kumho-petrochemical": {
    officialWebsite: "https://www.kkpc.com",
    irUrl: ""
  },
  "kyeryong-construction": {
    officialWebsite: "https://www.krcon.co.kr",
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
  "lg-corp": {
    officialWebsite: "https://www.lg.co.kr",
    irUrl: "https://www.lg.co.kr"
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
  "liga-chem-biosciences": {
    officialWebsite: "https://www.ligachembio.com",
    irUrl: ""
  },
  "lotte-chemical": {
    officialWebsite: "https://www.lottechem.com",
    irUrl: "https://www.lottechem.com/ko/ir/ir_activity.do"
  },
  "lotte-chilsung": {
    officialWebsite: "https://company.lottechilsung.co.kr",
    irUrl: "https://company.lottechilsung.co.kr/kor/invest/irreport/list.do"
  },
  "lotte-energy-materials": {
    officialWebsite: "https://www.lotteenergymaterials.com",
    irUrl: ""
  },
  "lotte-holdings": {
    officialWebsite: "https://www.lotte.co.kr",
    irUrl: "https://www.lotte.co.kr"
  },
  "lotte-holdings-korea": {
    officialWebsite: "https://www.lotte.co.kr",
    irUrl: "https://www.lotte.co.kr"
  },
  "lotte-non-life-insurance": {
    officialWebsite: "https://www.lotteins.co.kr",
    irUrl: ""
  },
  "lotte-shopping": {
    officialWebsite: "https://www.lotteshoppingir.com/",
    irUrl: "http://www.lotteshoppingir.com/"
  },
  "lotte-wellfood": {
    officialWebsite: "https://www.lottewellfood.com",
    irUrl: "https://www.lottewellfood.com/invest/ir"
  },
  "ls": {
    officialWebsite: "https://www.lsholdings.co.kr",
    irUrl: ""
  },
  "ls-corp": {
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
  "lunit": {
    officialWebsite: "https://www.lunit.io",
    irUrl: ""
  },
  "lx-international": {
    officialWebsite: "https://www.lxinternational.com",
    irUrl: "https://www.lxinternational.com/kr/investment/result_data"
  },
  "maum-ai": {
    officialWebsite: "https://maum.ai",
    irUrl: "https://maum.ai"
  },
  "medytox": {
    officialWebsite: "https://www.medytox.com",
    irUrl: ""
  },
  "megastudyedu": {
    officialWebsite: "https://www.megastudy.net",
    irUrl: ""
  },
  "meritz-financial": {
    officialWebsite: "https://www.meritzgroup.com",
    irUrl: ""
  },
  "mirae-asset-securities": {
    officialWebsite: "https://securities.miraeasset.com",
    irUrl: "https://ci.securities.miraeasset.com"
  },
  "moorim-pnp": {
    officialWebsite: "https://www.moorimpnp.co.kr",
    irUrl: ""
  },
  "nano-new-material": {
    officialWebsite: "https://anapro.com",
    irUrl: ""
  },
  "nature-cell": {
    officialWebsite: "https://www.naturecell.co.kr",
    irUrl: ""
  },
  "naver": {
    officialWebsite: "https://www.navercorp.com",
    irUrl: "https://www.navercorp.com/investment/investors"
  },
  "ncsoft": {
    officialWebsite: "https://www.nc.com",
    irUrl: ""
  },
  "neowiz": {
    officialWebsite: "https://www.neowizgames.com",
    irUrl: ""
  },
  "nepes": {
    officialWebsite: "https://www.nepes.co.kr",
    irUrl: ""
  },
  "netmarble": {
    officialWebsite: "https://company.netmarble.com",
    irUrl: ""
  },
  "neuromeka": {
    officialWebsite: "https://www.neuromeka.com",
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
  "nhn-kcp": {
    officialWebsite: "https://www.kcp.co.kr",
    irUrl: ""
  },
  "nongshim": {
    officialWebsite: "https://www.nongshim.com",
    irUrl: ""
  },
  "oci": {
    officialWebsite: "https://www.oci.co.kr",
    irUrl: ""
  },
  "oci-holdings": {
    officialWebsite: "https://www.oci-holdings.co.kr",
    irUrl: ""
  },
  "orion": {
    officialWebsite: "https://www.orionworld.com",
    irUrl: "https://www.orionworld.com"
  },
  "osstem-implant": {
    officialWebsite: "https://www.osstem.com",
    irUrl: ""
  },
  "ottogi": {
    officialWebsite: "https://www.otoki.com",
    irUrl: ""
  },
  "paradise": {
    officialWebsite: "https://www.paradise.co.kr/ko/main",
    irUrl: "https://www.paradise.co.kr/ko/invest/ir/reference"
  },
  "park-systems": {
    officialWebsite: "https://www.parkafm.co.kr",
    irUrl: ""
  },
  "pearl-abyss": {
    officialWebsite: "https://www.pearlabyss.com",
    irUrl: ""
  },
  "peptron": {
    officialWebsite: "https://www.peptron.co.kr",
    irUrl: ""
  },
  "pharmaresearch": {
    officialWebsite: "https://pharmaresearch.com/",
    irUrl: ""
  },
  "pi-advanced-materials": {
    officialWebsite: "https://www.pimaterials.com",
    irUrl: "https://pimaterials.irpage.co.kr/"
  },
  "pnt": {
    officialWebsite: "https://www.epnt.co.kr",
    irUrl: ""
  },
  "polaris-office": {
    officialWebsite: "https://www.polarisofficecorp.com",
    irUrl: ""
  },
  "poongsan": {
    officialWebsite: "https://www.poongsan.co.kr",
    irUrl: ""
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
  "psk": {
    officialWebsite: "https://www.pskinc.com",
    irUrl: ""
  },
  "pulmuone": {
    officialWebsite: "https://www.pulmuone.co.kr",
    irUrl: ""
  },
  "rainbow-robotics": {
    officialWebsite: "https://www.rainbow-robotics.com/new/index_ko.php",
    irUrl: ""
  },
  "robostar": {
    officialWebsite: "https://robostar.co.kr",
    irUrl: ""
  },
  "robotis": {
    officialWebsite: "https://www.robotis.com",
    irUrl: ""
  },
  "s-oil": {
    officialWebsite: "https://www.s-oil.com",
    irUrl: ""
  },
  "saltlux": {
    officialWebsite: "https://www.saltlux.com/",
    irUrl: "https://www.saltlux.com/"
  },
  "samchundang-pharm": {
    officialWebsite: "https://www.scd.co.kr",
    irUrl: ""
  },
  "samhwa-networks": {
    officialWebsite: "https://www.shnetworks.co.kr",
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
  "samsung-cnt": {
    officialWebsite: "https://www.samsungcnt.com",
    irUrl: ""
  },
  "samsung-electro-mechanics": {
    officialWebsite: "https://www.sem.samsung.co.kr",
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
  "samsung-fire-marine": {
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
  "samyang-foods": {
    officialWebsite: "https://www.samyangfoods.com",
    irUrl: ""
  },
  "sdi-biosensor": {
    officialWebsite: "https://sdbiosensor.co.kr/",
    irUrl: ""
  },
  "seah-beststeel": {
    officialWebsite: "https://www.seahbesteel.co.kr",
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
  "sfa-engineering": {
    officialWebsite: "https://www.sfa.co.kr",
    irUrl: "http://www.sfa.co.kr/ir/finance"
  },
  "sfa-semicon": {
    officialWebsite: "https://www.sfasemicon.com",
    irUrl: "https://www.sfasemicon.com"
  },
  "shinhan-financial-group": {
    officialWebsite: "https://www.shinhangroup.com",
    irUrl: ""
  },
  "shinsegae": {
    officialWebsite: "https://www.shinsegae.com",
    irUrl: "https://www.shinsegae.com/company/ir-ko/corporate-governance.do#direct_move"
  },
  "shinsegye": {
    officialWebsite: "https://www.shinsegae.com",
    irUrl: "https://www.shinsegae.com/company/ir-ko/corporate-governance.do#direct_move"
  },
  "silicon2": {
    officialWebsite: "https://www.siliconii.com",
    irUrl: "https://www.siliconii.com/sub/sub05_01.php"
  },
  "sillajen": {
    officialWebsite: "https://www.sillajen.com",
    irUrl: ""
  },
  "simtech": {
    officialWebsite: "https://www.simmtech.co.kr",
    irUrl: ""
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
  "sk-gas": {
    officialWebsite: "https://www.skgas.co.kr/",
    irUrl: ""
  },
  "sk-hynix": {
    officialWebsite: "https://www.skhynix.com",
    irUrl: ""
  },
  "sk-iet": {
    officialWebsite: "https://www.skietechnology.com/",
    irUrl: ""
  },
  "sk-inc": {
    officialWebsite: "https://www.sk-inc.com/",
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
  "skc": {
    officialWebsite: "https://www.skc.kr",
    irUrl: "http://www.skc.kr/"
  },
  "sl-corp": {
    officialWebsite: "https://www.slworld.com",
    irUrl: ""
  },
  "sm-entertainment": {
    officialWebsite: "https://smentertainment.com",
    irUrl: "https://smentertainment.com"
  },
  "snt-motiv": {
    officialWebsite: "https://www.sntdaewoo.com",
    irUrl: ""
  },
  "solum": {
    officialWebsite: "https://www.solum-group.co.kr",
    irUrl: "http://www.solum-group.com"
  },
  "soulbrain": {
    officialWebsite: "https://www.soulbrain.co.kr",
    irUrl: ""
  },
  "spc-samlip": {
    officialWebsite: "https://www.spcsamlip.co.kr",
    irUrl: ""
  },
  "spg": {
    officialWebsite: "https://www.spg.co.kr",
    irUrl: "https://www.spg.co.kr"
  },
  "st-pharm": {
    officialWebsite: "https://www.stpharm.co.kr",
    irUrl: ""
  },
  "studio-dragon": {
    officialWebsite: "https://www.studiodragon.net",
    irUrl: ""
  },
  "t-robotics": {
    officialWebsite: "https://www.t-robotics.net/",
    irUrl: ""
  },
  "tck": {
    officialWebsite: "https://www.tck.co.kr",
    irUrl: ""
  },
  "tes": {
    officialWebsite: "http://www.hites.co.kr",
    irUrl: "https://www.hites.co.kr"
  },
  "vieworks": {
    officialWebsite: "https://www.vieworks.com",
    irUrl: ""
  },
  "viol": {
    officialWebsite: "https://www.viol.co.kr",
    irUrl: ""
  },
  "vuno": {
    officialWebsite: "https://www.vuno.co",
    irUrl: ""
  },
  "wcp": {
    officialWebsite: "https://wcp.kr/",
    irUrl: ""
  },
  "webzen": {
    officialWebsite: "https://company.webzen.com",
    irUrl: ""
  },
  "wemade": {
    officialWebsite: "https://wemade.com",
    irUrl: "https://corp.wemade.com/IrKr"
  },
  "wonik-ips": {
    officialWebsite: "https://www.ips.co.kr",
    irUrl: ""
  },
  "wonik-qnc": {
    officialWebsite: "https://www.wonikqnc.com",
    irUrl: ""
  },
  "wonjun": {
    officialWebsite: "https://www.onejoon.co.kr/",
    irUrl: ""
  },
  "woori-financial-group": {
    officialWebsite: "https://www.woorifg.com/",
    irUrl: ""
  },
  "wtech": {
    officialWebsite: "https://없음",
    irUrl: ""
  },
  "yduqs-korea": {
    officialWebsite: "https://www.ybmsisa.com",
    irUrl: ""
  },
  "youngone": {
    officialWebsite: "",
    irUrl: ""
  },
  "yuhan": {
    officialWebsite: "https://www.yuhan.co.kr",
    irUrl: ""
  },
  "yuil-robotics": {
    officialWebsite: "https://www.yuilrobotics.com",
    irUrl: "https://www.yuilrobotics.com"
  },
  "yunsung-fnc": {
    officialWebsite: "https://www.ysfc.co.kr",
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
  ["lg-innotek", "LG이노텍", "LI", "KOSPI", "011070", "전자부품", "카메라모듈, 기판소재, 전장부품 등 전자부품 사업을 운영하는 기업입니다.", ["카메라모듈", "기판소재", "전장부품", "전자부품"]],
  [
    "rainbow-robotics",
    "레인보우로보틱스",
    "RB",
    "KOSDAQ",
    "277810",
    "로봇",
    "레인보우로보틱스는 이족보행 로봇, 협동로봇, 로봇 플랫폼 기술을 개발하는 로봇 전문 기업입니다.",
    ["협동로봇","휴머노이드","로봇 플랫폼","로봇 제어"]
  ],
  [
    "samchundang-pharm",
    "삼천당제약",
    "SCD",
    "KOSDAQ",
    "000250",
    "제약·바이오",
    "삼천당제약은 안과용 의약품, 전문의약품, 바이오시밀러 개발 사업을 운영하는 제약 기업입니다.",
    ["안과 의약품","전문의약품","바이오시밀러","제약"]
  ],
  [
    "jusung-engineering",
    "주성엔지니어링",
    "JSE",
    "KOSDAQ",
    "036930",
    "반도체 장비",
    "주성엔지니어링은 반도체, 디스플레이, 태양광 제조 장비를 공급하는 장비 기업입니다.",
    ["반도체 장비","증착 장비","디스플레이 장비","태양광 장비"]
  ],
  [
    "liga-chem-biosciences",
    "리가켐바이오",
    "LCB",
    "KOSDAQ",
    "141080",
    "제약·바이오",
    "리가켐바이오는 항체약물접합체와 신약 후보물질을 개발하는 바이오 기업입니다.",
    ["ADC","신약 개발","바이오의약품","플랫폼 기술"]
  ],
  [
    "abl-bio",
    "에이비엘바이오",
    "ABL",
    "KOSDAQ",
    "298380",
    "제약·바이오",
    "에이비엘바이오는 이중항체 플랫폼과 항암·면역질환 치료제를 개발하는 바이오 기업입니다.",
    ["이중항체","항암제","면역질환","바이오 플랫폼"]
  ],
  [
    "isupetasys",
    "이수페타시스",
    "ISP",
    "KOSDAQ",
    "007660",
    "전자부품",
    "이수페타시스는 통신장비와 서버용 고다층 인쇄회로기판을 제조하는 전자부품 기업입니다.",
    ["PCB","고다층기판","통신장비","서버 부품"]
  ],
  [
    "silicon2",
    "실리콘투",
    "S2",
    "KOSDAQ",
    "257720",
    "유통·화장품",
    "실리콘투는 K-뷰티 브랜드의 글로벌 유통과 이커머스 플랫폼 사업을 운영하는 기업입니다.",
    ["화장품 유통","K-뷰티","이커머스","글로벌 물류"]
  ],
  [
    "classys",
    "클래시스",
    "CLS",
    "KOSDAQ",
    "214150",
    "의료기기",
    "클래시스는 피부미용 의료기기와 에너지 기반 미용 장비를 개발·판매하는 기업입니다.",
    ["의료기기","미용장비","피부미용","소모품"]
  ],
  [
    "peptron",
    "펩트론",
    "PTR",
    "KOSDAQ",
    "087010",
    "제약·바이오",
    "펩트론은 펩타이드 기반 약효지속성 의약품과 신약 플랫폼을 개발하는 바이오 기업입니다.",
    ["펩타이드","약효지속성","신약 개발","바이오 플랫폼"]
  ],
  [
    "wemade",
    "위메이드",
    "WMD",
    "KOSDAQ",
    "112040",
    "게임",
    "위메이드는 온라인·모바일 게임 개발과 블록체인 기반 게임 플랫폼 사업을 운영하는 기업입니다.",
    ["게임","모바일 게임","블록체인 게임","플랫폼"]
  ],
  [
    "pearl-abyss",
    "펄어비스",
    "PA",
    "KOSDAQ",
    "263750",
    "게임",
    "펄어비스는 검은사막 등 글로벌 게임 IP를 개발·서비스하는 게임 기업입니다.",
    ["게임 개발","MMORPG","콘솔 게임","글로벌 게임"]
  ],
  [
    "com2us",
    "컴투스",
    "CTS",
    "KOSDAQ",
    "078340",
    "게임",
    "컴투스는 모바일 게임, 콘텐츠, 미디어 사업을 운영하는 게임·콘텐츠 기업입니다.",
    ["모바일 게임","게임 퍼블리싱","콘텐츠","IP"]
  ],
  [
    "webzen",
    "웹젠",
    "WZ",
    "KOSDAQ",
    "069080",
    "게임",
    "웹젠은 온라인·모바일 게임 개발과 퍼블리싱 사업을 운영하는 게임 기업입니다.",
    ["온라인 게임","모바일 게임","게임 퍼블리싱","IP"]
  ],
  [
    "afreecatv",
    "SOOP",
    "SOOP",
    "KOSDAQ",
    "067160",
    "인터넷·플랫폼",
    "SOOP은 라이브 스트리밍 플랫폼과 디지털 콘텐츠 서비스를 운영하는 인터넷 플랫폼 기업입니다.",
    ["라이브 스트리밍","플랫폼","디지털 콘텐츠","광고"]
  ],
  [
    "dreamus-company",
    "드림어스컴퍼니",
    "DRM",
    "KOSDAQ",
    "060570",
    "콘텐츠·음악",
    "드림어스컴퍼니는 음악 플랫폼, 콘텐츠 유통, 엔터테인먼트 관련 사업을 운영하는 기업입니다.",
    ["음악 플랫폼","콘텐츠 유통","엔터테인먼트","디지털 콘텐츠"]
  ],
  [
    "samhwa-networks",
    "삼화네트웍스",
    "SHN",
    "KOSDAQ",
    "046390",
    "콘텐츠",
    "삼화네트웍스는 드라마와 방송 콘텐츠를 제작하는 영상 콘텐츠 제작사입니다.",
    ["드라마 제작","방송 콘텐츠","영상 콘텐츠","콘텐츠 IP"]
  ],
  [
    "studio-dragon",
    "스튜디오드래곤",
    "SD",
    "KOSDAQ",
    "253450",
    "콘텐츠",
    "스튜디오드래곤은 드라마 제작, 콘텐츠 기획, 글로벌 유통 사업을 운영하는 콘텐츠 기업입니다.",
    ["드라마 제작","콘텐츠 IP","글로벌 유통","미디어"]
  ],
  [
    "dexter-studios",
    "덱스터",
    "DX",
    "KOSDAQ",
    "206560",
    "콘텐츠·VFX",
    "덱스터는 영화·드라마 시각효과, 콘텐츠 제작, 후반작업 사업을 운영하는 VFX 기업입니다.",
    ["VFX","콘텐츠 제작","후반작업","영상 기술"]
  ],
  [
    "osstem-implant",
    "오스템임플란트",
    "OSI",
    "KOSDAQ",
    "048260",
    "의료기기",
    "오스템임플란트는 치과용 임플란트와 치과 장비를 제조·판매하는 의료기기 기업입니다.",
    ["임플란트","치과장비","의료기기","치과 솔루션"]
  ],
  [
    "hugel",
    "휴젤",
    "HGL",
    "KOSDAQ",
    "145020",
    "제약·바이오",
    "휴젤은 보툴리눔 톡신, 필러, 미용·의료용 바이오 제품을 개발·판매하는 기업입니다.",
    ["보툴리눔 톡신","필러","미용의료","바이오"]
  ],
  [
    "medytox",
    "메디톡스",
    "MTX",
    "KOSDAQ",
    "086900",
    "제약·바이오",
    "메디톡스는 보툴리눔 톡신과 바이오 의약품을 개발·판매하는 바이오 제약 기업입니다.",
    ["보툴리눔 톡신","바이오의약품","미용의료","제약"]
  ],
  [
    "caregen",
    "케어젠",
    "CG",
    "KOSDAQ",
    "214370",
    "바이오 소재",
    "케어젠은 펩타이드 기반 기능성 소재와 헬스케어 제품을 개발하는 바이오 기업입니다.",
    ["펩타이드","바이오 소재","헬스케어","기능성 제품"]
  ],
  [
    "sdi-biosensor",
    "에스디바이오센서",
    "SDB",
    "KOSDAQ",
    "137310",
    "진단·바이오",
    "에스디바이오센서는 체외진단 제품과 진단 플랫폼을 개발·판매하는 진단 기업입니다.",
    ["체외진단","진단키트","진단 플랫폼","바이오"]
  ],
  [
    "bioinfra",
    "바이오인프라",
    "BIO",
    "KOSDAQ",
    "199730",
    "바이오서비스",
    "바이오인프라는 의약품 분석, 생동성 시험, 임상시험 지원 서비스를 제공하는 바이오 서비스 기업입니다.",
    ["의약품 분석","임상시험","생동성 시험","바이오서비스"]
  ],
  [
    "intellian-technologies",
    "인텔리안테크",
    "ITN",
    "KOSDAQ",
    "189300",
    "통신장비",
    "인텔리안테크는 위성통신 안테나와 해상·항공용 통신 장비를 공급하는 통신장비 기업입니다.",
    ["위성통신","안테나","해상통신","통신장비"]
  ],
  [
    "ap-system",
    "AP시스템",
    "APS",
    "KOSDAQ",
    "265520",
    "디스플레이 장비",
    "AP시스템은 디스플레이와 반도체 제조 공정 장비를 공급하는 장비 기업입니다.",
    ["디스플레이 장비","반도체 장비","공정 장비","자동화"]
  ],
  [
    "sfa-engineering",
    "SFA",
    "SFA",
    "KOSDAQ",
    "056190",
    "자동화 장비",
    "SFA는 디스플레이, 2차전지, 물류 자동화 장비와 스마트팩토리 솔루션을 제공하는 기업입니다.",
    ["자동화 장비","스마트팩토리","물류 자동화","2차전지 장비"]
  ],
  [
    "wonik-qnc",
    "원익QnC",
    "WQNC",
    "KOSDAQ",
    "074600",
    "반도체 소재·부품",
    "원익QnC는 반도체 공정용 쿼츠, 세라믹, 세정 사업을 운영하는 소재·부품 기업입니다.",
    ["쿼츠","세라믹","반도체 부품","세정"]
  ],
  [
    "tes",
    "테스",
    "TES",
    "KOSDAQ",
    "095610",
    "반도체 장비",
    "테스는 반도체 증착과 식각 관련 공정 장비를 개발·공급하는 반도체 장비 기업입니다.",
    ["반도체 장비","증착","식각","공정 장비"]
  ],
  [
    "eugene-technology",
    "유진테크",
    "EGT",
    "KOSDAQ",
    "084370",
    "반도체 장비",
    "유진테크는 반도체 박막 증착 장비를 공급하는 반도체 장비 기업입니다.",
    ["반도체 장비","박막 증착","공정 장비","웨이퍼"]
  ],
  [
    "psk",
    "피에스케이",
    "PSK",
    "KOSDAQ",
    "319660",
    "반도체 장비",
    "피에스케이는 반도체 전공정 장비와 후공정 장비를 공급하는 반도체 장비 기업입니다.",
    ["반도체 장비","전공정","후공정","공정 솔루션"]
  ],
  [
    "park-systems",
    "파크시스템스",
    "PKS",
    "KOSDAQ",
    "140860",
    "계측장비",
    "파크시스템스는 원자현미경과 나노 계측 장비를 개발·판매하는 첨단 계측장비 기업입니다.",
    ["원자현미경","계측장비","나노 기술","검사장비"]
  ],
  [
    "koh-young",
    "고영",
    "KY",
    "KOSDAQ",
    "098460",
    "검사장비",
    "고영은 3D 검사장비와 스마트팩토리 검사 솔루션을 제공하는 검사장비 기업입니다.",
    ["3D 검사","검사장비","스마트팩토리","전자제조"]
  ],
  [
    "inbody",
    "인바디",
    "IB",
    "KOSDAQ",
    "041830",
    "의료기기",
    "인바디는 체성분 분석기와 헬스케어 측정 장비를 개발·판매하는 의료기기 기업입니다.",
    ["체성분 분석","의료기기","헬스케어","측정장비"]
  ],
  [
    "vieworks",
    "뷰웍스",
    "VW",
    "KOSDAQ",
    "100120",
    "영상장비",
    "뷰웍스는 의료·산업용 디지털 영상 장비와 카메라 솔루션을 제공하는 기업입니다.",
    ["의료영상","산업용 카메라","영상장비","디지털 이미징"]
  ],
  [
    "lunit",
    "루닛",
    "LNT",
    "KOSDAQ",
    "328130",
    "의료AI",
    "루닛은 의료영상 분석과 암 진단 보조 인공지능 솔루션을 개발하는 의료AI 기업입니다.",
    ["의료AI","암 진단","영상 분석","진단 보조"]
  ],
  [
    "vuno",
    "뷰노",
    "VUNO",
    "KOSDAQ",
    "338220",
    "의료AI",
    "뷰노는 의료 인공지능 솔루션과 생체신호 분석 기술을 개발하는 의료AI 기업입니다.",
    ["의료AI","생체신호","진단 보조","의료 데이터"]
  ],
  [
    "deepnoid",
    "딥노이드",
    "DPN",
    "KOSDAQ",
    "315640",
    "의료AI",
    "딥노이드는 의료영상 인공지능과 AI 개발 플랫폼을 제공하는 의료AI 기업입니다.",
    ["의료AI","의료영상","AI 플랫폼","진단 보조"]
  ],
  [
    "neowiz",
    "네오위즈",
    "NWZ",
    "KOSDAQ",
    "095660",
    "게임",
    "네오위즈는 PC·모바일 게임 개발과 글로벌 퍼블리싱 사업을 운영하는 게임 기업입니다.",
    ["게임 개발","게임 퍼블리싱","PC 게임","모바일 게임"]
  ],
  [
    "nhn-kcp",
    "NHN KCP",
    "KCP",
    "KOSDAQ",
    "060250",
    "결제",
    "NHN KCP는 온라인 결제대행, 전자결제, 부가서비스를 제공하는 결제 인프라 기업입니다.",
    ["전자결제","PG","온라인 결제","핀테크"]
  ],
  [
    "kg-innocis",
    "KG이니시스",
    "KGI",
    "KOSDAQ",
    "035600",
    "결제",
    "KG이니시스는 전자결제대행, 온라인 결제, 핀테크 서비스를 제공하는 결제 기업입니다.",
    ["전자결제","PG","온라인 결제","핀테크"]
  ],
  [
    "danal",
    "다날",
    "DNL",
    "KOSDAQ",
    "064260",
    "결제·핀테크",
    "다날은 휴대폰 결제, 간편결제, 디지털 콘텐츠 결제 서비스를 제공하는 핀테크 기업입니다.",
    ["휴대폰 결제","간편결제","핀테크","디지털 결제"]
  ],
  [
    "kg-mobility",
    "KG모빌리티",
    "KGM",
    "KOSDAQ",
    "003620",
    "자동차",
    "KG모빌리티는 SUV와 전기차 등 완성차를 개발·판매하는 자동차 기업입니다.",
    ["완성차","SUV","전기차","자동차"]
  ],
  [
    "cafe24",
    "카페24",
    "C24",
    "KOSDAQ",
    "042000",
    "이커머스 플랫폼",
    "카페24는 온라인 쇼핑몰 구축, 호스팅, 글로벌 전자상거래 솔루션을 제공하는 플랫폼 기업입니다.",
    ["이커머스","쇼핑몰 솔루션","호스팅","플랫폼"]
  ],
  [
    "megastudyedu",
    "메가스터디교육",
    "MSE",
    "KOSDAQ",
    "215200",
    "교육",
    "메가스터디교육은 온라인·오프라인 교육 콘텐츠와 입시 교육 서비스를 제공하는 교육 기업입니다.",
    ["온라인 교육","입시교육","교육 콘텐츠","학원"]
  ],
  [
    "yduqs-korea",
    "YBM넷",
    "YBM",
    "KOSDAQ",
    "057030",
    "교육",
    "YBM넷은 온라인 영어교육, 시험 접수, 교육 플랫폼 사업을 운영하는 교육 기업입니다.",
    ["온라인 교육","영어교육","시험 접수","교육 플랫폼"]
  ],
  [
    "hlb-life-science",
    "HLB생명과학",
    "HLBLS",
    "KOSDAQ",
    "067630",
    "제약·바이오",
    "HLB생명과학은 바이오 의약품, 신약 개발, 헬스케어 관련 사업을 운영하는 바이오 기업입니다.",
    ["신약 개발","바이오의약품","헬스케어","제약"]
  ],
  [
    "hlb-pharmaceutical",
    "HLB제약",
    "HLBP",
    "KOSDAQ",
    "047920",
    "제약·바이오",
    "HLB제약은 전문의약품, 개량신약, 바이오헬스케어 제품을 개발·판매하는 제약 기업입니다.",
    ["전문의약품","개량신약","제약","헬스케어"]
  ],
  [
    "sillajen",
    "신라젠",
    "SLJ",
    "KOSDAQ",
    "215600",
    "제약·바이오",
    "신라젠은 항암 바이러스와 면역항암제 후보물질을 개발하는 바이오 기업입니다.",
    ["항암제","면역항암","바이오","신약 개발"]
  ],
  [
    "nature-cell",
    "네이처셀",
    "NC",
    "KOSDAQ",
    "007390",
    "바이오",
    "네이처셀은 줄기세포, 바이오, 헬스케어 관련 사업을 운영하는 바이오 기업입니다.",
    ["줄기세포","바이오","헬스케어","재생의료"]
  ],
  [
    "binex",
    "바이넥스",
    "BNX",
    "KOSDAQ",
    "053030",
    "제약·바이오",
    "바이넥스는 의약품 제조와 바이오의약품 위탁생산 사업을 운영하는 제약·바이오 기업입니다.",
    ["의약품 제조","바이오의약품","CMO","제약"]
  ],
  [
    "st-pharm",
    "에스티팜",
    "STP",
    "KOSDAQ",
    "237690",
    "제약·바이오",
    "에스티팜은 원료의약품, 올리고핵산 치료제 원료, 신약 개발 서비스를 제공하는 제약 기업입니다.",
    ["원료의약품","올리고핵산","CDMO","신약 개발"]
  ],
  [
    "dongkook-pharmaceutical",
    "동국제약",
    "DKP",
    "KOSDAQ",
    "086450",
    "제약",
    "동국제약은 일반의약품, 전문의약품, 헬스케어 제품을 제조·판매하는 제약 기업입니다.",
    ["일반의약품","전문의약품","헬스케어","제약"]
  ],
  [
    "genexine",
    "제넥신",
    "GX",
    "KOSDAQ",
    "095700",
    "제약·바이오",
    "제넥신은 면역치료제, 유전자 기반 치료제, 바이오 신약을 개발하는 바이오 기업입니다.",
    ["면역치료제","유전자 치료","바이오신약","플랫폼 기술"]
  ],
  [
    "cha-biotech",
    "차바이오텍",
    "CHA",
    "KOSDAQ",
    "085660",
    "바이오·의료",
    "차바이오텍은 세포치료제, 줄기세포, 의료서비스 관련 사업을 운영하는 바이오 기업입니다.",
    ["세포치료제","줄기세포","의료서비스","바이오"]
  ],
  [
    "gc-cell",
    "지씨셀",
    "GCC",
    "KOSDAQ",
    "144510",
    "제약·바이오",
    "지씨셀은 세포치료제, 검체검사, 바이오 물류 서비스를 제공하는 바이오 기업입니다.",
    ["세포치료제","검체검사","바이오물류","면역치료"]
  ],
  [
    "pharmaresearch",
    "파마리서치",
    "PR",
    "KOSDAQ",
    "214450",
    "제약·바이오",
    "파마리서치는 재생의학 기반 의약품, 의료기기, 화장품 사업을 운영하는 기업입니다.",
    ["재생의학","의료기기","의약품","화장품"]
  ],
  [
    "wtech",
    "원텍",
    "WT",
    "KOSDAQ",
    "336570",
    "의료기기",
    "원텍은 피부미용과 의료용 레이저·에너지 기반 의료기기를 개발·판매하는 기업입니다.",
    ["의료기기","피부미용","레이저 장비","에너지 장비"]
  ],
  [
    "viol",
    "비올",
    "VIOL",
    "KOSDAQ",
    "335890",
    "의료기기",
    "비올은 피부미용 의료기기와 고주파 기반 장비를 개발·판매하는 의료기기 기업입니다.",
    ["미용의료","고주파 장비","의료기기","피부미용"]
  ],
  [
    "humedix",
    "휴메딕스",
    "HMD",
    "KOSDAQ",
    "200670",
    "제약·바이오",
    "휴메딕스는 필러, 점안제, 전문의약품, 에스테틱 제품을 개발·판매하는 제약 기업입니다.",
    ["필러","점안제","전문의약품","에스테틱"]
  ],
  [
    "daejoo-electronic-materials",
    "대주전자재료",
    "DJM",
    "KOSDAQ",
    "078600",
    "2차전지 소재",
    "대주전자재료는 2차전지 소재, 전자재료, 디스플레이 소재를 개발·공급하는 소재 기업입니다.",
    ["2차전지 소재","실리콘 음극재","전자재료","디스플레이 소재"]
  ],
  [
    "chunbo",
    "천보",
    "CB",
    "KOSDAQ",
    "278280",
    "2차전지 소재",
    "천보는 2차전지 전해질, 전자재료, 정밀화학 소재를 생산하는 소재 기업입니다.",
    ["전해질","2차전지 소재","정밀화학","전자재료"]
  ],
  [
    "enkem",
    "엔켐",
    "EK",
    "KOSDAQ",
    "348370",
    "2차전지 소재",
    "엔켐은 2차전지 전해액을 제조·공급하는 배터리 소재 기업입니다.",
    ["전해액","2차전지 소재","배터리 소재","전기차"]
  ],
  [
    "wcp",
    "더블유씨피",
    "WCP",
    "KOSDAQ",
    "393890",
    "2차전지 소재",
    "더블유씨피는 2차전지 분리막을 제조·공급하는 배터리 소재 기업입니다.",
    ["분리막","2차전지 소재","배터리","전기차"]
  ],
  [
    "nano-new-material",
    "나노신소재",
    "NNS",
    "KOSDAQ",
    "121600",
    "소재",
    "나노신소재는 디스플레이, 반도체, 2차전지용 나노 소재를 개발·공급하는 소재 기업입니다.",
    ["나노소재","2차전지 소재","디스플레이 소재","반도체 소재"]
  ],
  [
    "pnt",
    "피엔티",
    "PNT",
    "KOSDAQ",
    "137400",
    "2차전지 장비",
    "피엔티는 2차전지 전극공정 장비와 소재 생산 장비를 공급하는 장비 기업입니다.",
    ["2차전지 장비","전극공정","롤투롤","소재 장비"]
  ],
  [
    "yunsung-fnc",
    "윤성에프앤씨",
    "YSF",
    "KOSDAQ",
    "372170",
    "2차전지 장비",
    "윤성에프앤씨는 2차전지 믹싱 장비와 공정 장비를 공급하는 장비 기업입니다.",
    ["믹싱 장비","2차전지 장비","공정 장비","배터리"]
  ],
  [
    "cis",
    "씨아이에스",
    "CIS",
    "KOSDAQ",
    "222080",
    "2차전지 장비",
    "씨아이에스는 2차전지 전극 제조 장비와 관련 공정 장비를 공급하는 기업입니다.",
    ["전극 장비","2차전지 장비","공정 장비","배터리"]
  ],
  [
    "dent",
    "디이엔티",
    "DENT",
    "KOSDAQ",
    "079810",
    "디스플레이·2차전지 장비",
    "디이엔티는 디스플레이 검사 장비와 2차전지 제조 장비를 공급하는 장비 기업입니다.",
    ["디스플레이 장비","2차전지 장비","검사장비","공정 장비"]
  ],
  [
    "wonjun",
    "원준",
    "WJ",
    "KOSDAQ",
    "382840",
    "2차전지 장비",
    "원준은 2차전지 소재 열처리 장비와 첨단소재 공정 장비를 공급하는 기업입니다.",
    ["열처리 장비","2차전지 소재","공정 장비","첨단소재"]
  ],
  [
    "avaco",
    "아바코",
    "AVC",
    "KOSDAQ",
    "083930",
    "디스플레이·2차전지 장비",
    "아바코는 디스플레이 장비, 진공 장비, 2차전지 장비를 공급하는 장비 기업입니다.",
    ["디스플레이 장비","진공 장비","2차전지 장비","자동화"]
  ],
  [
    "hana-micron",
    "하나마이크론",
    "HMC",
    "KOSDAQ",
    "067310",
    "반도체 후공정",
    "하나마이크론은 반도체 패키징과 테스트 등 후공정 서비스를 제공하는 반도체 기업입니다.",
    ["반도체 패키징","테스트","후공정","메모리"]
  ],
  [
    "sfa-semicon",
    "SFA반도체",
    "SFAS",
    "KOSDAQ",
    "036540",
    "반도체 후공정",
    "SFA반도체는 반도체 패키징과 테스트 서비스를 제공하는 후공정 전문 기업입니다.",
    ["반도체 패키징","테스트","후공정","메모리"]
  ],
  [
    "nepes",
    "네패스",
    "NPS",
    "KOSDAQ",
    "033640",
    "반도체 후공정",
    "네패스는 반도체 후공정, 패키징, 전자재료 관련 사업을 운영하는 기업입니다.",
    ["반도체 후공정","패키징","전자재료","시스템반도체"]
  ],
  [
    "tck",
    "티씨케이",
    "TCK",
    "KOSDAQ",
    "064760",
    "반도체 소재·부품",
    "티씨케이는 반도체 공정용 고순도 흑연·SiC 부품을 제조하는 소재·부품 기업입니다.",
    ["SiC 부품","반도체 부품","공정 소재","소재부품"]
  ],
  [
    "hana-materials",
    "하나머티리얼즈",
    "HM",
    "KOSDAQ",
    "166090",
    "반도체 소재·부품",
    "하나머티리얼즈는 반도체 공정용 실리콘 부품과 소재를 공급하는 부품 기업입니다.",
    ["실리콘 부품","반도체 부품","공정 소재","소재부품"]
  ],
  [
    "isc",
    "ISC",
    "ISC",
    "KOSDAQ",
    "095340",
    "반도체 부품",
    "ISC는 반도체 테스트 소켓과 부품을 개발·공급하는 반도체 부품 기업입니다.",
    ["테스트 소켓","반도체 부품","검사 부품","시스템반도체"]
  ],
  [
    "simtech",
    "심텍",
    "SMT",
    "KOSDAQ",
    "222800",
    "전자부품",
    "심텍은 반도체 패키지 기판과 모듈용 인쇄회로기판을 제조하는 전자부품 기업입니다.",
    ["패키지 기판","PCB","반도체 기판","전자부품"]
  ],
  [
    "itm-semiconductor",
    "아이티엠반도체",
    "ITM",
    "KOSDAQ",
    "084850",
    "전자부품",
    "아이티엠반도체는 배터리 보호회로와 전자부품을 제조하는 부품 기업입니다.",
    ["배터리 보호회로","전자부품","2차전지 부품","부품"]
  ],
  [
    "doosan-tesna",
    "두산테스나",
    "DTS",
    "KOSDAQ",
    "131970",
    "반도체 테스트",
    "두산테스나는 시스템반도체 테스트 서비스를 제공하는 반도체 후공정 기업입니다.",
    ["반도체 테스트","시스템반도체","후공정","테스트 서비스"]
  ],
  [
    "deoksan-neolux",
    "덕산네오룩스",
    "DSN",
    "KOSDAQ",
    "213420",
    "디스플레이 소재",
    "덕산네오룩스는 OLED 발광재료 등 디스플레이 소재를 개발·공급하는 소재 기업입니다.",
    ["OLED 소재","디스플레이 소재","발광재료","전자재료"]
  ],
  [
    "inox-advanced-materials",
    "이녹스첨단소재",
    "IAM",
    "KOSDAQ",
    "272290",
    "소재",
    "이녹스첨단소재는 디스플레이, 반도체, 2차전지용 첨단 소재를 공급하는 소재 기업입니다.",
    ["디스플레이 소재","반도체 소재","2차전지 소재","첨단소재"]
  ],
  [
    "neuromeka",
    "뉴로메카",
    "NRM",
    "KOSDAQ",
    "348340",
    "로봇",
    "뉴로메카는 협동로봇, 산업용 로봇, 로봇 자동화 솔루션을 개발하는 로봇 기업입니다.",
    ["협동로봇","산업용 로봇","로봇 자동화","로봇 플랫폼"]
  ],
  [
    "robotis",
    "로보티즈",
    "RBT",
    "KOSDAQ",
    "108490",
    "로봇",
    "로보티즈는 로봇 액추에이터, 자율주행 로봇, 로봇 플랫폼을 개발하는 로봇 기업입니다.",
    ["로봇 부품","자율주행 로봇","액추에이터","로봇 플랫폼"]
  ],
  [
    "yuil-robotics",
    "유일로보틱스",
    "YRB",
    "KOSDAQ",
    "388720",
    "로봇",
    "유일로보틱스는 산업용 로봇, 자동화 시스템, 스마트팩토리 솔루션을 제공하는 로봇 기업입니다.",
    ["산업용 로봇","자동화","스마트팩토리","로봇 시스템"]
  ],
  [
    "spg",
    "에스피지",
    "SPG",
    "KOSDAQ",
    "058610",
    "로봇 부품",
    "에스피지는 정밀 감속기, 모터, 로봇용 구동 부품을 제조하는 부품 기업입니다.",
    ["감속기","모터","로봇 부품","구동장치"]
  ],
  [
    "t-robotics",
    "티로보틱스",
    "TRB",
    "KOSDAQ",
    "117730",
    "로봇",
    "티로보틱스는 진공로봇, 물류로봇, 자동화 시스템을 개발·공급하는 로봇 기업입니다.",
    ["진공로봇","물류로봇","자동화","로봇 시스템"]
  ],
  [
    "robostar",
    "로보스타",
    "RBS",
    "KOSDAQ",
    "090360",
    "로봇",
    "로보스타는 산업용 로봇과 자동화 장비를 공급하는 로봇·자동화 기업입니다.",
    ["산업용 로봇","자동화 장비","로봇 시스템","스마트팩토리"]
  ],
  [
    "saltlux",
    "솔트룩스",
    "SLX",
    "KOSDAQ",
    "304100",
    "AI·소프트웨어",
    "솔트룩스는 인공지능, 빅데이터, 자연어처리 기반 소프트웨어를 제공하는 AI 기업입니다.",
    ["인공지능","빅데이터","자연어처리","AI 플랫폼"]
  ],
  [
    "konan-technology",
    "코난테크놀로지",
    "KTN",
    "KOSDAQ",
    "402030",
    "AI·소프트웨어",
    "코난테크놀로지는 검색, 자연어처리, 영상분석 기반 인공지능 소프트웨어를 개발하는 기업입니다.",
    ["AI","검색","자연어처리","영상분석"]
  ],
  [
    "maum-ai",
    "마음AI",
    "MAI",
    "KOSDAQ",
    "377480",
    "AI·소프트웨어",
    "마음AI는 인공지능 플랫폼, 음성·언어 AI, AI 상담 솔루션을 제공하는 소프트웨어 기업입니다.",
    ["AI 플랫폼","음성AI","언어AI","AI 상담"]
  ],
  [
    "flitto",
    "플리토",
    "FLT",
    "KOSDAQ",
    "300080",
    "AI·언어데이터",
    "플리토는 언어 데이터, 번역 플랫폼, 인공지능 학습 데이터 사업을 운영하는 기업입니다.",
    ["언어데이터","번역","AI 데이터","플랫폼"]
  ],
  [
    "polaris-office",
    "폴라리스오피스",
    "PO",
    "KOSDAQ",
    "041020",
    "소프트웨어",
    "폴라리스오피스는 오피스 소프트웨어, 문서 솔루션, AI 기반 소프트웨어 사업을 운영하는 기업입니다.",
    ["오피스 소프트웨어","문서 솔루션","AI 소프트웨어","SaaS"]
  ],
  [
    "ahnlab",
    "안랩",
    "AL",
    "KOSDAQ",
    "053800",
    "보안 소프트웨어",
    "안랩은 정보보안, 백신, 네트워크 보안, 보안관제 서비스를 제공하는 보안 소프트웨어 기업입니다.",
    ["정보보안","백신","보안관제","네트워크 보안"]
  ],
  [
    "genians",
    "지니언스",
    "GNS",
    "KOSDAQ",
    "263860",
    "보안 소프트웨어",
    "지니언스는 네트워크 접근제어, 엔드포인트 보안, 사이버 보안 솔루션을 제공하는 기업입니다.",
    ["NAC","엔드포인트 보안","사이버 보안","보안 솔루션"]
  ],
  [
    "fasoo",
    "파수",
    "FS",
    "KOSDAQ",
    "150900",
    "보안 소프트웨어",
    "파수는 데이터 보안, 문서보안, 개인정보보호, 보안 소프트웨어를 제공하는 기업입니다.",
    ["데이터 보안","문서보안","개인정보보호","보안 소프트웨어"]
  ],
  [
    "kt-corporation",
    "KT",
    "KT",
    "KOSPI",
    "030200",
    "통신",
    "KT는 유무선 통신, 인터넷, IPTV, 클라우드, AI·DX 서비스를 제공하는 통신 기업입니다.",
    ["유무선 통신","IPTV","클라우드","AI·DX"]
  ],
  [
    "lg-corp",
    "LG",
    "LG",
    "KOSPI",
    "003550",
    "지주회사",
    "LG는 전자, 화학, 통신, 생활건강 등 계열사를 보유한 지주회사입니다.",
    ["지주회사","전자","화학","통신"]
  ],
  [
    "sk-inc",
    "SK",
    "SK",
    "KOSPI",
    "034730",
    "지주회사",
    "SK는 에너지, 반도체, 통신, 바이오, 소재 계열사를 보유한 지주회사입니다.",
    ["지주회사","에너지","반도체","바이오"]
  ],
  [
    "ls-corp",
    "LS",
    "LS",
    "KOSPI",
    "006260",
    "지주회사·전력인프라",
    "LS는 전선, 전력기기, 소재, 에너지 인프라 계열사를 보유한 지주회사입니다.",
    ["전선","전력기기","에너지 인프라","소재"]
  ],
  [
    "samsung-cnt",
    "삼성물산",
    "SCNT",
    "KOSPI",
    "028260",
    "상사·건설·패션",
    "삼성물산은 건설, 상사, 패션, 리조트, 바이오 투자 사업을 운영하는 복합 기업입니다.",
    ["건설","상사","패션","리조트"]
  ],
  [
    "samsung-fire-marine",
    "삼성화재",
    "SFM",
    "KOSPI",
    "000810",
    "보험",
    "삼성화재는 자동차보험, 장기보험, 일반보험, 자산운용 사업을 운영하는 손해보험사입니다.",
    ["손해보험","자동차보험","장기보험","자산운용"]
  ],
  [
    "samsung-electro-mechanics",
    "삼성전기",
    "SEM",
    "KOSPI",
    "009150",
    "전자부품",
    "삼성전기는 MLCC, 카메라모듈, 반도체 패키지기판 등 전자부품을 제조하는 기업입니다.",
    ["MLCC","카메라모듈","패키지기판","전자부품"]
  ],
  [
    "skc",
    "SKC",
    "SKC",
    "KOSPI",
    "011790",
    "소재",
    "SKC는 2차전지 소재, 반도체 소재, 화학 소재 사업을 운영하는 소재 기업입니다.",
    ["2차전지 소재","반도체 소재","화학 소재","동박"]
  ],
  [
    "sk-iet",
    "SK아이이테크놀로지",
    "SKIET",
    "KOSPI",
    "361610",
    "2차전지 소재",
    "SK아이이테크놀로지는 2차전지 분리막과 정보전자 소재 사업을 운영하는 소재 기업입니다.",
    ["분리막","2차전지 소재","정보전자소재","배터리"]
  ],
  [
    "hyundai-steel",
    "현대제철",
    "HYS",
    "KOSPI",
    "004020",
    "철강",
    "현대제철은 자동차강판, 봉형강, 후판, 특수강 등 철강 제품을 생산하는 기업입니다.",
    ["자동차강판","봉형강","후판","특수강"]
  ],
  [
    "korea-zinc",
    "고려아연",
    "KZ",
    "KOSPI",
    "010130",
    "비철금속",
    "고려아연은 아연, 연, 금, 은 등 비철금속 제련과 소재 사업을 운영하는 기업입니다.",
    ["아연","비철금속","제련","소재"]
  ],
  [
    "poongsan",
    "풍산",
    "PS",
    "KOSPI",
    "103140",
    "비철금속·방산",
    "풍산은 동 제품, 신동 소재, 방산 탄약 사업을 운영하는 소재·방산 기업입니다.",
    ["동 소재","비철금속","방산","탄약"]
  ],
  [
    "seah-beststeel",
    "세아베스틸지주",
    "SEAH",
    "KOSPI",
    "001430",
    "철강",
    "세아베스틸지주는 특수강, 자동차·기계용 철강 소재 계열사를 보유한 철강 지주회사입니다.",
    ["특수강","철강 소재","지주회사","자동차 소재"]
  ],
  [
    "korea-investment-holdings",
    "한국금융지주",
    "KIH",
    "KOSPI",
    "071050",
    "금융지주",
    "한국금융지주는 증권, 자산운용, 저축은행 등 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주","증권","자산운용","저축은행"]
  ],
  [
    "daishin-securities",
    "대신증권",
    "DS",
    "KOSPI",
    "003540",
    "증권",
    "대신증권은 브로커리지, 자산관리, 투자은행, 금융상품 서비스를 제공하는 증권사입니다.",
    ["증권","브로커리지","자산관리","투자은행"]
  ],
  [
    "lotte-holdings",
    "롯데지주",
    "LOTTE",
    "KOSPI",
    "004990",
    "지주회사",
    "롯데지주는 식품, 유통, 화학, 호텔 등 롯데 계열사를 보유한 지주회사입니다.",
    ["지주회사","식품","유통","화학"]
  ],
  [
    "lotte-wellfood",
    "롯데웰푸드",
    "LWF",
    "KOSPI",
    "280360",
    "음식료",
    "롯데웰푸드는 제과, 빙과, 식품, 간편식 등 식품 사업을 운영하는 기업입니다.",
    ["제과","빙과","식품","간편식"]
  ],
  [
    "lotte-chilsung",
    "롯데칠성",
    "LCS",
    "KOSPI",
    "005300",
    "음료",
    "롯데칠성은 음료, 생수, 커피, 주류 등 식음료 사업을 운영하는 기업입니다.",
    ["음료","생수","커피","주류"]
  ],
  [
    "nongshim",
    "농심",
    "NS",
    "KOSPI",
    "004370",
    "음식료",
    "농심은 라면, 스낵, 음료 등 식품 브랜드를 제조·판매하는 음식료 기업입니다.",
    ["라면","스낵","식품","음료"]
  ],
  [
    "samyang-foods",
    "삼양식품",
    "SYF",
    "KOSPI",
    "003230",
    "음식료",
    "삼양식품은 라면, 스낵, 소스 등 식품을 제조·판매하는 음식료 기업입니다.",
    ["라면","불닭 브랜드","스낵","식품"]
  ],
  [
    "bgf-retail",
    "BGF리테일",
    "BGF",
    "KOSPI",
    "282330",
    "편의점·유통",
    "BGF리테일은 CU 편의점 프랜차이즈와 유통 사업을 운영하는 기업입니다.",
    ["편의점","CU","유통","프랜차이즈"]
  ],
  [
    "gs-retail",
    "GS리테일",
    "GSR",
    "KOSPI",
    "007070",
    "유통",
    "GS리테일은 편의점, 슈퍼마켓, 홈쇼핑, 온라인 유통 사업을 운영하는 유통 기업입니다.",
    ["편의점","슈퍼마켓","홈쇼핑","온라인 유통"]
  ],
  [
    "shinsegae",
    "신세계",
    "SSG",
    "KOSPI",
    "004170",
    "유통",
    "신세계는 백화점, 면세점, 유통·소비재 사업을 운영하는 기업입니다.",
    ["백화점","면세점","유통","소비재"]
  ],
  [
    "chongkundang",
    "종근당",
    "CKD",
    "KOSPI",
    "185750",
    "제약",
    "종근당은 전문의약품, 개량신약, 바이오의약품 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품","개량신약","제약","바이오의약품"]
  ],
  [
    "daewoong-pharmaceutical",
    "대웅제약",
    "DWP",
    "KOSPI",
    "069620",
    "제약",
    "대웅제약은 전문의약품, 보툴리눔 톡신, 헬스케어 제품을 개발·판매하는 제약 기업입니다.",
    ["전문의약품","보툴리눔 톡신","헬스케어","제약"]
  ],
  [
    "daewoong",
    "대웅",
    "DW",
    "KOSPI",
    "003090",
    "지주회사·제약",
    "대웅은 제약과 헬스케어 계열사를 보유한 지주회사 성격의 기업입니다.",
    ["지주회사","제약","헬스케어","바이오"]
  ],
  [
    "boryung",
    "보령",
    "BR",
    "KOSPI",
    "003850",
    "제약",
    "보령은 전문의약품, 항암제, 고혈압 치료제 등 제약 사업을 운영하는 기업입니다.",
    ["전문의약품","항암제","고혈압 치료제","제약"]
  ],
  [
    "hanall-biopharma",
    "한올바이오파마",
    "HBP",
    "KOSPI",
    "009420",
    "제약·바이오",
    "한올바이오파마는 자가면역질환, 안구질환 등 바이오 신약을 개발하는 제약·바이오 기업입니다.",
    ["바이오신약","자가면역질환","안구질환","제약"]
  ],
  [
    "daewoo-engineering-construction",
    "대우건설",
    "DWEC",
    "KOSPI",
    "047040",
    "건설",
    "대우건설은 주택, 토목, 플랜트, 해외 건설 사업을 운영하는 종합건설사입니다.",
    ["건설","주택","토목","플랜트"]
  ],
  [
    "hdc-hyundai-development",
    "HDC현대산업개발",
    "HDC",
    "KOSPI",
    "294870",
    "건설",
    "HDC현대산업개발은 주택 개발, 도시개발, 건축, 인프라 사업을 운영하는 건설사입니다.",
    ["주택개발","건설","도시개발","인프라"]
  ],
  [
    "hanmi-global",
    "한미글로벌",
    "HMG",
    "KOSPI",
    "053690",
    "건설관리",
    "한미글로벌은 건설사업관리, 프로젝트 관리, 부동산 개발관리 서비스를 제공하는 기업입니다.",
    ["건설사업관리","프로젝트 관리","부동산 개발","CM"]
  ],
  [
    "kepco-plant-service",
    "한전KPS",
    "KPS",
    "KOSPI",
    "051600",
    "발전정비",
    "한전KPS는 발전설비 정비, 플랜트 유지보수, 에너지 설비 서비스를 제공하는 기업입니다.",
    ["발전정비","플랜트 유지보수","에너지 설비","정비 서비스"]
  ],
  [
    "kepco-engineering-construction",
    "한전기술",
    "KEPCOEC",
    "KOSPI",
    "052690",
    "전력·엔지니어링",
    "한전기술은 발전소 설계, 원전·화력 엔지니어링, 에너지 설비 기술 서비스를 제공하는 기업입니다.",
    ["발전소 설계","원전 엔지니어링","전력 기술","에너지 설비"]
  ],
  [
    "korea-district-heating",
    "지역난방공사",
    "KDHC",
    "KOSPI",
    "071320",
    "에너지",
    "지역난방공사는 집단에너지, 지역난방, 전력 판매 사업을 운영하는 에너지 공기업입니다.",
    ["지역난방","집단에너지","전력","에너지"]
  ],
  [
    "jeju-air",
    "제주항공",
    "JJA",
    "KOSPI",
    "089590",
    "항공",
    "제주항공은 국내외 여객 운송과 저비용 항공 서비스를 제공하는 항공사입니다.",
    ["항공","저비용항공","여객 운송","여행"]
  ],
  [
    "jin-air",
    "진에어",
    "JIN",
    "KOSPI",
    "272450",
    "항공",
    "진에어는 국내외 여객 노선을 운영하는 저비용 항공사입니다.",
    ["항공","저비용항공","여객 운송","여행"]
  ],
  [
    "youngone",
    "영원무역",
    "YNG",
    "KOSPI",
    "111770",
    "의류·OEM",
    "영원무역은 아웃도어·스포츠 의류 OEM과 글로벌 생산 사업을 운영하는 의류 기업입니다.",
    ["의류 OEM","스포츠 의류","글로벌 생산","아웃도어"]
  ],
  [
    "handsome",
    "한섬",
    "HANS",
    "KOSPI",
    "020000",
    "패션",
    "한섬은 패션 브랜드, 의류 유통, 라이프스타일 사업을 운영하는 패션 기업입니다.",
    ["패션","의류 브랜드","유통","라이프스타일"]
  ],
  [
    "ibk",
    "기업은행",
    "IBK",
    "KOSPI",
    "024110",
    "은행",
    "기업은행은 중소기업 금융, 개인금융, 기업금융 서비스를 제공하는 국책은행입니다.",
    ["은행","중소기업금융","기업금융","개인금융"]
  ],
  [
    "bnk-financial-group",
    "BNK금융지주",
    "BNK",
    "KOSPI",
    "138930",
    "금융지주",
    "BNK금융지주는 부산은행, 경남은행 등 지역 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주","은행","지역금융","자산운용"]
  ],
  [
    "dgb-financial-group",
    "DGB금융지주",
    "DGB",
    "KOSPI",
    "139130",
    "금융지주",
    "DGB금융지주는 대구은행을 중심으로 은행, 증권, 보험 등 금융 사업을 운영하는 금융지주회사입니다.",
    ["금융지주","은행","증권","보험"]
  ],
  [
    "jb-financial-group",
    "JB금융지주",
    "JB",
    "KOSPI",
    "175330",
    "금융지주",
    "JB금융지주는 전북은행, 광주은행 등 금융 계열사를 보유한 금융지주회사입니다.",
    ["금융지주","은행","지역금융","자산운용"]
  ],
  [
    "hanwha-life",
    "한화생명",
    "HWL",
    "KOSPI",
    "088350",
    "보험",
    "한화생명은 생명보험, 연금, 자산운용, 보장성 보험 사업을 운영하는 보험회사입니다.",
    ["생명보험","연금","자산운용","보장성 보험"]
  ],
  [
    "lotte-non-life-insurance",
    "롯데손해보험",
    "LNI",
    "KOSPI",
    "000400",
    "보험",
    "롯데손해보험은 장기보험, 자동차보험, 일반보험 사업을 운영하는 손해보험사입니다.",
    ["손해보험","장기보험","자동차보험","일반보험"]
  ],
  [
    "dongyang-life",
    "동양생명",
    "DYL",
    "KOSPI",
    "082640",
    "보험",
    "동양생명은 생명보험, 연금, 저축성 보험, 보장성 보험 사업을 운영하는 보험회사입니다.",
    ["생명보험","연금","저축성 보험","보장성 보험"]
  ],
  [
    "hanwha-general-insurance",
    "한화손해보험",
    "HGI",
    "KOSPI",
    "000370",
    "보험",
    "한화손해보험은 자동차보험, 장기보험, 일반보험 등 손해보험 사업을 운영하는 보험회사입니다.",
    ["손해보험","자동차보험","장기보험","일반보험"]
  ],
  [
    "korean-re",
    "코리안리",
    "KRE",
    "KOSPI",
    "003690",
    "재보험",
    "코리안리는 국내외 재보험, 손해보험 재보험, 생명보험 재보험 사업을 운영하는 재보험사입니다.",
    ["재보험","손해보험","생명보험","글로벌 보험"]
  ],
  [
    "hanwha-systems",
    "한화시스템",
    "HWS",
    "KOSPI",
    "272210",
    "방산·ICT",
    "한화시스템은 방산 전자장비, 레이더, 위성통신, ICT 솔루션 사업을 운영하는 기업입니다.",
    ["방산","레이더","위성통신","ICT"]
  ],
  [
    "hyundai-rotem",
    "현대로템",
    "HRT",
    "KOSPI",
    "064350",
    "철도·방산",
    "현대로템은 철도차량, 방산, 플랜트, 수소 인프라 사업을 운영하는 기업입니다.",
    ["철도차량","방산","플랜트","수소"]
  ],
  [
    "snt-motiv",
    "SNT모티브",
    "SNTM",
    "KOSPI",
    "064960",
    "자동차부품·방산",
    "SNT모티브는 자동차 부품, 모터, 방산 부품 사업을 운영하는 제조 기업입니다.",
    ["자동차부품","모터","방산","전장부품"]
  ],
  [
    "hl-mando",
    "HL만도",
    "HLM",
    "KOSPI",
    "204320",
    "자동차부품",
    "HL만도는 제동, 조향, 현가, 자율주행 관련 자동차 부품을 공급하는 기업입니다.",
    ["자동차부품","제동","조향","자율주행"]
  ],
  [
    "sl-corp",
    "에스엘",
    "SL",
    "KOSPI",
    "005850",
    "자동차부품",
    "에스엘은 자동차 램프, 전장부품, 미러 등 자동차 부품을 제조하는 기업입니다.",
    ["자동차 램프","전장부품","자동차부품","모듈"]
  ],
  [
    "hwashin",
    "화신",
    "HWSN",
    "KOSPI",
    "010690",
    "자동차부품",
    "화신은 자동차 샤시, 차체 부품, 전기차 부품을 제조하는 자동차 부품 기업입니다.",
    ["자동차부품","샤시","차체부품","전기차 부품"]
  ],
  [
    "kumho-petrochemical",
    "금호석유화학",
    "KPC",
    "KOSPI",
    "011780",
    "화학",
    "금호석유화학은 합성고무, 합성수지, 정밀화학, 에너지 사업을 운영하는 화학 기업입니다.",
    ["합성고무","합성수지","정밀화학","에너지"]
  ],
  [
    "daehan-synthetic-fiber",
    "대한유화",
    "DYH",
    "KOSPI",
    "006650",
    "화학",
    "대한유화는 기초유분, 합성수지, 석유화학 제품을 생산하는 화학 기업입니다.",
    ["석유화학","합성수지","기초유분","화학소재"]
  ],
  [
    "hyosung-corp",
    "효성",
    "HSC",
    "KOSPI",
    "004800",
    "지주회사·소재",
    "효성은 섬유, 산업자재, 화학, 중공업 계열사를 보유한 지주회사 성격의 기업입니다.",
    ["지주회사","섬유","산업자재","화학"]
  ],
  [
    "oci-holdings",
    "OCI홀딩스",
    "OCI",
    "KOSPI",
    "010060",
    "화학·지주",
    "OCI홀딩스는 화학, 에너지, 소재 계열 사업을 보유한 지주회사입니다.",
    ["화학","에너지","소재","지주회사"]
  ],
  [
    "oci",
    "OCI",
    "OCI",
    "KOSPI",
    "456040",
    "화학·소재",
    "OCI는 반도체·태양광 소재, 화학 제품, 첨단소재 사업을 운영하는 기업입니다.",
    ["화학소재","반도체 소재","태양광 소재","첨단소재"]
  ],
  [
    "kolon-industries",
    "코오롱인더",
    "KOLON",
    "KOSPI",
    "120110",
    "화학·소재",
    "코오롱인더는 산업자재, 화학소재, 필름, 패션 사업을 운영하는 소재 기업입니다.",
    ["산업자재","화학소재","필름","패션"]
  ],
  [
    "pi-advanced-materials",
    "PI첨단소재",
    "PI",
    "KOSPI",
    "178920",
    "첨단소재",
    "PI첨단소재는 폴리이미드 필름과 전자소재를 생산하는 첨단소재 기업입니다.",
    ["폴리이미드","전자소재","첨단소재","필름"]
  ],
  [
    "kcc",
    "KCC",
    "KCC",
    "KOSPI",
    "002380",
    "건자재·소재",
    "KCC는 건축자재, 도료, 실리콘, 소재 사업을 운영하는 기업입니다.",
    ["건축자재","도료","실리콘","소재"]
  ],
  [
    "kcc-glass",
    "KCC글라스",
    "KCCG",
    "KOSPI",
    "344820",
    "유리·건자재",
    "KCC글라스는 건축용 유리, 자동차 유리, 인테리어 자재 사업을 운영하는 기업입니다.",
    ["유리","건자재","자동차 유리","인테리어"]
  ],
  [
    "hansol-chemical",
    "한솔케미칼",
    "HSCHEM",
    "KOSPI",
    "014680",
    "화학·전자재료",
    "한솔케미칼은 반도체·디스플레이용 전자재료와 정밀화학 제품을 공급하는 기업입니다.",
    ["전자재료","반도체 소재","디스플레이 소재","정밀화학"]
  ],
  [
    "hansol-paper",
    "한솔제지",
    "HSP",
    "KOSPI",
    "213500",
    "제지",
    "한솔제지는 인쇄용지, 산업용지, 특수지 등 제지 사업을 운영하는 기업입니다.",
    ["제지","인쇄용지","산업용지","특수지"]
  ],
  [
    "moorim-pnp",
    "무림P&P",
    "MPNP",
    "KOSPI",
    "009580",
    "제지·펄프",
    "무림P&P는 펄프와 제지 제품을 생산하는 제지·펄프 기업입니다.",
    ["펄프","제지","인쇄용지","산업용지"]
  ],
  [
    "e1",
    "E1",
    "E1",
    "KOSPI",
    "017940",
    "가스·에너지",
    "E1은 LPG 수입, 저장, 유통과 에너지 관련 사업을 운영하는 기업입니다.",
    ["LPG","가스","에너지","유통"]
  ],
  [
    "sk-gas",
    "SK가스",
    "SKG",
    "KOSPI",
    "018670",
    "가스·에너지",
    "SK가스는 LPG, 가스 발전, 수소·친환경 에너지 사업을 운영하는 에너지 기업입니다.",
    ["LPG","가스","수소","에너지"]
  ],
  [
    "daesung-holdings",
    "대성홀딩스",
    "DSH",
    "KOSPI",
    "016710",
    "에너지·지주",
    "대성홀딩스는 도시가스와 에너지 계열사를 보유한 지주회사입니다.",
    ["도시가스","에너지","지주회사","가스"]
  ],
  [
    "daesang",
    "대상",
    "DS",
    "KOSPI",
    "001680",
    "음식료",
    "대상은 장류, 조미료, 식품소재, 김치 등 식품 사업을 운영하는 음식료 기업입니다.",
    ["식품","장류","조미료","식품소재"]
  ],
  [
    "ottogi",
    "오뚜기",
    "OTG",
    "KOSPI",
    "007310",
    "음식료",
    "오뚜기는 라면, 소스, 즉석식품, 조미식품 등을 제조·판매하는 음식료 기업입니다.",
    ["라면","즉석식품","소스","조미식품"]
  ],
  [
    "hite-jinro",
    "하이트진로",
    "HJ",
    "KOSPI",
    "000080",
    "주류·음료",
    "하이트진로는 맥주, 소주, 음료 등 주류·음료 사업을 운영하는 기업입니다.",
    ["소주","맥주","주류","음료"]
  ],
  [
    "dongwon-fnb",
    "동원F&B",
    "DWF",
    "KOSPI",
    "049770",
    "음식료",
    "동원F&B는 참치캔, 가공식품, 유제품, 식품 브랜드를 운영하는 음식료 기업입니다.",
    ["가공식품","참치캔","유제품","식품"]
  ],
  [
    "dong-suh",
    "동서",
    "DSH",
    "KOSPI",
    "026960",
    "음식료·유통",
    "동서는 식품, 커피, 포장재, 유통 관련 사업을 운영하는 음식료 기업입니다.",
    ["커피","식품","포장재","유통"]
  ],
  [
    "spc-samlip",
    "SPC삼립",
    "SPC",
    "KOSPI",
    "005610",
    "음식료",
    "SPC삼립은 제빵, 식품, 유통, 프랜차이즈 관련 사업을 운영하는 음식료 기업입니다.",
    ["제빵","식품","유통","프랜차이즈"]
  ],
  [
    "binggrae",
    "빙그레",
    "BG",
    "KOSPI",
    "005180",
    "음식료",
    "빙그레는 아이스크림, 유제품, 음료 등 식품 사업을 운영하는 음식료 기업입니다.",
    ["아이스크림","유제품","음료","식품"]
  ],
  [
    "pulmuone",
    "풀무원",
    "PM",
    "KOSPI",
    "017810",
    "음식료",
    "풀무원은 신선식품, 건강식품, 식자재, 푸드서비스 사업을 운영하는 식품 기업입니다.",
    ["신선식품","건강식품","푸드서비스","식자재"]
  ],
  [
    "jw-pharmaceutical",
    "JW중외제약",
    "JW",
    "KOSPI",
    "001060",
    "제약",
    "JW중외제약은 수액, 전문의약품, 항암제, 의료기기 관련 사업을 운영하는 제약 기업입니다.",
    ["수액","전문의약품","항암제","제약"]
  ],
  [
    "ildong-pharmaceutical",
    "일동제약",
    "ILD",
    "KOSPI",
    "249420",
    "제약",
    "일동제약은 전문의약품, 일반의약품, 건강기능식품, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품","일반의약품","건강기능식품","신약 개발"]
  ],
  [
    "dong-a-st",
    "동아에스티",
    "DAST",
    "KOSPI",
    "170900",
    "제약",
    "동아에스티는 전문의약품, 해외 의약품, 바이오시밀러, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품","신약 개발","바이오시밀러","제약"]
  ],
  [
    "ilyang-pharmaceutical",
    "일양약품",
    "IY",
    "KOSPI",
    "007570",
    "제약",
    "일양약품은 전문의약품, 백신, 항암제, 소화기 치료제 사업을 운영하는 제약 기업입니다.",
    ["전문의약품","백신","항암제","제약"]
  ],
  [
    "bukwang-pharmaceutical",
    "부광약품",
    "BKP",
    "KOSPI",
    "003000",
    "제약",
    "부광약품은 전문의약품, 일반의약품, 신약 개발 사업을 운영하는 제약 기업입니다.",
    ["전문의약품","일반의약품","신약 개발","제약"]
  ],
  [
    "dl-holdings",
    "DL",
    "DL",
    "KOSPI",
    "000210",
    "지주회사",
    "DL은 화학, 건설, 에너지 관련 계열사를 보유한 지주회사입니다.",
    ["지주회사","화학","건설","에너지"]
  ],
  [
    "kyeryong-construction",
    "계룡건설",
    "KRC",
    "KOSPI",
    "013580",
    "건설",
    "계룡건설은 주택, 토목, 건축, 공공공사 사업을 운영하는 종합건설사입니다.",
    ["건설","주택","토목","건축"]
  ],
  [
    "hanshin-construction",
    "한신공영",
    "HSCON",
    "KOSPI",
    "004960",
    "건설",
    "한신공영은 주택, 토목, 건축, 개발 사업을 운영하는 종합건설사입니다.",
    ["건설","주택","토목","개발"]
  ],
  [
    "is-dongseo",
    "아이에스동서",
    "ISD",
    "KOSPI",
    "010780",
    "건설·환경",
    "아이에스동서는 건설, 콘크리트, 환경, 폐기물 처리 사업을 운영하는 기업입니다.",
    ["건설","콘크리트","환경","폐기물 처리"]
  ],
  [
    "hj-shipbuilding",
    "HJ중공업",
    "HJ",
    "KOSPI",
    "097230",
    "조선·건설",
    "HJ중공업은 조선, 건설, 플랜트 사업을 운영하는 제조·건설 기업입니다.",
    ["조선","건설","플랜트","선박"]
  ]
];

export const companies: Company[] = rawCompanies.map(createCompany);

export const industries = Array.from(new Set(companies.map((company) => company.industry))).sort();

export function getCompanyBySlug(slug: string) {
  return companies.find((company) => company.slug === slug);
}
