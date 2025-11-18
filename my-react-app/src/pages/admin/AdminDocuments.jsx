import { FileText, CheckCircle, XCircle, Eye } from "lucide-react";
import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import adminDocumentApi from "../../api/adminDocumentApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 8; // Số item mỗi trang

  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const res = await adminDocumentApi.getAll();
      setDocuments(res.data);
    } catch (err) {
      toast.error("Không thể tải giấy tờ!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      toast.loading("Đang cập nhật...", { id: "update" });

      await adminDocumentApi.updateStatus(id, newStatus);

      toast.success("Cập nhật thành công!", { id: "update" });
      loadDocuments();
    } catch (err) {
      toast.error("Lỗi cập nhật!", { id: "update" });
    }
  };

  // Tạo MÃ DOC
  const formatCode = (index) => {
    return `DOC${String(index + 1).padStart(3, "0")}`;
  };

  // Pagination logic
  const totalPages = Math.ceil(documents.length / perPage);
  const start = (page - 1) * perPage;
  const currentDocs = documents.slice(start, start + perPage);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        Quản lý giấy tờ người dùng
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-3 text-left">Mã</th>
                  <th className="py-3 text-left">Người dùng</th>
                  <th className="py-3 text-left">Thư mục</th>
                  <th className="py-3 text-left">Trạng thái</th>
                  <th className="py-3 text-left">Ngày tải lên</th>
                  <th className="py-3 text-left">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {currentDocs.map((d, i) => (
                  <tr
                    key={d._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 font-medium">
                      {formatCode(start + i)}
                    </td>
                    <td>{d.owner?.email || "Không rõ"}</td>
                    <td>{d.folder?.name || "Không có"}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${
                        d.status === "Đã xác minh"
                          ? "bg-green-100 text-green-700"
                          : d.status === "Chờ duyệt"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                      >
                        {d.status}
                      </span>
                    </td>

                    <td>{new Date(d.createdAt).toLocaleDateString("vi-VN")}</td>

                    <td className="flex items-center gap-3 py-3">
                      {d.status === "Chờ duyệt" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(d._id, "Đã xác minh")
                          }
                          className="text-green-600 hover:text-green-700 flex items-center gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Duyệt
                        </button>
                      )}

                      {d.status !== "Bị từ chối" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(d._id, "Bị từ chối")
                          }
                          className="text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <XCircle className="w-4 h-4" />
                          Từ chối
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/documents/${d._id}`)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-blue-50 text-blue-600"
                }`}
              >
                Trước
              </button>

              <span className="text-sm text-gray-700">
                Trang <b>{page}</b> / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-blue-50 text-blue-600"
                }`}
              >
                Sau
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
