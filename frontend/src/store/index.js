import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/auorizeSlice';
import channelsReducer from './slices/channelsSlice';
import currentChannelReducer from './slices/actualChannelSlice';
import messagesReducer from './slices/messageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    currentChannel: currentChannelReducer,
    messages: messagesReducer,
  },
});
