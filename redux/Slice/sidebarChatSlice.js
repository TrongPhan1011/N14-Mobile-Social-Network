import { createSlice } from '@reduxjs/toolkit';

const sidebarChatSlice = createSlice({
    name: 'sidebarChat',
    initialState: {
        groupChatId: null,
        unseenChat: 0,
        error: false,
        groupChatSelect: null,
        arrayImage: null,
        currentChat: null,
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
        currentChat: (state, action) => {
            state.currentChat = action.payload;
            state.error = false;
        },
        selectGroup: (state, action) => {
            state.groupChatSelect = action.payload;
        },
        addArrayImage: (state, action) => {
            state.arrayImage = action.payload;
        },
    },
});

export const { addGroupChatId, loginErorr, addCountUnseenChat, selectGroup, addArrayImage, currentChat } =
    sidebarChatSlice.actions;

export default sidebarChatSlice.reducer;
