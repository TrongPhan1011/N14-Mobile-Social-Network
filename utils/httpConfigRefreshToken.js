import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getRefreshToken } from '../services/authService';

import { loginSuccess } from '../redux/Slice/authSlice';
import { BASE_URL } from './env';

export const getAxiosJWT = (dispatch, currAccount) => {
    var axiosJWT = axios.create({
        baseURL: BASE_URL,
    });
    var token = currAccount.accessToken;
    //console.log('token new' + token);
    axiosJWT.interceptors.request.use(
        async (config) => {
            var currDate = new Date();
            var decodeToken = jwtDecode(token);
            if (decodeToken.exp < currDate.getTime() / 1000) {
                var newToken = await getRefreshToken();
                var refreshUser = {
                    ...currAccount,
                    accessToken: newToken.accessToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['token'] = 'baerer ' + newToken.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return axiosJWT;
};
