import AppLayout from "../layout/AppLayout";
import DocumentCard from "../components/DocumentCard";
import { Search, Upload, FileText, Filter } from "lucide-react";
import { useState } from "react";

export default function Documents() {
    const allDocs = [
        { title: "CCCD", folder: "Cá nhân", status: "Đã phát hành", img: "https://placehold.co/600x400?text=CCCD" },
        { title: "Bằng lái xe", folder: "Công việc", status: "Đang xử lý", img: "https://placehold.co/600x400?text=License" },
        { title: "Giấy khai sinh", folder: "Gia đình", status: "Đã phát hành", img: "https://placehold.co/600x400?text=Birth+Cert" },
        { title: "Hộ chiếu", folder: "Du lịch", status: "Chờ duyệt", img: "https://placehold.co/600x400?text=Passport" },
        { title: "Bằng tốt nghiệp", folder: "Học tập", status: "Đang xử lý", img: "https://placehold.co/600x400?text=Degree" },
    ];

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("Tất cả");
    const [folder, setFolder] = useState("Tất cả");

    const folders = ["Tất cả", "Cá nhân", "Công việc", "Gia đình", "Du lịch", "Học tập"];
    const statuses = ["Tất cả", "Đã phát hành", "Đang xử lý", "Chờ duyệt"];

    const filteredDocs = allDocs.filter((d) => {
        const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status === "Tất cả" || d.status === status;
        const matchFolder = folder === "Tất cả" || d.folder === folder;
        return matchSearch && matchStatus && matchFolder;
    });

    return (
        <AppLayout>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" /> Tài liệu của tôi
                </h2>

                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                    <Upload className="w-4 h-4" /> Tải lên tài liệu
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm tài liệu..."
                        className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Folder filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        value={folder}
                        onChange={(e) => setFolder(e.target.value)}
                        className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
                    >
                        {folders.map((f, i) => (
                            <option key={i} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status filter */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
                >
                    {statuses.map((s, i) => (
                        <option key={i} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {/* Result Summary */}
            <p className="text-sm text-gray-500 mb-4">
                Hiển thị <span className="font-semibold text-gray-700">{filteredDocs.length}</span> / {allDocs.length} tài liệu
            </p>

            {/* Documents Grid */}
            {filteredDocs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDocs.map((d, i) => (
                        <DocumentCard key={i} {...d} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-16">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p>Không tìm thấy tài liệu nào phù hợp.</p>
                </div>
            )}
        </AppLayout>
    );
}
