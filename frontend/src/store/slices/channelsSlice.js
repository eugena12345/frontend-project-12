import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const defaultChannelID = '1';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannel: defaultChannelID,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...initialState,
    entities: {
      1: { id: '1', name: 'general', removable: false },
    },
    ids: ['1'],
  },

  reducers: {
    setCurrentChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannel = (action.payload?.id) || defaultChannelID;
    },
    addChannels: (state, action) => {
      channelsAdapter.addMany(state, action.payload);
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
