import { createSlice } from '@reduxjs/toolkit';
const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        user: null,
        error: false,
        member: [],
    },
    reducers: {
        findSuccess: (state, action) => {
            state.user = action.payload;
        },
        findError: (state) => {
            state.error = true;
        },
        addMemberGroup: (state, action) => {
            state.member = action.payload;
        },
    },
});

export const { findSuccess, findError, addMemberGroup } = friendSlice.actions;
export default friendSlice.reducer;
