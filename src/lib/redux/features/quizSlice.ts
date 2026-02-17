import type { Quiz } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface QuizState {
  activeQuiz: Quiz | null;
  answers: Record<number, string>;
  isSubmitting: boolean;
}

const initialState: QuizState = {
  activeQuiz: null,
  answers: {},
  isSubmitting: false,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setActiveQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.activeQuiz = action.payload;
      state.answers = {};
    },
    setAnswer: (state, action: PayloadAction<{ questionId: number; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    clearQuizState: (state) => {
      state.activeQuiz = null;
      state.answers = {};
      state.isSubmitting = false;
    },
  },
});

export const { setActiveQuiz, setAnswer, setSubmitting, clearQuizState } = quizSlice.actions;
export default quizSlice.reducer;
