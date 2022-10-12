import axios from 'axios';
import { loginErorr } from '../redux/Slice/authSlice';
import * as httpRequest from '../utils/httpRequest';

export const loginUser = async (user) => {
    try {
        // await httpRequest.post('auth/login', user);
        const u = await httpRequest.get('user/account/633cf90658fad91fe0d4b439');
        console.log(u);

        return true;
    } catch (error) {
        console.info(error);
        return false;
    }
};
