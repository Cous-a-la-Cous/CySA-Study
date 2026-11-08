import { useEffect, useMemo, useState } from "react";
import type { Question } from "../data/types";
import { DOMAINS } from "../data/domains";

export interface QuizResult {
  answers: Record<string, number>; // question id -> chosen option index
  questions: Question[];
  elapsedSeconds: number;
}

interface QuizProps {
  questions: Question[];
  mode: "study" | "exam";
  title: string;
  timeLimitMinutes?: number; // exam mode only
  onAnswer?: (q: Question, correct: boolean) => void;
  onFinish: (r: QuizResult) => void;
  onExit: () => void;
}

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz({ questions, mode, title, timeLimitMinutes, onAnswer, onFinish, onExit }: QuizProps) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState((timeLimitMinutes ?? 0) * 60);
  const [startTime] = useState(Date.now());

  const q = questions[idx];
  const domain = DOMAINS.find((d) => d.id === q.domain)!;
  const chosen = answers[q.id];
  const isRevealed = mode === "study" && revealed[q.id] === true;
  const answeredCount = Object.keys(answers).length;

  const finish = () =>
    onFinish({ answers, questions, elapsedSeconds: Math.round((Date.now() - startTime) / 1000) });

  useEffect(() => {
    if (mode !== "exam" || !timeLimitMinutes) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mode, timeLimitMinutes]);

  // auto-submit when timer hits zero
  useEffect(() => {
    if (mode === "exam" && timeLimitMinutes && secondsLeft === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const pick = (opt: number) => {
    if (isRevealed) return;
    if (answers[q.id] !== undefined && mode === "study") return;
    setAnswers((a) => ({ ...a, [q.id]: opt }));
    if (mode === "study") {
      setRevealed((r) => ({ ...r, [q.id]: true }));
      onAnswer?.(q, opt === q.answer);
    }
  };

  const mm = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");
  const timerDanger = mode === "exam" && timeLimitMinutes && secondsLeft < 300;

  const progressPct = useMemo(() => ((idx + 1) / questions.length) * 100, [idx, questions.length]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16">
      {/* Header */}
      <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onExit}
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ← Exit
          </button>
          <div className="min-w-0 text-center">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {idx + 1} / {questions.length}
              {mode === "exam" && ` · ${answeredCount} answered`}
            </p>
          </div>
          {mode === "exam" && timeLimitMinutes ? (
            <div className={`font-mono text-sm font-semibold tabular-nums ${timerDanger ? "text-red-400" : "text-primary"}`}>
              {mm}:{ss}
            </div>
          ) : (
            <div className="w-16" />
          )}
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
          style={{ backgroundColor: `${domain.color}1f`, color: domain.color }}
        >
          {domain.code} {domain.title}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          Objective {q.objective} · {q.topic}
        </span>
      </div>

      {/* Question */}
      <h2 className="mb-6 text-lg font-semibold leading-relaxed md:text-xl">{q.question}</h2>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label="Answer options">
        {q.options.map((opt, i) => {
          const isChosen = chosen === i;
          let cls =
            "border-border bg-card hover:border-muted-foreground/40 hover:bg-secondary/60";
          if (isRevealed) {
            if (i === q.answer) cls = "border-emerald-400/70 bg-emerald-400/10";
            else if (isChosen) cls = "border-red-400/70 bg-red-400/10";
            else cls = "border-border bg-card opacity-50";
          } else if (isChosen) {
            cls = "border-primary bg-primary/10";
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={isRevealed}
              className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cls} ${isRevealed ? "cursor-default" : "cursor-pointer"}`}
              role="radio"
              aria-checked={isChosen}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                  isChosen && !isRevealed
                    ? "bg-primary text-primary-foreground"
                    : isRevealed && i === q.answer
                      ? "bg-emerald-400/20 text-emerald-300"
                      : isRevealed && isChosen
                        ? "bg-red-400/20 text-red-300"
                        : "bg-secondary text-muted-foreground"
                }`}
              >
                {LETTERS[i]}
              </span>
              <span className="text-sm leading-relaxed md:text-base">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation (study mode) */}
      {isRevealed && (
        <div
          className={`mt-6 rounded-lg border p-5 ${
            chosen === q.answer ? "border-emerald-400/40 bg-emerald-400/5" : "border-red-400/40 bg-red-400/5"
          }`}
        >
          <p className={`mb-2 font-mono text-xs font-bold uppercase tracking-wider ${chosen === q.answer ? "text-emerald-300" : "text-red-300"}`}>
            {chosen === q.answer ? "✓ Correct" : `✗ Incorrect — the answer is ${LETTERS[q.answer]}`}
          </p>
          <p className="text-sm leading-relaxed text-foreground/90">{q.explanation}</p>
        </div>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← Previous
        </button>
        {mode === "exam" && (
          <button
            onClick={finish}
            className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Submit exam
          </button>
        )}
        {idx < questions.length - 1 ? (
          <button
            onClick={() => setIdx((i) => Math.min(questions.length - 1, i + 1))}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Next →
          </button>
        ) : mode === "study" ? (
          <button
            onClick={finish}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Finish ✓
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>
    </div>
  );
}
