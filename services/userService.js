import * as httpRequest from '../utils/httpRequest';

export const getUserByUserName = async (userName) => {
    try {
        const res = await httpRequest.get('user/', {
            params: {
                phoneNumber: userName,
            },
        });

        return res[0];
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
export const getAllFriend = async (idUser, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`user/friend/${idUser}?status=1`, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWaitingFriend = async (idUser, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`user/friend/${idUser}?status=2`, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
