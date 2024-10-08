import { configureStore, current } from '@reduxjs/toolkit';
import userReducer from './auorizeSlice';
import channelsReducer from './channelsSlice.js';
import currentChannelReducer from './actualChannelSlice.js';
import messagesReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    currentChannel: currentChannelReducer,
    messages: messagesReducer,
  },
});
