export type DomainId = 1 | 2 | 3 | 4;

export interface Question {
  id: string;
  domain: DomainId;
  objective?: string; // e.g. "1.2" — omitted for imported banks without objective mapping
  topic: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
  source?: string; // e.g. "OpenExamPrep" for imported questions; undefined = original
}

export interface Domain {
  id: DomainId;
  code: string;
  title: string;
  weight: number; // percent of exam
  color: string; // hex accent
  tagline: string;
  objectives: { code: string; title: string; notes: string }[];
}

export interface Flashcard {
  id: string;
  domain: DomainId;
  front: string;
  back: string;
}
