import { NextResponse } from "next/server";
import { fetchUsStockQuote } from "@/lib/us-stock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") ?? "";

  if (!ticker) {
    return NextResponse.json(
      {
        ok: false,
        message: "ticker가 필요합니다.",
        quote: null
      },
      { status: 400 }
    );
  }

  try {
    const quote = await fetchUsStockQuote({ ticker });

    return NextResponse.json({
      ok: true,
      quote
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "미국 시장 데이터를 가져오지 못했습니다.";

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