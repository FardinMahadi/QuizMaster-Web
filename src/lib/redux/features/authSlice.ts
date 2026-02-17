import type { User } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      if (typeof window === 'undefined') return;
      const saved = localStorage.getItem('user');
      if (saved) {
        try {
          const user = JSON.parse(saved);
          state.user = user;
          state.isAuthenticated = true;
        } catch {
          localStorage.removeItem('user');
        }
      }
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { initializeAuth, setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
