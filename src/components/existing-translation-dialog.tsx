"use client";

import { type TranslationPair } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExistingTranslationDialogProps {
  open: boolean;
  pair: TranslationPair | null;
  onUseExisting: () => void;
  onTranslateAnyway: () => void;
}

export function ExistingTranslationDialog({
  open,
  pair,
  onUseExisting,
  onTranslateAnyway,
}: ExistingTranslationDialogProps) {
  if (!pair) return null;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Translation already exists</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p>This word already has a translation saved:</p>
              <div className="rounded-md bg-muted p-3 space-y-1">
                <p className="text-foreground">{pair.english}</p>
                <p className="text-lg font-medium text-primary">
                  {pair.japanese}
                </p>
              </div>
              <p>Would you like to use the existing translation or get a new one?</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onTranslateAnyway}>
            Translate anyway
          </AlertDialogCancel>
          <AlertDialogAction onClick={onUseExisting}>
            Use existing
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
