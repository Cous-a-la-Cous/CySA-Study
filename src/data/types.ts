export type DomainId = 1 | 2 | 3 | 4;

export interface Question {
  id: string;
  domain: DomainId;
  objective: string; // e.g. "1.2"
  topic: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
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
