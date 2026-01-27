import { TranslationPair } from "@/types";

const STORAGE_KEY = "translation-pairs";

export const getPairs = (): TranslationPair[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const savePairs = (pairs: TranslationPair[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pairs));
};

export const addPair = (english: string, japanese: string): TranslationPair => {
  const pairs = getPairs();
  const newPair: TranslationPair = {
    id: crypto.randomUUID(),
    english,
    japanese,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  pairs.unshift(newPair);
  savePairs(pairs);
  return newPair;
};

export const updatePair = (
  id: string,
  english: string,
  japanese: string
): TranslationPair | null => {
  const pairs = getPairs();
  const index = pairs.findIndex((p) => p.id === id);
  if (index === -1) return null;

  pairs[index] = {
    ...pairs[index],
    english,
    japanese,
    updatedAt: new Date().toISOString(),
  };
  savePairs(pairs);
  return pairs[index];
};

export const deletePair = (id: string): boolean => {
  const pairs = getPairs();
  const filtered = pairs.filter((p) => p.id !== id);
  if (filtered.length === pairs.length) return false;
  savePairs(filtered);
  return true;
};

export const getRandomPair = (
  excludeId?: string
): TranslationPair | null => {
  const pairs = getPairs();
  const available = excludeId
    ? pairs.filter((p) => p.id !== excludeId)
    : pairs;
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
};
