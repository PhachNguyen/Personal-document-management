import { BarChart2, Activity, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import AdminLayout from "../../layout/AdminLayout";

const reportData = [
    { month: "Th1", uploaded: 120, verified: 80 },
    { month: "Th2", uploaded: 200, verified: 140 },
    { month: "Th3", uploaded: 260, verified: 180 },
    { month: "Th4", uploaded: 300, verified: 220 },
    { month: "Th5", uploaded: 280, verified: 210 },
    { month: "Th6", uploaded: 340, verified: 260 },
];

export default function AdminReports() {
    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BarChart2 className="w-6 h-6 text-blue-400" />
                    Báo cáo tổng hợp
                </h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" /> Chọn khoảng thời gian
                </button>
            </div>

            {/* Biểu đồ */}
            <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-sky-400" /> Thống kê tải lên & xác minh
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData}>
                        <CartesianGrid stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="uploaded" fill="#38bdf8" name="Tải lên" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="verified" fill="#22c55e" name="Đã xác minh" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Báo cáo nhanh */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                    { title: "Tổng giấy tờ đã tải lên", value: "1.372", color: "text-blue-400" },
                    { title: "Giấy tờ đã xác minh", value: "1.024", color: "text-green-400" },
                    { title: "Giấy tờ bị từ chối", value: "94", color: "text-red-400" },
                    { title: "Người dùng hoạt động", value: "312", color: "text-yellow-400" },
                    { title: "Tỉ lệ xác minh", value: "74%", color: "text-teal-400" },
                    { title: "Tổng lượt truy cập", value: "8.214", color: "text-purple-400" },
                ].map((r, i) => (
                    <div
                        key={i}
                        className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow hover:shadow-md hover:bg-[#334155] transition"
                    >
                        <p className="text-gray-400 text-sm">{r.title}</p>
                        <h3 className={`text-2xl font-semibold mt-1 ${r.color}`}>{r.value}</h3>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
