import {
    Home,
    Folder,
    Star,
    FilePlus,
    Settings,
    Bell,
    Plus,
    Trash2,
    Loader2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import folderApi from "../api/folderApi.js"; // ✅ sử dụng API thật

export default function Sidebar() {
    const { pathname } = useLocation();
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newFolder, setNewFolder] = useState("");

    const menu = [
        { icon: Home, label: "Trang chủ", path: "/dashboard" },
        { icon: Folder, label: "Tài liệu", path: "/documents" },
        { icon: FilePlus, label: "Tải lên", path: "/upload" },
        { icon: Star, label: "Yêu thích", path: "#" },
    ];

    // 🟢 Lấy danh sách thư mục từ BE
    const fetchFolders = async () => {
        try {
            const res = await folderApi.getAll();
            setFolders(res.data);
        } catch (err) {
            console.error("❌ Lỗi tải thư mục:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    // 🟢 Tạo thư mục mới
    const handleAddFolder = async () => {
        if (!newFolder.trim()) return;
        try {
            const res = await folderApi.create({ name: newFolder.trim() });
            setFolders((prev) => [...prev, res.data]); // thêm vào danh sách
            setNewFolder("");
            setShowModal(false);
        } catch (err) {
            alert(err.response?.data?.message || "Lỗi khi tạo thư mục!");
        }
    };

    // 🗑 Xóa thư mục
    const handleDeleteFolder = async (id) => {
        if (!confirm("Bạn có chắc chắn muốn xóa thư mục này không?")) return;
        try {
            await folderApi.delete(id);
            setFolders((prev) => prev.filter((f) => f._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Không thể xóa thư mục!");
        }
    };

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
            <div className="p-5">
                {/* === Logo / Title === */}
                <h1 className="text-2xl font-bold text-blue-600 mb-6">
                    Quản lý tài liệu
                </h1>

                {/* === Main Menu === */}
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

                {/* === Folder Section === */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Thư mục
                        </h3>
                        <button
                            title="Tạo thư mục mới"
                            className="p-1.5 rounded-md hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition"
                            onClick={() => setShowModal(true)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center text-gray-400 text-sm py-3">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" /> Đang tải...
                        </div>
                    ) : folders.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-700">
                            {folders.map((folder) => (
                                <li
                                    key={folder._id}
                                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 transition group"
                                >
                                    <Link
                                        to={`/folders/${folder._id}`}
                                        className="flex items-center gap-2 text-gray-700 group-hover:text-blue-600"
                                    >
                                        <Folder className="w-4 h-4 text-gray-400" />
                                        <span className="truncate">{folder.name}</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteFolder(folder._id)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-sm px-3">Chưa có thư mục nào.</p>
                    )}
                </div>
            </div>

            {/* === Bottom Settings === */}
            <div className="border-t px-5 py-4 text-sm text-gray-500">
                <Link
                    to="/notifications"
                    className="flex items-center gap-2 mb-2 hover:text-blue-600"
                >
                    <Bell className="w-4 h-4" /> Thông báo
                </Link>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600">
                    <Settings className="w-4 h-4" /> Cài đặt
                </a>
            </div>

            {/* === Modal Tạo thư mục === */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                            Tạo thư mục mới
                        </h3>
                        <input
                            type="text"
                            placeholder="Nhập tên thư mục..."
                            value={newFolder}
                            onChange={(e) => setNewFolder(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAddFolder}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
