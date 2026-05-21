import JSZip from "jszip";
import * as XLSX from "xlsx";

export type FileReadResult = { text: string; warning?: string };
const extOf = (file: File) => file.name.split(".").pop()?.toLowerCase() ?? "";

function normalizePdfLine(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/([^\n])\s*(제\s*\d+\s*조)/g, "$1\n$2")
    .replace(/([^\n])\s*(제\s*\d+\s*장)/g, "$1\n$2")
    .trim();
}

function extractPdfPageText(content: any) {
  const items = content.items
    .map((item: any) => {
      const transform = item.transform ?? [0, 0, 0, 0, 0, 0];
      return {
        text: String(item.str ?? ""),
        x: Number(transform[4] ?? 0),
        y: Number(transform[5] ?? 0),
      };
    })
    .filter((item: { text: string }) => item.text.trim().length > 0);

  const lines: Array<{ y: number; items: Array<{ text: string; x: number }> }> = [];

  for (const item of items) {
    const line = lines.find((row) => Math.abs(row.y - item.y) < 3);
    if (line) {
      line.items.push({ text: item.text, x: item.x });
    } else {
      lines.push({ y: item.y, items: [{ text: item.text, x: item.x }] });
    }
  }

  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) =>
      line.items
        .sort((a, b) => a.x - b.x)
        .map((item) => item.text)
        .join(" ")
    )
    .join("\n");
}

export async function extractTextFromFile(file: File): Promise<FileReadResult> {
  const ext = extOf(file);

  if (["txt", "md", "csv"].includes(ext)) {
    return { text: await file.text() };
  }

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

    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
      const page = await pdf.getPage(pageNo);
      const content = await page.getTextContent();
      pages.push(extractPdfPageText(content));
    }

    return {
      text: normalizePdfLine(pages.join("\n\n")),
      warning:
        "PDF 텍스트를 줄 단위로 정렬해 추출했습니다. PDF는 내부 텍스트 순서가 화면과 다를 수 있으므로 현행 조항 후보를 확인하세요.",
    };
  }

  if (ext === "hwpx") {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const names = Object.keys(zip.files)
      .filter((name) => name.startsWith("Contents/") && name.endsWith(".xml"))
      .sort();

    const chunks: string[] = [];

    for (const name of names) {
      const xml = await zip.files[name].async("text");
      const text = xml
        .replace(/<\/(?:hp:)?p>/g, "\n")
        .replace(/<\/(?:hp:)?section>/g, "\n")
        .replace(/<\/(?:hp:)?tbl>/g, "\n")
        .replace(/<(?:hp:)?br\s*\/?>/g, "\n")
        .replace(/<[^>]+>/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/[ \t]+/g, " ")
        .replace(/\n\s+/g, "\n")
        .replace(/\n{2,}/g, "\n")
        .trim();

      if (text) chunks.push(text);
    }

    return {
      text: chunks.join("\n"),
      warning: "HWPX 텍스트를 추출했습니다. 표·각주 등 복잡한 서식은 일부 누락될 수 있습니다.",
    };
  }

  if (ext === "hwp") {
    return {
      text: "",
      warning:
        "구형 HWP는 브라우저에서 안정적으로 읽기 어렵습니다. 한글에서 전체 선택 후 복사하여 본문 붙여넣기를 사용하거나 HWPX/DOCX/PDF로 저장해 업로드하세요.",
    };
  }

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

  return {
    text: "",
    warning: "지원하지 않는 파일 형식입니다. TXT, DOCX, PDF, HWPX 또는 본문 붙여넣기를 사용하세요.",
  };
}
