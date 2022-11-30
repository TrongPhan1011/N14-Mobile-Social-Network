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
        nameGroup: null,
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
        saveNameGroup: (state, action) => {
            state.nameGroup = action.payload;
        },
        removeCurrentChat: (state) => {
            state.currentChat = null;
            state.error = false;
        },
    },
});

export const {
    addGroupChatId,
    loginErorr,
    addCountUnseenChat,
    selectGroup,
    addArrayImage,
    currentChat,
    saveNameGroup,
    currentCha,
    removeCurrentChat,
} = sidebarChatSlice.actions;

export default sidebarChatSlice.reducer;
