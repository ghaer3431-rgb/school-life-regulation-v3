// ADD_GUIDANCE_METHOD_TITLE_CHECK_HEARAM_MOSAN_PATCH
// CL11_COMPOSITION_ONLY_SHOW_MISSING_QUORUM_PATCH
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
  mosanRegulation: {
    label: "모산초 생활규정 확정안",
    detail: "모산초등학교 학교생활규정 2026.5.26. 5차 수정안의 조항 구조와 개정안 문체",
  },
  hearamRegulation: {
    label: "강릉해람중 생활규정안",
    detail: "강릉해람중학교 학교생활규정 2026.5.26.안의 ‘교육목적상 필요한 지도 방법’ 장·절 표현",
  },
  mosanRegulation: {
    label: "모산초 생활규정 확정안",
    detail: "모산초등학교 학교생활규정 2026 개정안의 조항 구조와 개정안 문체",
  },
  middleSchoolExample: {
    label: "중학교 생활규정 예시",
    detail: "중학교 생활규정안의 '교육목적상 필요한 지도 방법' 장·절 표현 참고",
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
      `제○조【적용근거】 이 규정은 「대한민국헌법」, 「유엔아동권리협약」, 「교육기본법」, 「초·중등교육법」, 「초·중등교육법 시행령」, 교육부 고시 「교원의 학생생활지도에 관한 고시」, 강원특별자치도교육청의 최근 개정 고시 등 관계 법령과 지침에 근거하여 학교생활규정에 관한 세부 사항을 정한다.`,
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
      `제○조【학교생활규정 제·개정 절차】 학교장은 학교생활규정을 제·개정하기 위하여 학생, 보호자, 교원 대표로 구성된 학교생활규정 제·개정위원회를 구성할 수 있다. 위원회는 개정안에 대한 적법성·타당성 등을 검토하고, 가정통신문, 설문조사, 토론회 등 필요한 방법으로 학생·보호자·교원의 의견을 수렴한다. 위원회는 개정안을 확정하여 학교운영위원회 심의·자문을 요청하고, 학교장은 확정된 학교생활규정을 공포하며 학생·교직원·보호자에게 안내한다.`,
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
      `제○조【그 밖의 분야】 학교의 장과 교원은 학업 및 진로, 보건 및 안전, 인성 및 대인관계에서 규정한 사항 외에 다음 각 호의 사항에 대해 학생을 지도할 수 있다.
1. 특수교육대상자와 다문화학생에 대한 인식 및 태도
2. 건전한 학교생활 문화 조성을 위한 용모 및 복장
3. 비행 및 범죄 예방
4. 휴대전화 등 스마트기기의 올바른 사용에 관한 사항`,
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
      `제○조【휴대전화 등 스마트기기 사용】 학생은 수업 중에 휴대전화 등 스마트기기를 사용해서는 안 된다. 다만, 장애가 있거나 특수교육이 필요한 학생 등이 보조기기로 사용하는 경우, 교육의 목적으로 사용하는 경우, 긴급한 상황 대응 등을 위하여 사용하는 경우로서 학교의 장과 교원이 허용하는 때에는 수업 중 스마트기기를 사용할 수 있다.`,
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
      `제○조【주의】 학교의 장과 교원은 수업 중 스마트기기를 사용하거나 그 밖에 수업에 부적합한 물품을 사용하는 경우 학생에게 주의를 주어 스마트기기 또는 물품의 사용을 제한할 수 있다. 다만, 법 제20조의5제1항 및 학교생활규정의 스마트기기 사용 예외 조항에 해당하는 경우는 제외한다.`,
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
      `제○조【훈육】 학교의 장과 교원은 조언 또는 주의로 학생에 대한 행동 중재가 어려운 경우 훈육할 수 있다. 학교의 장과 교원은 학칙으로 정하는 바에 따라 수업 중 반복적으로 사용하는 휴대전화 등 스마트기기, 학생 및 교직원의 안전과 건강에 위해를 줄 우려가 있는 물품, 관련 법령에 따라 학생에게 판매될 수 없는 물품, 법 제20조의5제3항에 따른 스마트기기 유형에 해당하는 물품 등을 학생으로부터 분리·보관하여 사용·소지를 제한할 수 있다. 스마트기기의 구체적 유형은 별표로 정한다.`,
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
      `제○조【물품의 분리·보관】 학교의 장과 교원은 학칙으로 정하는 바에 따라 다음 각 호의 물품을 학생으로부터 분리·보관하여 사용·소지를 제한할 수 있다.
1. 수업 중 휴대전화 등 스마트기기 사용으로 2회 이상 주의를 주었음에도 학생이 계속 사용하는 물품
2. 학생 및 교직원의 안전과 건강에 위해를 줄 우려가 있는 물품
3. 관련 법령에 따라 학생에게 판매될 수 없는 물품
4. 법 제20조의5제3항에 따른 스마트기기 유형에 해당하는 물품
5. 그 밖에 학칙으로 정하여 사용·소지를 금지한 물품
분리·보관의 요건, 기간, 장소, 방법 및 반환 절차는 별표로 정한다.`,
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
      `제○조【개별학생교육지원】 학교의 장과 교원은 학생이 수업 진행이 불가능할 정도로 교육활동을 방해하여 다른 학생들의 학습권 보호가 필요하다고 판단하는 경우 해당 학생을 일시적으로 분리하여 개별적으로 교육지원할 수 있다. 이 경우 개별학생교육지원은 수업 상황, 해당 학생의 특수성 등을 종합적으로 고려하여 필요한 최소한도에서 실시한다.`,
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
      `제○조【생활지도 불응시 조치】 학교의 장은 학생 또는 보호자가 교원의 정당한 생활지도 및 개별학생교육지원에 불응하여 의도적으로 교육활동을 방해하는 경우 관계 법령에 따른 조치를 취할 수 있다. 교원은 지속적인 생활지도 및 개별학생교육지원에 불응하는 학생에 대하여 학교의 장에게 징계를 요청할 수 있다.

제○조【이의제기】 학생 또는 보호자는 학교의 장과 교원의 생활지도 및 개별학생교육지원이 부당하다고 판단하는 경우 학교의 장에게 14일 이내에 이의를 제기할 수 있다. 학교의 장은 이의제기에 대해 14일 이내에 답변하여야 한다.`,
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
      `제○조【개별학생교육지원의 장소, 시간 및 학습지원 방법】 개별학생교육지원의 장소는 교실 내 지정 공간 또는 교실 외 지정 공간으로 하되 안전하고 쾌적한 공간이어야 한다. 개별학생교육지원은 수업 중 일시적으로 분리된 학생이 수업에 다시 참여할 수 있다고 판단될 때까지 필요한 최소한도로 실시한다. 개별학생교육지원 대상 학생에게는 감정 조절을 위한 상담 또는 프로그램, 수업과 관련된 학습 과제 등을 제공한다.`,
    reason:
      "교원의 학생생활지도에 관한 고시 제19조에 따라 개별학생교육지원의 장소, 시간, 학습지원 방법 등을 학교생활규정에 반영해야 합니다.",
  },
  {
    id: "cl11-committee-composition-quorum",
    checklistNo: "11",
    category: "징계",
    title: "학생선도위원회 구성 및 의사·의결정족수 기재",
    basis: "교육청 권고",
    groups: [["학생선도위원회", "선도위원회"], ["기구 및 운영", "위원회를 둔다", "교감을 위원장으로", "위원으로 하되", "간사"], ["과반수", "정족수", "찬성", "재적", "출석"]],
    titleKeywords: ["학생선도위원회", "선도위원회", "구성", "정족수"],
    targetKeywords: ["학생선도위원회", "선도위원회", "기구 및 운영", "위원회를 둔다", "교감을 위원장으로", "위원으로 하되", "간사", "과반수", "정족수", "출석", "찬성", "재적"],
    sources: [src.checklist, src.training],
    revised:
      `제○조【선도위원회의 구성과 임무】 학생의 생활교육 및 징계 등에 관한 사항을 심의·의결하기 위하여 선도위원회를 둔다. 위원장은 교감, 부위원장은 생활교육 담당교사가 되며, 업무 분장을 고려하여 교사 위원 5인 이상 10인 이하로 구성한다. 위원장은 선도위원회를 대표하고 위원회의 업무를 총괄하며, 부위원장은 위원장을 보좌하고 위원장 유고 시 위원장의 업무를 대행한다.

제○조【위원회의 운영】 선도위원회는 재적위원 과반수 출석으로 개회하고, 출석위원 과반수의 찬성으로 의결한다.`,
    reason:
      "11번은 학생선도위원회의 구성과 의사·의결정족수를 함께 확인하는 항목입니다. 구성 조항만 있고 재적위원 과반수 출석, 출석위원 과반수 찬성 등 정족수 조항이 없으면 보완이 필요합니다.",
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
      `제○조【위원회의 운영】 선도위원회는 초·중등교육법 시행령 제31조 제1항 각 호의 학생 징계를 위하여 선도위원회를 개최하는 경우 개최 10일 전 학생 및 보호자에게 서면으로 통지하여 의견진술의 기회를 부여하는 등 적정한 절차를 거쳐야 한다.`,
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
      `제○조【징계의 종류와 기간】 학교의 장은 교육상 필요하다고 인정할 때에는 학생에 대하여 징계할 수 있으며, 학생징계의 종류와 기간은 다음 각 호와 같다.
1. 학교내의 봉사
2. 사회봉사
3. 특별교육이수
4. 출석정지
출석정지는 1회 최대 10일 이내, 연간 30일 이내로 하며, 출석정지 기간은 학교생활기록부의 출결상황란에 미인정 결석 일수에 산입하여 기재하되 특기사항란에 사유는 기재하지 않는다. 초등학교와 중학교는 퇴학처분을 둘 수 없다.`,
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
      `제○조【징계통보 및 진술권 보장】 선도위원회는 학생 징계를 하기 전이나 징계 심의 시 학생 및 보호자에게 의견진술의 기회를 부여하는 등 징계사유에 대한 사전 통지, 소명기회의 보장 등 적정한 절차를 거쳐야 한다. 장애학생, 다문화학생 등 소수자 학생이 선도위원회에 회부될 경우 진술권 보장을 위한 지원절차를 마련한다.`,
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
      `학교생활규정 전체에서 학생 또는 교직원의 인권 침해 소지가 있는 조항을 점검한다. 학생의 의사에 반한 두발·복장 등 용모 규제, 학생 간 교제 제한, 외부단체 활동 제한, 속옷·양말·외투 등에 대한 과도한 제한, 체벌 또는 신체적 고통을 수반하는 지도 방식은 삭제하거나 인권친화적인 표현으로 수정한다. 두발 및 복장 등 용모에 대해서는 학생의 의사와 학교생활규정 제·개정 절차를 존중하는 방향으로 정한다.`,
    reason:
      "학생과 교직원의 인권 침해 소지가 있는 조항은 문서 전체를 기준으로 확인해야 하며, 자동 점검 결과가 없더라도 최종 담당자 확인이 필요합니다.",
  },
  {
    id: "cl16-guidance-method-title",
    checklistNo: "추가",
    category: "용어 정비",
    title: "‘징계 외 지도방법’을 ‘교육목적상 필요한 지도 방법’으로 정비",
    basis: "연수자료 근거",
    groups: [["교육목적상 필요한 지도 방법", "교육목적상 필요한 지도방법", "생활지도 및 교육목적상 필요한 지도 방법"]],
    titleKeywords: ["교육목적상 필요한 지도 방법", "교육목적상 필요한 지도방법", "생활지도 및 교육목적상 필요한 지도 방법", "징계 외 지도방법", "징계 외 지도 방법", "징계외 지도방법", "징계외 지도 방법"],
    targetKeywords: ["교육목적상 필요한 지도 방법", "교육목적상 필요한 지도방법", "생활지도 및 교육목적상 필요한 지도 방법", "징계 외 지도방법", "징계 외 지도 방법", "징계외 지도방법", "징계외 지도 방법"],
    outdated: ["징계 외 지도방법", "징계 외 지도 방법", "징계외 지도방법", "징계외 지도 방법"],
    sources: [src.training, src.decree, src.mosanRegulation, src.hearamRegulation],
    revised:
      `제○장 생활지도 및 교육목적상 필요한 지도 방법

또는

제○절 교육목적상 필요한 지도 방법`,
    reason:
      "초·중등교육법 시행령 제9조제1항제7호 및 연수자료의 표현에 맞추어 기존 ‘징계 외 지도방법’ 표현은 ‘교육목적상 필요한 지도 방법’으로 정비하는 것이 적절합니다. 모산초 생활규정 확정안과 강릉해람중 생활규정안 모두 ‘생활지도 및 교육목적상 필요한 지도 방법’ 형태의 장 제목을 사용하므로 이를 개정안 예시의 기준 표현으로 삼습니다. 단, 일반적인 ‘징계’, ‘징계의 종류’, ‘징계 심의’ 조항 전체가 아니라 장·절 제목 또는 해당 표현이 직접 나타나는 부분만 확인해야 합니다.",
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
  return ["학생선도위원회", "선도위원회", "학생소선도위원회"].some((word) => includesLoose(article, word));
}

