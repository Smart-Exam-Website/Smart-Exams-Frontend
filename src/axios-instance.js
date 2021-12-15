import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://3.143.249.185/api'
});

export default instance;
