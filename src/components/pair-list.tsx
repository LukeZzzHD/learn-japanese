"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PairItem } from "@/components/pair-item";
import { usePairs } from "@/lib/use-pairs";
import { toast } from "@/components/ui/sonner";
import Link from "next/link";

export function PairList() {
  const { pairs, updatePair, deletePair } = usePairs();

  const handleUpdate = (id: string, english: string, japanese: string) => {
    const updated = updatePair(id, english, japanese);
    if (updated) {
      toast.success("Entry updated");
    }
  };

  const handleDelete = (id: string) => {
    const deleted = deletePair(id);
    if (deleted) {
      toast.success("Entry deleted");
    }
  };

  if (pairs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-center text-muted-foreground">
          No vocabulary yet!
        </p>
        <Button asChild>
          <Link href="/">Add some words</Link>
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="space-y-3 pb-4">
        {pairs.map((pair) => (
          <PairItem
            key={pair.id}
            pair={pair}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
