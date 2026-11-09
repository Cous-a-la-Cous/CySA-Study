import { useEffect, useMemo, useState } from "react";
import Dashboard from "../sections/Dashboard";
import Quiz, { type QuizResult } from "../components/Quiz";
import Results from "../components/Results";
import Flashcards from "../sections/Flashcards";
import Objectives from "../sections/Objectives";
import { loadAllQuestions, shuffle } from "../data";
import { DOMAINS } from "../data/domains";
import type { Question } from "../data/types";
import {
  loadProgress, recordAnswer, recordExam, resetAll, type Progress,
} from "../lib/progress";

type View = "dash" | "quiz" | "results" | "flashcards" | "objectives";

const EXAM_PLAN: [number, number][] = [[1, 14], [2, 10], [3, 10], [4, 6]]; // blueprint-weighted, 40 total

export default function Home() {
  const [view, setView] = useState<View>("dash");
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [allQuestions, setAllQuestions] = useState<Question[] | null>(null);
  const [quiz, setQuiz] = useState<{
    questions: Question[];
    mode: "study" | "exam";
    title: string;
    timeLimit?: number;
  } | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Load the full 500-question bank in the background right away
  useEffect(() => {
    loadAllQuestions().then(setAllQuestions);
  }, []);

  const missedQuestions = useMemo(
    () => (allQuestions ?? []).filter((q) => progress.results[q.id] === "incorrect"),
    [allQuestions, progress],
  );

  const startStudy = (domainId: number) => {
    if (!allQuestions) return;
    const d = DOMAINS.find((x) => x.id === domainId)!;
    setQuiz({
      questions: shuffle(allQuestions.filter((q) => q.domain === domainId)),
      mode: "study",
      title: `${d.code} ${d.title}`,
    });
    setView("quiz");
  };

  const startExam = () => {
    if (!allQuestions) return;
    const qs = EXAM_PLAN.flatMap(([dom, n]) =>
      shuffle(allQuestions.filter((q) => q.domain === dom)).slice(0, n),
    );
    setQuiz({
      questions: shuffle(qs),
      mode: "exam",
      title: "Mock exam — blueprint weighted",
      timeLimit: 60,
    });
    setView("quiz");
  };

  const startReview = () => {
    if (missedQuestions.length === 0) return;
    setQuiz({
      questions: shuffle(missedQuestions),
      mode: "study",
      title: "Review — previously missed",
    });
    setView("quiz");
  };

  const handleAnswer = (q: Question, correct: boolean) => {
    setProgress((p) => recordAnswer(p, q.id, correct));
  };

  const handleFinish = (r: QuizResult) => {
    // record all outcomes (idempotent for study mode) + exam history
    setProgress((p) => {
      let next = p;
      for (const q of r.questions) {
        if (r.answers[q.id] !== undefined) {
          next = recordAnswer(next, q.id, r.answers[q.id] === q.answer);
        }
      }
      if (quiz?.mode === "exam") {
        const score = r.questions.filter((q) => r.answers[q.id] === q.answer).length;
        next = recordExam(next, score, r.questions.length);
      }
      return next;
    });
    setResult(r);
    setView("results");
  };

  const retryMissed = () => {
    if (!result) return;
    const missed = result.questions.filter((q) => result.answers[q.id] !== q.answer);
    if (missed.length === 0) return;
    setQuiz({ questions: shuffle(missed), mode: "study", title: "Retry — missed questions" });
    setResult(null);
    setView("quiz");
  };

  const handleReset = () => {
    if (window.confirm("Reset all study progress and exam history? This cannot be undone.")) {
      setProgress(resetAll());
    }
  };

  const backToDash = () => {
    setQuiz(null);
    setResult(null);
    setView("dash");
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Top bar */}
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <button
            onClick={backToDash}
            className="flex items-center gap-2.5 rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 font-mono text-sm font-bold text-primary">
              Cy
            </span>
            <span className="text-sm font-semibold tracking-tight">
              CySA+ <span className="font-mono text-xs text-muted-foreground">CS0-004</span>
            </span>
          </button>
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setView("objectives")}
              className="rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            >
              Objectives
            </button>
            <button
              onClick={() => setView("flashcards")}
              className="rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            >
              Flashcards
            </button>
            <button
              onClick={startExam}
              className="rounded-md bg-primary/15 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            >
              Mock exam
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-6">
        {view === "dash" && (
          <Dashboard
            questions={allQuestions}
            progress={progress}
            onStudy={startStudy}
            onExam={startExam}
            onFlashcards={() => setView("flashcards")}
            onObjectives={() => setView("objectives")}
            onReview={startReview}
            onReset={handleReset}
          />
        )}
        {view === "quiz" && quiz && (
          <Quiz
            key={quiz.title + quiz.questions.length}
            questions={quiz.questions}
            mode={quiz.mode}
            title={quiz.title}
            timeLimitMinutes={quiz.timeLimit}
            onAnswer={handleAnswer}
            onFinish={handleFinish}
            onExit={backToDash}
          />
        )}
        {view === "results" && result && (
          <Results
            result={result}
            mode={quiz?.mode ?? "study"}
            onExit={backToDash}
            onRetryMissed={retryMissed}
          />
        )}
        {view === "flashcards" && <Flashcards onExit={backToDash} />}
        {view === "objectives" && <Objectives onExit={backToDash} />}
      </main>
    </div>
  );
}
