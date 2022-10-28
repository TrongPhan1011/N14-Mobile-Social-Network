import * as httpRequest from '../utils/httpRequest';

export const getChatByIdMember = async (idMember, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/user_id', {
            params: {
                id: idMember,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getChatById = async (idGroup, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/id/' + idGroup, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const addMessageToChat = async (idGroup, message, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/chat/add_mess/' + idGroup, {
            body: { message },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
