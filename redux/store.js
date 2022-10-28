import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from './Slice/authSlice';
import signInSlice from './Slice/signInSlice';
import signUpSlice from './Slice/signUpSlice';
import sidebarChatSlice from './Slice/sidebarChatSlice';

const combine = combineReducers({
    auth: authSlice,
    signIn: signInSlice,

    sidebarChatSlice,
    signUp: signUpSlice,

 

});

export const store = configureStore({
    reducer: combine,
});
