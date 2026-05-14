import { NextResponse } from "next/server";
import { fetchStockQuote } from "@/lib/stock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stockCode = searchParams.get("stockCode") ?? "";

  if (!stockCode) {
    return NextResponse.json(
      {
        ok: false,
        message: "stockCode가 필요합니다.",
        quote: null
      },
      { status: 400 }
    );
  }

  try {
    const quote = await fetchStockQuote({ stockCode });

    return NextResponse.json({
      ok: true,
      quote
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "주식시세 정보를 가져오지 못했습니다.";

    return NextResponse.json(
      {
        ok: false,
        message,
        quote: null
      },
      { status: 500 }
    );
  }
}