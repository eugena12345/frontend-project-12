import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const currentChannelAdapter = createEntityAdapter();
const initialState = currentChannelAdapter.getInitialState();

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      currentChannelAdapter.removeAll(state);
      currentChannelAdapter.setOne(state, action.payload);
      // setOne - только добавляет в общий state, а не заменяет
    },
  },
});

export const { actions } = currentChannelSlice;
export default currentChannelSlice.reducer;
export const selectors = currentChannelAdapter.getSelectors((state) => state.currentChannel);
