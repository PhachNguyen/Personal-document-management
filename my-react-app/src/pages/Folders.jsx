import AppLayout from "../layout/AppLayout";
import { FolderPlus, Folder } from "lucide-react";

export default function Folders() {
    const folderList = [
        { id: 1, name: "Cá nhân", desc: "Giấy tờ tùy thân, CCCD, hộ chiếu...", count: 12 },
        { id: 2, name: "Công việc", desc: "Hợp đồng, quyết định, bảng lương...", count: 8 },
        { id: 3, name: "Học tập", desc: "Bằng cấp, bảng điểm, học bạ...", count: 5 },
        { id: 4, name: "Gia đình", desc: "Giấy khai sinh, sổ hộ khẩu, kết hôn...", count: 10 },
    ];

    return (
        <AppLayout>
            {/* Header section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Folder className="w-5 h-5 text-blue-600" />
                    Thư mục của tôi
                </h2>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                    <FolderPlus className="w-4 h-4" />
                    Tạo thư mục mới
                </button>
            </div>

            {/* Folder Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {folderList.map((folder) => (
                    <div
                        key={folder.id}
                        className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Folder className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                {folder.count} tài liệu
                            </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1">
                            {folder.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{folder.desc}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
