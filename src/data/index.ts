import { D1_QUESTIONS } from "./questions-d1";
import { D2_QUESTIONS } from "./questions-d2";
import { D3_QUESTIONS } from "./questions-d3";
import { D4_QUESTIONS } from "./questions-d4";
import type { Question } from "./types";

// The 100 original CS0-004-aligned questions ship in the main bundle;
// the 400-question OpenExamPrep bank is code-split and loaded on demand.
export const CORE_QUESTIONS: Question[] = [
  ...D1_QUESTIONS,
  ...D2_QUESTIONS,
  ...D3_QUESTIONS,
  ...D4_QUESTIONS,
];

let cache: Question[] | null = null;
let pending: Promise<Question[]> | null = null;

export function loadAllQuestions(): Promise<Question[]> {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = import("./questions-oep").then((mod) => {
      cache = [...CORE_QUESTIONS, ...mod.OEP_QUESTIONS];
      return cache;
    });
  }
  return pending;
}

export function questionsForDomain(domain: number): Question[] {
  return CORE_QUESTIONS.filter((q) => q.domain === domain);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
