import { configureStore, current } from '@reduxjs/toolkit';
import userReducer from './auorizeSlice';
import channelsReducer from './channelsSlice.js';
import currentChannelReducer from './actualChannelSlice.js';

export default configureStore({
    reducer: {
        user: userReducer,
        channels: channelsReducer,
        currentChannel: currentChannelReducer,
    }
})