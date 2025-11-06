import { Settings, Shield, Moon, Globe, UserCog } from "lucide-react";
import AdminLayout from "../../layout/AdminLayout";

export default function AdminSettings() {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-400" />
                Cài đặt hệ thống
            </h1>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* === Cấu hình chung === */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <UserCog className="w-5 h-5 text-blue-400" /> Cấu hình người dùng
                    </h3>
                    <div className="space-y-4 text-gray-300 text-sm">
                        <div className="flex justify-between">
                            <span>Cho phép đăng ký tài khoản mới</span>
                            <input type="checkbox" defaultChecked className="accent-blue-500 w-5 h-5" />
                        </div>
                        <div className="flex justify-between">
                            <span>Yêu cầu xác minh email khi đăng ký</span>
                            <input type="checkbox" defaultChecked className="accent-blue-500 w-5 h-5" />
                        </div>
                        <div className="flex justify-between">
                            <span>Giới hạn kích thước file tải lên (MB)</span>
                            <input type="number" defaultValue={10} className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 w-20 text-center" />
                        </div>
                    </div>
                </div>

                {/* === Bảo mật === */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-400" /> Cài đặt bảo mật
                    </h3>
                    <div className="space-y-4 text-gray-300 text-sm">
                        <div className="flex justify-between">
                            <span>Bật xác thực hai bước (2FA)</span>
                            <input type="checkbox" className="accent-green-500 w-5 h-5" />
                        </div>
                        <div className="flex justify-between">
                            <span>Ghi nhật ký hoạt động người dùng</span>
                            <input type="checkbox" defaultChecked className="accent-green-500 w-5 h-5" />
                        </div>
                        <div className="flex justify-between">
                            <span>Thời gian tự động đăng xuất (phút)</span>
                            <input type="number" defaultValue={30} className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 w-20 text-center" />
                        </div>
                    </div>
                </div>

                {/* === Giao diện === */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-purple-400" /> Giao diện & Ngôn ngữ
                    </h3>
                    <div className="space-y-4 text-gray-300 text-sm">
                        <div className="flex justify-between">
                            <span>Chế độ giao diện</span>
                            <select className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-gray-200">
                                <option>Dark Mode</option>
                                <option>Light Mode</option>
                                <option>Auto</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <span>Ngôn ngữ hiển thị</span>
                            <select className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-gray-200">
                                <option>Tiếng Việt</option>
                                <option>English</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* === Hệ thống === */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-teal-400" /> Thông tin hệ thống
                    </h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Phiên bản hệ thống: <span className="text-white">v1.2.5</span></li>
                        <li>Cập nhật lần cuối: <span className="text-white">06/11/2025</span></li>
                        <li>Nhà phát triển: <span className="text-blue-400">Nguyễn Thế Phách</span></li>
                        <li>Liên hệ hỗ trợ: <span className="text-blue-400">support@pdm.vn</span></li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
