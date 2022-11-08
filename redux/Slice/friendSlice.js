import { createSlice } from '@reduxjs/toolkit';
const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        user: null,
        friend: null,
        error: false,
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
    },
});

export const { findSuccess, findError, findFriend } = friendSlice.actions;
export default friendSlice.reducer;
