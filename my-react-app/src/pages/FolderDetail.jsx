import { useEffect, useState } from "react";
import { Folder, Plus, ArrowLeft, Loader2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import documentApi from "../api/documentApi";

export default function FolderDetail() {
    const { name } = useParams(); // name = folderId
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [folderName, setFolderName] = useState("");
    const [loading, setLoading] = useState(true);

    // 🧩 Convert IPFS → HTTP (Pinata)
    const getPreviewUrl = (doc) => {
        if (!doc) return "https://placehold.co/400x250?text=No+Preview";
        if (doc.fileUrl?.startsWith("ipfs://"))
            return `https://gateway.pinata.cloud/ipfs/${doc.fileUrl.replace("ipfs://", "")}`;
        if (doc.fileUrl?.includes("gateway.pinata.cloud") || doc.fileUrl?.startsWith("http"))
            return doc.fileUrl;
        if (doc.ipfsHash)
            return `https://gateway.pinata.cloud/ipfs/${doc.ipfsHash}`;
        return "https://placehold.co/400x250?text=No+Preview";
    };

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await documentApi.getByFolderId(name);

                // ✅ lấy đúng dữ liệu từ BE
                setFolderName(res.data.folder);
                console.log("🚀 ~ file: FolderDetail.jsx:32 ~ fetchDocs ~ res.data.folder:", res.data.folder);
                setDocuments(res.data.documents || []);
            } catch (err) {
                console.error("❌ Lỗi tải tài liệu:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, [name]);

    // 🧮 Thống kê
    const total = documents.length;
    const verified = documents.filter((d) => d.status === "Đã xác minh").length;
    const processing = documents.filter((d) => d.status === "Đang xử lý").length;
    const pending = documents.filter((d) => d.status === "Chờ duyệt").length;

    return (
        <div className="flex w-full min-h-screen bg-gray-50 text-gray-900">
            <Sidebar />

            <main className="flex-1 p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
                        >
                            <ArrowLeft className="w-4 h-4" /> Quay lại
                        </button>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Folder className="w-6 h-6 text-blue-600" />
                            {folderName || "Thư mục"}
                        </h1>
                    </div>

                    <Link
                        to="/upload"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow transition"
                    >
                        <Plus className="w-4 h-4" /> Thêm tài liệu
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard title="Tổng số tài liệu" value={total} color="text-blue-500" />
                    <StatCard title="Đã xác minh" value={verified} color="text-green-500" />
                    <StatCard title="Đang xử lý" value={processing} color="text-yellow-500" />
                    <StatCard title="Chờ duyệt" value={pending} color="text-orange-500" />
                </div>

                {/* Documents */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Danh sách tài liệu</h2>

                    {loading ? (
                        <div className="flex items-center justify-center text-gray-500 py-10">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang tải dữ liệu...
                        </div>
                    ) : documents.length === 0 ? (
                        <p className="text-gray-500 text-sm">Không có tài liệu nào trong thư mục này.</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {documents.map((doc) => (
                                <Link
                                    key={doc._id}
                                    to={`/documents/${doc._id}`}
                                    className="bg-white rounded-xl border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md transition overflow-hidden group"
                                >
                                    <div className="relative">
                                        <img
                                            src={getPreviewUrl(doc)}
                                            alt={doc.title}
                                            className="w-full h-40 object-cover group-hover:opacity-90 transition"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-xs text-white px-2 py-1 rounded">
                                            {folderName}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-semibold text-base mb-1">{doc.title}</h3>
                                        <StatusBadge status={doc.status} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

const StatCard = ({ title, value, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const map = {
        "Đã xác minh": "bg-green-100 text-green-700",
        "Đang xử lý": "bg-yellow-100 text-yellow-700",
        "Chờ duyệt": "bg-blue-100 text-blue-700",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
};
