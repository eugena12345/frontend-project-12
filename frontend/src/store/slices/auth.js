import { createSlice } from '@reduxjs/toolkit'; // , createEntityAdapter

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

const initialState = { token, username };
console.log('auth initialState', initialState);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      console.log('auth state', state);
      // eslint-disable-next-line no-param-reassign
      state.username = action.payload.username;
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload.token;
    },

    logout: () => { // state
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
