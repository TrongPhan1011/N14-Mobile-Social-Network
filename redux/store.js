import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from './Slice/authSlice';
import signInSlice from './Slice/signInSlice';
import signUpSlice from './Slice/signUpSlice';
import sidebarChatSlice from './Slice/sidebarChatSlice';
import friendSlice from './Slice/friendSlice';
import messageSlice from './Slice/messageSlice';

const combine = combineReducers({
    auth: authSlice,
    signIn: signInSlice,

    sidebarChatSlice,
    signUp: signUpSlice,

    friendSlice: friendSlice,

    messageSlice: messageSlice,
});

export const store = configureStore({
    reducer: combine,
});
