import { PairList } from "@/components/pair-list";

export default function EditPage() {
  return (
    <main className="px-4 py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Vocabulary</h1>
        <p className="text-sm text-muted-foreground">
          Edit or delete your saved translations
        </p>
      </div>
      <PairList />
    </main>
  );
}
