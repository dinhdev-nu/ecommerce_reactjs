import axios from "axios";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "./localStorage";


const callApi = axios.create({
    baseURL: 'http://localhost:3000/v1/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_X_API_KEY 
    },
})

callApi.interceptors.request.use(
    config => {
        if(config?.requiresAuth){
            const Authorization = getFromLocalStorage('_DEV_2')
            const userId = getFromLocalStorage('_IT_YOU')?._id
            config.headers['authorization'] = `Bearer ${Authorization}`
            config.headers['x-client-id'] = userId
        }
        if(config?.extraHeaders){
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
    async error => {
        if(error.response){
            const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest._retry){
            // originalRequest._retry = true
            // try {
            //     const role = getFromLocalStorage('_IT_YOU')?.roles
            //     const response = await callApi.post('/access/refreshtoken/' + role , {}, {
            //         withCredentials: true,
            //         headers: {
            //             'x-lient-id': getFromLocalStorage('_IT_YOU')?._id
            //         }
            //     })
            //     const newToken = response.data.metadata.token

            //     setToLocalStorage('_DEV_2', newToken)

            //     originalRequest.headers['authorization'] = `Bearer ${newToken}`

            //     return callApi(originalRequest) 

            // } catch (error) {
            //     removeFromLocalStorage('_DEV_2')
            //     removeFromLocalStorage('_IT_YOU')
            //     window.location.href = '/login'
            // }
            console.error('Token expired', error)
        }
            switch(error.response.status){
                case 403:
                    console.error("Forbidden! You don't have permission.")
                    window.location.href = '/'
                    break;
                case 404:
                    console.error('Not Found')
                    window.location.href = '/404'
                    break;
                case 500:
                    alert('Server error! Please try again later.')
                    window.location.href = '/'
                    break;
                default:
                    console.error('Error:: ', error.response.data.message)
            }
        }
        else{
            console.error("Network error! Check your internet connection.");
            alert("Lỗi kết nối! Vui lòng kiểm tra mạng.");
        }
        return Promise.reject(error)
    }
)

export default callApi;