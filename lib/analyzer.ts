import type { AnalysisResult, ReviewItem, ReviewStatus, SchoolLevel } from "./types";

type Basis = ReviewItem["basis"];
type Source = ReviewItem["sources"][number];

type Rule = {
  id: string;
  checklistNo: string;
  category: string;
  title: string;
  basis: Basis;
  sources: Source[];
  groups: string[][];
  targetKeywords: string[];
  titleKeywords?: string[];
  outdated?: string[];
  forbidden?: string[];
  schoolLevels?: SchoolLevel[];
  revised: string;
  reason: string;
};

type ArticleCandidate = {
  text: string;
  score: number;
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
    id: "cl01-latest-basis",
    checklistNo: "1",
    category: "총칙·근거",
    title: "학교생활규정의 각종 근거 최신화",
    basis: "체크리스트 필수",
    groups: [["적용근거", "근거", "관계법령"], ["초·중등교육법", "초중등교육법"], ["교원의 학생생활지도에 관한 고시", "학생생활지도에 관한 고시", "학생생활지도고시"]],
    titleKeywords: ["적용근거", "근거"],
    targetKeywords: ["제3조", "적용근거", "근거", "초·중등교육법", "초중등교육법", "초·중등교육법 시행령", "초중등교육법 시행령", "교원의 학생생활지도에 관한 고시", "학생생활지도에 관한 고시", "학생생활지도고시", "교육부 고시"],
    outdated: ["2023-28", "2024학년도", "2025학년도"],
    sources: [src.checklist, src.training, src.law, src.decree, src.notice],
    revised:
      "제○조【적용근거】 이 규정은 「초·중등교육법」, 「초·중등교육법 시행령」, 「교원의 학생생활지도에 관한 고시」 등 관계 법령과 교육청 학교생활규정 제·개정 점검 기준에 따라 학생의 학교생활에 관한 사항을 정한다.",
    reason:
      "학교생활규정의 근거 조항은 최신 상위법, 시행령, 고시, 교육청 점검 기준과 연도를 반영해야 합니다.",
  },
  {
    id: "cl02-revision-procedure",
    checklistNo: "2",
    category: "제·개정 절차",
    title: "학생·교원·학부모 의견수렴 및 학교운영위원회 심의",
    basis: "법령 연계",
    groups: [["학생"], ["교원"], ["학부모", "보호자"], ["의견"], ["학교운영위원회"], ["심의"]],
    targetKeywords: ["개정절차", "제·개정", "의견", "학교운영위원회", "심의", "공포"],
    sources: [src.checklist, src.training, src.decree],
    revised:
      "제○조【학교생활규정 제·개정 절차】 학교는 학교생활규정을 제·개정할 때 학생, 보호자, 교원의 의견을 수렴하고 학교운영위원회 심의를 거쳐 학교장이 공포한다. 개정 내용은 학생과 보호자에게 안내한다.",
    reason:
      "초·중등교육법 시행령상 학교규칙 기재사항 및 교육청 점검 기준에 따라 교육공동체 의견수렴과 학교운영위원회 심의 절차를 명확히 해야 합니다.",
  },
  {
    id: "cl03-guidance-fields",
    checklistNo: "3",
    category: "생활지도",
    title: "생활지도 분야에 고시 제8조의 지도 분야 반영",
    basis: "고시 연계",
    groups: [["특수교육", "특수교육대상자"], ["다문화"], ["용모", "복장"], ["비행", "범죄"], ["스마트기기"]],
    targetKeywords: ["생활지도", "그 밖의 분야", "기타", "특수교육", "특수교육대상자", "다문화", "용모", "복장", "비행", "범죄", "스마트기기", "휴대전화"],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【생활지도의 분야】 학교의 장과 교원은 특수교육대상자와 다문화학생에 대한 인식 및 태도, 건전한 학교생활 문화 조성을 위한 용모 및 복장, 비행 및 범죄 예방, 휴대전화 등 스마트기기의 올바른 사용에 관한 사항 등을 지도할 수 있다.",
    reason:
      "교원의 학생생활지도에 관한 고시 제8조의 생활지도 분야와 이번 신설 사항인 스마트기기 사용 지도를 반영해야 합니다.",
  },
  {
    id: "cl04-smart-device-term",
    checklistNo: "4",
    category: "스마트기기",
    title: "‘휴대전화’ 용어를 ‘휴대전화 등 스마트기기’ 또는 ‘스마트기기’로 정비",
    basis: "법령 연계",
    groups: [["스마트기기"]],
    targetKeywords: ["휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기", "휴대용 전자기기", "스마트폰", "태블릿", "스마트기기"],
    sources: [src.checklist, src.law, src.notice, src.training],
    revised:
      "제○조【휴대전화 등 스마트기기 사용】 학생은 수업 중 휴대전화 등 스마트기기를 사용해서는 안 된다. 다만, 장애 또는 특수교육 지원, 교육 목적, 긴급 상황 대응 등 학교의 장과 교원이 허용하는 경우에는 사용할 수 있다.",
    reason:
      "초·중등교육법과 학생생활지도 고시 개정 흐름에 맞추어 휴대전화 중심 표현을 스마트기기 중심 표현으로 정비해야 합니다.",
  },
  {
    id: "cl05-exception-for-smart-device",
    checklistNo: "5",
    category: "주의",
    title: "스마트기기 또는 물품 사용 제한의 제외 사항 기재",
    basis: "법령 필수",
    groups: [["스마트기기", "물품"], ["장애", "특수교육"], ["교육 목적", "교육의 목적"], ["긴급"]],
    targetKeywords: ["주의", "스마트기기", "휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기", "물품", "소지품", "장애", "특수교육", "교육 목적", "긴급"],
    sources: [src.checklist, src.law, src.notice, src.training],
    revised:
      "제○조【주의】 학교의 장과 교원은 수업 중 휴대전화 등 스마트기기 또는 물품의 사용을 제한할 수 있다. 다만, 장애 또는 특수교육 지원, 교육 목적, 긴급 상황 대응 등 법령상 예외에 해당하는 경우는 제외한다.",
    reason:
      "스마트기기 또는 물품 사용 제한 시 법 제20조의5제1항 단서에 해당하는 예외 사유를 명확히 규정해야 합니다.",
  },
  {
    id: "cl06-discipline-smart-device",
    checklistNo: "6",
    category: "훈육",
    title: "훈육에 스마트기기 사용·소지 제한 기준·방법·유형 기재",
    basis: "법령 필수",
    groups: [["훈육"], ["스마트기기", "휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기"], ["사용", "소지"], ["제한"], ["기준", "방법"], ["유형"]],
    titleKeywords: ["훈육"],
    targetKeywords: ["훈육", "스마트기기", "휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기", "스마트폰", "사용", "소지", "제한", "기준", "방법", "유형"],
    sources: [src.checklist, src.law, src.notice, src.training],
    revised:
      "제○조【훈육】 학교의 장과 교원은 교육활동 보호와 학생의 학습권 보장을 위하여 훈육의 방법으로 교내 휴대전화 등 스마트기기의 사용·소지를 제한할 수 있다. 이 경우 사용·소지 제한의 기준, 방법 및 스마트기기의 유형은 학교의 실정에 맞게 학교생활규정에 정한다.",
    reason:
      "체크리스트 6번은 훈육 조항 또는 훈육 항목 안에서 스마트기기 사용·소지 제한의 기준, 방법, 유형이 규정되어 있는지 확인하는 항목입니다. 다만 유형의 구체적 예시는 예시안에 명확히 제시되어 있지 않으므로 학교 실정에 맞춘 담당자 확인이 필요합니다.",
  },
  {
    id: "cl07-separated-items",
    checklistNo: "7",
    category: "훈육",
    title: "분리·보관하여 사용·소지를 제한할 수 있는 물품 기재",
    basis: "고시 연계",
    groups: [["분리", "보관"], ["물품"], ["스마트기기", "소지", "사용"]],
    targetKeywords: ["훈육", "분리", "보관", "물품", "소지품", "스마트기기", "휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기", "소지", "사용", "반환"],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【물품의 분리 보관】 학교의 장과 교원은 학생과 교직원의 안전 및 교육활동 보호를 위하여 필요한 경우 관계 법령과 고시에 따라 사용·소지를 제한할 수 있는 물품을 분리 보관할 수 있다. 이 경우 대상 물품, 보관 기간, 장소, 반환 절차를 학생에게 안내한다.",
    reason:
      "교원의 학생생활지도에 관한 고시 제12조에 따른 분리·보관 가능 물품과 절차를 명확히 규정해야 합니다.",
  },
  {
    id: "cl08-remove-class-disruption-separation",
    checklistNo: "8",
    category: "훈육",
    title: "수업방해학생의 분리 방법 삭제 또는 개별학생교육지원 체계로 정비",
    basis: "고시 연계",
    groups: [["개별학생교육지원"]],
    targetKeywords: ["수업방해", "분리", "개별학생교육지원", "학습지원", "분리장소", "분리 방법"],
    forbidden: ["수업방해학생의 분리", "수업방해 학생의 분리", "수업 방해 학생의 분리", "분리장소", "분리 방법"],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【개별학생교육지원】 학교의 장은 교육활동 보호와 학생의 학습권 보장을 위하여 개별학생교육지원이 필요한 경우 장소, 시간, 학습지원 방법, 보호자 안내 절차를 정하여 운영할 수 있다.",
    reason:
      "기존 수업방해학생 분리 방법은 삭제하거나 개별학생교육지원 조항으로 재구성해야 합니다.",
  },
  {
    id: "cl09-guidance-support-wording",
    checklistNo: "9",
    category: "불응시조치·이의제기",
    title: "‘생활지도’를 ‘생활지도 및 개별학생교육지원’으로 변경",
    basis: "고시 연계",
    groups: [["생활지도 및 개별학생교육지원"], ["불응", "이의제기"]],
    targetKeywords: ["불응", "이의제기", "생활지도", "개별학생교육지원"],
    sources: [src.checklist, src.notice, src.training],
    revised:
      "제○조【불응시 조치 및 이의제기】 학생 또는 보호자는 생활지도 및 개별학생교육지원에 대하여 이의가 있는 경우 학교의 장에게 이의를 제기할 수 있으며, 생활지도 및 개별학생교육지원에 불응하는 경우 관계 법령과 학교 절차에 따라 조치할 수 있다.",
    reason:
      "고시 개정에 따라 불응시조치와 이의제기 조항의 표현을 ‘생활지도 및 개별학생교육지원’으로 정비해야 합니다.",
  },
  {
    id: "cl10-individual-support",
    checklistNo: "10",
    category: "개별학생교육지원",
    title: "개별학생교육지원 조항 신설",
    basis: "법령 필수",
    groups: [["개별학생교육지원"], ["장소", "시간"], ["학습지원"]],
    targetKeywords: ["개별학생교육지원", "장소", "시간", "학습지원", "보호자", "가정학습"],
    sources: [src.checklist, src.law, src.decree, src.notice, src.training],
    revised:
      "제○조【개별학생교육지원】 학교의 장은 교육활동 보호와 학생의 학습권 보장을 위하여 개별학생교육지원이 필요한 경우 그 장소, 시간, 학습지원 방법 및 보호자 안내 절차를 정하여 운영할 수 있다.",
    reason:
      "교원의 학생생활지도에 관한 고시 제19조에 따라 개별학생교육지원의 장소, 시간, 학습지원 방법 등을 학교생활규정에 반영해야 합니다.",
  },
  {
    id: "cl11-committee-composition-quorum",
    checklistNo: "11",
    category: "징계",
    title: "학생선도위원회 구성 및 의사·의결정족수 기재",
    basis: "교육청 권고",
    groups: [["학생선도위원회", "선도위원회"], ["구성", "위원장", "부위원장", "교감", "부장", "위원"], ["과반수", "정족수", "개회", "출석", "의결", "찬성"]],
    titleKeywords: ["학생선도위원회", "선도위원회", "구성", "정족수"],
    targetKeywords: ["학생선도위원회", "선도위원회", "구성", "위원장", "부위원장", "교감", "부장", "위원", "과반수", "정족수", "개회", "출석", "의결", "찬성"],
    sources: [src.checklist, src.training],
    revised:
      "제○조【학생선도위원회 구성】 학생선도위원회는 교원 5인 이상 10인 이하로 구성하고, 위원장은 교감, 부위원장은 담당 부장으로 한다. 위원회는 재적 위원 과반수의 출석으로 개회하고 출석 위원 과반수의 찬성으로 의결한다.",
    reason:
      "11번은 단순한 징계 심의 절차가 아니라 학생선도위원회 또는 이에 준하는 징계 심의 위원회의 구성, 위원장·부위원장, 의사정족수, 의결정족수를 명확히 규정했는지 확인하는 항목입니다.",
  },
  {
    id: "cl12-notice-10days-written",
    checklistNo: "12",
    category: "징계",
    title: "징계 심의 시 10일 전까지 서면 통지",
    basis: "법령 필수",
    groups: [["10일"], ["서면", "문서"], ["통지", "사전통지"]],
    targetKeywords: ["10일", "서면", "문서", "통지", "사전통지", "학생선도위원회", "징계"],
    sources: [src.checklist, src.training, src.decree],
    revised:
      "제○조【징계 심의 사전 통지】 학교는 학생선도위원회 개최 시 학생 및 보호자에게 개최 일시, 장소, 사유, 의견진술 방법 등을 10일 전까지 서면으로 통지한다.",
    reason:
      "행정절차법상 처분의 사전 통지 취지를 반영하여 징계 심의 전 10일 전까지 서면 통지 절차를 규정해야 합니다.",
  },
  {
    id: "cl13-five-disciplinary-measures",
    checklistNo: "13",
    category: "징계",
    title: "징계 종류 5가지 명확화 및 그 외 징계 금지",
    basis: "법령 필수",
    groups: [["학교내의 봉사", "학교 내의 봉사"], ["사회봉사"], ["특별교육"], ["출석정지"], ["10일"], ["30일"]],
    targetKeywords: ["징계", "학교내의 봉사", "학교 내의 봉사", "사회봉사", "특별교육", "출석정지", "퇴학", "10일", "30일"],
    forbidden: ["근신", "유기정학", "무기정학", "강제전학"],
    sources: [src.checklist, src.law, src.decree, src.training],
    revised:
      "제○조【징계의 종류】 징계의 종류는 학교내의 봉사, 사회봉사, 특별교육이수, 1회 10일 이내·연간 30일 이내의 출석정지로 한다. 고등학교의 경우 퇴학처분을 둘 수 있다. 초등학교와 중학교는 퇴학처분을 둘 수 없다.",
    reason:
      "초·중등교육법 제18조와 시행령 제31조에 따른 징계 종류와 출석정지 기간을 정확히 반영해야 하며, 법령상 허용되지 않는 징계는 둘 수 없습니다.",
  },
  {
    id: "cl14-opinion-statement",
    checklistNo: "14",
    category: "징계",
    title: "학생·보호자 의견 진술 기회 보장",
    basis: "법령 필수",
    groups: [["학생"], ["보호자", "학부모"], ["의견"], ["진술"]],
    targetKeywords: ["의견", "진술", "학생", "보호자", "학부모", "징계", "학생선도위원회"],
    sources: [src.checklist, src.law, src.decree, src.training],
    revised:
      "제○조【의견진술 기회】 학교는 징계 심의 시 학생 및 보호자에게 의견을 진술할 기회를 부여한다. 학생선도소위원회를 운영하는 경우에도 사전 통지, 의견진술, 절차 보장 사항을 준수한다.",
    reason:
      "학생 징계는 학생과 보호자의 의견진술권을 보장해야 하며, 소위원회 운영 시에도 동일한 절차 보장이 필요합니다.",
  },
  {
    id: "cl15-human-rights",
    checklistNo: "15",
    category: "인권",
    title: "학생·교직원 등의 인권 침해 조항 점검",
    basis: "담당자 확인 필요",
    groups: [[]],
    targetKeywords: ["인권", "교제", "외부단체", "머리", "두발", "염색", "파마", "양말", "스타킹", "속옷", "외투", "체벌"],
    forbidden: ["이성교제", "교제 금지", "외부단체 활동 제한", "머리 길이", "두발 길이", "염색 금지", "파마 금지", "속옷", "양말 색", "스타킹 색", "외투 금지", "체벌"],
    sources: [src.checklist, src.humanRights, src.training],
    revised:
      "학교생활규정 전체에서 학생 간 교제에 대한 불이익, 외부단체 활동 제한, 머리 길이나 형태에 대한 과도한 제한, 양말·스타킹·속옷·외투 등에 대한 인권 침해 소지가 있는 조항을 삭제하거나 학생 인권을 침해하지 않는 방향으로 수정한다.",
    reason:
      "학생과 교직원의 인권 침해 소지가 있는 조항은 문서 전체를 기준으로 확인해야 하며, 자동 점검 결과가 없더라도 최종 담당자 확인이 필요합니다.",
  },
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

