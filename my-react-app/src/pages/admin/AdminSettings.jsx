import { Settings, Shield, Moon, Globe, UserCog } from "lucide-react";
import AdminLayout from "../../layout/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <Settings className="w-7 h-7 text-blue-600" />
        Cài đặt hệ thống
      </h1>

      {/* GRID 2 COL */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* === CẤU HÌNH NGƯỜI DÙNG === */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-blue-500" />
            Cấu hình người dùng
          </h3>

          <div className="space-y-5 text-gray-700 text-sm">
            <div className="flex justify-between items-center">
              <span>Cho phép đăng ký tài khoản mới</span>
              <input type="checkbox" defaultChecked className="toggle-input" />
            </div>

            <div className="flex justify-between items-center">
              <span>Yêu cầu xác minh email khi đăng ký</span>
              <input type="checkbox" defaultChecked className="toggle-input" />
            </div>

            <div className="flex justify-between items-center">
              <span>Giới hạn kích thước file (MB)</span>
              <input
                type="number"
                defaultValue={10}
                className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 w-24 text-center focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* === CÀI ĐẶT BẢO MẬT === */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Cài đặt bảo mật
          </h3>

          <div className="space-y-5 text-gray-700 text-sm">
            <div className="flex justify-between items-center">
              <span>Bật xác thực hai bước (2FA)</span>
              <input type="checkbox" className="toggle-input" />
            </div>

            <div className="flex justify-between items-center">
              <span>Ghi nhật ký hoạt động người dùng</span>
              <input type="checkbox" defaultChecked className="toggle-input" />
            </div>

            <div className="flex justify-between items-center">
              <span>Tự động đăng xuất (phút)</span>
              <input
                type="number"
                defaultValue={30}
                className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 w-24 text-center focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
        </div>

        {/* === GIAO DIỆN & NGÔN NGỮ === */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-500" />
            Giao diện & Ngôn ngữ
          </h3>

          <div className="space-y-6 text-gray-700 text-sm">
            <div className="flex justify-between items-center">
              <span>Chế độ giao diện</span>
              <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1">
                <option>Dark Mode</option>
                <option>Light Mode</option>
                <option>Auto</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span>Ngôn ngữ hiển thị</span>
              <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1">
                <option>Tiếng Việt</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        {/* === THÔNG TIN HỆ THỐNG === */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-500" />
            Thông tin hệ thống
          </h3>

          <ul className="space-y-3 text-gray-700 text-sm">
            <li>
              Phiên bản hệ thống:{" "}
              <span className="font-semibold text-gray-900">v1.2.5</span>
            </li>
            <li>
              Cập nhật lần cuối:{" "}
              <span className="font-semibold text-gray-900">06/11/2025</span>
            </li>
            <li>
              Nhà phát triển:{" "}
              <span className="text-blue-600 font-medium">
                Nguyễn Thế Phách
              </span>
            </li>
            <li>
              Liên hệ hỗ trợ:{" "}
              <span className="text-blue-600 font-medium">support@pdm.vn</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom Toggle Style */}
      <style>{`
                .toggle-input {
                    width: 42px;
                    height: 22px;
                    border-radius: 9999px;
                    appearance: none;
                    background: #d1d5db;
                    position: relative;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .toggle-input:checked {
                    background: #4ade80;
                }
                .toggle-input::after {
                    content: "";
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    background: white;
                    border-radius: 9999px;
                    top: 2px;
                    left: 2px;
                    transition: 0.2s;
                }
                .toggle-input:checked::after {
                    transform: translateX(20px);
                }
            `}</style>
    </AdminLayout>
  );
}
