import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

//  Thêm interceptor để gắn token nếu có
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//  Bắt lỗi trả về từ BE
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("Lỗi API:", error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
