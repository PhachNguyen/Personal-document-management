import { Folder, FileText, Plus, ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function FolderDetail() {
    const { name } = useParams();
    const navigate = useNavigate();

    const documents = [
        {
            id: 1,
            title: "Căn cước công dân",
            category: "Cá nhân",
            status: "Đã phát hành",
            img: "https://placehold.co/600x400?text=CCCD",
        },
        {
            id: 2,
            title: "Bằng lái xe",
            category: "Công việc",
            status: "Đang xử lý",
            img: "https://placehold.co/600x400?text=License",
        },
        {
            id: 3,
            title: "Giấy khai sinh",
            category: "Gia đình",
            status: "Đã phát hành",
            img: "https://placehold.co/600x400?text=Birth+Cert",
        },
        {
            id: 4,
            title: "Hộ chiếu",
            category: "Du lịch",
            status: "Chờ duyệt",
            img: "https://placehold.co/600x400?text=Passport",
        },
    ];

    return (
        <div className="flex w-full min-h-screen bg-gray-50  text-gray-900 dark:text-gray-100">
            {/* === Sidebar === */}
            <Sidebar />

            {/* === Main Content === */}
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
                            {decodeURIComponent(name)}
                        </h1>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow transition">
                        <Plus className="w-4 h-4" /> Thêm tài liệu
                    </button>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white  p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500">Tổng số tài liệu</p>
                        <p className="text-2xl text-amber-500 font-bold mt-2">12</p>
                    </div>
                    <div className="bg-white  p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500">Đã phát hành</p>
                        <p className="text-2xl font-bold text-green-500 mt-2">8</p>
                    </div>
                    <div className="bg-white  p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500">Đang xử lý</p>
                        <p className="text-2xl font-bold text-yellow-400 mt-2">3</p>
                    </div>
                    <div className="bg-white  p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500">Chờ duyệt</p>
                        <p className="text-2xl font-bold text-blue-400 mt-2">1</p>
                    </div>
                </div>

                {/* Documents List */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Danh sách tài liệu</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {documents.map((doc) => (
                            <Link
                                key={doc.id}
                                to={`/documents/${doc.id}`}
                                className="bg-white  rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 shadow-sm hover:shadow-md transition overflow-hidden group"
                            >
                                <div className="relative">
                                    <img
                                        src={doc.img}
                                        alt={doc.title}
                                        className="w-full h-40 object-cover group-hover:opacity-90 transition"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-xs text-white px-2 py-1 rounded">
                                        {doc.category}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-base mb-1">{doc.title}</h3>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === "Đã phát hành"
                                            ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-400"
                                            : doc.status === "Đang xử lý"
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-400"
                                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                            }`}
                                    >
                                        {doc.status}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
