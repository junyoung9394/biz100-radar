import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.KRX_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "KRX_API_KEY 환경변수 없음" });
  }

  const now = new Date();
  const korea = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const trdDd = `${korea.getFullYear()}${String(korea.getMonth() + 1).padStart(2, "0")}${String(korea.getDate()).padStart(2, "0")}`;

  const results: Record<string, unknown>[] = [];

  // 오늘부터 3일 전까지 각 날짜 응답 확인
  for (let i = 0; i <= 3; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const kd = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const date = `${kd.getFullYear()}${String(kd.getMonth() + 1).padStart(2, "0")}${String(kd.getDate()).padStart(2, "0")}`;

    const url = new URL("https://openapi.krx.co.kr/contents/MDC/STAT/standard/MDCSTAT00601");
    url.searchParams.set("idxIndMidclssCd", "02");
    url.searchParams.set("trdDd", date);

    try {
      const res = await fetch(url.toString(), {
        headers: { AUTH_KEY: apiKey },
        cache: "no-store"
      });
      const body = await res.json();
      results.push({ date, status: res.status, body });
    } catch (e) {
      results.push({ date, error: String(e) });
    }
  }

  return NextResponse.json({ trdDd, results });
}
