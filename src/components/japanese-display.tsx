"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface JapaneseDisplayProps {
  japanese: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function JapaneseDisplay({
  japanese,
  size = "md",
  className,
}: JapaneseDisplayProps) {
  const [romaji, setRomaji] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function convert() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/api/romaji", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ japanese }),
        });

        if (!response.ok) {
          throw new Error("Failed to convert romaji");
        }

        const data = await response.json();
        if (!cancelled) {
          setRomaji(data.romaji);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    convert();

    return () => {
      cancelled = true;
    };
  }, [japanese]);

  const romajiSizeClass = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  const kanaSizeClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  return (
    <div className={cn("flex flex-col", className)}>
      {loading ? (
        <div
          className={cn(
            "h-6 w-24 animate-pulse rounded bg-muted",
            size === "lg" && "h-8 w-32",
            size === "sm" && "h-5 w-20"
          )}
        />
      ) : error ? (
        <span className={cn("italic text-muted-foreground", romajiSizeClass)}>
          (romaji unavailable)
        </span>
      ) : (
        <span className={cn("font-medium text-primary", romajiSizeClass)}>
          {romaji}
        </span>
      )}
      <span className={cn("text-muted-foreground", kanaSizeClass)}>
        {japanese}
      </span>
    </div>
  );
}
