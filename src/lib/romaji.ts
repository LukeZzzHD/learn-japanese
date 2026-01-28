import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

let kuroshiroInstance: Kuroshiro | null = null;
let initPromise: Promise<Kuroshiro> | null = null;
let initError: Error | null = null;

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
      await instance.init(new KuromojiAnalyzer());
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
