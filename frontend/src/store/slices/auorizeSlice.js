import { createSlice } from '@reduxjs/toolkit'; // , createEntityAdapter

// const autorizeAdapter = createEntityAdapter();
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

const initialState = token ? { token, username } : null;
console.log(initialState);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      // autorizeAdapter.addOne(state, action.payload);
    },

    logout: () => { // state
      localStorage.removeItem('token');
      // autorizeAdapter.removeAll(state);
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
// export const selectors = autorizeAdapter.getSelectors((state) => state.user);
