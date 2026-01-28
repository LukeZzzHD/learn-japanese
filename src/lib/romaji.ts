import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import path from "path";

let kuroshiroInstance: Kuroshiro | null = null;
let initPromise: Promise<Kuroshiro> | null = null;
let initError: Error | null = null;

// Resolve dictionary path for both local and Vercel environments
function getDictPath(): string {
  // In production (Vercel), use path relative to the function
  // In development, use node_modules path
  const dictPath = path.join(
    process.cwd(),
    "node_modules",
    "kuromoji",
    "dict"
  );
  return dictPath;
}

async function getKuroshiro(): Promise<Kuroshiro> {
  if (initError) {
    throw initError;
  }

  if (kuroshiroInstance) {
    return kuroshiroInstance;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const instance = new Kuroshiro();
      const dictPath = getDictPath();
      await instance.init(new KuromojiAnalyzer({ dictPath }));
      kuroshiroInstance = instance;
      return instance;
    } catch (error) {
      initError = error instanceof Error ? error : new Error(String(error));
      initPromise = null;
      console.error("Failed to initialize Kuroshiro:", initError);
      throw initError;
    }
  })();

  return initPromise;
}

export async function toRomaji(japanese: string): Promise<string> {
  const kuroshiro = await getKuroshiro();
  return kuroshiro.convert(japanese, { to: "romaji", mode: "spaced" });
}
