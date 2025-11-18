import { FileText, Users, Upload, ShieldCheck, History } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import StatCard from "../../components/admin/StatCard";
import AdminLayout from "../../layout/AdminLayout";

import { useEffect, useState } from "react";

const revenueStats = [
  { month: "Th1", value: 0.12 },
  { month: "Th2", value: 0.18 },
  { month: "Th3", value: 0.3 },
  { month: "Th4", value: 0.42 },
  { month: "Th5", value: 0.38 },
  { month: "Th6", value: 0.55 },
];

export default function AdminDashboard() {
  // 🔥 Chỉ giữ logs tĩnh
  const [logs] = useState([
    {
      _id: "1",
      type: "BUY_SLOT",
      userEmail: "nguyenthephach@gmail.com",
      slots: 5,
      amountEth: "0.01",
      title: "",
      ipfsHash: "",
      createdAt: "2025-11-18T10:35:00Z",
    },
    {
      _id: "2",
      type: "UPLOAD",
      userEmail: "user1@example.com",
      title: "CCCD_2025.jpg",
      ipfsHash: "QmXyz123ExampleHash9999",
      amountEth: "0",
      createdAt: "2025-11-18T11:00:00Z",
    },
    {
      _id: "3",
      type: "BUY_SLOT",
      userEmail: "user2@gmail.com",
      slots: 3,
      amountEth: "0.006",
      createdAt: "2025-11-18T12:15:00Z",
    },
    {
      _id: "4",
      type: "UPLOAD",
      userEmail: "manhnguyen@example.com",
      title: "BangDiem_CNTT.pdf",
      ipfsHash: "QmUploadSuccessHash8888",
      amountEth: "0",
      createdAt: "2025-11-18T13:20:00Z",
    },
    {
      _id: "5",
      type: "BUY_SLOT",
      userEmail: "phachvippro@example.com",
      slots: 10,
      amountEth: "0.02",
      createdAt: "2025-11-18T14:45:00Z",
    },
  ]);

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Bảng điều khiển quản trị
        </h1>
        <p className="text-gray-500 text-sm">
          Theo dõi tài chính & lịch sử giao dịch.
        </p>
      </div>

      {/* ==== STAT CARDS ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Tải lên hôm nay"
          value="52"
          change="+6%"
          positive
          icon={Upload}
          light
        />
        <StatCard
          title="Tổng giấy tờ"
          value="1.372"
          change="+10%"
          positive
          icon={FileText}
          light
        />
        <StatCard
          title="Người dùng hoạt động"
          value="312"
          change="+4%"
          positive
          icon={Users}
          light
        />
        <StatCard
          title="Đã xác minh"
          value="1.024"
          change="+7%"
          positive
          icon={ShieldCheck}
          light
        />
      </div>

      {/* ==== GRID 2 CỘT ==== */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---- CỘT TRÁI: LICH SỬ ---- */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-yellow-600" />
            Lịch sử giao dịch chi tiết
          </h3>

          <div className="overflow-y-auto max-h-[450px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3">Thời gian</th>
                  <th>Loại</th>
                  <th>Chi tiết</th>
                  <th>ETH</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((lg) => (
                  <tr key={lg._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-xs">
                      {new Date(lg.createdAt).toLocaleString()}
                    </td>

                    <td>
                      {lg.type === "BUY_SLOT" ? (
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          Mua Slot
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          Upload
                        </span>
                      )}
                    </td>

                    <td className="text-xs">
                      {lg.type === "BUY_SLOT" ? (
                        <>
                          Slot: <b>{lg.slots}</b>
                        </>
                      ) : (
                        <>
                          {lg.title}
                          <br />
                          <span className="text-gray-400">
                            {lg.ipfsHash?.slice(0, 18)}...
                          </span>
                        </>
                      )}
                    </td>

                    <td className="text-xs text-gray-700">
                      {lg.amountEth} ETH
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- CỘT PHẢI: BIỂU ĐỒ ---- */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Doanh thu theo tháng
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueStats}>
              <CartesianGrid stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #ddd" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 5, fill: "#2563eb" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
