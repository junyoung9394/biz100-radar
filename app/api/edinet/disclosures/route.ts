import { NextResponse } from "next/server";
import { fetchRecentEdinetDisclosures } from "@/lib/edinet";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") ?? "";

  if (!ticker) {
    return NextResponse.json(
      {
        ok: false,
        message: "ticker가 필요합니다.",
        disclosures: []
      },
      { status: 400 }
    );
  }

  try {
    const disclosures = await fetchRecentEdinetDisclosures({
      ticker
    });

    return NextResponse.json({
      ok: true,
      disclosures
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "EDINET 공시를 가져오지 못했습니다.";

    return NextResponse.json(
      {
        ok: false,
        message,
        disclosures: []
      },
      { status: 500 }
    );
  }
}