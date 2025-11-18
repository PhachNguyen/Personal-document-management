import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/folders";

const token = localStorage.getItem("token"); // ✅ lấy JWT để gọi API bảo mật

const folderApi = {
    getAll: async () => axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
    }),

    create: async (data) => axios.post(API_BASE, data, {
        headers: { Authorization: `Bearer ${token}` },
    }),

    delete: async (id) => axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    }),
};

export default folderApi;
