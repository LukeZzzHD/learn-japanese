"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePairs } from "@/lib/use-pairs";
import { speakJapanese, isSpeechSupported } from "@/lib/speech";
import { TranslationPair } from "@/types";
import { Volume2, Eye, ArrowRight, Shuffle } from "lucide-react";
import Link from "next/link";

export function QuizCard() {
  const { pairs, getRandomPair } = usePairs();
  const [currentPair, setCurrentPair] = useState<TranslationPair | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  const speechSupported = typeof window !== "undefined" && isSpeechSupported();

  const loadRandomPair = useCallback((excludeId?: string) => {
    const randomPair = getRandomPair(excludeId);
    setCurrentPair(randomPair);
    setRevealed(false);
  }, [getRandomPair]);

  const handleStart = () => {
    setStarted(true);
    loadRandomPair();
  };

  const handleNext = () => {
    loadRandomPair(currentPair?.id);
  };

  const handleSpeak = () => {
    if (currentPair) {
      speakJapanese(currentPair.japanese);
    }
  };

  if (pairs.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-center text-muted-foreground">
            No vocabulary yet!
          </p>
          <Button asChild>
            <Link href="/">Add some words first</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!started) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-center text-muted-foreground">
            {pairs.length} {pairs.length === 1 ? "word" : "words"} in your collection
          </p>
          <Button onClick={handleStart} className="h-12">
            <Shuffle className="mr-2 h-4 w-4" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentPair) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">English</p>
          <p className="text-xl">{currentPair.english}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Japanese</p>
          {revealed ? (
            <div className="flex items-center gap-2">
              <p className="text-2xl font-medium text-primary">
                {currentPair.japanese}
              </p>
              {speechSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSpeak}
                  aria-label="Play audio"
                  className="h-10 w-10"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          ) : (
            <div className="h-10 w-full rounded-md bg-muted" />
          )}
        </div>

        <div className="flex gap-3">
          {!revealed ? (
            <Button onClick={() => setRevealed(true)} className="h-12 flex-1">
              <Eye className="mr-2 h-4 w-4" />
              Reveal
            </Button>
          ) : (
            <Button onClick={handleNext} className="h-12 flex-1">
              <ArrowRight className="mr-2 h-4 w-4" />
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
