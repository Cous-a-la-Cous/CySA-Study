import { useState } from "react";
import type { QuizResult } from "./Quiz";
import { DOMAINS } from "../data/domains";

interface ResultsProps {
  result: QuizResult;
  mode: "study" | "exam";
  onExit: () => void;
  onRetryMissed?: () => void;
}

const LETTERS = ["A", "B", "C", "D"];

export default function Results({ result, mode, onExit, onRetryMissed }: ResultsProps) {
  const [filter, setFilter] = useState<"all" | "wrong">("all");
  const total = result.questions.length;
  const score = result.questions.filter((q) => result.answers[q.id] === q.answer).length;
  const pct = total ? Math.round((score / total) * 100) : 0;
  const passing = pct >= 80;
  const missed = result.questions.filter((q) => result.answers[q.id] !== q.answer);

  const byDomain = DOMAINS.map((d) => {
    const qs = result.questions.filter((q) => q.domain === d.id);
    const ok = qs.filter((q) => result.answers[q.id] === q.answer).length;
    return { d, ok, n: qs.length };
  }).filter((x) => x.n > 0);

  const shown = filter === "all" ? result.questions : missed;
  const mins = Math.floor(result.elapsedSeconds / 60);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16">
      <div className="card-glow mt-4 rounded-xl border border-border bg-card p-6 text-center md:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {mode === "exam" ? "Mock exam complete" : "Session complete"} · {mins} min
        </p>
        <p className="mt-3 text-5xl font-bold md:text-6xl">
          {pct}
          <span className="text-2xl text-muted-foreground">%</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {score} of {total} correct
        </p>
        {mode === "exam" && (
          <p className={`mt-4 inline-block rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider ${passing ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>
            {passing ? "On track — passing pace (750/900 ≈ 80%+)" : "Below passing pace — keep drilling"}
          </p>
        )}
        <div className="mx-auto mt-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-500 ${passing ? "bg-emerald-400" : "bg-amber-400"}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Domain breakdown */}
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {byDomain.map(({ d, ok, n }) => (
            <div key={d.id} className="rounded-lg border border-border bg-background/50 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium" style={{ color: d.color }}>
                  {d.code} {d.title}
                </span>
                <span className="font-mono text-muted-foreground">
                  {ok}/{n}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${n ? (ok / n) * 100 : 0}%`, backgroundColor: d.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {missed.length > 0 && onRetryMissed && (
            <button
              onClick={onRetryMissed}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Retry {missed.length} missed
            </button>
          )}
          <button
            onClick={onExit}
            className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to dashboard
          </button>
        </div>
      </div>

      {/* Review list */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Question review</h3>
          <div className="flex gap-2">
            {(["all", "wrong"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? `All (${total})` : `Missed (${missed.length})`}
              </button>
            ))}
          </div>
        </div>
        {shown.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Perfect score — nothing missed. 🎯
          </p>
        ) : (
          <div className="space-y-4">
            {shown.map((q) => {
              const userAns = result.answers[q.id];
              const correct = userAns === q.answer;
              const dom = DOMAINS.find((d) => d.id === q.domain)!;
              return (
                <div key={q.id} className="rounded-lg border border-border bg-card p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${correct ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"}`}>
                      {correct ? "Correct" : "Missed"}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {dom.code} · Objective {q.objective} · {q.topic}
                    </span>
                  </div>
                  <p className="mb-3 text-sm font-medium leading-relaxed">{q.question}</p>
                  <div className="mb-3 space-y-1.5 text-sm">
                    {q.options.map((o, i) => (
                      <p
                        key={i}
                        className={`rounded px-2.5 py-1.5 ${
                          i === q.answer
                            ? "bg-emerald-400/10 text-emerald-200"
                            : i === userAns
                              ? "bg-red-400/10 text-red-300 line-through"
                              : "text-muted-foreground"
                        }`}
                      >
                        <span className="font-mono text-xs">{LETTERS[i]}.</span> {o}
                      </p>
                    ))}
                  </div>
                  <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground/80">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
