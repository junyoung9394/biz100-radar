import { NextResponse } from "next/server";
import { fetchUsFinancialHighlights } from "@/lib/sec-financials";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cik = searchParams.get("cik") ?? undefined;

  try {
    const result = await fetchUsFinancialHighlights({ cik });
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "재무정보를 가져오지 못했습니다.";

    return NextResponse.json(
      {
        ok: false,
        year: "",
        reportForm: "",
        message,
        highlights: []
      },
      { status: 500 }
    );
  }
}
