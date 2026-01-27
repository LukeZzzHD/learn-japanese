import { QuizCard } from "@/components/quiz-card";

export default function QuizPage() {
  return (
    <main className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quiz</h1>
        <p className="text-sm text-muted-foreground">
          Test your recall of Japanese translations
        </p>
      </div>
      <QuizCard />
    </main>
  );
}
