import { FileText, Users, Upload, ShieldCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import StatCard from "../../components/admin/StatCard";
import AdminLayout from "../../layout/AdminLayout";

// Dữ liệu biểu đồ (số giấy tờ tải lên theo tháng)
const documentStats = [
    { month: "Th1", value: 120 },
    { month: "Th2", value: 200 },
    { month: "Th3", value: 260 },
    { month: "Th4", value: 340 },
    { month: "Th5", value: 320 },
    { month: "Th6", value: 410 },
];

export default function AdminDashboard() {
    return (
        <AdminLayout>
            {/* ===== Header Section ===== */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">Bảng điều khiển quản trị</h1>
                <p className="text-gray-400 text-sm">
                    Theo dõi hoạt động tải lên và xác minh giấy tờ người dùng.
                </p>
            </div>

            {/* ===== Thống kê nhanh ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard title="Tải lên hôm nay" value="52" change="+6% so với tháng trước" positive icon={Upload} />
                <StatCard title="Tổng giấy tờ" value="1.372" change="+10% so với tháng trước" positive icon={FileText} />
                <StatCard title="Người dùng hoạt động" value="312" change="+4% so với tháng trước" positive icon={Users} />
                <StatCard title="Giấy tờ đã xác minh" value="1.024" change="+7% so với tháng trước" positive icon={ShieldCheck} />
            </div>

            {/* ===== Dữ liệu & Biểu đồ ===== */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* === Bảng dữ liệu === */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-sky-400" /> Giấy tờ gần đây
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-gray-400 text-left border-b border-gray-700">
                                    <th className="pb-2">Mã</th>
                                    <th className="pb-2">Người dùng</th>
                                    <th className="pb-2">Trạng thái</th>
                                    <th className="pb-2">Loại giấy tờ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: "DOC001", user: "Nguyễn Văn A", status: "Đã xác minh", type: "CCCD" },
                                    { id: "DOC002", user: "Trần Thị B", status: "Chờ duyệt", type: "Hộ chiếu" },
                                    { id: "DOC003", user: "Phạm Minh C", status: "Lỗi", type: "Giấy khai sinh" },
                                    { id: "DOC004", user: "Lê Quang D", status: "Đã xác minh", type: "Bằng lái xe" },
                                    { id: "DOC005", user: "Đặng Thị E", status: "Chờ duyệt", type: "Sổ hộ khẩu" },
                                ].map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="bg-[#1e293b] hover:bg-[#334155] transition-all duration-150 text-gray-200"
                                    >
                                        <td className="py-2 px-3 font-medium">{doc.id}</td>
                                        <td className="py-2 px-3">{doc.user}</td>
                                        <td className="py-2 px-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.status === "Đã xác minh"
                                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                        : doc.status === "Chờ duyệt"
                                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                                                    }`}
                                            >
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 text-gray-400">{doc.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* === Biểu đồ === */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Upload className="w-5 h-5 text-sky-400" /> Thống kê tải lên theo tháng
                    </h3>

                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={documentStats}>
                            <CartesianGrid stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #334155",
                                    borderRadius: "8px",
                                }}
                                labelStyle={{ color: "#fff" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#38bdf8"       // 💧 xanh lam sáng hơn
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#38bdf8" }}
                                activeDot={{ r: 7, fill: "#7dd3fc" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AdminLayout>
    );
}
