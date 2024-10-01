import { createSlice } from '@reduxjs/toolkit';

// Check if user data exists in localStorage
const userFromLocalStorage = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  isAuthenticated: !!userFromLocalStorage, // true if user is in localStorage
  user: userFromLocalStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user'); // Remove user from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
