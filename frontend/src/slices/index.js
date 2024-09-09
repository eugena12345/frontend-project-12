import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auorizeSlice';
import channelsReducer from './channelsSlice.js';

export default configureStore({
    reducer: {
        user: userReducer,
        channels: channelsReducer,
    }
})