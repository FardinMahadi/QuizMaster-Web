import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/redux/features/authSlice';
import quizReducer from '@/lib/redux/features/quizSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
