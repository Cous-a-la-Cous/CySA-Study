import { useState } from "react";
import { DOMAINS } from "../data/domains";

export default function Objectives({ onExit }: { onExit: () => void }) {
  const [open, setOpen] = useState<number>(1);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onExit} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          ← Dashboard
        </button>
        <h2 className="text-lg font-semibold">Exam objectives</h2>
        <div className="w-20" />
      </div>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        The official CS0-004 blueprint, condensed. Master every bullet below and the exam holds no surprises.
      </p>

      <div className="space-y-3">
        {DOMAINS.map((d) => (
          <div key={d.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <button
              onClick={() => setOpen(open === d.id ? 0 : d.id)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              aria-expanded={open === d.id}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm font-bold" style={{ backgroundColor: `${d.color}1f`, color: d.color }}>
                  {d.id}
                </span>
                <div>
                  <p className="font-semibold">{d.title}</p>
                  <p className="font-mono text-xs text-muted-foreground">{d.weight}% of exam</p>
                </div>
              </div>
              <span className={`text-muted-foreground transition-transform duration-200 ${open === d.id ? "rotate-180" : ""}`}>▾</span>
            </button>
            {open === d.id && (
              <div className="space-y-4 border-t border-border p-4 md:p-5">
                <p className="text-sm italic text-muted-foreground">{d.tagline}</p>
                {d.objectives.map((o) => (
                  <div key={o.code} className="rounded-lg bg-background/60 p-4">
                    <p className="mb-1.5 font-mono text-xs font-bold" style={{ color: d.color }}>
                      {o.code} — {o.title}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/85">{o.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
