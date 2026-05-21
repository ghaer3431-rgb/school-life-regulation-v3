import type { AnalysisResult, ReviewItem, ReviewStatus, SchoolLevel } from "./types";

type Basis = ReviewItem["basis"];
type Source = ReviewItem["sources"][number];

type Article = {
  no: number | null;
  title: string;
  text: string;
  normalized: string;
  compact: string;
  tags: string[];
};

type Rule = {
  id: string;
  checklistNo: string;
  category: string;
  title: string;
  basis: Basis;
  sources: Source[];
  semanticTags: string[];
  requiredGroups: string[][];
  optionalGroups?: string[][];
  warningGroups?: string[][];
  forbiddenGroups?: string[][];
  preferredArticleNumbers?: number[];
  preferredTitleGroups?: string[][];
  schoolLevels?: SchoolLevel[];
  revised: string;
  reason: string;
};

type Candidate = {
  article: Article;
  score: number;
  why: string[];
};

const src = {
  checklist: {
    label: "교육청 체크리스트",
    detail: "2026학년도 학교생활규정 제·개정 점검표(학교생활규정) 15개 항목",
  },
  training: {
    label: "연수자료 PDF/PPT",
    detail: "2026학년도 학교규칙·학교생활규정 제·개정 컨설팅단 사전 연수자료",
  },
  law: {
    label: "초·중등교육법",
    detail: "학생생활지도, 스마트기기 사용 제한, 학생 징계 관련 조항",
  },
  decree: {
    label: "초·중등교육법 시행령",
    detail: "학교규칙 기재사항, 학생 징계 절차 관련 조항",
  },
  notice: {
    label: "교원의 학생생활지도에 관한 고시",
    detail: "2026. 3. 1. 시행 기준, 생활지도 및 개별학생교육지원 관련 조항",
  },
  humanRights: {
    label: "국가인권위원회 권고",
    detail: "인권친화적 학교조성 정책권고 관련 점검 항목",
  },
};

