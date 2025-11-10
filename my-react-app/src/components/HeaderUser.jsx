import { Bell, Search, User, ChevronDown, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderUser() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 🔹 Lấy thông tin user từ localStorage khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 🔹 Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="flex justify-between items-center bg-white shadow-sm p-4 rounded-xl border border-gray-100">
            {/* Ô tìm kiếm */}
            <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu..."
                    className="pl-9 pr-3 py-2 border rounded-md text-sm w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none"
                />
            </div>

            <div className="flex items-center gap-5">
                {/* Bell */}
                <button className="relative hover:text-blue-600 transition">
                    <Bell className="w-6 h-6 mx-2" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                        2
                    </span>
                </button>

                {/* Avatar + menu */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <img
                            src={
                                user?.avatar ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                                    user?.name || "User"
                                )}`
                            }
                            alt="user"
                            className="w-8 h-8 rounded-full border"
                        />
                        <div className="text-left">
                            <p className="text-sm font-medium text-gray-800 leading-tight">
                                {user ? user.name : "Khách"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user ? user.email : "Chưa đăng nhập"}
                            </p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-md text-sm z-10">
                            <button
                                onClick={() => navigate("/profile")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Hồ sơ cá nhân
                            </button>
                            <button
                                onClick={() => navigate("/settings")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Cài đặt
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
