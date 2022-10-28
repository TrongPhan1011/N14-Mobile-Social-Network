import { createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
    name: 'signUp',
    userName: null,
    userPassword: null,
    initialState: {
        userSignUp: null,
    },
    reducers: {
        userSignUp: (state, action) => {
            state.userSignUp = action.payload;
        },
        userName: (state, action) => {
            state.userName = action.payload;
        },
        userPassword: (state, action) => {
            state.userPassword = action.payload;
        },
    },
});

export const { userSignUp, userPassword, userName } = signUpSlice.actions;
export default signUpSlice.reducer;
