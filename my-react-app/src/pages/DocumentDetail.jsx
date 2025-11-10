import { FileText, CalendarDays, ShieldCheck, Link2 } from "lucide-react";

export default function DocumentDetail() {
    // 🔹 Dữ liệu giả lập
    const document = {
        title: "Căn cước công dân",
        type: "Giấy tờ cá nhân",
        status: "Đã xác minh",
        ipfsHash: "QmXyZ123ABCDEF...",
        createdAt: "2025-11-06T10:00:00Z",
        previewUrl: "https://ipfs.io/ipfs/QmXyZ123ABCDEF", // ảnh demo
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8">
            {/* === Header === */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-400" />
                    Chi tiết tài liệu
                </h1>

                <a
                    href={document.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-1 transition"
                >
                    <Link2 className="w-4 h-4" /> Mở trên IPFS
                </a>
            </div>

            {/* === Content === */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* --- Thông tin tài liệu --- */}
                <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Thông tin chi tiết
                    </h2>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li>
                            <span className="font-medium text-gray-400">Tên tài liệu:</span>{" "}
                            {document.title}
                        </li>
                        <li>
                            <span className="font-medium text-gray-400">Loại:</span>{" "}
                            {document.type}
                        </li>
                        <li>
                            <span className="font-medium text-gray-400">Trạng thái:</span>{" "}
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${document.status === "Đã xác minh"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : document.status === "Chờ duyệt"
                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                                    }`}
                            >
                                {document.status}
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-gray-400" />
                            Ngày tải lên:{" "}
                            {new Date(document.createdAt).toLocaleDateString("vi-VN")}
                        </li>
                        <li className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-gray-400" />
                            IPFS Hash:{" "}
                            <span className="font-mono text-blue-400">
                                {document.ipfsHash}
                            </span>
                        </li>
                    </ul>

                    <div className="mt-6">
                        <button className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-2 rounded-lg mr-3 transition">
                            Quay lại
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded-lg transition">
                            Tải xuống
                        </button>
                    </div>
                </div>

                {/* --- Xem trước tài liệu --- */}
                <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-white">
                        Xem trước tài liệu
                    </h2>
                    <img
                        src="https://cdn.dribbble.com/userupload/12265996/file/original-bd72a0e739334f969a920f4964a570b2.png"
                        alt="Document preview"
                        className="rounded-lg border border-gray-700 w-full h-[480px] object-contain bg-gray-900"
                    />
                </div>
            </div>
        </div>
    );
}