function hasCommitteeCompositionTerms(article: string) {
  // 11번의 구성 조항은 실제 규정에서 '기구 및 운영' 조항으로 표현되는 경우가 많다.
  const compositionTerms = [
    "기구 및 운영",
    "학생선도위원회를 둔다",
    "선도위원회를 둔다",
    "위원회를 둔다",
    "학생선도위원회는 교감을 위원장으로",
    "교감을 위원장으로",
    "위원장으로 하고",
    "부장을",
    "생활교육 담당 교사",
    "생활교육 담당교사",
    "진로교육부장",
    "교무부장",
    "학년부장",
    "위원으로 하되",
    "위원으로 구성",
    "간사로 한다",
    "간사",
    "구성",
  ];

  return compositionTerms.some((word) => includesLoose(article, word));
}

function hasCommitteeStructureTerms(article: string) {
  return hasCommitteeCompositionTerms(article);
}

function hasCommitteeQuorumTerms(article: string) {
  // 11번 정족수는 단순 '의결한다'가 아니라 회의 성립·의결 기준이어야 한다.
  if (includesLoose(article, "과반수")) return true;
  if (includesLoose(article, "정족수")) return true;
  if (includesLoose(article, "재적") && includesLoose(article, "출석")) return true;
  if (includesLoose(article, "출석") && includesLoose(article, "찬성")) return true;
  if (includesLoose(article, "출석위원") && includesLoose(article, "찬성")) return true;
  return false;
}

