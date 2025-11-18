import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import DocumentCard from "../components/DocumentCard";
import { Search, Upload, FileText, Filter } from "lucide-react";
import documentApi from "../api/documentApi";
import { useNavigate } from "react-router-dom";

export default function Documents() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("Tất cả");
    const [folder, setFolder] = useState("Tất cả");

    const navigate = useNavigate();

    // ✅ Lấy dữ liệu thật từ backend
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await documentApi.getAll();
                setDocuments(res.data || []);
            } catch (err) {
                console.error("❌ Lỗi khi tải tài liệu:", err.response?.data || err.message);
                setError("Không thể tải danh sách tài liệu.");
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    // ✅ Tạo danh sách folder & status động
    const folders = ["Tất cả", ...new Set(
        documents.map((d) => d.folder?.name || "Chưa phân loại")
    )];
    const statuses = ["Tất cả", ...new Set(
        documents.map((d) => d.status || "Không xác định")
    )];

    // ✅ Lọc tài liệu
    const filteredDocs = documents.filter((d) => {
        const matchSearch = d.title?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status === "Tất cả" || d.status === status;
        const matchFolder = folder === "Tất cả" || (d.folder?.name || "Chưa phân loại") === folder;
        return matchSearch && matchStatus && matchFolder;
    });

    return (
        <AppLayout>
            {/* === Header === */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" /> Tài liệu của tôi
                </h2>

                <button
                    onClick={() => navigate("/upload")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                >
                    <Upload className="w-4 h-4" /> Tải lên tài liệu
                </button>
            </div>

            {/* === Bộ lọc === */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Ô tìm kiếm */}
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

            {/* === Nội dung === */}
            {loading ? (
                <div className="flex flex-col items-center py-12 text-gray-500">
                    <FileText className="w-6 h-6 animate-pulse mb-2" />
                    <p>Đang tải tài liệu...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : (
                <>
                    {/* Thống kê */}
                    <p className="text-sm text-gray-500 mb-4">
                        Hiển thị{" "}
                        <span className="font-semibold text-gray-700">{filteredDocs.length}</span>{" "}
                        / {documents.length} tài liệu
                    </p>

                    {/* Danh sách tài liệu */}
                    {filteredDocs.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredDocs.map((doc) => (
                                <DocumentCard
                                    key={doc._id}
                                    title={doc.title}
                                    folder={doc.folder?.name || "Chưa phân loại"}
                                    status={doc.status}
                                    img={
                                        doc.fileUrl?.startsWith("ipfs://")
                                            ? `https://gateway.pinata.cloud/ipfs/${doc.fileUrl.replace("ipfs://", "")}`
                                            : doc.fileUrl ||
                                            "https://placehold.co/400x250?text=No+Preview"
                                    }
                                    // 🔹 Khi click -> điều hướng sang trang chi tiết
                                    onClick={() => navigate(`/documents/${doc._id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-16">
                            <FileText className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                            <p>Không tìm thấy tài liệu nào phù hợp.</p>
                        </div>
                    )}
                </>
            )}
        </AppLayout>
    );
}
