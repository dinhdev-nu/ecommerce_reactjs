import axios from "axios";


const callApi = axios.create({
    baseURL: 'http://localhost:3000/v1/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_X_API_KEY 
    },
    withCredentials: true, // cho cookie chạy qua CORS policy vào client
})

callApi.interceptors.request.use(
    config => {
        if(config.extraHeaders){
            config.headers = {
                ...config.headers,
                ...config.extraHeaders
            }
        }
        return config;
    },
    error => Promise.reject(error)
)

callApi.interceptors.response.use(
    response => response,
    error => {
        console.error('axios error: ', error);
        return Promise.reject(error);
    }
)

export default callApi;