function splitArticles(text: string) {
  const prepared = normalizeForArticleSearch(text);
  const matches = [...prepared.matchAll(/제\s*\d+\s*조[\s\S]*?(?=\n제\s*\d+\s*조|$)/g)];
  return matches.map((match) => normalize(match[0])).filter((article) => article.length > 20);
}

function groupMatched(text: string, group: string[]) {
  if (group.length === 0) return true;
  return group.some((keyword) => includesLoose(text, keyword));
}

function allGroupsMatched(text: string, groups: string[][]) {
  return groups.every((group) => groupMatched(text, group));
}

function anyKeywordMatched(text: string, keywords: string[] = []) {
  return keywords.some((keyword) => includesLoose(text, keyword));
}

function hasSchoolLevelProblem(text: string, rule: Rule, schoolLevel: SchoolLevel) {
  if (rule.id === "cl13-five-disciplinary-measures") {
    if ((schoolLevel === "초등학교" || schoolLevel === "중학교") && includesLoose(text, "퇴학")) return true;
    if (schoolLevel === "고등학교" && !includesLoose(text, "퇴학")) return true;
  }
  return false;
}


function isChecklist6DisciplineRule(rule: Rule) {
  return rule.id === "cl06-discipline-smart-device";
}

function hasDisciplineAnchor(article: string) {
  return includesLoose(article.slice(0, 260), "훈육") || includesLoose(article, "훈육");
}

