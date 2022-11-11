import { createSlice } from '@reduxjs/toolkit';
const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        user: null,
        friend: null,
        error: false,
        member: [],
    },
    reducers: {
        findSuccess: (state, action) => {
            state.user = action.payload;
        },
        findFriend: (state, action) => {
            state.friend = action.payload;
        },
        findError: (state) => {
            state.error = true;
        },
        addMemberGroup: (state, action) => {
            state.member = action.payload;
        },
    },
});

export const { findSuccess, findError, findFriend, addMemberGroup } = friendSlice.actions;
export default friendSlice.reducer;