const RULES: Rule[] = [
  {
    id: "cl01-basis",
    checklistNo: "1",
    category: "총칙·근거",
    title: "학교생활규정의 각종 근거 최신화",
    basis: "체크리스트 필수",
    semanticTags: ["basis", "general"],
    preferredArticleNumbers: [1, 2, 3, 4, 5],
    preferredTitleGroups: [["적용근거", "근거", "관련법령", "관계법령", "목적"]],
    requiredGroups: [["초·중등교육법", "초중등교육법"], ["교원의 학생생활지도에 관한 고시", "학생생활지도에 관한 고시", "학생생활지도고시", "교육부고시"]],
    optionalGroups: [["초·중등교육법 시행령", "초중등교육법 시행령"], ["2026", "제2026"]],
    warningGroups: [["2023-28", "2023"], ["2024학년도"], ["2025학년도"]],
    sources: [src.checklist, src.training, src.law, src.decree, src.notice],
    revised:
      "제○조【적용근거】 이 규정은 「초·중등교육법」, 「초·중등교육법 시행령」, 「교원의 학생생활지도에 관한 고시」 등 관계 법령과 교육청 학교생활규정 제·개정 점검 기준에 따라 학생의 학교생활에 관한 사항을 정한다.",
    reason:
      "근거 조항은 최신 상위법, 시행령, 고시, 교육청 점검 기준을 반영해야 합니다.",
  },
  {
    id: "cl02-revision-process",
    checklistNo: "2",
    category: "제·개정 절차",
    title: "학생·교원·학부모 의견수렴 및 학교운영위원회 심의",
    basis: "법령 연계",
    semanticTags: ["revisionProcess"],
    preferredTitleGroups: [["제·개정", "개정절차", "개정", "심의", "공포"]],
    requiredGroups: [["학생"], ["교원"], ["학부모", "보호자"], ["의견", "의견수렴"], ["학교운영위원회"], ["심의"]],
    optionalGroups: [["공포", "시행"], ["안내", "공지"]],
    sources: [src.checklist, src.training, src.decree],
    revised:
      "제○조【학교생활규정 제·개정 절차】 학교는 학교생활규정을 제·개정할 때 학생, 보호자, 교원의 의견을 수렴하고 학교운영위원회 심의를 거쳐 학교장이 공포한다. 개정 내용은 학생과 보호자에게 안내한다.",
    reason:
      "학교생활규정 제·개정 시 교육공동체 의견수렴과 학교운영위원회 심의 절차를 명확히 해야 합니다.",
  },
  {
    id: "cl03-guidance-fields",
    checklistNo: "3",
    category: "생활지도",
    title: "생활지도 분야에 고시 제8조의 지도 분야 반영",
    basis: "고시 연계",
    semanticTags: ["studentGuidance"],
    preferredTitleGroups: [["생활지도", "지도의 범위", "지도 분야"]],
    requiredGroups: [["생활지도"], ["특수교육", "특수교육대상자"], ["다문화"], ["용모", "복장"], ["비행", "범죄"], ["스마트기기", "휴대전화", "휴대폰"]],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【생활지도의 분야】 학교의 장과 교원은 특수교육대상자와 다문화학생에 대한 인식 및 태도, 건전한 학교생활 문화 조성을 위한 용모 및 복장, 비행 및 범죄 예방, 휴대전화 등 스마트기기의 올바른 사용에 관한 사항 등을 지도할 수 있다.",
    reason:
      "교원의 학생생활지도에 관한 고시 제8조의 생활지도 분야와 스마트기기 사용 지도를 반영해야 합니다.",
  },
  {
    id: "cl04-smart-term",
    checklistNo: "4",
    category: "스마트기기",
    title: "‘휴대전화’ 용어를 ‘휴대전화 등 스마트기기’ 또는 ‘스마트기기’로 정비",
    basis: "법령 연계",
    semanticTags: ["smartDevice", "items"],
    preferredTitleGroups: [["스마트기기", "휴대전화", "휴대폰", "통신기기", "전자기기"]],
    requiredGroups: [["스마트기기"]],
    optionalGroups: [["휴대전화", "휴대폰"], ["교육 목적", "긴급", "특수교육", "장애"]],
    warningGroups: [["휴대폰"], ["통신기기"], ["전자기기"]],
    sources: [src.checklist, src.law, src.notice, src.training],
    revised:
      "제○조【휴대전화 등 스마트기기 사용】 학생은 수업 중 휴대전화 등 스마트기기를 사용해서는 안 된다. 다만, 장애 또는 특수교육 지원, 교육 목적, 긴급 상황 대응 등 학교의 장과 교원이 허용하는 경우에는 사용할 수 있다.",
    reason:
      "휴대전화 중심 표현을 스마트기기 중심 표현으로 정비해야 합니다.",
  },
  {
    id: "cl05-smart-exceptions",
    checklistNo: "5",
    category: "주의",
    title: "스마트기기 또는 물품 사용 제한의 제외 사항 기재",
    basis: "법령 필수",
    semanticTags: ["smartDevice", "caution", "studentGuidance"],
    preferredTitleGroups: [["주의", "스마트기기", "휴대전화", "물품", "사용 제한"]],
    requiredGroups: [["스마트기기", "휴대전화", "물품"], ["장애", "특수교육"], ["교육 목적", "교육의 목적"], ["긴급"]],
    sources: [src.checklist, src.law, src.notice, src.training],
    revised:
      "제○조【주의】 학교의 장과 교원은 수업 중 휴대전화 등 스마트기기 또는 물품의 사용을 제한할 수 있다. 다만, 장애 또는 특수교육 지원, 교육 목적, 긴급 상황 대응 등 법령상 예외에 해당하는 경우는 제외한다.",
    reason:
      "스마트기기 또는 물품 사용 제한 시 법령상 예외 사유를 명확히 규정해야 합니다.",
  },
  {
    id: "cl06-discipline-smart",
    checklistNo: "6",
    category: "훈육",
    title: "훈육에 스마트기기 사용·소지 제한 기준·방법·유형 기재",
    basis: "법령 필수",
    semanticTags: ["disciplineGuidance", "smartDevice"],
    preferredTitleGroups: [["훈육", "스마트기기", "휴대전화", "소지", "사용"]],
    requiredGroups: [["훈육"], ["스마트기기", "휴대전화"], ["사용", "소지"], ["제한"], ["기준", "방법", "유형"]],
    sources: [src.checklist, src.law, src.notice, src.training],
    revised:
      "제○조【훈육】 학교의 장과 교원은 교육활동 보호와 학생의 학습권 보장을 위하여 교내 휴대전화 등 스마트기기의 사용·소지를 제한할 수 있으며, 제한 기준·방법 및 스마트기기의 유형은 학교생활규정으로 정한다.",
    reason:
      "교내 스마트기기 사용 제한 기준, 방법, 유형을 학교생활규정에 구체화해야 합니다.",
  },
  {
    id: "cl07-separated-items",
    checklistNo: "7",
    category: "훈육",
    title: "분리·보관하여 사용·소지를 제한할 수 있는 물품 기재",
    basis: "고시 연계",
    semanticTags: ["itemStorage", "disciplineGuidance", "smartDevice"],
    preferredTitleGroups: [["분리", "보관", "물품", "소지품", "스마트기기"]],
    requiredGroups: [["분리", "보관"], ["물품", "소지품", "스마트기기"], ["반환", "보관기간", "보관 기간", "장소"]],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【물품의 분리 보관】 학교의 장과 교원은 학생과 교직원의 안전 및 교육활동 보호를 위하여 필요한 경우 관계 법령과 고시에 따라 사용·소지를 제한할 수 있는 물품을 분리 보관할 수 있다. 이 경우 대상 물품, 보관 기간, 장소, 반환 절차를 학생에게 안내한다.",
    reason:
      "분리·보관 가능 물품과 절차, 보관 기간, 반환 기준을 명확히 해야 합니다.",
  },
  {
    id: "cl08-class-disruption",
    checklistNo: "8",
    category: "훈육",
    title: "수업방해학생의 분리 방법 삭제 또는 개별학생교육지원 체계로 정비",
    basis: "고시 연계",
    semanticTags: ["individualSupport", "separation", "disciplineGuidance"],
    preferredTitleGroups: [["개별학생교육지원", "분리", "수업방해", "학습권"]],
    requiredGroups: [["개별학생교육지원"]],
    warningGroups: [["수업방해학생의 분리", "수업방해 학생의 분리", "수업 방해 학생의 분리", "분리장소", "분리 방법"]],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【개별학생교육지원】 학교의 장은 교육활동 보호와 학생의 학습권 보장을 위하여 개별학생교육지원이 필요한 경우 장소, 시간, 학습지원 방법, 보호자 안내 절차를 정하여 운영할 수 있다.",
    reason:
      "기존 수업방해학생 분리 방법은 삭제하거나 개별학생교육지원 조항으로 재구성해야 합니다.",
  },
  {
    id: "cl09-guidance-wording",
    checklistNo: "9",
    category: "불응시조치·이의제기",
    title: "‘생활지도’를 ‘생활지도 및 개별학생교육지원’으로 변경",
    basis: "고시 연계",
    semanticTags: ["objection", "noncompliance", "individualSupport"],
    preferredTitleGroups: [["불응", "이의제기", "이의", "생활지도", "개별학생교육지원"]],
    requiredGroups: [["생활지도"], ["개별학생교육지원"], ["불응", "이의제기", "이의"]],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【불응시 조치 및 이의제기】 학생 또는 보호자는 생활지도 및 개별학생교육지원에 대하여 이의가 있는 경우 학교의 장에게 이의를 제기할 수 있으며, 생활지도 및 개별학생교육지원에 불응하는 경우 관계 법령과 학교 절차에 따라 조치할 수 있다.",
    reason:
      "불응시조치와 이의제기 조항의 표현을 ‘생활지도 및 개별학생교육지원’으로 정비해야 합니다.",
  },
  {
    id: "cl10-individual-support",
    checklistNo: "10",
    category: "개별학생교육지원",
    title: "개별학생교육지원 조항 신설",
    basis: "법령 필수",
    semanticTags: ["individualSupport"],
    preferredTitleGroups: [["개별학생교육지원", "학습지원", "가정학습"]],
    requiredGroups: [["개별학생교육지원"], ["장소", "시간"], ["학습지원"]],
    optionalGroups: [["보호자"], ["가정학습"], ["출석"]],
    sources: [src.checklist, src.law, src.decree, src.notice, src.training],
    revised:
      "제○조【개별학생교육지원】 학교의 장은 교육활동 보호와 학생의 학습권 보장을 위하여 개별학생교육지원이 필요한 경우 그 장소, 시간, 학습지원 방법 및 보호자 안내 절차를 정하여 운영할 수 있다.",
    reason:
      "개별학생교육지원의 장소, 시간, 학습지원 방법 등을 학교생활규정에 반영해야 합니다.",
  },
  {
    id: "cl11-committee-quorum",
    checklistNo: "11",
    category: "징계",
    title: "학생선도위원회 구성 및 의사·의결정족수 기재",
    basis: "교육청 권고",
    semanticTags: ["disciplineCommittee"],
    preferredTitleGroups: [["학생선도위원회", "선도위원회", "위원회", "정족수", "의결"]],
    requiredGroups: [["학생선도위원회", "선도위원회"], ["위원"], ["과반수", "정족수", "의결"]],
    sources: [src.checklist, src.training],
    revised:
      "제○조【학생선도위원회 구성】 학생선도위원회는 교원 5인 이상 10인 이하로 구성하고, 위원장은 교감, 부위원장은 담당 부장으로 한다. 위원회는 재적 위원 과반수의 출석으로 개회하고 출석 위원 과반수의 찬성으로 의결한다.",
    reason:
      "위원회 구성, 의사정족수, 의결정족수를 명확히 규정해야 합니다.",
  },
  {
    id: "cl12-notice-10-days",
    checklistNo: "12",
    category: "징계",
    title: "징계 심의 시 10일 전까지 서면 통지",
    basis: "법령 필수",
    semanticTags: ["disciplineProcedure", "disciplineCommittee"],
    preferredTitleGroups: [["징계", "선도위원회", "사전통지", "통지", "서면"]],
    requiredGroups: [["10일"], ["서면", "문서"], ["통지", "사전통지"]],
    sources: [src.checklist, src.training, src.decree],
    revised:
      "제○조【징계 심의 사전 통지】 학교는 학생선도위원회 개최 시 학생 및 보호자에게 개최 일시, 장소, 사유, 의견진술 방법 등을 10일 전까지 서면으로 통지한다.",
    reason:
      "징계 심의 전 10일 전까지 서면 통지 절차를 규정해야 합니다.",
  },
  {
    id: "cl13-disciplinary-types",
    checklistNo: "13",
    category: "징계",
    title: "징계 종류 5가지 명확화 및 그 외 징계 금지",
    basis: "법령 필수",
    semanticTags: ["disciplinaryTypes", "disciplineProcedure"],
    preferredTitleGroups: [["징계의 종류", "징계", "출석정지", "사회봉사", "특별교육"]],
    requiredGroups: [["학교내의 봉사", "학교 내의 봉사"], ["사회봉사"], ["특별교육", "특별교육이수"], ["출석정지"], ["10일"], ["30일"]],
    warningGroups: [["근신"], ["유기정학"], ["무기정학"], ["강제전학"]],
    sources: [src.checklist, src.law, src.decree, src.training],
    revised:
      "제○조【징계의 종류】 징계의 종류는 학교내의 봉사, 사회봉사, 특별교육이수, 1회 10일 이내·연간 30일 이내의 출석정지로 한다. 고등학교의 경우 퇴학처분을 둘 수 있다. 초등학교와 중학교는 퇴학처분을 둘 수 없다.",
    reason:
      "법령상 징계 종류와 출석정지 기간을 정확히 반영해야 하며, 허용되지 않는 징계는 둘 수 없습니다.",
  },
  {
    id: "cl14-opinion",
    checklistNo: "14",
    category: "징계",
    title: "학생·보호자 의견 진술 기회 보장",
    basis: "법령 필수",
    semanticTags: ["disciplineProcedure", "opinionStatement"],
    preferredTitleGroups: [["의견진술", "의견", "진술", "보호자", "학생선도위원회"]],
    requiredGroups: [["학생"], ["보호자", "학부모"], ["의견"], ["진술"]],
    sources: [src.checklist, src.law, src.decree, src.training],
    revised:
      "제○조【의견진술 기회】 학교는 징계 심의 시 학생 및 보호자에게 의견을 진술할 기회를 부여한다. 학생선도소위원회를 운영하는 경우에도 사전 통지, 의견진술, 절차 보장 사항을 준수한다.",
    reason:
      "학생 징계는 학생과 보호자의 의견진술권을 보장해야 합니다.",
  },
  {
    id: "cl15-human-rights",
    checklistNo: "15",
    category: "인권",
    title: "학생·교직원 등의 인권 침해 조항 점검",
    basis: "담당자 확인 필요",
    semanticTags: ["humanRights", "appearance", "association"],
    preferredTitleGroups: [["용의복장", "두발", "복장", "인권", "상벌", "금지"]],
    requiredGroups: [[]],
    warningGroups: [["이성교제"], ["교제 금지"], ["외부단체 활동 제한"], ["머리 길이"], ["두발 길이"], ["염색 금지"], ["파마 금지"], ["속옷"], ["양말 색"], ["스타킹 색"], ["외투 금지"], ["체벌"]],
    sources: [src.checklist, src.humanRights, src.training],
    revised:
      "학교생활규정 전체에서 학생 간 교제에 대한 불이익, 외부단체 활동 제한, 머리 길이나 형태에 대한 과도한 제한, 양말·스타킹·속옷·외투 등에 대한 인권 침해 소지가 있는 조항을 삭제하거나 학생 인권을 침해하지 않는 방향으로 수정한다.",
    reason:
      "학생과 교직원의 인권 침해 소지가 있는 조항은 문서 전체를 기준으로 담당자 확인이 필요합니다.",
  },
];

