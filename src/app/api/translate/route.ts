import { NextRequest, NextResponse } from "next/server";

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "DeepL API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: [text],
        source_lang: "EN",
        target_lang: "JA",
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Translation limit reached. Try again tomorrow." },
          { status: 429 }
        );
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: "Invalid API key" },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Translation failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
