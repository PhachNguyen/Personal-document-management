import { User, ShieldCheck, Lock, Unlock } from "lucide-react";
import AdminLayout from "../../layout/AdminLayout";

export default function AdminUsers() {
    const users = [
        { id: 1, name: "Nguyễn Văn A", email: "a.nguyen@example.com", role: "Người dùng", status: "Hoạt động" },
        { id: 2, name: "Trần Thị B", email: "b.tran@example.com", role: "Người dùng", status: "Đã khóa" },
        { id: 3, name: "Phạm Minh C", email: "minh.c@example.com", role: "Quản trị viên", status: "Hoạt động" },
    ];

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-400" />
                Quản lý người dùng
            </h1>

            <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-700">
                            <th className="py-3 text-left">Tên</th>
                            <th className="py-3 text-left">Email</th>
                            <th className="py-3 text-left">Vai trò</th>
                            <th className="py-3 text-left">Trạng thái</th>
                            <th className="py-3 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b border-gray-800 hover:bg-[#1e293b] text-gray-300">
                                <td className="py-3">{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${u.role === "Quản trị viên"
                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                            }`}
                                    >
                                        {u.role}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${u.status === "Hoạt động"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                                            }`}
                                    >
                                        {u.status}
                                    </span>
                                </td>
                                <td className="flex items-center gap-3 py-2">
                                    {u.status === "Hoạt động" ? (
                                        <button className="text-red-400 hover:text-red-500 flex items-center gap-1">
                                            <Lock className="w-4 h-4" /> Khóa
                                        </button>
                                    ) : (
                                        <button className="text-green-400 hover:text-green-500 flex items-center gap-1">
                                            <Unlock className="w-4 h-4" /> Mở khóa
                                        </button>
                                    )}
                                    <button className="text-blue-400 hover:text-blue-500 flex items-center gap-1">
                                        <ShieldCheck className="w-4 h-4" /> Chi tiết
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
