import axios from "./axiosClient";

const adminApi = {
  getReport: () => axios.get("/admin/report"),

  updateDocumentStatus: (id, status) =>
    axios.put(`/admin/documents/${id}/status`, { status }),
};

export default adminApi;
