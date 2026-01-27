export interface TranslateResponse {
  translations: {
    detected_source_language: string;
    text: string;
  }[];
}

export interface TranslateError {
  message: string;
}

export async function translateToJapanese(
  text: string
): Promise<{ japanese: string } | { error: string }> {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Translation failed" };
    }

    const data: TranslateResponse = await response.json();
    return { japanese: data.translations[0].text };
  } catch {
    return { error: "Network error. Check your connection." };
  }
}
