import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';


const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannels: (state, action) => {
            console.log(action);
            channelsAdapter.addMany(state, action.payload);
            console.log(state);
            // console.log(JSON.stringify(state));
           // localStorage.setItem('token', action.payload.token);
        },
        addChannel: channelsAdapter.addOne,
            
        //logout: (state, action) => { localStorage.removeItem('token')},
        //autorizeAdapter.removeOne,
    }
    });

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
