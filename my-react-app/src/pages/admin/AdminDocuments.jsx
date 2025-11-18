import { FileText, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import AdminLayout from "../../layout/AdminLayout";

export default function AdminDocuments() {
  const documents = [
    {
      id: "DOC001",
      user: "Nguyễn Văn A",
      type: "CCCD",
      status: "Đã xác minh",
      upload: "12/05/2025",
    },
    {
      id: "DOC002",
      user: "Trần Thị B",
      type: "Hộ chiếu",
      status: "Chờ duyệt",
      upload: "10/05/2025",
    },
    {
      id: "DOC003",
      user: "Phạm Minh C",
      type: "Bằng lái xe",
      status: "Lỗi",
      upload: "07/05/2025",
    },
    {
      id: "DOC004",
      user: "Lê Quang D",
      type: "Sổ hộ khẩu",
      status: "Đã xác minh",
      upload: "06/05/2025",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        Quản lý giấy tờ người dùng
      </h1>

      {/* CARD WRAPPER */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        {/* TABLE */}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-3 text-left">Mã giấy tờ</th>
              <th className="py-3 text-left">Người dùng</th>
              <th className="py-3 text-left">Loại</th>
              <th className="py-3 text-left">Trạng thái</th>
              <th className="py-3 text-left">Ngày tải lên</th>
              <th className="py-3 text-left">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((d) => (
              <tr
                key={d.id}
                className="border-b hover:bg-gray-50 text-gray-700 transition"
              >
                <td className="py-3 font-medium">{d.id}</td>
                <td>{d.user}</td>
                <td className="font-medium">{d.type}</td>

                {/* BADGE STATUS */}
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

                <td className="text-gray-600">{d.upload}</td>

                {/* ACTIONS */}
                <td className="flex items-center gap-3 py-3">
                  {d.status === "Chờ duyệt" && (
                    <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Duyệt
                    </button>
                  )}

                  {d.status !== "Lỗi" && (
                    <button className="text-red-600 hover:text-red-700 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Từ chối
                    </button>
                  )}

                  {/* XEM CHI TIẾT */}
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
