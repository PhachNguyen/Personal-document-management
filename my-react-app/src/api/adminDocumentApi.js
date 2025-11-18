import api from "./axiosClient";

const adminDocumentApi = {
  getAll() {
    return api.get("/admin/documents");
  },
  getById(id) {
    return api.get(`/admin/documents/${id}`);
  },
  updateStatus(id, status) {
    return api.put(`/admin/documents/${id}/status`, { status });
  },
};

export default adminDocumentApi;
