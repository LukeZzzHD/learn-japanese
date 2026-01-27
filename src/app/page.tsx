import { TranslationForm } from "@/components/translation-form";

export default function Home() {
  return (
    <main className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Vocabulary</h1>
        <p className="text-sm text-muted-foreground">
          Enter English text to get a Japanese translation
        </p>
      </div>
      <TranslationForm />
    </main>
  );
}
