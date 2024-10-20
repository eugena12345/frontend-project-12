import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const autorizeAdapter = createEntityAdapter();
const initialState = autorizeAdapter.getInitialState();

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(action);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      autorizeAdapter.addOne(state, action.payload);
    },

    logout: (state) => {
      localStorage.removeItem('token');
      autorizeAdapter.removeAll(state);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
export const selectors = autorizeAdapter.getSelectors((state) => state.user);
