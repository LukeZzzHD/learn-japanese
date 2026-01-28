"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { JapaneseDisplay } from "@/components/japanese-display";
import { TranslationPair } from "@/types";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface PairItemProps {
  pair: TranslationPair;
  onUpdate: (id: string, english: string, japanese: string) => void;
  onDelete: (id: string) => void;
}

export function PairItem({ pair, onUpdate, onDelete }: PairItemProps) {
  const [editing, setEditing] = useState(false);
  const [english, setEnglish] = useState(pair.english);
  const [japanese, setJapanese] = useState(pair.japanese);

  const handleSave = () => {
    if (!english.trim() || !japanese.trim()) return;
    onUpdate(pair.id, english.trim(), japanese.trim());
    setEditing(false);
  };

  const handleCancel = () => {
    setEnglish(pair.english);
    setJapanese(pair.japanese);
    setEditing(false);
  };

  if (editing) {
    return (
      <Card>
        <CardContent className="space-y-3 pt-4">
          <Input
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="English"
            className="h-10"
          />
          <Input
            value={japanese}
            onChange={(e) => setJapanese(e.target.value)}
            placeholder="Japanese"
            className="h-10"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!english.trim() || !japanese.trim()}
              className="flex-1"
            >
              <Check className="mr-1 h-4 w-4" />
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 pt-4">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm">{pair.english}</p>
          <JapaneseDisplay japanese={pair.japanese} size="sm" />
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditing(true)}
            aria-label="Edit"
            className="h-9 w-9"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete"
                className="h-9 w-9 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove &quot;{pair.english}&quot; from your
                  collection.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(pair.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
