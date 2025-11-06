import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import AdminLayout from "../../layout/AdminLayout";

export default function AdminDocuments() {
    const documents = [
        { id: "DOC001", user: "Nguyễn Văn A", type: "CCCD", status: "Đã xác minh", upload: "12/05/2025" },
        { id: "DOC002", user: "Trần Thị B", type: "Hộ chiếu", status: "Chờ duyệt", upload: "10/05/2025" },
        { id: "DOC003", user: "Phạm Minh C", type: "Bằng lái xe", status: "Lỗi", upload: "07/05/2025" },
        { id: "DOC004", user: "Lê Quang D", type: "Sổ hộ khẩu", status: "Đã xác minh", upload: "06/05/2025" },
    ];

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                Quản lý giấy tờ người dùng
            </h1>

            <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
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
                                className="border-b border-gray-800 hover:bg-[#1e293b] text-gray-300 transition"
                            >
                                <td className="py-3">{d.id}</td>
                                <td>{d.user}</td>
                                <td>{d.type}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${d.status === "Đã xác minh"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : d.status === "Chờ duyệt"
                                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                            }`}
                                    >
                                        {d.status}
                                    </span>
                                </td>
                                <td>{d.upload}</td>
                                <td className="flex items-center gap-3 py-2">
                                    {d.status === "Chờ duyệt" && (
                                        <button className="text-green-400 hover:text-green-500 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" /> Duyệt
                                        </button>
                                    )}
                                    {d.status !== "Lỗi" && (
                                        <button className="text-red-400 hover:text-red-500 flex items-center gap-1">
                                            <XCircle className="w-4 h-4" /> Từ chối
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
