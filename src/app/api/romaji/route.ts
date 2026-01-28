import { NextRequest, NextResponse } from "next/server";
import { toRomaji } from "@/lib/romaji";

export async function POST(request: NextRequest) {
  try {
    const { japanese } = await request.json();

    if (!japanese || typeof japanese !== "string") {
      return NextResponse.json(
        { error: "Japanese text is required" },
        { status: 400 }
      );
    }

    const romaji = await toRomaji(japanese);
    return NextResponse.json({ romaji });
  } catch (error) {
    console.error("Romaji conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert to romaji" },
      { status: 500 }
    );
  }
}
