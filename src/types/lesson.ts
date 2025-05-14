
export type QuestionType = 'multiple-choice' | 'fill-blank' | 'match' | 'drag-drop' | 'tap-choice' | 'complete-number';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  instruction?: string;
  image?: string;
  answers: Answer[];
  correctAnswer: string | string[];
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  xp: number;
}

export interface LessonProgress {
  completed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
  streak: number;
}
