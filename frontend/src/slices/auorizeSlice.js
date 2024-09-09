import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const autorizeAdapter = createEntityAdapter();
const initialState = autorizeAdapter.getInitialState();

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action);
            // autorizeAdapter.addOne(state, action.payload);
            // console.log(JSON.stringify(state));
            localStorage.setItem('token', action.payload.token);
        },
            
        logout: (state, action) => { localStorage.removeItem('token')},
        //autorizeAdapter.removeOne,
    }
    });

export const { actions } = slice;
export default slice.reducer;
// export const selectors = autorizeAdapter.getSelectors((state) => state.user); //
