"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { translateToJapanese } from "@/lib/deepl";
import { usePairs } from "@/lib/use-pairs";
import { Loader2 } from "lucide-react";

export function TranslationForm() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    english: string;
    japanese: string;
  } | null>(null);
  const { addPair } = usePairs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setResult(null);

    const response = await translateToJapanese(input.trim());

    if ("error" in response) {
      toast.error(response.error);
      setLoading(false);
      return;
    }

    const pair = addPair(input.trim(), response.japanese);
    setResult({ english: pair.english, japanese: pair.japanese });
    toast.success("Translation added successfully!");
    setInput("");
    setLoading(false);
  };

  return (
    <div className="space-y-4">
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
            <p className="text-xl font-medium text-primary">{result.japanese}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
