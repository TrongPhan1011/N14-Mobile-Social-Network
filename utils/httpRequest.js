import axios from 'axios';
import { BASE_URL } from './env';

const request = axios.create({
    baseURL: BASE_URL,
});

export const get = async (path, option = {}) => {
    const resp = await request.get(path, option);

    return resp.data;
};

export const post = async (path, data, option) => {
    const resp = await request.post(path, data, option);

    return resp.data;
};
export const put = async (path, data) => {
    const resp = await request.put(path, data);

    return resp.data;
};
// put
// delete
export default request;