const SEMANTIC_TAGS: Array<{ tag: string; titleWords: string[]; contentWords: string[] }> = [
  { tag: "basis", titleWords: ["적용근거", "근거", "관련법령", "관계법령", "목적"], contentWords: ["초중등교육법", "학생생활지도고시", "교육부고시", "시행령"] },
  { tag: "general", titleWords: ["총칙", "목적", "용어", "정의"], contentWords: ["목적", "정의", "적용"] },
  { tag: "revisionProcess", titleWords: ["제개정", "개정", "규정개정", "심의", "공포"], contentWords: ["학교운영위원회", "의견수렴", "학생", "보호자", "교원", "공포"] },
  { tag: "studentGuidance", titleWords: ["생활지도", "지도"], contentWords: ["생활지도", "특수교육", "다문화", "비행", "범죄", "용모", "복장"] },
  { tag: "smartDevice", titleWords: ["스마트기기", "휴대전화", "휴대폰", "통신기기", "전자기기"], contentWords: ["스마트기기", "휴대전화", "휴대폰", "통신기기", "전자기기", "태블릿"] },
  { tag: "caution", titleWords: ["주의"], contentWords: ["주의", "사용제한", "수업중", "긴급", "교육목적"] },
  { tag: "disciplineGuidance", titleWords: ["훈육"], contentWords: ["훈육", "소지", "사용", "제한", "분리", "보관"] },
  { tag: "itemStorage", titleWords: ["물품", "소지품", "보관", "분리"], contentWords: ["물품", "소지품", "분리", "보관", "반환", "보관기간"] },
  { tag: "separation", titleWords: ["분리", "수업방해"], contentWords: ["분리", "수업방해", "학습권"] },
  { tag: "individualSupport", titleWords: ["개별학생교육지원", "학습지원", "가정학습"], contentWords: ["개별학생교육지원", "학습지원", "보호자인계", "가정학습", "장소", "시간"] },
  { tag: "objection", titleWords: ["이의제기", "이의"], contentWords: ["이의제기", "이의", "14일", "생활지도"] },
  { tag: "noncompliance", titleWords: ["불응", "거부"], contentWords: ["불응", "거부", "생활지도", "개별학생교육지원"] },
  { tag: "disciplineCommittee", titleWords: ["학생선도위원회", "선도위원회", "위원회"], contentWords: ["학생선도위원회", "선도위원회", "위원", "의결", "과반수"] },
  { tag: "disciplineProcedure", titleWords: ["징계", "선도", "통지"], contentWords: ["징계", "통지", "서면", "10일", "의견진술", "보호자"] },
  { tag: "disciplinaryTypes", titleWords: ["징계의종류", "징계"], contentWords: ["학교내의봉사", "사회봉사", "특별교육", "출석정지", "퇴학"] },
  { tag: "opinionStatement", titleWords: ["의견진술", "진술"], contentWords: ["의견", "진술", "학생", "보호자"] },
  { tag: "humanRights", titleWords: ["인권", "체벌", "차별"], contentWords: ["인권", "차별", "체벌", "불이익"] },
  { tag: "appearance", titleWords: ["용의복장", "두발", "복장"], contentWords: ["두발", "머리", "염색", "파마", "복장", "외투", "양말", "스타킹"] },
  { tag: "association", titleWords: ["교제", "외부단체"], contentWords: ["이성교제", "교제", "외부단체"] },
];

