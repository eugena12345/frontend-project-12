import { createSlice } from '@reduxjs/toolkit'; // , createEntityAdapter

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
      // eslint-disable-next-line no-param-reassign
      state.username = action.payload.username;
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload.token;
    },

    logout: (state) => { // state
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      // eslint-disable-next-line no-param-reassign
      state.username = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
