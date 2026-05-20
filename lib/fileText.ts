import JSZip from "jszip";
import * as XLSX from "xlsx";

export type FileReadResult = { text: string; warning?: string };
const extOf = (file: File) => file.name.split(".").pop()?.toLowerCase() ?? "";

export async function extractTextFromFile(file: File): Promise<FileReadResult> {
  const ext = extOf(file);
  if (["txt", "md", "csv"].includes(ext)) return { text: await file.text() };

  if (ext === "docx") {
    const mammoth = await import("mammoth/mammoth.browser");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return { text: result.value };
  }

  if (ext === "pdf") {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages: string[] = [];
    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
      const page = await pdf.getPage(pageNo);
      const content = await page.getTextContent();
      pages.push(content.items.map((item: any) => item.str).join(" "));
    }
    return { text: pages.join("\n\n") };
  }

  if (ext === "hwpx") {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const names = Object.keys(zip.files).filter((n) => n.startsWith("Contents/") && n.endsWith(".xml")).sort();
    const chunks: string[] = [];
    for (const name of names) {
      const xml = await zip.files[name].async("text");
      const text = xml.replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
      if (text) chunks.push(text);
    }
    return { text: chunks.join("\n"), warning: "HWPX 텍스트를 추출했습니다. 표·각주 등 복잡한 서식은 일부 누락될 수 있습니다." };
  }

  if (ext === "hwp") return { text: "", warning: "구형 HWP는 브라우저에서 안정적으로 읽기 어렵습니다. 한글에서 전체 선택 후 복사하여 본문 붙여넣기를 사용하거나 HWPX/DOCX/PDF로 저장해 업로드하세요." };

  if (["xlsx", "xls"].includes(ext)) {
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const lines: string[] = [];
    workbook.SheetNames.forEach((sheetName) => {
      lines.push(`[${sheetName}]`);
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[sheetName], { defval: "" });
      rows.forEach((row) => lines.push(Object.values(row).join(" ")));
    });
    return { text: lines.join("\n") };
  }

  return { text: "", warning: "지원하지 않는 파일 형식입니다. TXT, DOCX, PDF, HWPX 또는 본문 붙여넣기를 사용하세요." };
}
