import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auorizeSlice';

export default configureStore({
    reducer: {
        user: userReducer,
    }
})