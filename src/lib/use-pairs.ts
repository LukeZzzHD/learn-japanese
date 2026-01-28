"use client";

import { useSyncExternalStore, useCallback } from "react";
import { type TranslationPair } from "@/types";
import { normalizeForComparison } from "@/lib/normalize";

const STORAGE_KEY = "translation-pairs";
const EMPTY_ARRAY: TranslationPair[] = [];

// Cache for getSnapshot to avoid infinite loops with useSyncExternalStore
let cachedData: string | null = null;
let cachedPairs: TranslationPair[] = EMPTY_ARRAY;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("pairs-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pairs-updated", callback);
  };
}

function getSnapshot(): TranslationPair[] {
  if (typeof window === "undefined") return EMPTY_ARRAY;
  const data = localStorage.getItem(STORAGE_KEY);

  // Only parse and create new array reference when data actually changes
  if (data !== cachedData) {
    cachedData = data;
    cachedPairs = data ? JSON.parse(data) : EMPTY_ARRAY;
  }

  return cachedPairs;
}

function getServerSnapshot(): TranslationPair[] {
  return EMPTY_ARRAY;
}

export function notifyPairsUpdated() {
  window.dispatchEvent(new Event("pairs-updated"));
}

export function usePairs() {
  const pairs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addPair = useCallback((english: string, japanese: string): TranslationPair => {
    const newPair: TranslationPair = {
      id: crypto.randomUUID(),
      english,
      japanese,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const currentPairs = getSnapshot();
    currentPairs.unshift(newPair);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPairs));
    notifyPairsUpdated();
    return newPair;
  }, []);

  const updatePair = useCallback((id: string, english: string, japanese: string): TranslationPair | null => {
    const currentPairs = getSnapshot();
    const index = currentPairs.findIndex((p) => p.id === id);
    if (index === -1) return null;

    currentPairs[index] = {
      ...currentPairs[index],
      english,
      japanese,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPairs));
    notifyPairsUpdated();
    return currentPairs[index];
  }, []);

  const deletePair = useCallback((id: string): boolean => {
    const currentPairs = getSnapshot();
    const filtered = currentPairs.filter((p) => p.id !== id);
    if (filtered.length === currentPairs.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    notifyPairsUpdated();
    return true;
  }, []);

  const getRandomPair = useCallback((excludeId?: string): TranslationPair | null => {
    const available = excludeId
      ? pairs.filter((p) => p.id !== excludeId)
      : pairs;
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }, [pairs]);

  const findByEnglish = useCallback((english: string): TranslationPair | null => {
    const normalized = normalizeForComparison(english);
    return pairs.find((p) => normalizeForComparison(p.english) === normalized) ?? null;
  }, [pairs]);

  return {
    pairs,
    addPair,
    updatePair,
    deletePair,
    getRandomPair,
    findByEnglish,
  };
}
