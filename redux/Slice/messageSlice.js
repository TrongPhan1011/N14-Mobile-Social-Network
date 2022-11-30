import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        replyMess: null,
    },
    reducers: {
        addMess: (state, action) => {
            state.groupChatId = action.payload;
            state.error = false;
        },
        replyMess: (state, action) => {
            state.replyMess = action.payload;
        },
    },
});

export const { addMess, replyMess } = messageSlice.actions;

export default messageSlice.reducer;
