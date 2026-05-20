# 학교생활규정 제·개정 검토 지원 시스템 v0.3

교육청 체크리스트를 1차 기준으로, 연수자료 PDF/PPT·초중등교육법·초중등교육법 시행령·교원의 학생생활지도에 관한 고시를 함께 근거로 반영하는 웹앱입니다.

## v0.3 반영

- 실제 학교생활규정 텍스트 추출 기반 점검
- 지원 파일: TXT, MD, DOCX, PDF, HWPX
- 구형 HWP는 브라우저 파싱 한계가 있어 본문 붙여넣기 병행 지원
- Firebase Storage 사용 안 함
- 원본 파일은 서버에 저장하지 않음
- Firestore에는 분석 결과만 저장
- 결과 다운로드를 Excel(.xlsx)로 제공
- 담당자 메모 버튼 제거
- UI 정리

## 실행

```bash
npm install
npm run dev
```

## Vercel 환경변수

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```
