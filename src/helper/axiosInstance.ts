import axios from "axios";


const BASE_URL=import.meta.env.VITE_BASE_URL;

export const axiosInstance=axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && !config.url?.includes("/signin") && !config.url?.includes("/signup")) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});