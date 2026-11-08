import { DOMAINS } from "../data/domains";
import { ALL_QUESTIONS, questionsForDomain } from "../data";
import type { Progress } from "../lib/progress";

interface DashboardProps {
  progress: Progress;
  onStudy: (domainId: number) => void;
  onExam: () => void;
  onFlashcards: () => void;
  onObjectives: () => void;
  onReview: () => void;
  onReset: () => void;
}

export default function Dashboard({ progress, onStudy, onExam, onFlashcards, onObjectives, onReview, onReset }: DashboardProps) {
  const correctIds = new Set(Object.entries(progress.results).filter(([, v]) => v === "correct").map(([k]) => k));
  const totalAnswered = Object.keys(progress.results).length;
  const mastery = Math.round((correctIds.size / ALL_QUESTIONS.length) * 100);
  const missedCount = Object.values(progress.results).filter((v) => v === "incorrect").length;
  const lastExam = progress.exams[progress.exams.length - 1];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16">
      {/* Hero */}
      <div className="scanline-bg mb-8 rounded-2xl border border-border bg-card/50 p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">CompTIA CySA+ · CS0-004</p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Cybersecurity Analyst
              <br />
              <span className="text-muted-foreground">Study Guide</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              100 exam-style questions with full explanations, a blueprint-weighted mock exam,
              flashcards, and a missed-question review deck — across all four domains.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="rounded-full border border-border bg-background px-3 py-1">Max 85 questions</span>
              <span className="rounded-full border border-border bg-background px-3 py-1">165 minutes</span>
              <span className="rounded-full border border-border bg-background px-3 py-1">Passing 750 / 900</span>
              <span className="rounded-full border border-border bg-background px-3 py-1">MCQ + PBQ</span>
            </div>
          </div>

          {/* Mastery ring */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(217 33% 15%)" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="hsl(187 92% 55%)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(mastery / 100) * 264} 264`}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{mastery}%</span>
              </div>
            </div>
            <p className="text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Mastery<br />{correctIds.size}/{ALL_QUESTIONS.length} mastered
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <button
          onClick={onExam}
          className="card-glow group rounded-xl border border-primary/30 bg-primary/5 p-5 text-left transition-all hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Mock exam</p>
          <p className="mt-1.5 font-semibold">40 questions · 60 min</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Blueprint-weighted (34/26/24/16). Timed, no feedback until the end.
            {lastExam && <span className="block pt-1 text-primary/80">Last attempt: {Math.round((lastExam.score / lastExam.total) * 100)}%</span>}
          </p>
        </button>
        <button
          onClick={onReview}
          className="card-glow group rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-red-400/50 hover:bg-red-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-300">Review missed</p>
          <p className="mt-1.5 font-semibold">{missedCount} question{missedCount === 1 ? "" : "s"} to fix</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Every question you've gotten wrong, drilled until it sticks.
          </p>
        </button>
        <button
          onClick={onFlashcards}
          className="card-glow group rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">Flashcards</p>
          <p className="mt-1.5 font-semibold">40 rapid-fire cards</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Acronyms, frameworks, tools, and must-know distinctions.
          </p>
        </button>
      </div>

      {/* Domain cards */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Domains</h2>
        <button onClick={onObjectives} className="rounded-md px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          View full objectives →
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {DOMAINS.map((d) => {
          const qs = questionsForDomain(d.id);
          const ok = qs.filter((q) => correctIds.has(q.id)).length;
          const answered = qs.filter((q) => progress.results[q.id]).length;
          const pctOk = Math.round((ok / qs.length) * 100);
          return (
            <div key={d.id} className="card-glow rounded-xl border border-border bg-card p-5">
              <div className="mb-1 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: d.color }}>
                    Domain {d.code} · {d.weight}% of exam
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{d.title}</h3>
                </div>
                <span className="rounded-lg px-2.5 py-1 font-mono text-xs font-bold" style={{ backgroundColor: `${d.color}1f`, color: d.color }}>
                  {qs.length} Q
                </span>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{d.tagline}</p>
              <div className="mb-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>{ok} mastered · {answered} attempted</span>
                <span>{pctOk}%</span>
              </div>
              <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pctOk}%`, backgroundColor: d.color }} />
              </div>
              <button
                onClick={() => onStudy(d.id)}
                className="w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ backgroundColor: `${d.color}20`, color: d.color }}
              >
                Study this domain →
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          {totalAnswered > 0
            ? "Progress is saved in this browser only (localStorage) — it won't sync across devices."
            : "Pick a domain to start — your progress saves automatically in this browser."}
        </p>
        {totalAnswered > 0 && (
          <button
            onClick={onReset}
            className="rounded-md px-3 py-1.5 font-mono text-xs text-red-300/80 transition-colors hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Reset all progress
          </button>
        )}
      </div>
    </div>
  );
}
