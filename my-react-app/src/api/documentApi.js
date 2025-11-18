import axiosClient from "./axiosClient";

const documentApi = {
    // 🧩 Lấy danh sách tài liệu của user
    getAll: () => axiosClient.get("/documents"),

    // 🧩 Lấy chi tiết 1 tài liệu
    getById: (id) => axiosClient.get(`/documents/${id}`),

    // 🧩 Lấy danh sách tài liệu theo folderId
    getByFolderId: (folderId) => axiosClient.get(`/documents/folder/${folderId}`),

    // 🧩 Upload tài liệu mới (multipart/form-data)
    upload: (data) =>
        axiosClient.post("/documents/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    // 🧩 Cập nhật thông tin tài liệu
    update: (id, updates) => axiosClient.patch(`/documents/${id}`, updates),

    // 🧩 Xóa tài liệu
    delete: (id) => axiosClient.delete(`/documents/${id}`),
};

export default documentApi;
