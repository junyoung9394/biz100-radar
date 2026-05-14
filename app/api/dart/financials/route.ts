import { NextResponse } from "next/server";
import { fetchFinancialHighlights } from "@/lib/dart-financials";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dartCorpCode = searchParams.get("dartCorpCode") ?? "";

  try {
    const result = await fetchFinancialHighlights({
      dartCorpCode
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "재무정보를 가져오지 못했습니다.";

    return NextResponse.json(
      {
        ok: false,
        year: "",
        reportName: "사업보고서",
        message,
        highlights: []
      },
      { status: 500 }
    );
  }
}