import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Bảng điều khiển", icon: LayoutDashboard, path: "/admin" },
  { label: "Người dùng", icon: Users, path: "/admin/users" },
  { label: "Giấy tờ", icon: FileText, path: "/admin/documents" },
  { label: "Báo cáo", icon: BarChart2, path: "/admin/reports" },
  { label: "Cài đặt", icon: Settings, path: "/admin/settings" },
];

export default function SidebarAdmin() {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#0d1117] to-[#111827] border-r border-gray-800 flex flex-col justify-between text-gray-300">
      {/* === Header === */}
      <div>
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-xl font-bold text-blue-400 tracking-wide">
            PDM Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1">Bảng quản trị hệ thống</p>
        </div>

        {/* === Menu === */}
        <nav className="mt-4 space-y-1">
          {menu.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              end // ⬅ FIX QUAN TRỌNG
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  isActive
                    ? "bg-[#1f2a3b] text-blue-300 border-l-4 border-blue-500"
                    : "text-gray-400 hover:text-white hover:bg-[#1f2a3b80]"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* === Logout === */}
      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 px-6 py-4 border-t border-gray-800 text-sm transition-colors duration-150">
        <LogOut className="w-4 h-4" /> Đăng xuất
      </button>
    </aside>
  );
}
