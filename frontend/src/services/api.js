import axios from 'axios';

const api = axios.create({
    baseURL: 'http://backend.zeeve.com/',
    headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export default api;