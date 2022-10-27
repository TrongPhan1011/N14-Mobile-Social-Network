import axios from 'axios';
import { loginErorr, loginSuccess, logOutSuccess } from '../redux/Slice/authSlice';
import { userLogin } from '../redux/Slice/signInSlice';
import * as httpRequest from '../utils/httpRequest';
import { userSignUp, userPassword, userName } from '../redux/Slice/signUpSlice';

export const loginUser = async (user, dispatch) => {
    try {
        const dataUser = await httpRequest.post('auth/login', user);
        // const dataUser = await httpRequest.get('user/account/633cf90658fad91fe0d4b439');
        //console.log(dataUser);
        if (!!dataUser) {
            dispatch(loginSuccess(dataUser));
            const dataUserLogin = await httpRequest.get('user/account/' + dataUser._id);
            dispatch(userLogin(dataUserLogin));
            return true;
        } else return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};
export const getRefreshToken = async () => {
    try {
        const res = await httpRequest.post('auth/refresh', {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return null;
    }
};
export const logout = async (dispatch, accessToken, axiosJWT) => {
    try {
        await axiosJWT.post(
            'auth/logout',
            { logout: '' },
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );

        dispatch(userLogin(null)); // xoa signIn
        dispatch(logOutSuccess()); // xoa Account
    } catch (error) {
        return null;
    }
};
export const sendOTP = async (user, dispatch) => {
    try {
        const res = await httpRequest.post('otp/', user);
        dispatch(userSignUp(user));
        return res;
    } catch (error) {
        return null;
    }
};

export const register = async (user, dispatch) => {
    try {
        console.log(user);
        const res = await httpRequest.post('auth/register', user);
        dispatch(userSignUp(user));

        // dispatch(userName(user.userName));
        // dispatch(userPassword(user.password)); // xoa signIn

        return res;
    } catch (error) {
        return null;
    }
};
