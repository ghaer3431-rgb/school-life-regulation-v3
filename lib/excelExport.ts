import * as XLSX from "xlsx";
import type { AnalysisResult } from "./types";
export function downloadAnalysisExcel(result: AnalysisResult) {
  const wb = XLSX.utils.book_new();
  const summary = XLSX.utils.aoa_to_sheet([
    ["학교명", result.schoolName], ["학교급", result.schoolLevel], ["생성일시", new Date(result.generatedAt).toLocaleString("ko-KR")],
    ["학교생활규정 파일명", result.regulationFileName ?? ""], ["체크리스트 파일명", result.checklistFileName ?? ""], ["추출 글자 수", result.extractedTextLength],
    ["전체", result.summary.total], ["보완 필요", result.summary.needsRevision], ["확인 필요", result.summary.needsReview], ["적정", result.summary.adequate], ["안내", result.notice]
  ]);
  summary["!cols"] = [{ wch: 24 }, { wch: 100 }];
  XLSX.utils.book_append_sheet(wb, summary, "요약");
  const rows = result.items.map((i, idx) => ({ 번호: idx + 1, 체크리스트번호: i.checklistNo, 상태: i.status, 영역: i.category, 점검항목: i.title, 판단근거: i.basis, 근거자료: i.sources.map(s=>`${s.label}: ${s.detail}`).join("\n"), 검토의견: i.comment, 현행조항: i.current, AI개정안초안: i.revised, 개정사유: i.reason }));
  const sheet = XLSX.utils.json_to_sheet(rows); sheet["!cols"] = [{wch:6},{wch:14},{wch:12},{wch:18},{wch:36},{wch:16},{wch:55},{wch:45},{wch:80},{wch:80},{wch:55}];
  XLSX.utils.book_append_sheet(wb, sheet, "검토표");
  const compare = XLSX.utils.json_to_sheet(result.items.filter(i=>i.status!=="적정"&&i.status!=="해당 없음").map((i,idx)=>({번호:idx+1,구분:i.category,현행:i.current,개정안:i.revised,개정사유:i.reason,근거:i.sources.map(s=>s.label).join(", ")})));
  compare["!cols"] = [{wch:6},{wch:18},{wch:80},{wch:80},{wch:55},{wch:45}];
  XLSX.utils.book_append_sheet(wb, compare, "신구대조표 후보");
  XLSX.writeFile(wb, `${result.schoolName}_학교생활규정_검토결과_${new Date().toISOString().slice(0,10)}.xlsx`, { compression: true });
}
