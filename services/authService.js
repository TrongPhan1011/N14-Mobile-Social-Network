import { loginErorr } from '../redux/Slice/authSlice';
import * as httpRequest from '../utils/httpRequest';

export const loginUser = async (user) => {
    try {
        await httpRequest.post('auth/login', user);
        console.log(user);
        // loginSuccess(dataUser);

        return true;
    } catch (error) {
        console.info(error);
        return false;
    }
};