function compact(text: string) {
  return text
    .replace(/\s+/g, "")
    .replace(/[「」『』【】\[\]().,·ㆍ:;'"“”‘’\-–—_]/g, "")
    .toLowerCase();
}

function includesLoose(text: string, keyword: string) {
  if (!keyword) return false;
  return text.includes(keyword) || compact(text).includes(compact(keyword));
}

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function normalizeForArticleSearch(text: string) {
  return text
    .replace(/\r/g, "\n")
    .replace(/([^\n])\s*(제\s*\d+\s*장)/g, "$1\n$2")
    .replace(/([^\n])\s*(제\s*\d+\s*조)/g, "$1\n$2")
    .replace(/제\s*(\d+)\s*조/g, "제$1조")
    .replace(/제\s*(\d+)\s*장/g, "제$1장")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function tagArticle(title: string, text: string) {
  const titleCompact = compact(title);
  const bodyCompact = compact(text);
  const tags: string[] = [];

  for (const item of SEMANTIC_TAGS) {
    const titleHit = item.titleWords.some((word) => titleCompact.includes(compact(word)));
    const contentHitCount = item.contentWords.filter((word) => bodyCompact.includes(compact(word))).length;

    if (titleHit || contentHitCount >= 2) {
      tags.push(item.tag);
    }
  }

  return tags;
}

function splitArticles(text: string): Article[] {
  const prepared = normalizeForArticleSearch(text);
  const matches = [...prepared.matchAll(/제\s*(\d+)\s*조([^\n]*)\n?([\s\S]*?)(?=\n제\s*\d+\s*조|$)/g)];

  if (matches.length === 0) {
    return [
      {
        no: null,
        title: "문서 전체",
        text: normalize(prepared),
        normalized: normalize(prepared),
        compact: compact(prepared),
        tags: tagArticle("문서 전체", prepared),
      },
    ];
  }

  return matches
    .map((match) => {
      const no = Number(match[1]);
      const rawTitle = normalize(`제${match[1]}조 ${match[2]}`);
      const body = normalize(match[3] ?? "");
      const fullText = normalize(`${rawTitle} ${body}`);
      return {
        no: Number.isFinite(no) ? no : null,
        title: rawTitle.slice(0, 90),
        text: fullText,
        normalized: fullText,
        compact: compact(fullText),
        tags: tagArticle(rawTitle, fullText),
      };
    })
    .filter((article) => article.text.length > 20);
}

function groupMatched(text: string, group: string[]) {
  if (group.length === 0) return true;
  return group.some((keyword) => includesLoose(text, keyword));
}

function countGroupMatches(text: string, groups: string[][] = []) {
  return groups.filter((group) => groupMatched(text, group)).length;
}

function allGroupsMatched(text: string, groups: string[][]) {
  return groups.every((group) => groupMatched(text, group));
}

function anyGroupMatched(text: string, groups: string[][] = []) {
  return groups.some((group) => groupMatched(text, group));
}

function countTagMatches(article: Article, rule: Rule) {
  return rule.semanticTags.filter((tag) => article.tags.includes(tag)).length;
}

function scoreCandidate(article: Article, rule: Rule) {
  const why: string[] = [];
  let score = 0;

  const tagHits = countTagMatches(article, rule);
  if (tagHits > 0) {
    score += tagHits * 30;
    why.push(`의미 태그 일치 ${tagHits}개(${article.tags.filter((tag) => rule.semanticTags.includes(tag)).join(", ")})`);
  }

  if (rule.preferredArticleNumbers?.includes(article.no ?? -1)) {
    score += 18;
    why.push(`우선 조항 번호 제${article.no}조`);
  }

  const preferredTitleHits = countGroupMatches(article.title, rule.preferredTitleGroups ?? []);
  if (preferredTitleHits > 0) {
    score += preferredTitleHits * 24;
    why.push("조항 제목 관련성 높음");
  }

  const requiredHits = countGroupMatches(article.text, rule.requiredGroups);
  if (requiredHits > 0) {
    score += requiredHits * 10;
    why.push(`필수 요소 일부 확인 ${requiredHits}/${rule.requiredGroups.length}`);
  }

  const optionalHits = countGroupMatches(article.text, rule.optionalGroups ?? []);
  if (optionalHits > 0) {
    score += optionalHits * 4;
    why.push(`참고 요소 확인 ${optionalHits}개`);
  }

  const warningHits = countGroupMatches(article.text, [...(rule.warningGroups ?? []), ...(rule.forbiddenGroups ?? [])]);
  if (warningHits > 0) {
    score += warningHits * 8;
    why.push(`주의 표현 확인 ${warningHits}개`);
  }

  if (article.text.length < 60) score -= 8;
  if (includesLoose(article.text, "목차") && article.text.length < 250) score -= 20;
  if (includesLoose(article.text, "그림입니다") || includesLoose(article.text, "원본 그림")) score -= 15;

  return { score, why };
}

function findCandidates(articles: Article[], rule: Rule): Candidate[] {
  return articles
    .map((article) => {
      const scored = scoreCandidate(article, rule);
      return { article, score: scored.score, why: scored.why };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function confidence(candidates: Candidate[], rule: Rule) {
  if (candidates.length === 0) return "낮음";
  const top = candidates[0];
  const tagHits = countTagMatches(top.article, rule);
  const requiredHits = countGroupMatches(top.article.text, rule.requiredGroups);

  if (top.score >= 60 && tagHits >= 1 && requiredHits >= Math.ceil(rule.requiredGroups.length / 2)) return "높음";
  if (top.score >= 35 && (tagHits >= 1 || requiredHits >= 1)) return "보통";
  return "낮음";
}

function documentLevelText(articles: Article[]) {
  return articles.map((article) => article.text).join("\n");
}

function hasSchoolLevelProblem(docText: string, schoolLevel: SchoolLevel) {
  if ((schoolLevel === "초등학교" || schoolLevel === "중학교") && includesLoose(docText, "퇴학")) return true;
  return false;
}

function getStatus(rule: Rule, candidates: Candidate[], docText: string, schoolLevel: SchoolLevel, conf: string): ReviewStatus {
  if (docText.length < 50) return "확인 필요";

  const documentRequiredOk = allGroupsMatched(docText, rule.requiredGroups);
  const documentPartial = countGroupMatches(docText, rule.requiredGroups);
  const documentWarning = anyGroupMatched(docText, rule.warningGroups);
  const documentForbidden = anyGroupMatched(docText, rule.forbiddenGroups);

  if (rule.id === "cl15-human-rights") {
    return documentWarning || documentForbidden ? "보완 필요" : "확인 필요";
  }

  if (rule.id === "cl13-disciplinary-types" && hasSchoolLevelProblem(docText, schoolLevel)) {
    return "보완 필요";
  }

  if (documentForbidden) return "보완 필요";

  if (documentRequiredOk) {
    if (documentWarning) return "확인 필요";
    if (conf === "낮음") return "확인 필요";
    return "적정";
  }

  if (documentPartial > 0 || candidates.length > 0) {
    return "확인 필요";
  }

  return "보완 필요";
}

function statusLabel(status: ReviewStatus) {
  if (status === "적정") return "적정 가능";
  if (status === "보완 필요") return "보완 필요 가능성 높음";
  return status;
}

function commentFor(status: ReviewStatus, conf: string) {
  if (status === "적정") {
    return `문서 전체 기준 필수 요소가 확인됩니다. 다만 최종 판단은 담당자가 후보 조항을 확인해야 합니다. 조항 매칭 신뢰도: ${conf}`;
  }
  if (status === "확인 필요") {
    return `관련 내용이 일부 확인되거나 조항 위치가 학교별 표현 차이로 애매합니다. 후보 조항과 문서 전체를 확인하세요. 조항 매칭 신뢰도: ${conf}`;
  }
  return `체크리스트 기준 필수 요소가 문서 전체에서 충분히 확인되지 않습니다. 후보 조항과 누락 요소를 확인하세요. 조항 매칭 신뢰도: ${conf}`;
}

function missingElements(docText: string, rule: Rule) {
  const missing = rule.requiredGroups
    .filter((group) => !groupMatched(docText, group))
    .map((group) => group.join(" / "));

  if (missing.length === 0) return "문서 전체 기준 필수 요소는 확인됩니다.";
  return `문서 전체 기준 누락 의심 요소: ${missing.join(", ")}`;
}

function renderCandidates(candidates: Candidate[], conf: string, rule: Rule, docText: string) {
  const missing = missingElements(docText, rule);

  if (candidates.length === 0) {
    return `조항 매칭 신뢰도: 낮음\n${missing}\n\n관련 조항 후보를 자동으로 찾지 못했습니다. 학교별 조항명 차이 또는 PDF 추출 오류 가능성이 있으므로 담당자 확인이 필요합니다.`;
  }

  const body = candidates
    .map((candidate, index) => {
      const why = candidate.why.length ? candidate.why.join(", ") : "관련 키워드 일부 확인";
      return `[후보 ${index + 1} / 점수 ${candidate.score}]\n선정 이유: ${why}\n의미 태그: ${candidate.article.tags.length ? candidate.article.tags.join(", ") : "없음"}\n${candidate.article.text.slice(0, 1300)}`;
    })
    .join("\n\n");

  return `조항 매칭 신뢰도: ${conf}\n${missing}\n※ 아래는 확정 조항이 아니라 관련 조항 후보입니다. 학교별 표현 차이가 있으므로 담당자 확인이 필요합니다.\n\n${body}`;
}

function articleTitle(candidates: Candidate[]) {
  if (candidates.length === 0) return "관련 조항 후보 없음";
  return candidates[0].article.title || "관련 조항 후보";
}

function summarize(items: ReviewItem[]) {
  return {
    total: items.length,
    needsRevision: items.filter((item) => item.status === "보완 필요").length,
    needsReview: items.filter((item) => item.status === "확인 필요").length,
    adequate: items.filter((item) => item.status === "적정").length,
    notApplicable: items.filter((item) => item.status === "해당 없음").length,
  };
}

export function analyzeRegulation(params: {
  schoolName: string;
  schoolLevel: SchoolLevel;
  regulationText: string;
  checklistText?: string;
  regulationFileName?: string;
  checklistFileName?: string;
}): AnalysisResult {
  const articles = splitArticles(params.regulationText || "");
  const docText = documentLevelText(articles);

  const activeRules = RULES.filter((rule) => !rule.schoolLevels || rule.schoolLevels.includes(params.schoolLevel));

  const items: ReviewItem[] = activeRules.map((rule) => {
    const candidates = findCandidates(articles, rule);
    const conf = confidence(candidates, rule);
    const status = getStatus(rule, candidates, docText, params.schoolLevel, conf);

    return {
      id: rule.id,
      checklistNo: rule.checklistNo,
      status,
      category: rule.category,
      title: rule.title,
      article: articleTitle(candidates),
      basis: rule.basis,
      sources: rule.sources,
      comment: `${statusLabel(status)} · ${commentFor(status, conf)}`,
      current: renderCandidates(candidates, conf, rule, docText),
      revised: rule.revised,
      reason: rule.reason,
    };
  });

  return {
    schoolName: params.schoolName || "학교명 미입력",
    schoolLevel: params.schoolLevel,
    generatedAt: new Date().toISOString(),
    regulationFileName: params.regulationFileName,
    checklistFileName: params.checklistFileName,
    extractedTextLength: params.regulationText.length,
    summary: summarize(items),
    items,
    notice:
      "본 결과는 체크리스트 15개 항목을 기준으로 문서 전체를 의미 태그별로 분류하여 생성한 AI 검토 보조 결과입니다. 상태는 최종 확정이 아니라 적정 가능·확인 필요·보완 필요 가능성에 가까우며, 최종 개정안은 담당자가 후보 조항과 학교 절차를 확인해야 합니다.",
  };
}