function paragraphOfKeyword(article: string, keyword: string) {
  const index = article.indexOf(keyword);
  if (index < 0) return article;

  const marks = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫"];
  let start = 0;
  let end = article.length;

  for (const mark of marks) {
    const pos = article.lastIndexOf(mark, index);
    if (pos >= 0) start = Math.max(start, pos);
  }

  for (const mark of marks) {
    const pos = article.indexOf(mark, index + keyword.length);
    if (pos >= 0) {
      end = Math.min(end, pos);
      break;
    }
  }

  return article.slice(start, end);
}


function isChecklist11CommitteeStructureRule(rule: Rule) {
  return rule.id === "cl11-committee-composition-quorum";
}

function hasCommitteeIdentity(article: string) {
  return ["학생선도위원회", "선도위원회"].some((word) => includesLoose(article, word));
}

function hasCommitteeStructureTerms(article: string) {
  return ["구성", "위원장", "부위원장", "교감", "부장", "위원으로 구성", "위원은", "위원 수"].some((word) => includesLoose(article, word));
}

function hasCommitteeQuorumTerms(article: string) {
  return ["과반수", "정족수", "개회", "출석", "찬성", "의결"].some((word) => includesLoose(article, word));
}

function hasOnlyCommitteeProcedureTerms(article: string) {
  const procedureTerms = ["사안설명", "의견청취", "의견을 진술", "징계 여부", "징계 양정", "징계의결", "학교장의 결재", "결재를 득", "회부", "보고"];
  const procedureHit = procedureTerms.some((word) => includesLoose(article, word));
  return procedureHit && !hasCommitteeStructureTerms(article) && !hasCommitteeQuorumTerms(article);
}

