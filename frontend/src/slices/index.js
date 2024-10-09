import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auorizeSlice';
import channelsReducer from './channelsSlice';
import currentChannelReducer from './actualChannelSlice';
import messagesReducer from './messageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    currentChannel: currentChannelReducer,
    messages: messagesReducer,
  },
});
