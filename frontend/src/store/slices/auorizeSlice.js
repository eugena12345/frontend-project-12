import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const autorizeAdapter = createEntityAdapter();
const initialState = autorizeAdapter.getInitialState();

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    },

    logout: () => { localStorage.removeItem('token'); },
  },
});

export const { actions } = slice;
export default slice.reducer;
