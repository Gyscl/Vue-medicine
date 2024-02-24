//axios封装http请求
import axios from 'axios';

const httpInstance = axios.create({
    baseURL: 'http://localhost:9999',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});

export default httpInstance