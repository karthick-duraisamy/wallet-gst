import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Check for existing session in localStorage
const getInitialState = (): AuthState => {
  const savedSession = localStorage.getItem('gst_user_session');
  if (savedSession) {
    try {
      const { user } = JSON.parse(savedSession);
      return {
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      };
    } catch (error) {
      localStorage.removeItem('gst_user_session');
    }
  }
  
  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      
      // Save session to localStorage
      localStorage.setItem('gst_user_session', JSON.stringify({
        user: action.payload
      }));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      
      // Clear session from localStorage
      localStorage.removeItem('gst_user_session');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;