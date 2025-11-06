export default function DocumentCard({ title, folder, status, img }) {
    const statusColor =
        status === "In Progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={img} alt={title} className="h-36 w-full object-cover" />
            <div className="p-4">
                <h3 className="font-medium text-gray-800 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 mb-2">{folder}</p>
                <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
                    {status}
                </span>
            </div>
        </div>
    );
}
