import { BarChart2, Activity, CalendarDays } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
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
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart2 className="w-7 h-7 text-blue-600" />
          Báo cáo tổng hợp
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 shadow-sm">
          <CalendarDays className="w-4 h-4" /> Chọn khoảng thời gian
        </button>
      </div>

      {/* BIỂU ĐỒ */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-sky-500" />
          Thống kê tải lên & xác minh
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportData}>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
              labelStyle={{ color: "#374151" }}
            />

            {/* Upload bar */}
            <Bar
              dataKey="uploaded"
              fill="#3b82f6" // blue-500
              name="Tải lên"
              radius={[6, 6, 0, 0]}
            />

            {/* Verified bar */}
            <Bar
              dataKey="verified"
              fill="#22c55e" // green-500
              name="Đã xác minh"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* QUICK REPORT CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Tổng giấy tờ đã tải lên",
            value: "1.372",
            color: "text-blue-600",
          },
          {
            title: "Giấy tờ đã xác minh",
            value: "1.024",
            color: "text-green-600",
          },
          { title: "Giấy tờ bị từ chối", value: "94", color: "text-red-600" },
          {
            title: "Người dùng hoạt động",
            value: "312",
            color: "text-yellow-600",
          },
          { title: "Tỉ lệ xác minh", value: "74%", color: "text-teal-600" },
          {
            title: "Tổng lượt truy cập",
            value: "8.214",
            color: "text-purple-600",
          },
        ].map((r, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition hover:-translate-y-[1px]"
          >
            <p className="text-gray-500 text-sm">{r.title}</p>
            <h3 className={`text-2xl font-semibold mt-2 ${r.color}`}>
              {r.value}
            </h3>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
