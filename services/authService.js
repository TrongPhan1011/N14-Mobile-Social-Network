import { loginSuccess, loginErorr } from '../redux/Slice/authSlice';
import * as httpRequest from '../utils/httpRequest';

export const loginUser = async (user, dispatch, navigation) => {
    try {
        const dataUser = await httpRequest.post('auth/login', user);

        if (!!dataUser) {
            dispatch(loginSuccess(dataUser)); // lưu lại user
            const dataUserLogin = await httpRequest.get('user/account/' + dataUser._id);
            dispatch(userLogin(dataUserLogin));
            navigation.navigate('HomeTabBar');

            return true;
        } else return false;
    } catch (error) {
        dispatch(loginErorr());
        return false;
    }
};
