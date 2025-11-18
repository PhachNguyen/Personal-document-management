import { Link } from "react-router-dom";

export default function DocumentCard({ title, folder, status, img, onClick }) {
    const statusStyle =
        status === "Đã xác minh"
            ? "bg-green-100 text-green-700"
            : status === "Đang xử lý"
                ? "bg-yellow-100 text-yellow-700"
                : status === "Chờ duyệt"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-600";

    return (
        <div
            onClick={onClick}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition overflow-hidden group cursor-pointer"
        >
            <img
                src={img}
                alt={title}
                className="w-full h-40 object-cover group-hover:opacity-90 transition"
            />
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-base mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-2">{folder}</p>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle}`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}
