import { D1_QUESTIONS } from "./questions-d1";
import { D2_QUESTIONS } from "./questions-d2";
import { D3_QUESTIONS } from "./questions-d3";
import { D4_QUESTIONS } from "./questions-d4";
import type { Question } from "./types";

export const ALL_QUESTIONS: Question[] = [
  ...D1_QUESTIONS,
  ...D2_QUESTIONS,
  ...D3_QUESTIONS,
  ...D4_QUESTIONS,
];

export function questionsForDomain(domain: number): Question[] {
  return ALL_QUESTIONS.filter((q) => q.domain === domain);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
