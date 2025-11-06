import { Bell, Search, User, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function HeaderUser() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex justify-between items-center bg-white shadow-sm p-4 rounded-xl border border-gray-100">
            <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu..."
                    className="pl-9 pr-3 py-2 border rounded-md text-sm w-full"
                />
            </div>

            <div className="flex items-center gap-5">
                {/* Bell */}
                <button className="relative hover:text-blue-600 transition">
                    <Bell className="w-6 h-6 mx-2" />
                    <span className="absolute top-0 right-0  bg-red-500 text-white text-xs rounded-full px-1 ">
                        2
                    </span>
                </button>

                {/* Avatar */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="user"
                            className="w-8 h-8 rounded-full"
                        />
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md text-sm">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Hồ sơ cá nhân
                            </a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Cài đặt
                            </a>
                            <a href="#" className="block px-4 py-2 text-red-600 hover:bg-red-50">
                                Đăng xuất
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
