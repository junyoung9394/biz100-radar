import { NextResponse } from "next/server";
import { fetchMarketIndices } from "@/lib/krx";

export async function GET() {
  try {
    const indices = await fetchMarketIndices();

    return NextResponse.json({ ok: true, indices });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "지수 데이터를 가져오지 못했습니다.";

    return NextResponse.json({ ok: false, message, indices: null }, { status: 500 });
  }
}