function hasChecklist11ProcedureNoise(article: string) {
  const noiseTerms = [
    "사안설명",
    "의견청취",
    "의견을 진술",
    "출석하여 의견",
    "징계 여부",
    "징계 양정",
    "징계의결 사항",
    "징계 의결",
    "의결한다",
    "학교장의 결재",
    "결재를 득",
    "회부",
    "보고",
    "위원장에게",
    "교장에게",
    "징계담당",
    "기록",
    "작성",
    "서면 보고",
  ];

  return noiseTerms.some((word) => includesLoose(article, word));
}

function isChecklist11CandidateAllowed(article: string) {
  const hasIdentity = hasCommitteeIdentity(article);
  const hasComposition = hasCommitteeCompositionTerms(article);
  const hasQuorum = hasCommitteeQuorumTerms(article);
  const hasNoise = hasChecklist11ProcedureNoise(article);

  const excludedCommitteeTerms = [
    "학교생활규정 제·개정위원회",
    "제·개정위원회",
    "학교운영위원회",
    "학교폭력",
    "교권보호",
  ];

  if (!hasIdentity) return false;
  if (excludedCommitteeTerms.some((word) => includesLoose(article, word))) return false;

  // 구성 조항은 정족수 표현이 없어도 11번 후보로 보여야 한다.
  if (hasComposition) return true;

  // 정족수 표현이 있는 조항은 징계 심의 조항 안에 있어도 후보로 인정한다.
  if (hasQuorum) return true;

  // 단순 절차 조항은 제외한다.
  if (hasNoise) return false;

  return false;
}


