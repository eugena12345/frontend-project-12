import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const currentChannelAdapter = createEntityAdapter();
const initialState = currentChannelAdapter.getInitialState();

const currentChannelSlice = createSlice({
    name: 'currentChannel',
    initialState,
    reducers: {
        addCurrentChannel: currentChannelAdapter.addOne,
        deleteCurrentChannel: currentChannelAdapter.removeOne,
    },
});

export const { actions } = currentChannelSlice;
export default currentChannelSlice.reducer;
export const selectors = currentChannelAdapter.getSelectors((state) => state.currentChannel);