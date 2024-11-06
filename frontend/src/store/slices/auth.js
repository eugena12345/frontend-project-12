import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

const initialState = { token, username };

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
      };
    },

    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      return {
        ...state,
        username: null,
        token: null,
      };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
