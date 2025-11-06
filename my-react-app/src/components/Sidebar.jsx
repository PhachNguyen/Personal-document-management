import { Home, Folder, Star, FilePlus, Settings, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation();

    const menu = [
        { icon: Home, label: "Trang chủ", path: "/dashboard" },
        { icon: Folder, label: "Tài liệu", path: "/documents" },
        { icon: FilePlus, label: "Tải lên", path: "/upload" },
        { icon: Star, label: "Yêu thích", path: "#" },
    ];

    const folders = [
        "Dự án Keitoto",
        "Design System Journal",
        "Marketing Mạng Xã Hội",
        "Kiểm thử khả dụng",
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
            <div className="p-5">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">
                    Quản lý tài liệu
                </h1>

                <nav className="space-y-1">
                    {menu.map((item, i) => {
                        const Icon = item.icon;
                        const active = pathname === item.path;
                        return (
                            <Link
                                key={i}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active
                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
                        Thư mục
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {folders.map((name, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
                            >
                                <Folder className="w-4 h-4 text-gray-400" />
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="border-t px-5 py-4 text-sm text-gray-500">
                <Link to="/notifications" className="flex items-center gap-2 mb-2 hover:text-blue-600">
                    <Bell className="w-4 h-4" /> Thông báo
                </Link>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600">
                    <Settings className="w-4 h-4" /> Cài đặt
                </a>
            </div>
        </aside>
    );
}
