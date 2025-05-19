export type QuestionType =
  | "multiple-choice"
  | "fill-blank"
  | "match"
  | "drag-drop"
  | "tap-choice"
  | "complete-number"
  | "sequence"
  | "true-false"
  | "sort"
  | "connect-dots";

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  imageUrl?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  instruction?: string;
  image?: string;
  answers: Answer[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  xp: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export interface LessonProgress {
  completed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
  streak: number;
}