function scoreArticle(article: string, rule: Rule) {
  let score = 0;

  const titleArea = article.slice(0, 160);

  if (isChecklist11CommitteeStructureRule(rule)) {
    if (!hasCommitteeIdentity(article)) {
      score -= 60;
    }

    if (hasCommitteeIdentity(article) && hasCommitteeStructureTerms(article)) {
      score += 70;
    }

    if (hasCommitteeIdentity(article) && hasCommitteeQuorumTerms(article)) {
      score += 45;
    }

    if (includesLoose(titleArea, "구성") || includesLoose(titleArea, "정족수")) {
      score += 55;
    }

    if (hasOnlyCommitteeProcedureTerms(article)) {
      score -= 65;
    }

    if (includesLoose(article, "학교생활규정 제·개정위원회") || includesLoose(article, "제·개정위원회") || includesLoose(article, "학교운영위원회")) {
      score -= 80;
    }

  const smartRelatedRuleIds = ["cl04-smart-device-term", "cl05-exception-for-smart-device", "cl06-discipline-smart-device", "cl07-separated-items"];

  if (isChecklist11CommitteeStructureRule(rule)) {
    const hasIdentity = hasCommitteeIdentity(text);
    const hasStructure = hasCommitteeStructureTerms(text);
    const hasQuorum = hasCommitteeQuorumTerms(text);

    if (hasIdentity && hasStructure && hasQuorum) {
      return confidence === "낮음" ? "확인 필요" : "적정";
    }

    if (hasIdentity && (hasStructure || hasQuorum)) {
      return "확인 필요";
    }

    return "보완 필요";
  }

  if (isChecklist6DisciplineRule(rule)) {
    if (hasDisciplineAnchor(article)) score += 55;
    if (includesLoose(titleArea, "훈육")) score += 40;
    if (!hasDisciplineAnchor(article)) score -= 35;
    if (includesLoose(article, "주의") && !includesLoose(article, "훈육")) score -= 18;
    if (includesLoose(article, "물품보관") && !includesLoose(article, "훈육")) score -= 12;
  }
  const smartAliases = ["스마트기기", "휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기", "휴대용 전자기기", "스마트폰", "태블릿"];

  if (smartRelatedRuleIds.includes(rule.id)) {
    const titleHits = smartAliases.filter((keyword) => includesLoose(titleArea, keyword)).length;
    const bodyHits = smartAliases.filter((keyword) => includesLoose(article, keyword)).length;

    if (titleHits > 0) score += 45 + titleHits * 8;
    if (bodyHits > 0) score += bodyHits * 8;

    if (includesLoose(titleArea, "제58조")) score += 25;
  }

  for (const keyword of rule.titleKeywords ?? []) {
    if (includesLoose(titleArea, keyword)) score += 30;
  }

  for (const group of rule.groups) {
    if (groupMatched(article, group)) score += 12;
  }

  for (const keyword of rule.targetKeywords) {
    if (includesLoose(article, keyword)) score += 6;
  }

  for (const keyword of rule.outdated ?? []) {
    if (includesLoose(article, keyword)) score += 3;
  }

  for (const keyword of rule.forbidden ?? []) {
    if (includesLoose(article, keyword)) score += 10;
  }

  if (/제\s*\d+\s*조/.test(article)) score += 3;
  if (/[①②③④⑤⑥⑦⑧⑨⑩]/.test(article)) score += 2;
  if (article.length > 80) score += 2;
  if (article.length > 500) score -= 2;
  if (includesLoose(article, "그림입니다") || includesLoose(article, "원본 그림")) score -= 10;
  if (includesLoose(article, "목차") && article.length < 250) score -= 12;

  return score;
}

function findArticleCandidates(text: string, rule: Rule): ArticleCandidate[] {
  const articles = splitArticles(text);

  const maxCandidates = ["cl04-smart-device-term", "cl05-exception-for-smart-device", "cl06-discipline-smart-device", "cl07-separated-items"].includes(rule.id) ? 8 : 3;

  const ranked = articles
    .map((article) => ({ text: article, score: scoreArticle(article, rule) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCandidates);

  if (ranked.length > 0) return ranked;

  const prepared = normalizeForArticleSearch(text);
  const keys = [...(rule.titleKeywords ?? []), ...rule.targetKeywords, ...rule.groups.flat(), ...(rule.outdated ?? []), ...(rule.forbidden ?? [])].filter(Boolean);
  const windows: ArticleCandidate[] = [];

  for (const keyword of keys) {
    const compactPrepared = compact(prepared);
    const compactKeyword = compact(keyword);
    const compactIndex = compactKeyword ? compactPrepared.indexOf(compactKeyword) : -1;
    const normalIndex = prepared.indexOf(keyword);
    const index = normalIndex >= 0 ? normalIndex : compactIndex;

    if (index < 0) continue;

    const before = prepared.lastIndexOf("\n제", Math.min(index, prepared.length - 1));
    const after = prepared.indexOf("\n제", Math.min(prepared.length, index + keyword.length));
    const start = before >= 0 ? before + 1 : Math.max(0, Math.min(index, prepared.length - 1) - 350);
    const end = after > start ? after : Math.min(prepared.length, Math.min(index, prepared.length - 1) + 900);
    const snippet = normalize(prepared.slice(start, end));

    if (snippet.length > 20 && !windows.some((item) => item.text === snippet)) {
      windows.push({ text: snippet, score: 8 });
    }

    if (windows.length >= 3) break;
  }

  return windows;
}

function confidenceLabel(candidates: ArticleCandidate[], rule: Rule) {
  if (candidates.length === 0) return "낮음";
  const top = candidates[0];
  const groupHits = rule.groups.filter((group) => groupMatched(top.text, group)).length;

  if (top.score >= 35 && groupHits >= Math.max(1, Math.ceil(rule.groups.length / 2))) return "높음";
  if (top.score >= 18) return "보통";
  return "낮음";
}


function getPriorityFocusKeywords(rule: Rule) {
  const base = [
    ...rule.targetKeywords,
    ...rule.groups.flat(),
    ...(rule.titleKeywords ?? []),
    ...(rule.outdated ?? []),
    ...(rule.forbidden ?? []),
  ].filter(Boolean);

  const priorityByRule: Record<string, string[]> = {
    "cl03-guidance-fields": [
      "그 밖의 분야",
      "기타",
      "특수교육대상자",
      "특수교육",
      "다문화",
      "용모",
      "복장",
      "비행",
      "범죄",
      "스마트기기",
      "휴대전화",
    ],
    "cl04-smart-device-term": [
      "통신기기",
      "정보통신기기",
      "전자기기",
      "휴대폰",
      "휴대전화",
      "스마트기기",
      "스마트폰",
    ],
    "cl05-exception-for-smart-device": [
      "장애",
      "특수교육",
      "교육 목적",
      "긴급",
      "스마트기기",
      "물품",
    ],
    "cl06-discipline-smart-device": [
      "훈육",
      "기준",
      "방법",
      "유형",
      "사용",
      "소지",
      "제한",
      "스마트기기",
      "통신기기",
    ],
    "cl07-separated-items": [
      "분리",
      "보관",
      "반환",
      "보관 기간",
      "물품",
      "소지품",
      "스마트기기",
      "통신기기",
    ],
    "cl08-remove-class-disruption-separation": [
      "수업방해학생의 분리",
      "수업방해",
      "분리",
      "개별학생교육지원",
      "학습지원",
    ],
    "cl09-guidance-support-wording": [
      "생활지도 및 개별학생교육지원",
      "개별학생교육지원",
      "이의제기",
      "불응",
    ],
    "cl11-committee-composition-quorum": [
      "구성",
      "위원장",
      "부위원장",
      "교감",
      "부장",
      "과반수",
      "정족수",
      "개회",
      "출석",
      "찬성",
      "의결",
      "학생선도위원회",
    ],
    "cl10-individual-support": [
      "개별학생교육지원",
      "장소",
      "시간",
      "학습지원",
      "보호자",
      "가정학습",
    ],
  };

  const priority = priorityByRule[rule.id] ?? [];

  return Array.from(new Set([...priority, ...base]));
}

function findLooseIndex(source: string, keyword: string) {
  const normalIndex = source.indexOf(keyword);
  if (normalIndex >= 0) return normalIndex;

  const compactSource = compact(source);
  const compactKeyword = compact(keyword);
  if (!compactKeyword) return -1;

  const compactIndex = compactSource.indexOf(compactKeyword);
  if (compactIndex < 0) return -1;

  // compact 문자열의 위치를 원문 위치로 정확히 되돌리기는 어렵기 때문에
  // 비율을 이용해 근사 위치를 잡는다.
  return Math.floor((compactIndex / Math.max(1, compactSource.length)) * source.length);
}

function sentenceWindow(text: string, center: number, keyword: string) {
  const beforeMarks = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", ".", "\n", "다. "];
  const afterMarks = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "\n"];

  let start = Math.max(0, center - 260);
  let end = Math.min(text.length, center + Math.max(keyword.length, 1) + 520);

  for (const mark of beforeMarks) {
    const pos = text.lastIndexOf(mark, center);
    if (pos >= 0 && pos > center - 280) {
      start = mark === "다. " ? pos + 3 : pos;
      break;
    }
  }

  for (const mark of afterMarks) {
    const pos = text.indexOf(mark, center + Math.max(keyword.length, 1));
    if (pos >= 0 && pos < center + 620) {
      end = pos;
      break;
    }
  }

  const prefix = start > 0 ? "… " : "";
  const suffix = end < text.length ? " …" : "";

  return `${prefix}${normalize(text.slice(start, end))}${suffix}`;
}

function getArticleLabel(article: string) {
  const match = article.match(/제\s*(\d+)\s*조/);
  return match ? `제${match[1]}조` : "조항 미확인";
}

function getParagraphLabel(article: string, center: number) {
  const paragraphMarks = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮"];
  let bestIndex = -1;
  let bestMark = "";

  for (const mark of paragraphMarks) {
    const index = article.lastIndexOf(mark, center);
    if (index >= 0 && index > bestIndex) {
      bestIndex = index;
      bestMark = mark;
    }
  }

  if (!bestMark) {
    return "항 위치 확인 필요";
  }

  const paragraphNo = paragraphMarks.indexOf(bestMark) + 1;
  return `제${paragraphNo}항`;
}

function getLocationLabel(article: string, center: number) {
  const articleLabel = getArticleLabel(article);
  const paragraphLabel = getParagraphLabel(article, center);
  return `${articleLabel} ${paragraphLabel}`;
}

function preciseExcerpts(article: string, rule: Rule) {
  const normalizedArticle = normalize(article);
  const keywords = getPriorityFocusKeywords(rule);
  const snippets: Array<{ keyword: string; text: string; index: number }> = [];

  for (const keyword of keywords) {
    const index = findLooseIndex(normalizedArticle, keyword);
    if (index < 0) continue;

    const snippet = sentenceWindow(normalizedArticle, index, keyword);

    if (
      snippet.length > 20 &&
      !snippets.some((item) => item.text === snippet || Math.abs(item.index - index) < 80)
    ) {
      snippets.push({ keyword, text: snippet, index });
    }

    if (snippets.length >= 4) break;
  }

  if (snippets.length === 0) {
    return [`관련 표현 위치를 특정하지 못했습니다.\n${normalizedArticle.slice(0, 900)}`];
  }

  return snippets.map((item, index) => {
    const location = getLocationLabel(normalizedArticle, item.index);
    return `[관련 부분 ${index + 1}: ${item.keyword} / 추정 위치: ${location}]\n${item.text}`;
  });
}

function renderCandidates(candidates: ArticleCandidate[], confidence: string, rule: Rule) {
  if (candidates.length === 0) {
    return `자동 추출 신뢰도: 낮음\n관련 조항을 자동으로 찾지 못했습니다. 문서 전체에서 담당자 확인이 필요합니다.`;
  }

  const body = candidates
    .map((candidate, index) => {
      const excerpts = preciseExcerpts(candidate.text, rule).join("\n\n");
      const articleLabel = getArticleLabel(candidate.text);
      return `[후보 ${index + 1} / ${articleLabel} / 점수 ${candidate.score}]\n${excerpts}`;
    })
    .join("\n\n");

  return `자동 추출 신뢰도: ${confidence}\n※ 현행 조항 전체가 아니라 체크리스트 항목과 직접 관련된 문장 주변만 발췌합니다. 조·항 위치는 자동 추정이므로 최종 확인이 필요합니다.\n\n${body}`;
}

function getStatus(text: string, rule: Rule, schoolLevel: SchoolLevel, confidence: string): ReviewStatus {
  if (text.length < 50) return "확인 필요";

  if (rule.id === "cl15-human-rights") {
    return anyKeywordMatched(text, rule.forbidden ?? []) ? "보완 필요" : "확인 필요";
  }

  const requiredOk = allGroupsMatched(text, rule.groups);
  const outdated = anyKeywordMatched(text, rule.outdated ?? []);
  const forbidden = anyKeywordMatched(text, rule.forbidden ?? []);
  const schoolLevelProblem = hasSchoolLevelProblem(text, rule, schoolLevel);

  if (forbidden || schoolLevelProblem) return "보완 필요";

  if (isChecklist11CommitteeStructureRule(rule)) {
    const hasIdentity = hasCommitteeIdentity(text);
    const hasStructure = hasCommitteeStructureTerms(text);
    const hasQuorum = hasCommitteeQuorumTerms(text);

    if (hasIdentity && hasStructure && hasQuorum) {
      return confidence === "낮음" ? "확인 필요" : "적정";
    }

    if (hasIdentity && (hasStructure || hasQuorum)) {
      return "확인 필요";
    }

    return "보완 필요";
  }

  if (isChecklist6DisciplineRule(rule)) {
    const hasDiscipline = includesLoose(text, "훈육");
    const hasDevice = ["스마트기기", "휴대전화", "휴대폰", "통신기기", "정보통신기기", "전자기기"].some((word) => includesLoose(text, word));
    const hasUseLimit = (includesLoose(text, "사용") || includesLoose(text, "소지")) && includesLoose(text, "제한");
    const hasStandardMethod = includesLoose(text, "기준") || includesLoose(text, "방법");
    const hasType = includesLoose(text, "유형");

    if (hasDiscipline && hasDevice && hasUseLimit && hasStandardMethod && hasType) {
      return confidence === "낮음" ? "확인 필요" : "적정";
    }

    if (hasDiscipline && hasDevice && hasUseLimit) {
      return "확인 필요";
    }

    return "보완 필요";
  }

  if (requiredOk && !outdated) return confidence === "낮음" ? "확인 필요" : "적정";
  if (requiredOk && outdated) return "확인 필요";

  const partialHitCount = rule.groups.filter((group) => groupMatched(text, group)).length;
  if (partialHitCount > 0) return "확인 필요";

  return "보완 필요";
}

function getComment(status: ReviewStatus, confidence: string) {
  if (status === "적정") {
    return "문서 전체에서 필수 표현이 확인됩니다. 현행 조항 후보와 최종 문구는 담당자가 확인하세요.";
  }
  if (status === "확인 필요") {
    return `문서 전체 기준 일부 관련 표현이 확인되었거나 조항 추출 신뢰도가 ${confidence}입니다. 담당자 확인이 필요합니다.`;
  }
  return "체크리스트 및 근거 자료 기준으로 보완이 필요한 항목입니다.";
}

function getArticleTitle(candidates: ArticleCandidate[]) {
  if (candidates.length === 0) return "자동 추출 필요";
  const first = candidates[0].text;
  const match = first.match(/제\s*\d+\s*조[^①②③④⑤⑥⑦⑧⑨⑩.\n]*/);
  return match ? normalize(match[0]).slice(0, 60) : "관련 조항 후보";
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

function getRecognizedArticles(text: string) {
  const articles = splitArticles(text);

  if (articles.length === 0) {
    return [
      {
        index: 1,
        articleNo: "문서 전체",
        title: "조항 경계를 찾지 못했습니다.",
        preview: normalize(text).slice(0, 500),
        length: text.length,
      },
    ];
  }

  return articles.slice(0, 160).map((article, index) => {
    const titleMatch = article.match(/제\s*(\d+)\s*조[^①②③④⑤⑥⑦⑧⑨⑩.\n]*/);
    const articleNoMatch = article.match(/제\s*(\d+)\s*조/);
    const title = titleMatch ? normalize(titleMatch[0]).slice(0, 90) : `조항 ${index + 1}`;
    const articleNo = articleNoMatch ? `제${articleNoMatch[1]}조` : `후보 ${index + 1}`;

    return {
      index: index + 1,
      articleNo,
      title,
      preview: normalize(article).slice(0, 500),
      length: article.length,
    };
  });
}

export function analyzeRegulation(params: {
  schoolName: string;
  schoolLevel: SchoolLevel;
  regulationText: string;
  checklistText?: string;
  regulationFileName?: string;
  checklistFileName?: string;
}): AnalysisResult {
  const text = params.regulationText || "";
  const activeRules = RULES.filter((rule) => !rule.schoolLevels || rule.schoolLevels.includes(params.schoolLevel));

  const items: ReviewItem[] = activeRules.map((rule) => {
    const candidates = findArticleCandidates(text, rule);
    const confidence = confidenceLabel(candidates, rule);
    const status = getStatus(text, rule, params.schoolLevel, confidence);

    return {
      id: rule.id,
      checklistNo: rule.checklistNo,
      status,
      category: rule.category,
      title: rule.title,
      article: getArticleTitle(candidates),
      basis: rule.basis,
      sources: rule.sources,
      comment: getComment(status, confidence),
      current: text.length < 50 ? "규정 본문이 충분히 입력되지 않았습니다." : renderCandidates(candidates, confidence, rule),
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
    extractedTextLength: text.length,
    summary: summarize(items),
    items,
    recognizedArticles: getRecognizedArticles(text),
    notice:
      "본 결과는 교육청 체크리스트 15개 항목, 연수자료, 초·중등교육법, 초·중등교육법 시행령, 교원의 학생생활지도에 관한 고시를 근거로 한 AI 검토 보조 결과입니다. PDF 추출 결과는 조항 순서가 섞일 수 있으므로 최종 개정안은 학교 절차에 따라 담당자가 확인해야 합니다.",
  };
}
