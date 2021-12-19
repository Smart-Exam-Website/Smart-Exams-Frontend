import axios from 'axios';
import DomainUrl from './Domain';

let headers = {}
const _axios = axios.create({
    baseURL: DomainUrl,
    headers
});

_axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        config.headers = {
            ...config.headers,
            'Authorization': token ? `Bearer ${token}` : undefined,
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

_axios.interceptors.response.use(
    response => response.data,
    err => {
        return Promise.reject(err?.response?.data);
    }
)

export default _axios;
