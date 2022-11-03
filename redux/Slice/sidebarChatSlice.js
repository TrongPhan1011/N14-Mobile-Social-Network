import { createSlice } from '@reduxjs/toolkit';

const sidebarChatSlice = createSlice({
    name: 'sidebarChat',
    initialState: {
        groupChatId: null,
        unseenChat: 0,
        error: false,
        groupChatSelect: null,
    },
    reducers: {
        addGroupChatId: (state, action) => {
            state.groupChatId = action.payload;
            state.error = false;
        },
        loginErorr: (state) => {
            state.error = true;
        },
        addCountUnseenChat: (state, action) => {
            // state.unseenChat = action.payload;
            console.log(state);
        },
        selectGroup: (state, action) => {
            state.groupChatSelect = action.payload;
        },
    },
});

export const { addGroupChatId, loginErorr, addCountUnseenChat, selectGroup } = sidebarChatSlice.actions;

export default sidebarChatSlice.reducer;
