import axios from "axios";
import { useUSerStore } from "../stores/userStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },

});

apiClient.interceptors.request.use(
    (config) => {
        const userStore = useUSerStore()
        if(userStore.user.token){
            config.headers.Authorization = `Bearer ${userStore.user.token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response)=>{
        // console.log("axios response",response)
        return response;
    },
    (error)=>{
        const userStore = useUSerStore()
        if(error.response.data.reason && error.response.data.reason === "jwt expired"){
            userStore.invalidateUser()
        }
        return Promise.reject(error);
    }
)


export default apiClient;