"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { translateToJapanese } from "@/lib/deepl";
import { usePairs } from "@/lib/use-pairs";
import { ExistingTranslationDialog } from "@/components/existing-translation-dialog";
import { JapaneseDisplay } from "@/components/japanese-display";
import { type TranslationPair } from "@/types";
import { Loader2 } from "lucide-react";

export function TranslationForm() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    english: string;
    japanese: string;
  } | null>(null);
  const [existingPair, setExistingPair] = useState<TranslationPair | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingInput, setPendingInput] = useState("");
  const { addPair, updatePair, findByEnglish } = usePairs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const trimmedInput = input.trim();
    const existing = findByEnglish(trimmedInput);

    if (existing) {
      setExistingPair(existing);
      setPendingInput(trimmedInput);
      setDialogOpen(true);
      return;
    }

    await performTranslation(trimmedInput);
  };

  const performTranslation = async (text: string, existingId?: string) => {
    setLoading(true);
    setResult(null);

    const response = await translateToJapanese(text);

    if ("error" in response) {
      toast.error(response.error);
      setLoading(false);
      return;
    }

    let pair: TranslationPair | null;
    if (existingId) {
      pair = updatePair(existingId, text, response.japanese);
      toast.success("Translation updated!");
    } else {
      pair = addPair(text, response.japanese);
      toast.success("Translation added successfully!");
    }

    if (pair) {
      setResult({ english: pair.english, japanese: pair.japanese });
    }
    setInput("");
    setLoading(false);
  };

  const handleUseExisting = () => {
    if (existingPair) {
      setResult({ english: existingPair.english, japanese: existingPair.japanese });
      toast.success("Using existing translation");
      setInput("");
    }
    setDialogOpen(false);
    setExistingPair(null);
    setPendingInput("");
  };

  const handleTranslateAnyway = async () => {
    setDialogOpen(false);
    const id = existingPair?.id;
    const text = pendingInput;
    setExistingPair(null);
    setPendingInput("");
    await performTranslation(text, id);
  };

  return (
    <div className="space-y-4">
      <ExistingTranslationDialog
        open={dialogOpen}
        pair={existingPair}
        onUseExisting={handleUseExisting}
        onTranslateAnyway={handleTranslateAnyway}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter English text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="h-12 text-base"
        />
        <Button
          type="submit"
          disabled={!input.trim() || loading}
          className="h-12 w-full text-base"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Translating...
            </>
          ) : (
            "Translate & Add"
          )}
        </Button>
      </form>

      {result && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Added to collection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-base">{result.english}</p>
            <JapaneseDisplay japanese={result.japanese} size="md" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
