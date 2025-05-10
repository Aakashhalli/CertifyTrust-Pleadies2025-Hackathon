
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'student' | 'institution' | 'employer' | null;

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    role: UserRole;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    name: null,
    email: null,
    role: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; name: string; email: string; role: UserRole }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
