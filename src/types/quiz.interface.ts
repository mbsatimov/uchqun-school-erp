import type { ITeacherPreview } from '@/types/teacher.interface';

export interface IQuiz {
  id: number;
  teacher: ITeacherPreview;
  title: string;
  description: string | null;
  isVisible: boolean;
  questions: Array<IQuestion>;
  startDateTime: string | null;
  endDateTime: string | null;
  duration: number | null;
}

export interface IQuizPreview extends Omit<IQuiz, 'questions'> {
  questionsCount: number;
}

export interface IQuestion {
  id: number;
  pictureUrl: string | null;
  question: string;
  options: Array<IOption>;
  hint: string | null;
}

export interface IOption {
  id: number;
  label: string;
  isCorrect: boolean;
}
