// Browser-local progress tracking. Data stays in this browser's localStorage.
const KEY = "cysa-cs0004-progress-v1";

export interface Progress {
  // last outcome per question id
  results: Record<string, "correct" | "incorrect">;
  // exam attempts
  exams: { date: string; score: number; total: number }[];
}

const EMPTY: Progress = { results: {}, exams: [] };

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw);
    return { results: parsed.results ?? {}, exams: parsed.exams ?? [] };
  } catch {
    return { ...EMPTY };
  }
}

export function saveProgress(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage full/unavailable — ignore */
  }
}

export function recordAnswer(p: Progress, id: string, correct: boolean): Progress {
  const next = {
    ...p,
    results: { ...p.results, [id]: correct ? ("correct" as const) : ("incorrect" as const) },
  };
  saveProgress(next);
  return next;
}

export function recordExam(p: Progress, score: number, total: number): Progress {
  const next = {
    ...p,
    exams: [...p.exams, { date: new Date().toISOString(), score, total }].slice(-20),
  };
  saveProgress(next);
  return next;
}

export function clearMissed(p: Progress): Progress {
  const results = Object.fromEntries(
    Object.entries(p.results).filter(([, v]) => v === "correct"),
  );
  const next = { ...p, results };
  saveProgress(next);
  return next;
}

export function resetAll(): Progress {
  saveProgress({ ...EMPTY });
  return { ...EMPTY };
}