function isChecklist16GuidanceMethodTitleRule(rule: Rule) {
  return rule.id === "cl16-guidance-method-title";
}

function hasOldGuidanceMethodTitle(article: string) {
  return [
    "징계 외 지도방법",
    "징계 외 지도 방법",
    "징계외 지도방법",
    "징계외 지도 방법",
  ].some((word) => includesLoose(article, word));
}

function hasNewGuidanceMethodTitle(article: string) {
  return [
    "교육목적상 필요한 지도 방법",
    "교육목적상 필요한 지도방법",
    "생활지도 및 교육목적상 필요한 지도 방법",
    "교육목적상 필요한 지도",
  ].some((word) => includesLoose(article, word));
}

function isChecklist16CandidateAllowed(article: string) {
  // 일반적인 '징계', '징계의 종류', '징계 심의'는 이 항목 후보가 아니다.
  return hasOldGuidanceMethodTitle(article) || hasNewGuidanceMethodTitle(article);
}

function scoreArticle(article: string, rule: Rule) {
  let score = 0;

  const titleArea = article.slice(0, 160);

  if (isChecklist16GuidanceMethodTitleRule(rule)) {
    if (!isChecklist16CandidateAllowed(article)) score -= 300;
    if (hasOldGuidanceMethodTitle(article)) score += 160;
    if (hasNewGuidanceMethodTitle(article)) score += 130;
    if (hasOldGuidanceMethodTitle(titleArea) || hasNewGuidanceMethodTitle(titleArea)) score += 80;
  }

  if (isChecklist11CommitteeStructureRule(rule)) {
    if (!isChecklist11CandidateAllowed(article)) score -= 300;

    if (hasCommitteeIdentity(article) && hasCommitteeCompositionTerms(article)) score += 180;
    if (hasCommitteeIdentity(article) && hasCommitteeQuorumTerms(article)) score += 140;

    if (includesLoose(titleArea, "기구") || includesLoose(titleArea, "운영") || includesLoose(titleArea, "구성")) score += 100;
    if (includesLoose(titleArea, "징계의 심의") && !hasCommitteeQuorumTerms(article)) score -= 120;
    if (hasChecklist11ProcedureNoise(article) && !hasCommitteeCompositionTerms(article) && !hasCommitteeQuorumTerms(article)) score -= 240;
  }

  const smartRelatedRuleIds = ["cl04-smart-device-term", "cl05-exception-for-smart-device", "cl06-discipline-smart-device", "cl07-separated-items"];

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

  const maxCandidates = rule.id === "cl11-committee-composition-quorum"
    ? 5
    : rule.id === "cl16-guidance-method-title"
      ? 5
      : ["cl04-smart-device-term", "cl05-exception-for-smart-device", "cl06-discipline-smart-device", "cl07-separated-items"].includes(rule.id)
        ? 8
        : 3;

  const ranked = articles
    .map((article) => ({ text: article, score: scoreArticle(article, rule) }))
    .filter((item) => item.score > 0)
    .filter((item) => rule.id !== "cl11-committee-composition-quorum" || isChecklist11CandidateAllowed(item.text))
    .filter((item) => rule.id !== "cl16-guidance-method-title" || isChecklist16CandidateAllowed(item.text))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCandidates);

  if (ranked.length > 0) return ranked;

  if (rule.id === "cl11-committee-composition-quorum" || rule.id === "cl16-guidance-method-title") {
    return [];
  }

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
    "cl16-guidance-method-title": [
      "징계 외 지도방법",
      "징계 외 지도 방법",
      "징계외 지도방법",
      "징계외 지도 방법",
      "생활지도 및 교육목적상 필요한 지도 방법",
      "교육목적상 필요한 지도 방법",
      "교육목적상 필요한 지도방법",
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

  if (isChecklist16GuidanceMethodTitleRule(rule)) {
    const hasOld = hasOldGuidanceMethodTitle(text);
    const hasNew = hasNewGuidanceMethodTitle(text);

    if (hasNew && !hasOld) return "적정";
    if (hasOld && !hasNew) return "보완 필요";
    if (hasOld && hasNew) return "확인 필요";
    return "확인 필요";
  }

  if (isChecklist11CommitteeStructureRule(rule)) {
    const hasIdentity = hasCommitteeIdentity(text);
    const hasStructure = hasCommitteeStructureTerms(text);
    const hasQuorum = hasCommitteeQuorumTerms(text);

    if (hasIdentity && hasStructure && hasQuorum) {
      return confidence === "낮음" ? "확인 필요" : "적정";
    }

    // 구성은 있으나 의사·의결정족수가 없으면 체크리스트 11번 기준 보완 필요
    if (hasIdentity && hasStructure && !hasQuorum) {
      return "보완 필요";
    }

    if (hasIdentity && hasQuorum && !hasStructure) {
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

function getComment(status: ReviewStatus, confidence: string, ruleId?: string) {
  if (ruleId === "cl16-guidance-method-title") {
    if (status === "적정") return "‘교육목적상 필요한 지도 방법’ 표현이 확인됩니다.";
    if (status === "보완 필요") return "‘징계 외 지도방법’ 표현이 확인됩니다. 장·절 제목을 ‘교육목적상 필요한 지도 방법’으로 정비하는 것을 검토하세요.";
    return "관련 표현을 자동 확인하지 못했거나 기존 표현과 신규 표현이 함께 확인됩니다. 장·절 제목을 담당자가 확인하세요.";
  }
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
      comment: getComment(status, confidence, rule.id),
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
      "본 결과는 교육청 체크리스트 15개 항목과 추가 용어 정비 항목과 추가 용어 정비 항목, 연수자료, 초·중등교육법, 초·중등교육법 시행령, 교원의 학생생활지도에 관한 고시를 근거로 하며, AI 개정안 초안은 모산초등학교 학교생활규정 확정안의 조항 표현을 참고한 검토 보조 결과입니다. PDF 추출 결과는 조항 순서가 섞일 수 있으므로 최종 개정안은 학교 절차에 따라 담당자가 확인해야 합니다.",
  };
}
