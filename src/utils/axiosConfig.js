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
            
            if(error.response.status === 401 && !originalRequest._retry ){
                originalRequest._retry = true
                try { 
                    const roles = getFromLocalStorage("_IT_YOU")?.roles;
                    
                    const response = await axios.post('http://localhost:3000/v1/api/access/refreshtoken/' + roles, {}, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            "x-client-id": getFromLocalStorage("_IT_YOU")?._id,
                            'x-api-key': import.meta.env.VITE_X_API_KEY
                        }
                    })

                    const newToken = response.data.metadata.token
                    newToken && setToLocalStorage({
                        key: '_DEV_2',
                        values: newToken
                    })


                    originalRequest.headers['authorization'] = `Bearer ${newToken}`
                    
                    return callApi(originalRequest)
                    

                } catch (error) {
                    window.location.href = '/login'
                    removeFromLocalStorage('_IT_YOU')
                    removeFromLocalStorage('_DEV_2')
                    return Promise.reject(error)
                }
            }
            switch(error.response.status){
                case 403:
                    console.error("Forbidden! You don't have permission.")
                    window.location.href = '#'
                    break;
                case 404:
                    console.error('Not Found')
                    window.location.href = '/404'
                    break;
                case 500:
                    alert('Server error! Please try again later.')
                    window.location.href = '#'
                    break;
                default:
                    console.error('Error:: ', error.response.data.message)
            }
        }

        else{
            alert("Lỗi kết nối! Vui lòng kiểm tra mạng.");
        }
        return Promise.reject(error)
    }
)

export default callApi;