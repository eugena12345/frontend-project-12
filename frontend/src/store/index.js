import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/auth';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
