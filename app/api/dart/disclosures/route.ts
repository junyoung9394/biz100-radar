import { NextResponse } from "next/server";
import { fetchRecentDisclosures } from "@/lib/dart";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const stockCode = searchParams.get("stockCode") ?? "";
  const companyName = searchParams.get("companyName") ?? "";

  if (!stockCode || !companyName) {
    return NextResponse.json(
      {
        ok: false,
        message: "stockCode와 companyName이 필요합니다.",
        disclosures: []
      },
      { status: 400 }
    );
  }

  try {
    const disclosures = await fetchRecentDisclosures({
      stockCode,
      companyName
    });

    return NextResponse.json({
      ok: true,
      disclosures
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "최근 공시를 가져오지 못했습니다.";

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